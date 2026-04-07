import type { VercelRequest, VercelResponse } from "@vercel/node";
import React from "react";
import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";

// ─── Audit Types & Constants (inlined from server/auditReport.ts) ───

const PM_SOFTWARE_OPTIONS = [
  "AppFolio", "Buildium", "Rent Manager", "Yardi / Breeze",
  "Propertyware / another PM stack", "Spreadsheets / inboxes / not sure",
] as const;

const RESPONSE_TIME_OPTIONS = [
  "Under 30 minutes", "1-2 hours",
  "Same day if someone is watching it", "Next day is common",
] as const;

const MAINTENANCE_FLOW_OPTIONS = [
  "Texts, calls, and inboxes with manual vendor chase",
  "Portal or PM software, but routing and follow-up are still manual",
  "A coordinator handles it with SOPs, but it is still mostly manual",
  "Clear system with documented rules and fast follow-up",
] as const;

const OWNER_REPORTING_OPTIONS = [
  "Manual exports and reformatting every month",
  "Templates help, but the team still rebuilds the report",
  "PM software sends a base report and we add context manually",
  "Reporting is already consistent and low-touch",
] as const;

const PAIN_OPTIONS = [
  "Tenant questions and status updates",
  "Maintenance triage and vendor follow-up",
  "Owner approvals and owner reporting",
  "Leasing inquiry follow-up",
  "Renewals and notices",
  "After-hours messages land on me",
  "Everyone is context-switching all day",
  "All of the above",
] as const;

type PmSoftwareOption = (typeof PM_SOFTWARE_OPTIONS)[number];
type ResponseTimeOption = (typeof RESPONSE_TIME_OPTIONS)[number];
type MaintenanceFlowOption = (typeof MAINTENANCE_FLOW_OPTIONS)[number];
type OwnerReportingOption = (typeof OWNER_REPORTING_OPTIONS)[number];
type PainOption = (typeof PAIN_OPTIONS)[number];

type AuditLeadData = {
  name: string; company: string; email: string;
  units: number; teamSize: number;
  pmSoftware: PmSoftwareOption; responseTime: ResponseTimeOption;
  maintenanceFlow: MaintenanceFlowOption; ownerReporting: OwnerReportingOption;
  painPoints: PainOption[];
  source?: string; entry?: string; referrer?: string; pageUrl?: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string;
};

type Severity = "green" | "yellow" | "orange" | "red";
type BuildAngle = "maintenance coordination" | "owner reporting" | "response coverage" | "tenant communication" | "lease renewals";
type ScoreCard = { label: string; message: string; severity: Severity };
type RecommendationBlueprint = {
  title: string; description: string; whyThisFirst: string;
  fitNote: string; replaces: string[]; first30Days: string[]; callPrep: string[];
};

const PART_TIME_ADMIN_WEEKLY_HOURS = 20;
const PART_TIME_ADMIN_MONTHLY_COST = 2500;

const RESPONSE_SCORES: ScoreCard[] = [
  { label: "Tight coverage", message: "Message handling looks disciplined. The risk is keeping that standard once the portfolio grows or the day gets chaotic.", severity: "green" },
  { label: "Mostly controlled", message: "The team is still getting back to people reasonably fast, but the process depends on someone having space that day.", severity: "yellow" },
  { label: "Reactive", message: "Same-day follow-up usually means good leads and frustrated residents are waiting on human bandwidth.", severity: "orange" },
  { label: "Backlogged", message: "Next-day response is not a staffing mystery. It usually means repeated work is crowding out the important work.", severity: "red" },
];

const MAINTENANCE_SCORES: ScoreCard[] = [
  { label: "Manual scramble", message: "Requests are probably moving through the team by whoever saw the message first. That creates missed urgency, vendor chase, and owner-rule drift.", severity: "red" },
  { label: "Tooling without control", message: "The portal is helping with intake, but the real work still happens in follow-up loops and side messages.", severity: "orange" },
  { label: "Coordinator-dependent", message: "This is workable until the coordinator is buried or out. The process still lives too much in one person's head.", severity: "yellow" },
  { label: "Documented", message: "Maintenance looks fairly systemized. The next gains are in faster escalation and less human babysitting.", severity: "green" },
];

const OWNER_REPORTING_SCORES: ScoreCard[] = [
  { label: "Rebuilt by hand", message: "Month-end is probably consuming skilled time that should not be spent reformatting exports and rewriting the same explanations.", severity: "red" },
  { label: "Template-assisted", message: "Templates reduce some friction, but the team still has to assemble and personalize the report each cycle.", severity: "orange" },
  { label: "Base automation only", message: "The base report exists, but human work is still needed to turn it into something owners actually want to read.", severity: "yellow" },
  { label: "Low-touch", message: "Reporting does not look like the main operational drag right now.", severity: "green" },
];

