import React from "react";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { buildFollowUp, type AuditInsights, type AuditLeadData } from "../shared/auditEngine.js";
import { buildPDFDocument } from "../shared/auditPdf.js";
import type { CrmSyncResult } from "./crmSync";
import { issueReportToken } from "./reportToken";

const SITE_URL = process.env.SITE_URL || "https://veyragroup.ai";
export function bookingUrlFor(data?: AuditLeadData) { const base = process.env.BOOKING_URL || `${SITE_URL}/book`; return data ? `${base}?${new URLSearchParams({ name: data.name, email: data.email })}` : base; }
export function reportUrlFor(data: AuditLeadData) { return `${SITE_URL}/report?d=${encodeURIComponent(issueReportToken(data))}`; }
const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const sanitizeSubject = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return { client: new Resend(apiKey), fromEmail: process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>", fallbackFromEmail: "Veyra Group <onboarding@resend.dev>", ownerNotificationEmail: process.env.OWNER_NOTIFICATION_EMAIL || "contact@veyragroup.ai" };
}

export async function generateAndEmailPDF(data: AuditLeadData, insights: AuditInsights) {
  const bookingUrl = bookingUrlFor(data); const reportUrl = reportUrlFor(data); const pdfBuffer = await renderToBuffer(buildPDFDocument(data, insights, bookingUrl));
  const { client: resend, fromEmail, fallbackFromEmail } = getResendClient();
  const safeName = escapeHtml(data.name); const safeCompany = escapeHtml(data.company); const safeBookingUrl = escapeHtml(bookingUrl); const safeReportUrl = escapeHtml(reportUrl); const safeFocusTitle = escapeHtml(insights.likelyFocus.title); const safeFocusDescription = escapeHtml(insights.likelyFocus.description);
  const safeFileBase = data.company.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  const text = [`${data.name},`, "", `Your preliminary PMS Operations Snapshot for ${data.company} is ready.`, `View your Snapshot: ${reportUrl}`, "", `Likely discussion area: ${insights.likelyFocus.title}.`, "This free Snapshot is preliminary and based on self-reported inputs. It does not estimate savings or recommend a build.", "", insights.likelyFocus.description, "", `Book a 15-minute Fit Call: ${bookingUrl}`, "Prefer to talk now? Call (220) 244-4213."].join("\n");
  const sendReportEmail = (sender: string) => resend.emails.send({ from: sender, to: data.email, subject: sanitizeSubject(`${data.company}: your PMS Operations Snapshot is ready`), text, html: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background-color:#0a0a0a;"><div style="padding:28px 32px 20px;border-bottom:1px solid #1a1a1a;"><span style="font-size:16px;font-weight:800;color:#f3f6f4;">Veyra Group</span></div><div style="padding:32px;"><p style="font-size:16px;font-weight:600;color:#ffffff;">${safeName},</p><p style="font-size:15px;color:#9ca3af;line-height:1.7;">Your preliminary PMS Operations Snapshot for <strong style="color:#ffffff;">${safeCompany}</strong> is ready. <a href="${safeReportUrl}" style="color:#5aa98a;">View your Snapshot</a>. A PDF copy is attached.</p><div style="background:#121212;border:1px solid #1a1a1a;border-radius:14px;padding:18px;"><div style="font-size:11px;color:#5aa98a;text-transform:uppercase;letter-spacing:1.4px;">Likely discussion area</div><p style="font-size:15px;color:#ffffff;"><strong>${safeFocusTitle}</strong></p><p style="font-size:14px;color:#9ca3af;line-height:1.7;">This free Snapshot is preliminary and based on self-reported inputs. It does not estimate savings or recommend a build.</p></div><p style="font-size:15px;color:#9ca3af;line-height:1.7;">${safeFocusDescription}</p><div style="text-align:center;margin:24px 0;"><a href="${safeBookingUrl}" style="display:inline-block;background-color:#0f7a55;color:#ffffff;padding:14px 34px;text-decoration:none;border-radius:999px;font-weight:700;">Book a 15-minute Fit Call</a></div></div></div>`, attachments: [{ filename: `${safeFileBase || "pms_operations"}_pms_operations_snapshot.pdf`, content: pdfBuffer }] });
  let result = await sendReportEmail(fromEmail); if (result.error && fromEmail !== fallbackFromEmail) result = await sendReportEmail(fallbackFromEmail); if (result.error) throw new Error(result.error.message); return { success: true, messageId: result.data?.id };
}

export async function sendOwnerNotification(data: AuditLeadData, insights: AuditInsights, extras: { crmSync?: CrmSyncResult; reportEmailStatus: string }) {
  try {
    const followUp = buildFollowUp(data, insights); const { client: resend, fromEmail, fallbackFromEmail, ownerNotificationEmail } = getResendClient();
    const crmStatus = extras.crmSync?.status || "not attempted"; const attribution = [data.source && `source: ${data.source}`, data.utmSource && `utm_source: ${data.utmSource}`, data.utmMedium && `utm_medium: ${data.utmMedium}`, data.utmCampaign && `utm_campaign: ${data.utmCampaign}`, data.referrer && `referrer: ${data.referrer}`].filter(Boolean).join(" | ") || "direct / unknown";
    const html = `<h2>New Website PMS Snapshot Lead</h2><p><strong>Priority:</strong> ${escapeHtml(followUp.priority)}</p><p><strong>CRM sync:</strong> ${escapeHtml(crmStatus)}</p><p><strong>Snapshot email:</strong> ${escapeHtml(extras.reportEmailStatus)}</p><h3>Contact</h3><ul><li><strong>Name:</strong> ${escapeHtml(data.name)}</li><li><strong>Company:</strong> ${escapeHtml(data.company)}</li><li><strong>Email:</strong> ${escapeHtml(data.email)}</li></ul><h3>Snapshot</h3><ul><li><strong>Units / team:</strong> ${data.units} / ${data.teamSize}</li><li><strong>Primary system:</strong> ${escapeHtml(data.pmSoftware)}</li><li><strong>Likely discussion area:</strong> ${escapeHtml(insights.likelyFocus.title)}</li><li><strong>Snapshot:</strong> <a href="${escapeHtml(reportUrlFor(data))}">open report</a></li></ul><h3>Attribution</h3><p>${escapeHtml(attribution)}</p><h3>Next action</h3><p>${escapeHtml(followUp.reason)}</p>`;
    const send = (sender: string) => resend.emails.send({ from: sender, to: ownerNotificationEmail, subject: sanitizeSubject(`[${followUp.priority}] New PMS Snapshot lead - ${data.company}`), html }); let result = await send(fromEmail); if (result.error && fromEmail !== fallbackFromEmail) result = await send(fallbackFromEmail); if (result.error) throw new Error(result.error.message); return { success: true };
  } catch (error) { console.error("Error sending owner notification:", error); return { success: false }; }
}
