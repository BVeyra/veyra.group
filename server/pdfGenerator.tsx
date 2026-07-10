import React from "react";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import {
  buildFollowUp,
  encodeReportToken,
  type AuditInsights,
  type AuditLeadData,
} from "../shared/auditEngine.js";
import { buildPDFDocument } from "../shared/auditPdf.js";
import type { CrmSyncResult } from "./crmSync";

const SITE_URL = process.env.SITE_URL || "https://veyragroup.ai";

export function bookingUrlFor(data?: AuditLeadData) {
  const base = process.env.BOOKING_URL || `${SITE_URL}/book`;
  if (!data) return base;
  const params = new URLSearchParams({ name: data.name, email: data.email });
  return `${base}?${params.toString()}`;
}

export function reportUrlFor(data: AuditLeadData) {
  return `${SITE_URL}/report?d=${encodeReportToken(data)}`;
}

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
    ownerNotificationEmail: process.env.OWNER_NOTIFICATION_EMAIL || "contact@veyragroup.ai",
  };
}

export async function generateAndEmailPDF(data: AuditLeadData, insights: AuditInsights) {
  const bookingUrl = bookingUrlFor(data);
  const reportUrl = reportUrlFor(data);
  const pdfBuffer = await renderToBuffer(buildPDFDocument(data, insights, bookingUrl));
  const { client: resend, fromEmail, fallbackFromEmail } = getResendClient();
  const safeName = escapeHtml(data.name);
  const safeCompany = escapeHtml(data.company);
  const safeBookingUrl = escapeHtml(bookingUrl);
  const safeReportUrl = escapeHtml(reportUrl);
  const safeRecommendationTitle = escapeHtml(insights.primaryRecommendation.title);
  const safeRecommendationDescription = escapeHtml(insights.primaryRecommendation.description);
  const safeFitNote = escapeHtml(insights.primaryRecommendation.fitNote);
  const safeFileBase = data.company
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

  const text = [
    `${data.name},`,
    ``,
    `Your PM Operations Audit for ${data.company} is ready.`,
    `View your full report: ${reportUrl}`,
    ``,
    `What jumped out: ${insights.primaryRecommendation.title} is the right first activation.`,
    `~${insights.estimatedWeeklyBusyworkHours} hours of repeatable work per week, roughly $${insights.monthlyAdminEquivalent.toLocaleString()}/mo of part-time admin equivalent.`,
    `The first activation could reasonably give back ${insights.estimatedWeeklyTimeSaved} hours/week.`,
    ``,
    insights.primaryRecommendation.description,
    ``,
    `Book the operations audit call: ${bookingUrl}`,
    `Prefer to talk now? Call (220) 244-4213.`,
  ].join("\n");

  const sendReportEmail = async (sender: string) =>
    resend.emails.send({
      from: sender,
      to: data.email,
      subject: sanitizeSubject(`${data.company}: your PM Operations Audit is ready`),
      text,
      html: `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background-color:#0a0a0a;">
    <div style="padding:28px 32px 20px;border-bottom:1px solid #1a1a1a;">
      <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;">
        <span style="color:#f3f6f4;">Veyra</span><span style="color:#8b938f;font-weight:500;margin-left:6px;">Group</span>
      </span>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;font-weight:600;color:#ffffff;margin:0 0 20px 0;">${safeName},</p>
      <p style="font-size:15px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        Your PM Operations Audit for <strong style="color:#ffffff;">${safeCompany}</strong> is ready.
        <a href="${safeReportUrl}" style="color:#5aa98a;text-decoration:underline;">View your full report</a> &mdash; a PDF copy is attached.
      </p>
      <div style="background:#121212;border:1px solid #1a1a1a;border-radius:14px;padding:18px;margin:0 0 20px 0;">
        <div style="font-size:11px;color:#5aa98a;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:8px;">What jumped out</div>
        <p style="font-size:15px;color:#ffffff;line-height:1.7;margin:0 0 8px 0;"><strong>${safeRecommendationTitle}</strong> is the right first activation.</p>
        <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0 0 8px 0;">${insights.estimatedWeeklyBusyworkHours} hours of repeatable work per week. Roughly $${insights.monthlyAdminEquivalent.toLocaleString()}/mo of part-time admin equivalent.</p>
        <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0;">The first activation could reasonably give back <strong style="color:#ffffff;">${insights.estimatedWeeklyTimeSaved} hours/week</strong> if the current workflow looks like your inputs.</p>
      </div>
      <p style="font-size:15px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        ${safeRecommendationDescription}
      </p>
      <p style="font-size:14px;color:#9ca3af;line-height:1.7;margin:0 0 20px 0;">
        ${safeFitNote}
      </p>
      <div style="text-align:center;margin:0 0 24px 0;">
        <a href="${safeBookingUrl}" style="display:inline-block;background-color:#0f7a55;color:#ffffff;padding:14px 34px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;">
          Book the operations audit call
        </a>
      </div>
      <p style="text-align:center;font-size:14px;color:#9ca3af;line-height:1.6;margin:0 0 24px 0;">
        Prefer to talk now? Call <a href="tel:+12202444213" style="color:#5aa98a;text-decoration:none;font-weight:600;">(220) 244-4213</a>
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
}

export async function sendOwnerNotification(
  data: AuditLeadData,
  insights: AuditInsights,
  extras: { crmSync?: CrmSyncResult; reportEmailStatus: string },
) {
  try {
    const followUp = buildFollowUp(data, insights);
    const { client: resend, fromEmail, fallbackFromEmail, ownerNotificationEmail } = getResendClient();
    const crmSync = extras.crmSync;
    const safeCrmStatus = escapeHtml(
      crmSync?.status === "created" || crmSync?.status === "updated"
        ? `${crmSync.status} prospect${crmSync.prospectId ? ` #${crmSync.prospectId}` : ""}`
        : crmSync?.reason || crmSync?.status || "not attempted",
    );
    const attribution = [
      data.source && `source: ${data.source}`,
      data.utmSource && `utm_source: ${data.utmSource}`,
      data.utmMedium && `utm_medium: ${data.utmMedium}`,
      data.utmCampaign && `utm_campaign: ${data.utmCampaign}`,
      data.referrer && `referrer: ${data.referrer}`,
    ].filter(Boolean).join(" · ") || "direct / unknown";

    const sendNotification = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to: ownerNotificationEmail,
        subject: sanitizeSubject(`[${followUp.priority}] New PM audit lead - ${data.company}`),
        html: `
<h2>New Website Audit Lead</h2>
<p><strong>Priority:</strong> ${escapeHtml(followUp.priority)}</p>
<p><strong>CRM Sync:</strong> ${safeCrmStatus}</p>
<p><strong>Report email:</strong> ${escapeHtml(extras.reportEmailStatus)}</p>

<h3>Contact</h3>
<ul>
  <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
  <li><strong>Company:</strong> ${escapeHtml(data.company)}</li>
  <li><strong>Email:</strong> ${escapeHtml(data.email.trim())}</li>
</ul>

<h3>Audit Snapshot</h3>
<ul>
  <li><strong>Units / Team:</strong> ${data.units} / ${data.teamSize}</li>
  <li><strong>PM software:</strong> ${escapeHtml(data.pmSoftware)}</li>
  <li><strong>Response Time:</strong> ${escapeHtml(data.responseTime)}</li>
  <li><strong>Maintenance flow:</strong> ${escapeHtml(data.maintenanceFlow)}</li>
  <li><strong>After hours:</strong> ${escapeHtml(data.afterHours)}</li>
  <li><strong>Owner reporting:</strong> ${escapeHtml(data.ownerReporting)}</li>
  <li><strong>Rent collection:</strong> ${escapeHtml(data.rentCollection)}</li>
  <li><strong>Pain Points:</strong> ${escapeHtml(insights.topPainPoints.join(", ") || "No explicit pains selected")}</li>
  <li><strong>Estimated weekly busywork:</strong> ${insights.estimatedWeeklyBusyworkHours} hours</li>
  <li><strong>Monthly admin equivalent:</strong> $${insights.monthlyAdminEquivalent.toLocaleString()}</li>
  <li><strong>First activation:</strong> ${escapeHtml(insights.primaryRecommendation.title)}</li>
  <li><strong>Primary angle:</strong> ${escapeHtml(insights.primaryAngle)}</li>
  <li><strong>Report:</strong> <a href="${escapeHtml(reportUrlFor(data))}">web report</a></li>
</ul>

<h3>Attribution</h3>
<p>${escapeHtml(attribution)}</p>

<h3>Next Action</h3>
<p>${escapeHtml(followUp.reason)}</p>
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