const ROADMAPS: Record<BuildAngle, RecommendationBlueprint> = {
  "maintenance coordination": {
    title: "Maintenance Coordination Command Center",
    description: "Turn intake, triage, vendor follow-up, and owner approvals into one tracked workflow instead of a chain of side messages.",
    whyThisFirst: "Maintenance is where delays compound fastest. It is usually the first place a PM team feels chaos, rework, and after-hours pressure.",
    fitNote: "This is the cleanest fit with Veyra's default 14-day build and the strongest wedge when requests are bouncing between tenants, vendors, and owners.",
    replaces: ["Inbox triage done in message order instead of urgency order", "Vendor chase living in text threads and memory", "Owner approval rules that change by property and are not written down"],
    first30Days: ["Requests are acknowledged consistently and urgent issues surface faster", "Vendor follow-up and tenant updates stop depending on whoever remembers", "Bruno can help define which requests can move automatically and which require review"],
    callPrep: ["Current vendor list and who handles dispatch today", "Owner approval thresholds or exceptions by property", "Two or three recent work orders that dragged longer than they should have"],
  },
  "owner reporting": {
    title: "Owner Reporting Pack",
    description: "Pull the base numbers, layer the recurring narrative once, and ship consistent owner updates without rebuilding them every month.",
    whyThisFirst: "Owner reporting steals focused time in concentrated bursts. If month-end repeatedly derails the team, fixing it creates immediate breathing room.",
    fitNote: "Good fit when end-of-month reporting is the real bottleneck and the team is stuck reformatting the same exports over and over.",
    replaces: ["Manual export-cleanup-format cycles at the end of every month", "Owner-specific report variations living in ad hoc notes", "Last-minute context gathering before a report can be sent"],
    first30Days: ["Month-end reporting becomes a process instead of a fire drill", "Owners get a more consistent update without more staff time", "The team keeps the financial source of truth and automates the repetitive assembly work around it"],
    callPrep: ["A recent owner report or month-end pack", "The PM software or accounting export you start from", "Examples of what different owners ask for beyond the base report"],
  },
  "response coverage": {
    title: "Response Coverage Layer",
    description: "Create a first-response path for leasing and resident messages so nothing waits for whoever happens to notice it first.",
    whyThisFirst: "Slow response affects occupancy, service quality, and team stress at the same time. It is one of the fastest ways to feel operational relief.",
    fitNote: "Good fit when slow follow-up is hurting occupancy, resident trust, or after-hours sanity and the team needs a controlled first-response system.",
    replaces: ["Personal phones or shared inboxes acting as the system of record", "Leasing or resident messages sitting until someone has time", "Repeat status questions that keep reopening the same thread"],
    first30Days: ["New inquiries get a faster and more consistent first touch", "Routine status updates stop interrupting the whole day", "Escalations become clearer because low-risk messages are handled earlier"],
    callPrep: ["The channels messages arrive through today", "Examples of routine messages the team types repeatedly", "Any message categories that must always be reviewed by a human"],
  },
  "tenant communication": {
    title: "Tenant Communication Workflow",
    description: "Handle repeat resident questions and status updates without making the team rewrite the same message ten times a week.",
    whyThisFirst: "When the inbox is the bottleneck, every other workflow gets interrupted. Fixing the communication layer gives the team back focus.",
    fitNote: "Best when routine resident messaging is constantly pulling operators out of deeper work and the real issue is communication load, not a missing tool.",
    replaces: ["Copy-paste replies and one-off status updates", "Routine questions routed to the same overloaded people", "Communication consistency that depends on the individual replying"],
    first30Days: ["Routine resident questions are answered faster and more consistently", "The team sees fewer interruptions from low-complexity messages", "Message tone and escalation rules become explicit instead of tribal knowledge"],
    callPrep: ["Examples of routine resident messages the team handles every week", "Channels tenants use most often", "Any tone or legal boundaries Veyra should stay inside"],
  },
  "lease renewals": {
    title: "Renewal and Notice Tracker",
    description: "Move renewals, notices, and recurring lease deadlines out of memory and into a tracked workflow with clear triggers.",
    whyThisFirst: "Renewal work feels small until deadlines slip. Once that happens, the team is forced into reactive cleanup.",
    fitNote: "Useful when renewals and notices are living in spreadsheets, calendar reminders, or someone's head.",
    replaces: ["Spreadsheet- or memory-based renewal tracking", "Late or inconsistent renewal outreach", "Notice deadlines that are easy to miss in a busy week"],
    first30Days: ["Upcoming renewals become visible earlier", "The team has a standard path for notices and follow-up", "Lease deadlines stop disappearing under day-to-day message traffic"],
    callPrep: ["Current renewal timeline and notice requirements", "A sample renewal spreadsheet or calendar process", "Examples of deadlines that slipped recently"],
  },
};

// ─── Audit Insights Engine ───

function uniquePainPoints(painPoints: PainOption[]) {
  const expanded = painPoints.includes("All of the above")
    ? (PAIN_OPTIONS.filter((i) => i !== "All of the above") as unknown as PainOption[])
    : painPoints.filter((i) => i !== "All of the above");
  return Array.from(new Set(expanded));
}

