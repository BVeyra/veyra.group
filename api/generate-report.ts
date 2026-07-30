import type { VercelRequest, VercelResponse } from "@vercel/node";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  buildAuditInsights,
  buildFollowUp,
  type AuditInsights,
  type AuditLeadData,
} from "../shared/auditEngine.js";
import { isValidLeadEmail, normalizeLeadPayload } from "../shared/auditValidation.js";
import { buildSnapshotEmailHtml } from "../shared/snapshotEmail.js";
import { buildPDFDocument } from "../shared/auditPdf.js";
import { PublicReportAbuseControls, verifiedClientIp, verifyPublicReportTurnstile } from "../shared/publicReportSecurity.js";
import { issueReportToken } from "../server/reportToken.js";

const SITE_URL = process.env.SITE_URL || "https://veyragroup.ai";

function bookingUrlFor(data?: AuditLeadData) {
  const base = process.env.BOOKING_URL || `${SITE_URL}/book`;
  if (!data) return base;
  const params = new URLSearchParams({ name: data.name, email: data.email });
  return `${base}?${params.toString()}`;
}

function reportUrlFor(data: AuditLeadData) {
  return `${SITE_URL}/report?d=${encodeURIComponent(issueReportToken(data))}`;
}

// ─── Bot protection and spend control ───

const abuseControls = new PublicReportAbuseControls();

// ─── Email helpers ───

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function sanitizeSubject(v: string) {
  return v.replace(/[\r\n]+/g, " ").trim();
}

async function sendViaResend(payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result?.message || "Email send failed");
  return { messageId: result.id as string };
}

async function sendReportEmail(data: AuditLeadData, insights: AuditInsights, reportUrl: string) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>";
  const bookingUrl = bookingUrlFor(data);
  const safeName = escapeHtml(data.name);
  const safeCompany = escapeHtml(data.company);
  const safeBookingUrl = escapeHtml(bookingUrl);
  const safeReportUrl = escapeHtml(reportUrl);
  const safeFocusTitle = escapeHtml(insights.likelyFocus.title);
  const safeFocusDescription = escapeHtml(insights.likelyFocus.description);

  let pdfBase64: string | null = null;
  let pdfFilename = "pms_operations_snapshot.pdf";
  try {
    const pdfBuffer = await renderToBuffer(buildPDFDocument(data, insights, bookingUrl));
    pdfBase64 = Buffer.from(pdfBuffer).toString("base64");
    const safeFileBase = data.company.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
    pdfFilename = `${safeFileBase || "pms_operations"}_pms_operations_snapshot.pdf`;
  } catch (pdfErr) {
    console.error("PDF generation failed, sending email without attachment:", pdfErr);
  }

  const html = buildSnapshotEmailHtml({
    safeName, safeCompany, safeReportUrl, safeBookingUrl,
    safeFocusTitle, safeFocusDescription,
    hasPdfAttachment: Boolean(pdfBase64),
  });

  const text = [
    `${data.name},`,
    ``,
    `Your preliminary PMS Operations Snapshot for ${data.company} is ready.`,
    `View your Snapshot: ${reportUrl}`,
    ``,
    `Where to start: ${insights.likelyFocus.title}.`,
    `Preliminary and based on what you reported. A 15-minute Fit Call is where it gets tested.`,
    ``,
    insights.likelyFocus.description,
    ``,
    `Book a 15-minute Fit Call: ${bookingUrl}`,
    `Prefer to talk now? Call (220) 244-4213.`,
  ].join("\n");

  const emailPayload: Record<string, unknown> = {
    from: fromEmail,
    to: data.email,
    subject: sanitizeSubject(`${data.company}: your PMS Operations Snapshot is ready`),
    html,
    text,
  };
  if (pdfBase64) {
    emailPayload.attachments = [{ filename: pdfFilename, content: pdfBase64 }];
  }
  return sendViaResend(emailPayload);
}

