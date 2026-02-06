import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateAndEmailPDF, sendOwnerNotification } from "./pdfGenerator";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/generate-report - Generate and email PDF report
  app.post("/api/generate-report", async (req, res) => {
    try {
      const { name, email, licenses, hoursPerPerson, hourlyValue } = req.body;

      // Validate required fields
      if (!email || !licenses || hoursPerPerson === undefined || hourlyValue === undefined) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required fields" 
        });
      }

      const teamSize = Number(licenses);
      const hoursPerPersonNum = Number(hoursPerPerson);
      const hourlyValueNum = Number(hourlyValue);

      if (!Number.isFinite(teamSize) || !Number.isFinite(hoursPerPersonNum) || !Number.isFinite(hourlyValueNum)) {
        return res.status(400).json({
          success: false,
          error: "Invalid numeric fields",
        });
      }

      const weeklyHours = teamSize * hoursPerPersonNum;
      const monthlyWaste = Math.round(weeklyHours * 4 * hourlyValueNum);
      const annualWaste = Math.round(monthlyWaste * 12);

      // Generate and send PDF
      const result = await generateAndEmailPDF({
        name,
        email,
        teamSize,
        hoursPerPerson: hoursPerPersonNum,
        hourlyValue: hourlyValueNum,
      });

      try {
        // Send owner notification email
        await sendOwnerNotification({
          name,
          email,
          teamSize,
          hoursPerPerson: hoursPerPersonNum,
          hourlyValue: hourlyValueNum,
          weeklyHours,
          monthlyWaste,
          annualWaste,
        });
      } catch (notificationError) {
        console.error("Notification error:", notificationError);
      }

      return res.json({ 
        success: true, 
        messageId: result.messageId 
      });
    } catch (error) {
      console.error("Error generating report:", error);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to generate and send report" 
      });
    }
  });

  return httpServer;
}