function rankCapacity(ratio: number) {
  if (ratio >= 100) return { capacityLabel: "Burnout risk", capacityNote: "At this ratio, the problem is usually not effort. It is that repeated work and handoffs are eating the day before higher-value work happens." };
  if (ratio >= 75) return { capacityLabel: "Stretched thin", capacityNote: "You are in the zone where small workflow problems start compounding into missed follow-up, after-hours stress, and hidden admin drag." };
  if (ratio >= 50) return { capacityLabel: "Manageable but fragile", capacityNote: "The portfolio is still workable, but repeated work can tip the team from calm into constant catch-up very quickly." };
  return { capacityLabel: "Room to tighten the system", capacityNote: "The headcount ratio is not the main alarm yet. The opportunity is locking in cleaner workflows before growth exposes the gaps." };
}

function buildStackNote(pmSoftware: PmSoftwareOption) {
  if (pmSoftware === "Spreadsheets / inboxes / not sure") return { stackLabel: "Loose stack", stackNote: "There is no clean system of record yet. The first build should reduce operational chaos, not add another layer on top of it." };
  if (pmSoftware === "Propertyware / another PM stack") return { stackLabel: "Likely workable", stackNote: "Veyra usually does best when the PM software stays in place and the repeated work around it gets automated." };
  return { stackLabel: "Known PM stack", stackNote: "Your software is a workable starting point. The win is not replacing it. The win is removing the manual work it still leaves on your team." };
}

function buildAngleScores(data: AuditLeadData, painPoints: string[], ratio: number) {
  const scores: Record<BuildAngle, number> = { "maintenance coordination": 0, "owner reporting": 0, "response coverage": 0, "tenant communication": 0, "lease renewals": 0 };
  const responseIndex = Math.max(0, RESPONSE_TIME_OPTIONS.indexOf(data.responseTime));
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const maintenancePressure = MAINTENANCE_FLOW_OPTIONS.length - 1 - maintenanceIndex;
  const reportingPressure = OWNER_REPORTING_OPTIONS.length - 1 - reportingIndex;

  scores["response coverage"] += responseIndex * 3;
  scores["tenant communication"] += responseIndex;
  scores["maintenance coordination"] += maintenancePressure * 3;
  scores["owner reporting"] += reportingPressure * 3;

  if (ratio >= 75) { scores["maintenance coordination"] += 2; scores["response coverage"] += 2; scores["tenant communication"] += 1; }
  else if (ratio >= 50) { scores["maintenance coordination"] += 1; scores["response coverage"] += 1; }
  if (data.pmSoftware === "Spreadsheets / inboxes / not sure") { scores["maintenance coordination"] += 1; scores["owner reporting"] += 1; scores["response coverage"] += 1; }

  for (const pain of painPoints) {
    if (pain === "Tenant questions and status updates") { scores["tenant communication"] += 4; scores["response coverage"] += 2; }
    else if (pain === "Maintenance triage and vendor follow-up") { scores["maintenance coordination"] += 5; scores["response coverage"] += 1; }
    else if (pain === "Owner approvals and owner reporting") { scores["owner reporting"] += 5; scores["maintenance coordination"] += 1; }
    else if (pain === "Leasing inquiry follow-up") { scores["response coverage"] += 5; }
    else if (pain === "Renewals and notices") { scores["lease renewals"] += 5; }
    else if (pain === "After-hours messages land on me") { scores["response coverage"] += 4; scores["tenant communication"] += 1; scores["maintenance coordination"] += 1; }
    else if (pain === "Everyone is context-switching all day") { scores["maintenance coordination"] += 2; scores["owner reporting"] += 2; scores["response coverage"] += 2; scores["tenant communication"] += 2; scores["lease renewals"] += 1; }
  }
  return scores;
}

