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
      "Veyra Group <contact@contact.veyra.group>",
    calendlyUrl:
      process.env.CALENDLY_URL || "https://calendly.com/veyragroup/15min",
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
    const { client: resend, fromEmail, calendlyUrl } = getResendClient();

    // Calculate metrics for email
    const weeklyHours = Math.round(data.teamSize * data.hoursPerPerson);
    const monthlyWaste = Math.round(weeklyHours * 4 * data.hourlyValue);
    const annualWaste = Math.round(monthlyWaste * 12);
    const displayName = data.name?.trim() || data.email;
    const safeFileBase = (displayName || "calculator")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_+|_+$/g, "");

    // Send email with PDF attachment
    const result = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: `Your Time Waste Report - $${annualWaste.toLocaleString()}/year`,
      html: `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <p style="font-size: 18px; color: #0a0a0f; margin: 0 0 30px 0;">
      ${displayName},
    </p>
    
    <p style="font-size: 16px; color: #0a0a0f; line-height: 1.6; margin: 0 0 30px 0;">
      <strong style="color: #ef4444;">$${annualWaste.toLocaleString()} wasted this year</strong> on work your team shouldn't be doing.
    </p>
    
    <p style="font-size: 16px; color: #0a0a0f; line-height: 1.6; margin: 0 0 10px 0;">
      Here's what happens next:
    </p>
    
    <p style="font-size: 16px; color: #0a0a0f; line-height: 1.6; margin: 0 0 30px 0;">
      You keep paying. The work stays the same. Your competitors figure it out first.
    </p>
    
    <p style="font-size: 16px; color: #0a0a0f; line-height: 1.6; margin: 0 0 30px 0;">
      <strong>Or</strong> - you let us find what's wasting the time. Takes 15 minutes. We will show you the exact fixes.
    </p>
    
    <p style="font-size: 16px; color: #0a0a0f; line-height: 1.6; margin: 0 0 30px 0;">
      Your breakdown is attached.
    </p>
    
    <p style="margin: 0 0 40px 0;">
      <a href="${calendlyUrl}" 
         style="display: inline-block; background: #3b82f6; color: #ffffff; 
                padding: 14px 32px; text-decoration: none; border-radius: 6px; 
                font-weight: 600; font-size: 15px;">
        Book here →
      </a>
    </p>
    
    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 40px;">
      <p style="font-size: 14px; color: #6b7280; margin: 0;">
        — Veyra Group
      </p>
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
    const { client: resend, fromEmail, ownerNotificationEmail } =
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

    const result = await resend.emails.send({
      from: fromEmail,
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

    if (result.error) {
      throw new Error(result.error.message);
    }
    
    console.log('Owner notification email sent');
    return { success: true };
  } catch (error) {
    console.error('Error sending owner notification:', error);
  }
}
