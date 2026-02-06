import React from "react";
import fs from "fs/promises";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFReport } from "../server/pdfTemplate";

async function main() {
  const data = {
    name: "Alex",
    email: "alex@company.com",
    teamSize: 5,
    hoursPerPerson: 8,
    hourlyValue: 35,
  };

  const buffer = await renderToBuffer(<PDFReport data={data} />);
  await fs.writeFile("sample-report.pdf", buffer);

  console.log("Wrote sample-report.pdf");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