function buildAuditInsights(data: AuditLeadData) {
  const ratio = Math.max(1, Math.round(data.units / data.teamSize));
  const responseIndex = Math.max(0, RESPONSE_TIME_OPTIONS.indexOf(data.responseTime));
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const maintenancePressure = MAINTENANCE_FLOW_OPTIONS.length - 1 - maintenanceIndex;
  const reportingPressure = OWNER_REPORTING_OPTIONS.length - 1 - reportingIndex;
  const topPainPoints = uniquePainPoints(data.painPoints);
  const scoreRanking = buildAngleScores(data, topPainPoints as string[], ratio);
  const rankedAngles = (Object.keys(scoreRanking) as BuildAngle[]).sort((a, b) => {
    if (scoreRanking[b] !== scoreRanking[a]) return scoreRanking[b] - scoreRanking[a];
    const order: BuildAngle[] = ["maintenance coordination", "owner reporting", "response coverage", "tenant communication", "lease renewals"];
    return order.indexOf(a) - order.indexOf(b);
  });

  const primaryAngle = rankedAngles[0] || "maintenance coordination";
  const primaryRecommendation = ROADMAPS[primaryAngle];
  const roadmap = rankedAngles.slice(0, 3).map((angle) => ({ title: ROADMAPS[angle].title, description: ROADMAPS[angle].description }));

  const ratioBase = ratio >= 100 ? 10 : ratio >= 75 ? 8 : ratio >= 50 ? 6 : 4;
  const responseLoad = responseIndex * 1.5;
  const maintenanceLoad = maintenancePressure * 2;
  const reportingLoad = reportingPressure * 1.5;
  const painLoad = Math.min(topPainPoints.length, 4) * 1.25;
  const stackLoad = data.pmSoftware === "Spreadsheets / inboxes / not sure" ? 1.5 : 0;
  const estimatedWeeklyBusyworkHours = Math.max(6, Math.round(ratioBase + responseLoad + maintenanceLoad + reportingLoad + painLoad + stackLoad));

  let estimatedWeeklyTimeSaved = 5;
  if (primaryAngle === "maintenance coordination") estimatedWeeklyTimeSaved = 5 + maintenancePressure * 2;
  else if (primaryAngle === "owner reporting") estimatedWeeklyTimeSaved = 4 + reportingPressure * 2;
  else if (primaryAngle === "response coverage") estimatedWeeklyTimeSaved = 4 + responseIndex * 2;
  else if (primaryAngle === "tenant communication") estimatedWeeklyTimeSaved = 5 + Math.max(1, responseIndex);
  else if (primaryAngle === "lease renewals") estimatedWeeklyTimeSaved = 4 + Math.min(2, topPainPoints.length);
  estimatedWeeklyTimeSaved = Math.max(4, Math.min(estimatedWeeklyTimeSaved, estimatedWeeklyBusyworkHours - 2));

  const partTimeAdminEquivalent = Number((estimatedWeeklyBusyworkHours / PART_TIME_ADMIN_WEEKLY_HOURS).toFixed(1));
  const monthlyAdminEquivalent = Math.round(partTimeAdminEquivalent * PART_TIME_ADMIN_MONTHLY_COST);
  const annualAdminEquivalent = monthlyAdminEquivalent * 12;
  const quarterlyHoursReturned = estimatedWeeklyTimeSaved * 13;
  const { capacityLabel, capacityNote } = rankCapacity(ratio);
  const { stackLabel, stackNote } = buildStackNote(data.pmSoftware);

  let followUpPriority: "HOT" | "WARM" | "LOW" = "LOW";
  let followUpReason = "Send the report, then follow up with the workflow angle that looks most concrete.";
  if (estimatedWeeklyBusyworkHours >= 18 || ratio >= 75 || scoreRanking[primaryAngle] >= 11) {
    followUpPriority = "HOT";
    followUpReason = `High operational drag. Bruno should follow up the same day and lead with ${primaryAngle}.`;
  } else if (estimatedWeeklyBusyworkHours >= 12 || responseIndex >= 2 || maintenancePressure >= 2) {
    followUpPriority = "WARM";
    followUpReason = `There is enough repeated work here to justify a 24-hour follow-up focused on ${primaryAngle}.`;
  }

  return {
    responseScore: RESPONSE_SCORES[responseIndex] || RESPONSE_SCORES[RESPONSE_SCORES.length - 1],
    maintenanceScore: MAINTENANCE_SCORES[maintenanceIndex] || MAINTENANCE_SCORES[0],
    ownerReportingScore: OWNER_REPORTING_SCORES[reportingIndex] || OWNER_REPORTING_SCORES[0],
    ratio, capacityLabel, capacityNote, stackLabel, stackNote,
    estimatedWeeklyBusyworkHours, estimatedWeeklyTimeSaved,
    partTimeAdminEquivalent, monthlyAdminEquivalent, annualAdminEquivalent, quarterlyHoursReturned,
    topPainPoints, roadmap, primaryAngle, primaryRecommendation, followUpPriority, followUpReason,
  };
}

// ─── PDF Report Template (inlined from server/pdfTemplate.tsx) ───

const colors = {
  bg: "#0A0F0A", card: "#0F1712", border: "#173224", green: "#22C55E",
  greenSoft: "#0E2A1B", text: "#E9F4ED", muted: "#98A59B", faint: "#415247", white: "#FFFFFF",
};

