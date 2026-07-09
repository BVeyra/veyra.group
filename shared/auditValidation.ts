import {
  AFTER_HOURS_OPTIONS,
  MAINTENANCE_FLOW_OPTIONS,
  OWNER_REPORTING_OPTIONS,
  PAIN_OPTIONS,
  PM_SOFTWARE_OPTIONS,
  RENT_COLLECTION_OPTIONS,
  RESPONSE_TIME_OPTIONS,
  type AfterHoursOption,
  type AuditLeadData,
  type MaintenanceFlowOption,
  type OwnerReportingOption,
  type PainOption,
  type PmSoftwareOption,
  type RentCollectionOption,
  type ResponseTimeOption,
} from "./auditEngine.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Matched against the domain only, as exact domain or subdomain suffix —
// substring matching rejected legitimate domains like greatest.com.
const blockedDomains = ["example.com", "test.com", "mailinator.com", "guerrillamail.com", "guerrillamail.net"];
const blockedDomainFragments = ["tempmail", "trashmail", "10minutemail"];

export function isValidLeadEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !emailPattern.test(normalized)) return false;
  const domain = normalized.split("@")[1] || "";
  if (blockedDomains.some((blocked) => domain === blocked || domain.endsWith(`.${blocked}`))) return false;
  return !blockedDomainFragments.some((fragment) => domain.includes(fragment));
}

function isAllowedOption<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function parsePainPoints(raw: unknown): PainOption[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return Array.from(new Set(raw.filter((item): item is PainOption => isAllowedOption(item, PAIN_OPTIONS))));
}

export function normalizeLeadPayload(body: Record<string, unknown>): AuditLeadData | null {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const units = Number(body.units);
  const teamSize = Number(body.teamSize);
  const painPoints = parsePainPoints(body.painPoints);
  if (!name || !company || !email) return null;
  if (name.length > 120 || company.length > 160 || email.length > 254) return null;
  if (!Number.isFinite(units) || !Number.isFinite(teamSize) || units <= 0 || teamSize <= 0) return null;
  if (units > 10000 || teamSize > 500) return null;
  if (!isAllowedOption(body.pmSoftware, PM_SOFTWARE_OPTIONS)) return null;
  if (!isAllowedOption(body.responseTime, RESPONSE_TIME_OPTIONS)) return null;
  if (!isAllowedOption(body.maintenanceFlow, MAINTENANCE_FLOW_OPTIONS)) return null;
  if (!isAllowedOption(body.ownerReporting, OWNER_REPORTING_OPTIONS)) return null;
  if (!isAllowedOption(body.afterHours, AFTER_HOURS_OPTIONS)) return null;
  if (!isAllowedOption(body.rentCollection, RENT_COLLECTION_OPTIONS)) return null;
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
    afterHours: body.afterHours as AfterHoursOption,
    rentCollection: body.rentCollection as RentCollectionOption,
    painPoints,
    source: typeof body.source === "string" ? body.source.slice(0, 100) : "",
    entry: typeof body.entry === "string" ? body.entry.slice(0, 100) : "",
    referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 500) : "",
    pageUrl: typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 500) : "",
    utmSource: typeof body.utmSource === "string" ? body.utmSource.slice(0, 100) : "",
    utmMedium: typeof body.utmMedium === "string" ? body.utmMedium.slice(0, 100) : "",
    utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign.slice(0, 100) : "",
  };
}
