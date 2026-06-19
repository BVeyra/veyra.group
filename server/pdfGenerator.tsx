import React from "react";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { buildAuditInsights, type AuditLeadData } from "./auditReport";
import { PDFReport } from "./pdfTemplate";
import type { CrmSyncResult } from "./crmSync";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  return {
    client: new Resend(apiKey),
    fromEmail: process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>",
    fallbackFromEmail: "Veyra Group <onboarding@resend.dev>",
    bookingUrl: process.env.BOOKING_URL || "https://veyragroup.ai/book",
    ownerNotificationEmail: process.env.OWNER_NOTIFICATION_EMAIL || "contact@veyragroup.ai",
  };
}

export async function generateAndEmailPDF(data: AuditLeadData) {
  try {
    const pdfBuffer = await renderToBuffer(<PDFReport data={data} />);
    const insights = buildAuditInsights(data);
    const { client: resend, fromEmail, fallbackFromEmail, bookingUrl } = getResendClient();
    const safeName = escapeHtml(data.name);
    const safeCompany = escapeHtml(data.company);
    const safeBookingUrl = escapeHtml(bookingUrl);
    const safeRecommendationTitle = escapeHtml(insights.primaryRecommendation.title);
    const safeRecommendationDescription = escapeHtml(insights.primaryRecommendation.description);
    const safeFitNote = escapeHtml(insights.primaryRecommendation.fitNote);
    const safePrep = escapeHtml(insights.primaryRecommendation.callPrep.slice(0, 2).join(" · "));
    const safeFileBase = data.company
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();

    const sendReportEmail = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to: data.email,
        subject: sanitizeSubject(`${data.company}: your PM Workflow Audit is ready`),
        html: `
  <div style="font-family:'Bricolage Grotesque',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background-color:#0a0a0a;">
    <div style="padding:28px 32px 20px;border-bottom:1px solid #1f1f1f;">
      <span style="font-size:17px;letter-spacing:-0.4px;">
        <span style="color:#f3f6f4;font-weight:700;">Veyra</span><span style="color:#8b938f;font-weight:500;margin-left:5px;font-size:0.78em;">Group</span>
      </span>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;font-weight:600;color:#ffffff;margin:0 0 20px 0;">${safeName},</p>
      <p style="font-size:15px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        Your PM Workflow Audit for <strong style="color:#ffffff;">${safeCompany}</strong> is attached.
      </p>
      <div style="background:#121212;border:1px solid #242424;border-radius:14px;padding:18px;margin:0 0 20px 0;">
        <div style="font-size:11px;color:#2f9670;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:8px;">What jumped out</div>
        <p style="font-size:15px;color:#ffffff;line-height:1.7;margin:0 0 8px 0;"><strong>${safeRecommendationTitle}</strong> is the strongest first build.</p>
        <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0 0 8px 0;">${insights.estimatedWeeklyBusyworkHours} hours of repeatable work per week. Roughly $${insights.monthlyAdminEquivalent.toLocaleString()}/mo of part-time admin equivalent.</p>
        <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0;">The first build could reasonably give back <strong style="color:#ffffff;">${insights.estimatedWeeklyTimeSaved} hours/week</strong> if the current workflow looks like your inputs.</p>
      </div>
      <p style="font-size:15px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        ${safeRecommendationDescription}
      </p>
      <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        ${safeFitNote}
      </p>
      <div style="text-align:center;margin:0 0 24px 0;">
        <a href="${safeBookingUrl}" style="display:inline-block;background-color:#0f7a55;color:#ffffff;padding:14px 34px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;">
          Book the workflow audit call
        </a>
      </div>
      <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0;">
        This is a directional diagnostic, not a promise. If it looks right, the next call should focus on ${escapeHtml(insights.primaryAngle)} and the current rules/process it needs to replace.
      </p>
      <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:10px 0 0 0;">
        Useful prep for that call: ${safePrep}
      </p>
    </div>
  </div>
`,
        attachments: [
          {
            filename: `${safeFileBase || "pm_workflow_audit"}_pm_workflow_audit_report.pdf`,
            content: pdfBuffer,
          },
        ],
      });

    let result = await sendReportEmail(fromEmail);
    if (result.error && fromEmail !== fallbackFromEmail) {
      result = await sendReportEmail(fallbackFromEmail);
    }
    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error("Error generating/sending PM audit PDF:", error);
    throw error;
  }
}

export async function sendOwnerNotification(data: AuditLeadData, crmSync?: CrmSyncResult) {
  try {
    const insights = buildAuditInsights(data);
    const { client: resend, fromEmail, fallbackFromEmail, ownerNotificationEmail } = getResendClient();
    const safeName = escapeHtml(data.name);
    const safeCompany = escapeHtml(data.company);
    const safeEmail = escapeHtml(data.email.trim());
    const safeSource = escapeHtml(data.source || "direct");
    const safePainPoints = escapeHtml(insights.topPainPoints.join(", ") || "No explicit pains selected");
    const safeCrmStatus = escapeHtml(
      crmSync?.status === "created" || crmSync?.status === "updated"
        ? `${crmSync.status} prospect${crmSync.prospectId ? ` #${crmSync.prospectId}` : ""}`
        : crmSync?.reason || crmSync?.status || "not attempted",
    );

    const sendNotification = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to: ownerNotificationEmail,
        subject: sanitizeSubject(`New PM audit lead - ${data.company}`),
        html: `
<h2>New Website Audit Lead</h2>
<p><strong>Priority:</strong> ${escapeHtml(insights.followUpPriority)}</p>
<p><strong>CRM Sync:</strong> ${safeCrmStatus}</p>

<h3>Contact</h3>
<ul>
  <li><strong>Name:</strong> ${safeName}</li>
  <li><strong>Company:</strong> ${safeCompany}</li>
  <li><strong>Email:</strong> ${safeEmail}</li>
  <li><strong>Source:</strong> ${safeSource}</li>
</ul>

<h3>Audit Snapshot</h3>
<ul>
  <li><strong>Units / Team:</strong> ${data.units} / ${data.teamSize}</li>
  <li><strong>PM software:</strong> ${escapeHtml(data.pmSoftware)}</li>
  <li><strong>Response Time:</strong> ${escapeHtml(data.responseTime)}</li>
  <li><strong>Maintenance flow:</strong> ${escapeHtml(data.maintenanceFlow)}</li>
  <li><strong>Owner reporting:</strong> ${escapeHtml(data.ownerReporting)}</li>
  <li><strong>Pain Points:</strong> ${safePainPoints}</li>
  <li><strong>Estimated weekly busywork:</strong> ${insights.estimatedWeeklyBusyworkHours} hours</li>
  <li><strong>Monthly admin equivalent:</strong> $${insights.monthlyAdminEquivalent.toLocaleString()}</li>
  <li><strong>First build:</strong> ${escapeHtml(insights.primaryRecommendation.title)}</li>
  <li><strong>Primary angle:</strong> ${escapeHtml(insights.primaryAngle)}</li>
</ul>

<h3>Next Action</h3>
<p>${escapeHtml(insights.followUpReason)}</p>
`,
      });

    let result = await sendNotification(fromEmail);
    if (result.error && fromEmail !== fallbackFromEmail) {
      result = await sendNotification(fallbackFromEmail);
    }
    if (result.error) {
      throw new Error(result.error.message);
    }
    return { success: true };
  } catch (error) {
    console.error("Error sending owner notification:", error);
    return { success: false };
  }
}