const pdfStyles = StyleSheet.create({
  page: { padding: 40, backgroundColor: colors.bg, color: colors.text, fontFamily: "Helvetica" },
  logo: { fontSize: 14, fontWeight: "bold", color: colors.white, marginBottom: 20 },
  green: { color: colors.green },
  heading: { fontSize: 26, fontWeight: "bold", lineHeight: 1.2, marginBottom: 8 },
  subtitle: { fontSize: 10, color: colors.muted, lineHeight: 1.6, marginBottom: 18 },
  prepared: { fontSize: 11, color: colors.muted, marginBottom: 18 },
  grid: { flexDirection: "row" as const, gap: 10, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14 },
  statLabel: { fontSize: 7, textTransform: "uppercase" as const, color: colors.faint, letterSpacing: 1.2, marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: "bold", color: colors.green },
  statValueCompact: { fontSize: 13, fontWeight: "bold", color: colors.green, lineHeight: 1.35 },
  statMeta: { fontSize: 8, color: colors.muted, marginTop: 6, lineHeight: 1.4 },
  section: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 14 },
  sectionLabel: { fontSize: 7, textTransform: "uppercase" as const, color: colors.green, letterSpacing: 1.4, marginBottom: 8 },
  sectionTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 8 },
  body: { fontSize: 9.5, color: colors.muted, lineHeight: 1.6 },
  row: { flexDirection: "row" as const, justifyContent: "space-between" as const, borderBottomWidth: 1, borderBottomColor: "#132218", paddingVertical: 7 },
  rowLast: { flexDirection: "row" as const, justifyContent: "space-between" as const, paddingTop: 7 },
  rowLabel: { fontSize: 9, color: colors.muted, marginRight: 12 },
  rowValue: { fontSize: 9.5, fontWeight: "bold", color: colors.text, maxWidth: 240, textAlign: "right" as const },
  badge: { alignSelf: "flex-start" as const, backgroundColor: colors.greenSoft, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10, color: colors.green, fontSize: 8, fontWeight: "bold", marginBottom: 8 },
  listItem: { borderTopWidth: 1, borderTopColor: "#132218", paddingTop: 10, marginTop: 10 },
  listTitle: { fontSize: 10, fontWeight: "bold", color: colors.white, marginBottom: 4 },
  listBody: { fontSize: 9, color: colors.muted, lineHeight: 1.55 },
  bullet: { flexDirection: "row" as const, alignItems: "flex-start" as const, gap: 8, marginTop: 8 },
  bulletMark: { fontSize: 10, color: colors.green, marginTop: 1 },
  bulletText: { flex: 1, fontSize: 9, color: colors.muted, lineHeight: 1.55 },
  footer: { marginTop: 18, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#132218", fontSize: 8, color: colors.faint, flexDirection: "row" as const, justifyContent: "space-between" as const },
  cta: { backgroundColor: colors.greenSoft, borderRadius: 16, borderWidth: 1.5, borderColor: colors.green, padding: 18, marginTop: 10 },
  ctaTitle: { fontSize: 16, fontWeight: "bold", color: colors.white, marginBottom: 8, textAlign: "center" as const },
  ctaBody: { fontSize: 9.5, color: colors.muted, lineHeight: 1.6, textAlign: "center" as const, marginBottom: 12 },
  ctaButton: { backgroundColor: colors.green, color: colors.bg, fontSize: 10, fontWeight: "bold", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 999, textAlign: "center" as const, marginHorizontal: 90, textDecoration: "none" },
});

function fmtMoney(value: number) { return `$${Math.round(value).toLocaleString()}`; }

// Use React.createElement instead of JSX (this is a .ts file, not .tsx)
const h = React.createElement;

