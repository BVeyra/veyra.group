import type { Express, Request } from "express";
import type { Server } from "http";
import { buildAuditInsights } from "../shared/auditEngine.js";
import { isValidLeadEmail, normalizeLeadPayload } from "../shared/auditValidation.js";
import { syncAuditLeadToCrm } from "./crmSync";
import { bookingUrlFor, generateAndEmailPDF, reportUrlFor, sendOwnerNotification } from "./pdfGenerator";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function getClientIp(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string, now: number) {
  if (requestLog.size > 5000) requestLog.clear();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post("/api/generate-report", async (req, res) => {
    try {
      const ip = getClientIp(req);
      const body = (req.body || {}) as Record<string, unknown>;

      if (isRateLimited(ip, Date.now())) {
        return res.status(429).json({ success: false, error: "Rate limit exceeded. Try again later." });
      }

      // Honeypot: real users never fill this hidden field. Pretend success so
      // bots don't learn they were filtered.
      if (typeof body.website === "string" && body.website.trim() !== "") {
        return res.json({ success: true });
      }

      const payload = normalizeLeadPayload(body);
      console.log(
        JSON.stringify({
          event: "generate-report.request",
          timestamp: new Date().toISOString(),
          ip,
          email: payload?.email || "",
          source: payload?.source || "",
        }),
      );

      if (!payload) {
        return res.status(400).json({ success: false, error: "Missing or invalid PM audit fields" });
      }
      if (!isValidLeadEmail(payload.email)) {
        return res.status(400).json({ success: false, error: "Invalid email address" });
      }

      const insights = buildAuditInsights(payload);

      // Capture the lead BEFORE attempting email delivery: a Resend failure
      // must never lose a completed audit.
      const crmSync = await syncAuditLeadToCrm(payload);

      let reportEmailStatus = "sent";
      let messageId: string | undefined;
      try {
        const result = await generateAndEmailPDF(payload, insights);
        messageId = result.messageId;
      } catch (emailError) {
        reportEmailStatus = emailError instanceof Error ? `failed: ${emailError.message}` : "failed";
        console.error("Report email failed (lead still captured):", emailError);
      }

      await sendOwnerNotification(payload, insights, { crmSync, reportEmailStatus });

      return res.json({
        success: true,
        insights,
        reportUrl: reportUrlFor(payload),
        bookingUrl: bookingUrlFor(payload),
        emailDelivered: reportEmailStatus === "sent",
        messageId,
        crmSync: crmSync.status,
      });
    } catch (error) {
      console.error("Error generating report:", error);
      return res.status(500).json({
        success: false,
        error: "Report generation failed",
      });
    }
  });

  return httpServer;
}
