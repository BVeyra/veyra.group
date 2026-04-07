import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  buildAuditInsights,
  MAINTENANCE_FLOW_OPTIONS,
  OWNER_REPORTING_OPTIONS,
  PAIN_OPTIONS,
  type AuditLeadData,
  type MaintenanceFlowOption,
  type PainOption,
  PM_SOFTWARE_OPTIONS,
  RESPONSE_TIME_OPTIONS,
  type OwnerReportingOption,
  type PmSoftwareOption,
  type ResponseTimeOption,
} from "../server/auditReport";
import { syncAuditLeadToCrm } from "../server/crmSync";
import { generateAndEmailPDF, sendOwnerNotification } from "../server/pdfGenerator";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const blockedEmailFragments = [
  "example.com",
  "test.com",
  "invalid",
  "fake",
  "mailinator.com",
  "tempmail",
  "guerrillamail",
];
const requestLog = new Map<string, number[]>();

function getClientIp(req: VercelRequest) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function pruneRequests(ip: string, now: number) {
  const recent = (requestLog.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  requestLog.set(ip, recent);
  return recent;
}

function isValidLeadEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !emailPattern.test(normalized)) return false;
  return !blockedEmailFragments.some((frag) => normalized.includes(frag));
}

function isAllowedOption<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && allowed.includes(value);
}

function parsePainPoints(raw: unknown): PainOption[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  const values = raw.filter((item): item is PainOption => isAllowedOption(item, PAIN_OPTIONS));
  return Array.from(new Set(values));
}

function normalizeLeadPayload(body: Record<string, unknown>): AuditLeadData | null {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const units = Number(body.units);
  const teamSize = Number(body.teamSize);
  const painPoints = parsePainPoints(body.painPoints);

  if (!name || !company || !email) return null;
  if (!Number.isFinite(units) || !Number.isFinite(teamSize) || units <= 0 || teamSize <= 0) return null;
  if (!isAllowedOption(body.pmSoftware, PM_SOFTWARE_OPTIONS)) return null;
  if (!isAllowedOption(body.responseTime, RESPONSE_TIME_OPTIONS)) return null;
  if (!isAllowedOption(body.maintenanceFlow, MAINTENANCE_FLOW_OPTIONS)) return null;
  if (!isAllowedOption(body.ownerReporting, OWNER_REPORTING_OPTIONS)) return null;
  if (painPoints.length === 0) return null;

  return {
    name,
    company,
    email,
    units: Math.round(units),
    teamSize: Math.round(teamSize),
    pmSoftware: body.pmSoftware as PmSoftwareOption,
    responseTime: body.responseTime as ResponseTimeOption,
    maintenanceFlow: body.maintenanceFlow as MaintenanceFlowOption,
    ownerReporting: body.ownerReporting as OwnerReportingOption,
    painPoints,
    source: typeof body.source === "string" ? body.source : "",
    entry: typeof body.entry === "string" ? body.entry : "",
    referrer: typeof body.referrer === "string" ? body.referrer : "",
    pageUrl: typeof body.pageUrl === "string" ? body.pageUrl : "",
    utmSource: typeof body.utmSource === "string" ? body.utmSource : "",
    utmMedium: typeof body.utmMedium === "string" ? body.utmMedium : "",
    utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign : "",
  };
}

const ALLOWED_ORIGINS = new Set([
  "https://veyragroup.ai",
  "https://www.veyragroup.ai",
]);

function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const ip = getClientIp(req);
    const timestamp = new Date().toISOString();
    const recentRequests = pruneRequests(ip, Date.now());

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({ success: false, error: "Rate limit exceeded. Try again later." });
    }
    recentRequests.push(Date.now());
    requestLog.set(ip, recentRequests);

    const payload = normalizeLeadPayload(req.body || {});
    console.log(
      JSON.stringify({
        event: "generate-report.request",
        timestamp,
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
    const result = await generateAndEmailPDF(payload);
    const crmSync = await syncAuditLeadToCrm(payload);
    await sendOwnerNotification(payload, crmSync);

    return res.json({
      success: true,
      insights,
      messageId: result.messageId,
      crmSync: crmSync.status,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ success: false, error: "Report generation failed" });
  }
}