function buildPDFDocument(data: AuditLeadData) {
  const insights = buildAuditInsights(data);
  const painText = insights.topPainPoints.length > 0 ? insights.topPainPoints.join(", ") : "Repeated work across maintenance, communication, and reporting";
  const nextBuilds = insights.roadmap.slice(1);

  return h(Document, null,
    // Page 1: Overview
    h(Page, { size: "A4", style: pdfStyles.page },
      h(Text, { style: pdfStyles.logo }, "VEYRA ", h(Text, { style: pdfStyles.green }, "GROUP")),
      h(Text, { style: pdfStyles.heading }, "Your PM Workflow Audit for ", h(Text, { style: pdfStyles.green }, data.company)),
      h(Text, { style: pdfStyles.subtitle }, "This is a directional diagnostic built from your audit inputs. The goal is to identify the first workflow Veyra should fix, not to force a broad platform decision."),
      h(Text, { style: pdfStyles.prepared }, `Prepared for ${data.name} · ${data.email}`),

      // Stat cards
      h(View, { style: pdfStyles.grid },
        h(View, { style: pdfStyles.statCard },
          h(Text, { style: pdfStyles.statLabel }, "Units / Team"),
          h(Text, { style: pdfStyles.statValue }, `${data.units} / ${data.teamSize}`),
          h(Text, { style: pdfStyles.statMeta }, `${insights.ratio} units per team member`),
        ),
        h(View, { style: pdfStyles.statCard },
          h(Text, { style: pdfStyles.statLabel }, "Repeatable Admin Load"),
          h(Text, { style: pdfStyles.statValue }, `${insights.estimatedWeeklyBusyworkHours} hrs/wk`),
          h(Text, { style: pdfStyles.statMeta }, `${fmtMoney(insights.monthlyAdminEquivalent)} / month of part-time admin equivalent`),
        ),
        h(View, { style: pdfStyles.statCard },
          h(Text, { style: pdfStyles.statLabel }, "Best First Build"),
          h(Text, { style: pdfStyles.statValueCompact }, insights.primaryRecommendation.title),
          h(Text, { style: pdfStyles.statMeta }, `${insights.estimatedWeeklyTimeSaved} hours/week back if the first build is scoped correctly`),
        ),
      ),

      // Operational Load
      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "Operational Load"),
        h(Text, { style: pdfStyles.sectionTitle }, insights.capacityLabel),
        h(Text, { style: pdfStyles.body }, insights.capacityNote),
        h(View, { style: pdfStyles.row }, h(Text, { style: pdfStyles.rowLabel }, "Response coverage"), h(Text, { style: pdfStyles.rowValue }, insights.responseScore.label)),
        h(View, { style: pdfStyles.row }, h(Text, { style: pdfStyles.rowLabel }, "Maintenance workflow"), h(Text, { style: pdfStyles.rowValue }, insights.maintenanceScore.label)),
        h(View, { style: pdfStyles.row }, h(Text, { style: pdfStyles.rowLabel }, "Owner reporting"), h(Text, { style: pdfStyles.rowValue }, insights.ownerReportingScore.label)),
        h(View, { style: pdfStyles.row }, h(Text, { style: pdfStyles.rowLabel }, "Current stack"), h(Text, { style: pdfStyles.rowValue }, `${data.pmSoftware} · ${insights.stackLabel}`)),
        h(View, { style: pdfStyles.rowLast }, h(Text, { style: pdfStyles.rowLabel }, "Pressure points surfaced"), h(Text, { style: pdfStyles.rowValue }, painText)),
      ),

      // What The Inputs Suggest
      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "What The Inputs Suggest"),
        h(Text, { style: pdfStyles.sectionTitle }, "The first win is removing repeated handoffs, not adding more software."),
        h(View, { style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, `Response note: ${insights.responseScore.message}`)),
        h(View, { style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, `Maintenance note: ${insights.maintenanceScore.message}`)),
        h(View, { style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, `Reporting note: ${insights.ownerReportingScore.message}`)),
        h(View, { style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, `Stack note: ${insights.stackNote}`)),
      ),

      h(View, { style: pdfStyles.footer },
        h(Text, null, "veyragroup.ai · contact@veyragroup.ai"),
        h(Text, { render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}` }),
      ),
    ),

    // Page 2: Recommendation
    h(Page, { size: "A4", style: pdfStyles.page },
      h(Text, { style: pdfStyles.logo }, "VEYRA ", h(Text, { style: pdfStyles.green }, "GROUP")),
      h(Text, { style: pdfStyles.heading }, "Start with the workflow that removes the ", h(Text, { style: pdfStyles.green }, "most drag"), "."),
      h(Text, { style: pdfStyles.subtitle }, "The best first build should be narrow, concrete, and easy for your team to feel within the first month."),

      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "Recommended First Build"),
        h(Text, { style: pdfStyles.sectionTitle }, insights.primaryRecommendation.title),
        h(Text, { style: pdfStyles.badge }, insights.primaryAngle),
        h(Text, { style: pdfStyles.body }, insights.primaryRecommendation.description),
        h(View, { style: pdfStyles.listItem },
          h(Text, { style: pdfStyles.listTitle }, "Why this first"),
          h(Text, { style: pdfStyles.listBody }, insights.primaryRecommendation.whyThisFirst),
        ),
        h(View, { style: pdfStyles.listItem },
          h(Text, { style: pdfStyles.listTitle }, "Why it matches Veyra"),
          h(Text, { style: pdfStyles.listBody }, insights.primaryRecommendation.fitNote),
        ),
      ),

      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "What It Should Replace"),
        ...insights.primaryRecommendation.replaces.map((item) =>
          h(View, { key: item, style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, item)),
        ),
      ),

      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "What Good Looks Like In 30 Days"),
        ...insights.primaryRecommendation.first30Days.map((item) =>
          h(View, { key: item, style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, item)),
        ),
        ...(nextBuilds.length > 0 ? [
          h(View, { key: "next-builds", style: pdfStyles.listItem },
            h(Text, { style: pdfStyles.listTitle }, "Next in line after the first build"),
            ...nextBuilds.map((item) => h(Text, { key: item.title, style: pdfStyles.listBody }, `${item.title}: ${item.description}`)),
          ),
        ] : []),
      ),

      h(View, { style: pdfStyles.section },
        h(Text, { style: pdfStyles.sectionLabel }, "Useful Prep For The Audit Call"),
        ...insights.primaryRecommendation.callPrep.map((item) =>
          h(View, { key: item, style: pdfStyles.bullet }, h(Text, { style: pdfStyles.bulletMark }, "•"), h(Text, { style: pdfStyles.bulletText }, item)),
        ),
      ),

      h(View, { style: pdfStyles.cta },
        h(Text, { style: pdfStyles.ctaTitle }, "Next step: a 15-minute workflow audit call."),
        h(Text, { style: pdfStyles.ctaBody }, "Bruno will map the current process, show what the first build should replace, and pressure-test whether the time back is real enough to justify moving."),
        h(Link, { src: "https://veyragroup.ai/book", style: pdfStyles.ctaButton }, "Book the workflow audit"),
      ),

      h(View, { style: pdfStyles.footer },
        h(Text, null, "veyragroup.ai · contact@veyragroup.ai"),
        h(Text, { render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}` }),
      ),
    ),
  );
}

// ─── Email (Resend) ───

function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function sanitizeSubject(v: string) { return v.replace(/[\r\n]+/g, " ").trim(); }