async function sendOwnerNotification(
  data: AuditLeadData,
  insights: AuditInsights,
  extras: { crmStatus: string; reportEmailStatus: string; reportUrl: string },
) {
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>";
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || "contact@veyragroup.ai";
  const followUp = buildFollowUp(data, insights);
  const attribution = [
    data.source && `source: ${data.source}`,
    data.utmSource && `utm_source: ${data.utmSource}`,
    data.utmMedium && `utm_medium: ${data.utmMedium}`,
    data.utmCampaign && `utm_campaign: ${data.utmCampaign}`,
    data.referrer && `referrer: ${data.referrer}`,
  ].filter(Boolean).join(" · ") || "direct / unknown";

  try {
    await sendViaResend({
      from: fromEmail,
      to: ownerEmail,
      subject: sanitizeSubject(`[${followUp.priority}] New PMS Snapshot lead - ${data.company}`),
      html: `<h2>New Website PMS Snapshot Lead</h2>
<p><strong>Priority:</strong> ${escapeHtml(followUp.priority)}</p>
<h3>Contact</h3>
<ul><li><strong>Name:</strong> ${escapeHtml(data.name)}</li><li><strong>Company:</strong> ${escapeHtml(data.company)}</li><li><strong>Email:</strong> ${escapeHtml(data.email)}</li></ul>
<h3>Snapshot inputs</h3>
<ul><li><strong>Units / Team:</strong> ${data.units} / ${data.teamSize}</li><li><strong>PM software:</strong> ${escapeHtml(data.pmSoftware)}</li><li><strong>Where to start:</strong> ${escapeHtml(insights.likelyFocus.title)}</li><li><strong>Snapshot:</strong> <a href="${escapeHtml(extras.reportUrl)}">web Snapshot</a></li></ul>
<h3>Attribution</h3><p>${escapeHtml(attribution)}</p>
<h3>Delivery</h3><ul><li><strong>CRM sync:</strong> ${escapeHtml(extras.crmStatus)}</li><li><strong>Report email:</strong> ${escapeHtml(extras.reportEmailStatus)}</li></ul>
<h3>Next Action</h3><p>${escapeHtml(followUp.reason)}</p>`,
    });
    return { success: true };
  } catch (error) {
    console.error("Owner notification failed:", error);
    return { success: false };
  }
}

// ─── CRM Sync ───

async function syncAuditLeadToCrm(data: AuditLeadData) {
  const endpoint = process.env.CRM_PM_AUDIT_ENDPOINT || "";
  if (!endpoint) return { status: "skipped" as const, reason: "CRM_PM_AUDIT_ENDPOINT not configured" };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.CRM_PM_AUDIT_TOKEN) headers["x-veyra-audit-token"] = process.env.CRM_PM_AUDIT_TOKEN;
    const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(data), signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) return { status: "error" as const, reason: `CRM sync failed with ${response.status}` };
    const payload = await response.json() as { status?: string; prospect_id?: number };
    return { status: (payload.status || "updated") as "created" | "updated", prospectId: payload.prospect_id };
  } catch (error) {
    clearTimeout(timeoutId);
    return { status: "error" as const, reason: error instanceof Error ? error.message : "Unknown CRM sync error" };
  }
}

// ─── Handler ───

const ALLOWED_ORIGINS = new Set(["https://veyragroup.ai", "https://www.veyragroup.ai"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const ip = verifiedClientIp(req.headers, req.socket?.remoteAddress);
    const body = (req.body || {}) as Record<string, unknown>;

    // Honeypot: real users never fill this hidden field. Pretend success so
    // bots don't learn they were filtered.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.json({ success: true });
    }

    if (!(await verifyPublicReportTurnstile(body.turnstileToken, ip))) {
      return res.status(403).json({ success: false, error: "Verification failed. Refresh and try again." });
    }

    // Each accepted request can attempt one report email and one owner alert.
    // Reserve both before any paid work, against durable shared counters.
    const abuseControl = await abuseControls.reserve(ip, 2);
    if (abuseControl === "rate_limited") {
      return res.status(429).json({ success: false, error: "Rate limit exceeded. Try again later." });
    }
    if (abuseControl === "spend_cap_reached") {
      return res.status(429).json({ success: false, error: "The daily report limit has been reached. Please try again tomorrow." });
    }
    if (abuseControl === "unavailable") {
      return res.status(503).json({ success: false, error: "Report delivery is temporarily unavailable." });
    }

    const payload = normalizeLeadPayload(body);
    console.log(JSON.stringify({ event: "generate-report.request", timestamp: new Date().toISOString(), ip, email: payload?.email || "" }));

    if (!payload) return res.status(400).json({ success: false, error: "Missing or invalid PM audit fields" });
    if (!isValidLeadEmail(payload.email)) return res.status(400).json({ success: false, error: "Invalid email address" });

    const insights = buildAuditInsights(payload);
    const reportUrl = reportUrlFor(payload);

    // Capture the lead BEFORE attempting email delivery: a Resend failure
    // must never lose a completed audit.
    const crmSync = await syncAuditLeadToCrm(payload);

    let reportEmailStatus = "sent";
    let messageId: string | undefined;
    try {
      const emailResult = await sendReportEmail(payload, insights, reportUrl);
      messageId = emailResult.messageId;
    } catch (emailError) {
      reportEmailStatus = emailError instanceof Error ? `failed: ${emailError.message}` : "failed";
      console.error("Report email failed (lead still captured):", emailError);
    }

    await sendOwnerNotification(payload, insights, { crmStatus: crmSync.status, reportEmailStatus, reportUrl });

    return res.json({
      success: true,
      insights,
      reportUrl,
      bookingUrl: bookingUrlFor(payload),
      emailDelivered: reportEmailStatus === "sent",
      messageId,
      crmSync: crmSync.status,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ success: false, error: "Report generation failed" });
  }
}
