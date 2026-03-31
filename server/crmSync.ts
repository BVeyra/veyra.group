import type { AuditLeadData } from "./auditReport";

export type CrmSyncResult = {
  status: "created" | "updated" | "skipped" | "error";
  prospectId?: number;
  reason?: string;
};

export async function syncAuditLeadToCrm(data: AuditLeadData): Promise<CrmSyncResult> {
  const endpoint =
    process.env.CRM_PM_AUDIT_ENDPOINT ||
    (process.env.NODE_ENV !== "production" ? "http://127.0.0.1:8000/api/inbound/pm-audit" : "");

  if (!endpoint) {
    return { status: "skipped", reason: "CRM_PM_AUDIT_ENDPOINT not configured" };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.CRM_PM_AUDIT_TOKEN) {
      headers["x-veyra-audit-token"] = process.env.CRM_PM_AUDIT_TOKEN;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { status: "error", reason: `CRM sync failed with ${response.status}` };
    }

    const payload = (await response.json()) as { status?: "created" | "updated"; prospect_id?: number };
    return {
      status: payload.status || "updated",
      prospectId: payload.prospect_id,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const reason = error instanceof Error ? error.message : "Unknown CRM sync error";
    return { status: "error", reason };
  }
}