async function sendReportEmail(data: AuditLeadData, insights: ReturnType<typeof buildAuditInsights>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>";
  const bookingUrl = process.env.BOOKING_URL || "https://veyragroup.ai/book";
  const safeName = escapeHtml(data.name);
  const safeCompany = escapeHtml(data.company);
  const safeBookingUrl = escapeHtml(bookingUrl);
  const safeRecTitle = escapeHtml(insights.primaryRecommendation.title);
  const safeRecDesc = escapeHtml(insights.primaryRecommendation.description);
  const safeFitNote = escapeHtml(insights.primaryRecommendation.fitNote);
  const safePrep = escapeHtml(insights.primaryRecommendation.callPrep.slice(0, 2).join(" · "));

  // Generate PDF
  let pdfBase64: string | null = null;
  let pdfFilename = "pm_workflow_audit_report.pdf";
  try {
    const pdfDoc = buildPDFDocument(data);
    const pdfBuffer = await renderToBuffer(pdfDoc);
    pdfBase64 = Buffer.from(pdfBuffer).toString("base64");
    const safeFileBase = data.company.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
    pdfFilename = `${safeFileBase || "pm_workflow_audit"}_pm_workflow_audit_report.pdf`;
  } catch (pdfErr) {
    console.error("PDF generation failed, sending email without attachment:", pdfErr);
  }

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background-color:#0a0f0a;">
    <div style="padding:28px 32px 20px;border-bottom:1px solid #1a2a1f;">
      <span style="font-size:16px;font-weight:800;letter-spacing:-0.3px;">
        <span style="color:#ffffff;">VEYRA</span><span style="color:#22c55e;margin-left:4px;">GROUP</span>
      </span>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;font-weight:600;color:#e9f4ed;margin:0 0 20px 0;">${safeName},</p>
      <p style="font-size:15px;color:#9fb0a5;line-height:1.7;margin:0 0 20px 0;">
        Your PM Workflow Audit for <strong style="color:#ffffff;">${safeCompany}</strong> is ${pdfBase64 ? "attached" : "ready"}.
      </p>
      <div style="background:#0f1712;border:1px solid #173224;border-radius:14px;padding:18px;margin:0 0 20px 0;">
        <div style="font-size:11px;color:#22c55e;text-transform:uppercase;letter-spacing:1.4px;margin-bottom:8px;">What jumped out</div>
        <p style="font-size:15px;color:#e9f4ed;line-height:1.7;margin:0 0 8px 0;"><strong>${safeRecTitle}</strong> is the strongest first build.</p>
        <p style="font-size:14px;color:#9fb0a5;line-height:1.7;margin:0 0 8px 0;">${insights.estimatedWeeklyBusyworkHours} hours of repeatable work per week. Roughly $${insights.monthlyAdminEquivalent.toLocaleString()}/mo of part-time admin equivalent.</p>
        <p style="font-size:14px;color:#9fb0a5;line-height:1.7;margin:0;">The first build could reasonably give back <strong style="color:#ffffff;">${insights.estimatedWeeklyTimeSaved} hours/week</strong> if the current workflow looks like your inputs.</p>
      </div>
      <p style="font-size:15px;color:#9fb0a5;line-height:1.7;margin:0 0 20px 0;">${safeRecDesc}</p>
      <p style="font-size:14px;color:#9fb0a5;line-height:1.7;margin:0 0 20px 0;">${safeFitNote}</p>
      <div style="text-align:center;margin:0 0 24px 0;">
        <a href="${safeBookingUrl}" style="display:inline-block;background-color:#22c55e;color:#0a0f0a;padding:14px 34px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;">Book the workflow audit call</a>
      </div>
      <p style="font-size:13px;color:#6f8176;line-height:1.6;margin:0;">
        This is a directional diagnostic, not a promise. If it looks right, the next call should focus on ${escapeHtml(insights.primaryAngle)} and the current rules/process it needs to replace.
      </p>
      <p style="font-size:13px;color:#6f8176;line-height:1.6;margin:10px 0 0 0;">Useful prep for that call: ${safePrep}</p>
    </div>
  </div>`;

  const emailPayload: Record<string, unknown> = {
    from: fromEmail,
    to: data.email,
    subject: sanitizeSubject(`${data.company}: your PM Workflow Audit is ready`),
    html,
  };

  if (pdfBase64) {
    emailPayload.attachments = [{ filename: pdfFilename, content: pdfBase64 }];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result?.message || "Email send failed");
  return { messageId: result.id };
}

async function sendOwnerNotification(data: AuditLeadData, insights: ReturnType<typeof buildAuditInsights>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false };
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Veyra Group <contact@veyragroup.ai>";
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || "contact@veyragroup.ai";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: fromEmail, to: ownerEmail,
        subject: sanitizeSubject(`New PM audit lead - ${data.company}`),
        html: `<h2>New Website Audit Lead</h2>
<p><strong>Priority:</strong> ${escapeHtml(insights.followUpPriority)}</p>
<h3>Contact</h3>
<ul><li><strong>Name:</strong> ${escapeHtml(data.name)}</li><li><strong>Company:</strong> ${escapeHtml(data.company)}</li><li><strong>Email:</strong> ${escapeHtml(data.email)}</li></ul>
<h3>Audit Snapshot</h3>
<ul><li><strong>Units / Team:</strong> ${data.units} / ${data.teamSize}</li><li><strong>PM software:</strong> ${escapeHtml(data.pmSoftware)}</li><li><strong>Weekly busywork:</strong> ${insights.estimatedWeeklyBusyworkHours} hrs</li><li><strong>First build:</strong> ${escapeHtml(insights.primaryRecommendation.title)}</li></ul>
<h3>Next Action</h3><p>${escapeHtml(insights.followUpReason)}</p>`,
      }),
    });
    return { success: true };
  } catch { return { success: false }; }
}

// ─── CRM Sync ───

async function syncAuditLeadToCrm(data: AuditLeadData) {
  const endpoint = process.env.CRM_PM_AUDIT_ENDPOINT || "";
  if (!endpoint) return { status: "skipped" as const, reason: "CRM_PM_AUDIT_ENDPOINT not configured" };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.CRM_PM_AUDIT_TOKEN) headers["x-veyra-audit-token"] = process.env.CRM_PM_AUDIT_TOKEN;
    const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(data), signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) return { status: "error" as const, reason: `CRM sync failed with ${response.status}` };
    const payload = await response.json() as { status?: string; prospect_id?: number };
    return { status: (payload.status || "updated") as "created" | "updated", prospectId: payload.prospect_id };
  } catch (error) {
    clearTimeout(timeoutId);
    return { status: "error" as const, reason: error instanceof Error ? error.message : "Unknown CRM sync error" };
  }
}

// ─── Validation ───

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const blockedEmailFragments = ["example.com", "test.com", "invalid", "fake", "mailinator.com", "tempmail", "guerrillamail"];
const requestLog = new Map<string, number[]>();

function getClientIp(req: VercelRequest) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function pruneRequests(ip: string, now: number) {
  const recent = (requestLog.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  requestLog.set(ip, recent);
  return recent;
}

function isValidLeadEmail(email: string) {
  const n = email.trim().toLowerCase();
  if (!n || !emailPattern.test(n)) return false;
  return !blockedEmailFragments.some((f) => n.includes(f));
}

function isAllowedOption<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function parsePainPoints(raw: unknown): PainOption[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return Array.from(new Set(raw.filter((item): item is PainOption => isAllowedOption(item, PAIN_OPTIONS))));
}

function normalizeLeadPayload(body: Record<string, unknown>): AuditLeadData | null {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const units = Number(body.units);
  const teamSize = Number(body.teamSize);
  const painPoints = parsePainPoints(body.painPoints);
  if (!name || !company || !email) return null;
  if (!Number.isFinite(units) || !Number.isFinite(teamSize) || units <= 0 || teamSize <= 0) return null;
  if (!isAllowedOption(body.pmSoftware, PM_SOFTWARE_OPTIONS)) return null;
  if (!isAllowedOption(body.responseTime, RESPONSE_TIME_OPTIONS)) return null;
  if (!isAllowedOption(body.maintenanceFlow, MAINTENANCE_FLOW_OPTIONS)) return null;
  if (!isAllowedOption(body.ownerReporting, OWNER_REPORTING_OPTIONS)) return null;
  if (painPoints.length === 0) return null;
  return {
    name, company, email, units: Math.round(units), teamSize: Math.round(teamSize),
    pmSoftware: body.pmSoftware as PmSoftwareOption, responseTime: body.responseTime as ResponseTimeOption,
    maintenanceFlow: body.maintenanceFlow as MaintenanceFlowOption, ownerReporting: body.ownerReporting as OwnerReportingOption,
    painPoints,
    source: typeof body.source === "string" ? body.source : "",
    entry: typeof body.entry === "string" ? body.entry : "",
    referrer: typeof body.referrer === "string" ? body.referrer : "",
    pageUrl: typeof body.pageUrl === "string" ? body.pageUrl : "",
    utmSource: typeof body.utmSource === "string" ? body.utmSource : "",
    utmMedium: typeof body.utmMedium === "string" ? body.utmMedium : "",
    utmCampaign: typeof body.utmCampaign === "string" ? body.utmCampaign : "",
  };
}

// ─── Handler ───

const ALLOWED_ORIGINS = new Set(["https://veyragroup.ai", "https://www.veyragroup.ai"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const ip = getClientIp(req);
    const recentRequests = pruneRequests(ip, Date.now());
    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) return res.status(429).json({ success: false, error: "Rate limit exceeded. Try again later." });
    recentRequests.push(Date.now());

    const payload = normalizeLeadPayload(req.body || {});
    console.log(JSON.stringify({ event: "generate-report.request", timestamp: new Date().toISOString(), ip, email: payload?.email || "" }));

    if (!payload) return res.status(400).json({ success: false, error: "Missing or invalid PM audit fields" });
    if (!isValidLeadEmail(payload.email)) return res.status(400).json({ success: false, error: "Invalid email address" });

    const insights = buildAuditInsights(payload);
    const emailResult = await sendReportEmail(payload, insights);
    const crmSync = await syncAuditLeadToCrm(payload);
    await sendOwnerNotification(payload, insights);

    return res.json({ success: true, insights, messageId: emailResult.messageId, crmSync: crmSync.status });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ success: false, error: "Report generation failed" });
  }
}
