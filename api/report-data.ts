import type { VercelRequest, VercelResponse } from "@vercel/node";
import { openReportToken } from "../server/reportToken.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const token = typeof req.query.d === "string" ? req.query.d : "";
  const data = token ? openReportToken(token) : null;
  if (!data) return res.status(404).json({ error: "Report link not recognized" });
  return res.status(200).json({ data });
}
