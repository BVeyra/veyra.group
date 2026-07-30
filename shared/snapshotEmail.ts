// The Snapshot delivery email. One source, because it is sent from two places:
// the Vercel function (api/generate-report.ts) and the Express route
// (server/pdfGenerator.tsx). They previously held separate copies that had
// already drifted, so which template a prospect received depended on which
// path served them.
//
// The palette and section order mirror the attached PDF (shared/auditPdf.ts):
// ink #111827, text #374151, muted #6B7280, border #E5E7EB, brand #0F7A55. The
// recipient opens both within seconds of each other, so they have to read as
// one document.
//
// Deliberately light. A dark email is fragile in a way a dark web page is not:
// a client that drops a background colour but keeps the text colour renders
// white on white, and Gmail and Apple Mail both re-tint dark templates on their
// own. The color-scheme hints tell them this is already correct.

export type SnapshotEmailFields = {
  /** All values must be HTML-escaped by the caller. */
  safeName: string;
  safeCompany: string;
  safeReportUrl: string;
  safeBookingUrl: string;
  safeFocusTitle: string;
  safeFocusDescription: string;
  /** Controls the "A PDF copy is attached" clause; false when rendering failed. */
  hasPdfAttachment: boolean;
};

export function buildSnapshotEmailHtml(f: SnapshotEmailFields): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background-color:#F3F4F6;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;">
    <div style="padding:28px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:15px;font-weight:700;color:#111827;letter-spacing:-0.2px;">Veyra Group</td>
          <td align="right" style="font-size:10px;color:#6B7280;text-transform:uppercase;letter-spacing:1.2px;">PMS Operations Snapshot</td>
        </tr>
      </table>
      <div style="height:1px;background-color:#E5E7EB;margin-top:14px;"></div>
    </div>
    <div style="padding:26px 32px 32px;">
      <p style="font-size:16px;font-weight:600;color:#111827;margin:0 0 18px 0;">${f.safeName},</p>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 20px 0;">
        Your preliminary PMS Operations Snapshot for <strong style="color:#111827;">${f.safeCompany}</strong> is ready.
        <a href="${f.safeReportUrl}" style="color:#0F7A55;text-decoration:underline;">View your Snapshot</a>${f.hasPdfAttachment ? ". A PDF copy is attached" : ""}.
      </p>
      <div style="font-size:10px;color:#6B7280;text-transform:uppercase;letter-spacing:1.2px;margin:0 0 8px 0;">Likely discussion area</div>
      <div style="background-color:#ffffff;border:1px solid #E5E7EB;border-radius:10px;padding:18px;margin:0 0 20px 0;">
        <p style="font-size:15px;font-weight:700;color:#111827;line-height:1.6;margin:0 0 8px 0;">${f.safeFocusTitle}</p>
        <p style="font-size:14px;color:#6B7280;line-height:1.7;margin:0;">This free Snapshot is preliminary and based on self-reported inputs. It does not estimate savings or recommend a build.</p>
      </div>
      <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px 0;">${f.safeFocusDescription}</p>
      <div style="text-align:center;margin:0 0 22px 0;">
        <a href="${f.safeBookingUrl}" style="display:inline-block;background-color:#0F7A55;color:#ffffff;padding:14px 34px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;">Book a 15-minute Fit Call</a>
      </div>
      <p style="text-align:center;font-size:14px;color:#374151;line-height:1.6;margin:0;">
        Prefer to talk now? Call <a href="tel:+12202444213" style="color:#0F7A55;text-decoration:none;font-weight:600;">(220) 244-4213</a>
      </p>
    </div>
    <div style="padding:0 32px 28px;">
      <div style="height:1px;background-color:#E5E7EB;margin-bottom:14px;"></div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:11px;color:#6B7280;">veyragroup.ai | (220) 244-4213</td>
          <td align="right" style="font-size:11px;color:#6B7280;">Preliminary Snapshot | no savings or outcome estimate</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;
}
