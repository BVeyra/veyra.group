import React from "react";
import fs from "fs/promises";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFReport } from "../server/pdfTemplate";

async function main() {
  const data = {
    name: "Alex Mercer",
    company: "Mercer Residential",
    email: "alex@company.com",
    units: 82,
    teamSize: 2,
    pmSoftware: "AppFolio",
    responseTime: "Same day if someone is watching it",
    maintenanceFlow: "Texts, calls, and inboxes with manual vendor chase",
    ownerReporting: "Manual exports and reformatting every month",
    painPoints: ["Maintenance triage and vendor follow-up", "Owner approvals and owner reporting"],
  };

  const buffer = await renderToBuffer(<PDFReport data={data} />);
  await fs.writeFile("sample-report.pdf", buffer);

  console.log("Wrote sample-report.pdf");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
