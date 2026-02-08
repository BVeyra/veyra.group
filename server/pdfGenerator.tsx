import React from "react";
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFReport } from "./pdfTemplate";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  return {
    client: new Resend(apiKey),
    fromEmail:
      process.env.RESEND_FROM_EMAIL ||
      "Veyra Group <contact@veyra.group>",
    fallbackFromEmail: "Veyra Group <onboarding@resend.dev>",
    bookingUrl:
      process.env.BOOKING_URL || "https://www.veyra.group/book",
    ownerNotificationEmail:
      process.env.OWNER_NOTIFICATION_EMAIL || "bruno@veyra.group",
  };
}

interface CalculatorData {
  name?: string;
  email: string;
  teamSize: number;
  hoursPerPerson: number;
  hourlyValue: number;
}

export async function generateAndEmailPDF(data: CalculatorData) {
  try {
    // Generate PDF
    const pdfBuffer = await renderToBuffer(<PDFReport data={data} />);

    // Get Resend client
    const { client: resend, fromEmail, fallbackFromEmail, bookingUrl } = getResendClient();

    // Calculate metrics for email
    const weeklyHours = Math.round(data.teamSize * data.hoursPerPerson);
    const monthlyWaste = Math.round(weeklyHours * 4 * data.hourlyValue);
    const annualWaste = Math.round(monthlyWaste * 12);
    const displayName = data.name?.trim() || data.email;
    const safeFileBase = (displayName || "calculator")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "");

    // Send email with PDF attachment
    const sendReportEmail = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to: data.email,
        subject: `You're spending $${annualWaste.toLocaleString()}/yr on work nobody should be doing`,
        html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0f0a;">

    <!-- Header -->
    <div style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #1e201e;">
      <span style="font-size: 16px; font-weight: 800; letter-spacing: -0.3px;">
        <span style="color: #ffffff;">VEYRA</span><span style="color: #059669; margin-left: 4px;">GROUP</span>
      </span>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">

      <p style="font-size: 17px; font-weight: 600; color: #ebebeb; margin: 0 0 24px 0;">
        ${displayName},
      </p>

      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 20px 0;">
        You just ran the numbers. Here's what they say:
      </p>

      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 4px 0;">
        → <strong style="color: #059669;">${weeklyHours} hours/week</strong> lost to manual work across your team
      </p>
      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 4px 0;">
        → <strong style="color: #059669;">$${monthlyWaste.toLocaleString()}/month</strong> spent on tasks a system should handle
      </p>
      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 20px 0;">
        → <strong style="color: #059669;">$${annualWaste.toLocaleString()}/year</strong> — gone, whether you see it on a line item or not
      </p>

      <!-- Stat highlight box -->
      <div style="background-color: #091f15; border: 1.5px solid #08533a; border-radius: 12px; padding: 20px; margin: 0 0 24px 0; text-align: center;">
        <div style="font-size: 11px; color: #059669; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">Annual cost of busywork</div>
        <div style="font-size: 32px; font-weight: 800; color: #059669;">$${annualWaste.toLocaleString()}</div>
      </div>

      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 20px 0;">
        Your full breakdown is attached — where the hours go, what they cost, and what it looks like when they're gone.
      </p>

      <p style="font-size: 15px; color: #b6b9b6; line-height: 1.7; margin: 0 0 28px 0;">
        Most of it comes from 2–3 workflows. Scheduling, follow-ups, data entry — the stuff that feels small until you see the bill. We can show you exactly which ones and what the fix costs in a 30-minute call.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 0 0 32px 0;">
        <a href="${bookingUrl}"
           style="display: inline-block; background-color: #059669; color: #0a0f0a;
                  padding: 14px 36px; text-decoration: none; border-radius: 8px;
                  font-weight: 700; font-size: 15px; letter-spacing: 0.3px;">
          Book a 30-min walkthrough →
        </a>
      </div>

      <!-- Divider -->
      <div style="border-top: 1px solid #1e201e; padding-top: 24px;">

        <!-- Signature block -->
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tr>
            <!-- VG Monogram -->
            <td style="vertical-align: top; padding-right: 14px;">
              <div style="width: 44px; height: 44px; background-color: #0a0f0a; border: 2px solid #059669; border-radius: 10px; text-align: center; line-height: 44px;">
                <span style="font-size: 16px; font-weight: 800; letter-spacing: -2px;">
                  <span style="color: #059669;">V</span><span style="color: #e8f0ec;">G</span>
                </span>
              </div>
            </td>
            <!-- Name + contact -->
            <td style="vertical-align: middle;">
              <div style="font-size: 14px; font-weight: 700; color: #ebebeb; margin-bottom: 2px;">Bruno Larizza</div>
              <div style="font-size: 12px; color: #848884;">
                Founder <span style="color: #059669; font-weight: 700; margin: 0 4px;">·</span> <span style="color: #059669;">Veyra Group</span>
              </div>
              <div style="font-size: 11px; color: #848884; margin-top: 4px;">
                <a href="https://www.veyra.group" style="color: #848884; text-decoration: none;">veyra.group</a>
                <span style="color: #545754; margin: 0 6px;">·</span>
                <a href="mailto:contact@veyra.group" style="color: #848884; text-decoration: none;">contact@veyra.group</a>
                <span style="color: #545754; margin: 0 6px;">·</span>
                <a href="tel:+13026002625" style="color: #848884; text-decoration: none;">(302) 600-2625</a>
              </div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  </div>
`,
        attachments: [
          {
            filename: `${safeFileBase || "calculator"}_Time_Waste_Report.pdf`,
            content: pdfBuffer,
          },
        ],
      });

    let result = await sendReportEmail(fromEmail);

    if (result.error && fromEmail !== fallbackFromEmail) {
      console.warn(
        `Primary sender ${fromEmail} failed: ${result.error.message}. Retrying with fallback sender.`,
      );
      result = await sendReportEmail(fallbackFromEmail);
    }

    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error generating/sending PDF:', error);
    throw error;
  }
}

interface LeadNotificationData {
  name?: string;
  email: string;
  teamSize: number;
  hoursPerPerson: number;
  hourlyValue: number;
  weeklyHours: number;
  monthlyWaste: number;
  annualWaste: number;
}

export async function sendOwnerNotification(data: LeadNotificationData) {
  try {
    const { client: resend, fromEmail, fallbackFromEmail, ownerNotificationEmail } =
      getResendClient();
    
    // Calculate lead score
    let leadScore: string;
    let nextAction: string;
    
    if (data.annualWaste >= 25000) {
      leadScore = '🔥 HOT';
      nextAction = `CALL TODAY - This is a $${Math.round(data.annualWaste / 1000)}K opportunity`;
    } else if (data.annualWaste >= 10000) {
      leadScore = '🟡 WARM';
      nextAction = 'Follow up within 24 hours';
    } else {
      leadScore = '🟢 COLD';
      nextAction = 'Send intro email';
    }

    const sendNotification = async (sender: string) =>
      resend.emails.send({
        from: sender,
        to: ownerNotificationEmail,
        subject: `🔥 New Calculator Lead - ${data.name || data.email}`,
        html: `
<h2>New Lead from Calculator</h2>

<p><strong>Lead Score: ${leadScore}</strong></p>

<h3>Contact Info:</h3>
<ul>
  <li><strong>Name:</strong> ${data.name || "Not provided"}</li>
  <li><strong>Email:</strong> ${data.email}</li>
</ul>

<h3>💰 Financials:</h3>
<ul>
  <li><strong>Team Size:</strong> ${data.teamSize}</li>
  <li><strong>Hours per Person (weekly):</strong> ${data.hoursPerPerson}</li>
  <li><strong>Weekly Hours:</strong> ${data.weeklyHours}</li>
  <li><strong>Hourly Value:</strong> $${data.hourlyValue.toLocaleString()}</li>
  <li><strong>Monthly Waste:</strong> $${data.monthlyWaste.toLocaleString()}</li>
  <li><strong>Annual Waste:</strong> $${data.annualWaste.toLocaleString()}</li>
</ul>

<h3>🎯 Next Action:</h3>
<p>${nextAction}</p>

<hr>
`,
      });

    let result = await sendNotification(fromEmail);
    if (result.error && fromEmail !== fallbackFromEmail) {
      console.warn(
        `Owner notification sender ${fromEmail} failed: ${result.error.message}. Retrying with fallback sender.`,
      );
      result = await sendNotification(fallbackFromEmail);
    }

    if (result.error) {
      throw new Error(result.error.message);
    }
    
    console.log('Owner notification email sent');
    return { success: true };
  } catch (error) {
    console.error('Error sending owner notification:', error);
  }
}
