// Single source of truth for the PM Operations Audit funnel:
// question options, lead payload shape, scoring, insights, and roadmap copy.
// Used by the quiz results (client), the /report page (client), the Vercel
// function (api/generate-report.ts), and the dev Express server.

export const PM_SOFTWARE_OPTIONS = [
  "AppFolio",
  "Buildium",
  "Rent Manager",
  "Yardi / Breeze",
  "Propertyware / another PM stack",
  "Spreadsheets / inboxes / not sure",
] as const;

export const RESPONSE_TIME_OPTIONS = [
  "Under 30 minutes",
  "1-2 hours",
  "Same day if someone is watching it",
  "Next day is common",
] as const;

export const MAINTENANCE_FLOW_OPTIONS = [
  "Texts, calls, and inboxes with manual vendor chase",
  "Portal or PM software, but routing and follow-up are still manual",
  "A coordinator handles it with SOPs, but it is still mostly manual",
  "Clear system with documented rules and fast follow-up",
] as const;

export const OWNER_REPORTING_OPTIONS = [
  "Manual exports and reformatting every month",
  "Templates help, but the team still rebuilds the report",
  "PM software sends a base report and we add context manually",
  "Reporting is already consistent and low-touch",
] as const;

export const AFTER_HOURS_OPTIONS = [
  "They come to my personal phone and I answer them",
  "An answering service takes messages, but triage is still on us",
  "The team rotates on-call, but the rules live in people's heads",
  "Emergencies are filtered and routed without waking anyone unnecessarily",
] as const;

export const RENT_COLLECTION_OPTIONS = [
  "We chase late rent by text and phone every month",
  "Auto-reminders exist, but follow-up and payment plans are manual",
  "PM software sends reminders; we work the exceptions by hand",
  "Collections and escalation are consistent and mostly hands-off",
] as const;

export const PAIN_OPTIONS = [
  "Tenant questions and status updates",
  "Maintenance triage and vendor follow-up",
  "Owner approvals and owner reporting",
  "Leasing inquiry follow-up",
  "Renewals and notices",
  "Chasing rent and late fees",
  "After-hours messages land on me",
  "Everyone is context-switching all day",
  "All of the above",
] as const;

export type PmSoftwareOption = (typeof PM_SOFTWARE_OPTIONS)[number];
export type ResponseTimeOption = (typeof RESPONSE_TIME_OPTIONS)[number];
export type MaintenanceFlowOption = (typeof MAINTENANCE_FLOW_OPTIONS)[number];
export type OwnerReportingOption = (typeof OWNER_REPORTING_OPTIONS)[number];
export type AfterHoursOption = (typeof AFTER_HOURS_OPTIONS)[number];
export type RentCollectionOption = (typeof RENT_COLLECTION_OPTIONS)[number];
export type PainOption = (typeof PAIN_OPTIONS)[number];

export type AuditLeadData = {
  name: string;
  company: string;
  email: string;
  units: number;
  teamSize: number;
  pmSoftware: PmSoftwareOption;
  pmSoftwareUsed?: PmSoftwareOption[];
  pmSoftwareOther?: string;
  responseTime: ResponseTimeOption;
  maintenanceFlow: MaintenanceFlowOption;
  ownerReporting: OwnerReportingOption;
  afterHours: AfterHoursOption;
  rentCollection: RentCollectionOption;
  painPoints: PainOption[];
  source?: string;
  entry?: string;
  referrer?: string;
  pageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type Severity = "green" | "yellow" | "orange" | "red";

export type BuildAngle =
  | "maintenance coordination"
  | "owner reporting"
  | "response coverage"
  | "tenant communication"
  | "lease renewals"
  | "rent collection";

export type ScoreCard = { label: string; message: string; severity: Severity };

export type SnapshotFocus = {
  title: string;
  description: string;
  auditQuestions: string[];
  preparation: string[];
};

export type RecommendationBlueprint = {
  title: string;
  description: string;
  whyThisFirst: string;
  fitNote: string;
  replaces: string[];
  first30Days: string[];
  callPrep: string[];
};

export const PART_TIME_ADMIN_WEEKLY_HOURS = 20;
export const PART_TIME_ADMIN_MONTHLY_COST = 2500;

// Index-aligned with RESPONSE_TIME_OPTIONS (best answer first).
export const RESPONSE_SCORES: ScoreCard[] = [
  { label: "Tight coverage", message: "Message handling looks disciplined. The risk is keeping that standard once the portfolio grows or the day gets chaotic.", severity: "green" },
  { label: "Mostly controlled", message: "The team is still getting back to people reasonably fast, but the process depends on someone having space that day.", severity: "yellow" },
  { label: "Reactive", message: "Same-day follow-up usually means good leads and frustrated residents are waiting on human bandwidth.", severity: "orange" },
  { label: "Backlogged", message: "Next-day response is not a staffing mystery. It usually means repeated work is crowding out the important work.", severity: "red" },
];

// Index-aligned with MAINTENANCE_FLOW_OPTIONS (worst answer first).
export const MAINTENANCE_SCORES: ScoreCard[] = [
  { label: "Manual scramble", message: "Requests are probably moving through the team by whoever saw the message first. That creates missed urgency, vendor chase, and owner-rule drift.", severity: "red" },
  { label: "Tooling without control", message: "The portal is helping with intake, but the real work still happens in follow-up loops and side messages.", severity: "orange" },
  { label: "Coordinator-dependent", message: "This is workable until the coordinator is buried or out. The process still lives too much in one person's head.", severity: "yellow" },
  { label: "Documented", message: "Maintenance looks fairly systemized. The next gains are in faster escalation and less human babysitting.", severity: "green" },
];

// Index-aligned with OWNER_REPORTING_OPTIONS (worst answer first).
export const OWNER_REPORTING_SCORES: ScoreCard[] = [
  { label: "Rebuilt by hand", message: "Month-end is probably consuming skilled time that should not be spent reformatting exports and rewriting the same explanations.", severity: "red" },
  { label: "Template-assisted", message: "Templates reduce some friction, but the team still has to assemble and personalize the report each cycle.", severity: "orange" },
  { label: "Base automation only", message: "The base report exists, but human work is still needed to turn it into something owners actually want to read.", severity: "yellow" },
  { label: "Low-touch", message: "Reporting does not look like the main operational drag right now.", severity: "green" },
];

// Index-aligned with AFTER_HOURS_OPTIONS (worst answer first).
export const AFTER_HOURS_SCORES: ScoreCard[] = [
  { label: "On your phone", message: "After-hours load is landing on one person's phone. That is the fastest route to burnout and missed real emergencies.", severity: "red" },
  { label: "Message-taking only", message: "The answering service buys silence, not resolution. Triage and follow-up still wait for the morning.", severity: "orange" },
  { label: "Tribal on-call", message: "Rotation without written rules means the answer depends on who is holding the phone that night.", severity: "yellow" },
  { label: "Filtered and routed", message: "After-hours looks handled. The gains left are consistency checks, not a rebuild.", severity: "green" },
];

// Index-aligned with RENT_COLLECTION_OPTIONS (worst answer first).
export const RENT_COLLECTION_SCORES: ScoreCard[] = [
  { label: "Manual chase", message: "Late-rent follow-up is eating the first week of every month, and the awkward conversations always land on the same people.", severity: "red" },
  { label: "Reminders without follow-through", message: "Reminders go out, but the real work (payment plans, escalation, documentation) is still manual.", severity: "orange" },
  { label: "Exception-driven", message: "The software handles the easy cases. The exceptions still cost real hours and inconsistent handling.", severity: "yellow" },
  { label: "Hands-off", message: "Collections look systemized. Not the first place to spend build effort.", severity: "green" },
];

export const ROADMAPS: Record<BuildAngle, RecommendationBlueprint> = {
  "maintenance coordination": {
    title: "Maintenance Coordination Command Center",
    description: "Turn intake, triage, vendor follow-up, and owner approvals into one tracked workflow instead of a chain of side messages.",
    whyThisFirst: "Maintenance is where delays compound fastest. It is usually the first place a PM team feels chaos, rework, and after-hours pressure.",
    fitNote: "This is Veyra's most common first activation and the strongest starting point when requests are bouncing between tenants, vendors, and owners.",
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
  "rent collection": {
    title: "Rent Collection Follow-Through",
    description: "Standardize late-rent reminders, payment-plan follow-up, and escalation so the first week of the month stops being a phone marathon.",
    whyThisFirst: "Rent chasing is the most predictable repeated work in property management. The same sequence runs every month, which is exactly what should not be manual.",
    fitNote: "Good fit when reminders exist but the follow-up, documentation, and escalation still run on someone's memory and patience.",
    replaces: ["Text-and-call chases that restart from scratch every month", "Payment plans tracked in notes and inboxes", "Escalation timing that depends on who noticed the balance"],
    first30Days: ["Late-rent follow-up runs on a consistent sequence with documented touches", "Payment plans and exceptions get tracked instead of remembered", "The team sees delinquency status without digging through threads"],
    callPrep: ["Current late-rent timeline: when reminders, calls, and notices happen today", "How payment plans get agreed and tracked", "Where the delinquency list lives right now"],
  },
};

export type AuditInsights = {
  responseScore: ScoreCard;
  maintenanceScore: ScoreCard;
  ownerReportingScore: ScoreCard;
  afterHoursScore: ScoreCard;
  rentCollectionScore: ScoreCard;
  ratio: number;
  capacityLabel: string;
  capacityNote: string;
  stackLabel: string;
  stackNote: string;
  estimatedWeeklyBusyworkHours: number;
  estimatedWeeklyTimeSaved: number;
  partTimeAdminEquivalent: number;
  monthlyAdminEquivalent: number;
  annualAdminEquivalent: number;
  quarterlyHoursReturned: number;
  topPainPoints: PainOption[];
  roadmap: { title: string; description: string }[];
  primaryAngle: BuildAngle;
  primaryRecommendation: RecommendationBlueprint;
  likelyFocus: SnapshotFocus;
  qualificationNotes: string[];
  /** Results-page routing tier: high → push the call, medium → call + nurture, low → self-serve. */
  tier: "high" | "medium" | "low";
};

export function uniquePainPoints(painPoints: PainOption[]): PainOption[] {
  const expanded = painPoints.includes("All of the above")
    ? PAIN_OPTIONS.filter((i) => i !== "All of the above")
    : painPoints.filter((i) => i !== "All of the above");
  return Array.from(new Set(expanded));
}

export function rankCapacity(ratio: number) {
  if (ratio >= 100) return { capacityLabel: "Burnout risk", capacityNote: "At this ratio, the problem is usually not effort. It is that repeated work and handoffs are eating the day before higher-value work happens." };
  if (ratio >= 75) return { capacityLabel: "Stretched thin", capacityNote: "You are in the zone where small workflow problems start compounding into missed follow-up, after-hours stress, and hidden admin drag." };
  if (ratio >= 50) return { capacityLabel: "Manageable but fragile", capacityNote: "The portfolio is still workable, but repeated work can tip the team from calm into constant catch-up very quickly." };
  return { capacityLabel: "Room to tighten the system", capacityNote: "The headcount ratio is not the main alarm yet. The opportunity is locking in cleaner workflows before growth exposes the gaps." };
}

export function buildStackNote(pmSoftware: PmSoftwareOption) {
  if (pmSoftware === "Spreadsheets / inboxes / not sure") return { stackLabel: "Loose stack", stackNote: "There is no clean system of record yet. The first activation should reduce operational chaos, not add another layer on top of it." };
  if (pmSoftware === "Propertyware / another PM stack") return { stackLabel: "Likely workable", stackNote: "Veyra usually does best when the PM software stays in place and the repeated work around it gets automated." };
  return { stackLabel: "Known PM stack", stackNote: "Your software is a workable starting point. The win is not replacing it. The win is removing the manual work it still leaves on your team." };
}

type Pressures = {
  responseIndex: number;
  maintenancePressure: number;
  reportingPressure: number;
  afterHoursPressure: number;
  rentPressure: number;
};

function computePressures(data: AuditLeadData): Pressures {
  const responseIndex = Math.max(0, RESPONSE_TIME_OPTIONS.indexOf(data.responseTime));
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const afterHoursIndex = Math.max(0, AFTER_HOURS_OPTIONS.indexOf(data.afterHours));
  const rentIndex = Math.max(0, RENT_COLLECTION_OPTIONS.indexOf(data.rentCollection));
  return {
    responseIndex,
    maintenancePressure: MAINTENANCE_FLOW_OPTIONS.length - 1 - maintenanceIndex,
    reportingPressure: OWNER_REPORTING_OPTIONS.length - 1 - reportingIndex,
    afterHoursPressure: AFTER_HOURS_OPTIONS.length - 1 - afterHoursIndex,
    rentPressure: RENT_COLLECTION_OPTIONS.length - 1 - rentIndex,
  };
}

export function buildAngleScores(data: AuditLeadData, painPoints: PainOption[], ratio: number): Record<BuildAngle, number> {
  const scores: Record<BuildAngle, number> = {
    "maintenance coordination": 0,
    "owner reporting": 0,
    "response coverage": 0,
    "tenant communication": 0,
    "lease renewals": 0,
    "rent collection": 0,
  };
  const p = computePressures(data);

  // The workflow questions carry the primary signal.
  scores["response coverage"] += p.responseIndex * 3 + p.afterHoursPressure * 2;
  scores["tenant communication"] += p.responseIndex;
  scores["maintenance coordination"] += p.maintenancePressure * 3 + p.afterHoursPressure;
  scores["owner reporting"] += p.reportingPressure * 3;
  scores["rent collection"] += p.rentPressure * 3;

  if (ratio >= 75) { scores["maintenance coordination"] += 2; scores["response coverage"] += 2; scores["tenant communication"] += 1; }
  else if (ratio >= 50) { scores["maintenance coordination"] += 1; scores["response coverage"] += 1; }
  if (data.pmSoftware === "Spreadsheets / inboxes / not sure") { scores["maintenance coordination"] += 1; scores["owner reporting"] += 1; scores["response coverage"] += 1; }

  // When every pain is selected, the pains carry no differentiating signal;
  // add a flat bump and let the workflow questions decide the angle.
  const allSelected = painPoints.length >= PAIN_OPTIONS.length - 1;
  if (allSelected) {
    for (const angle of Object.keys(scores) as BuildAngle[]) scores[angle] += 2;
    return scores;
  }

  for (const pain of painPoints) {
    if (pain === "Tenant questions and status updates") { scores["tenant communication"] += 4; scores["response coverage"] += 2; }
    else if (pain === "Maintenance triage and vendor follow-up") { scores["maintenance coordination"] += 5; scores["response coverage"] += 1; }
    else if (pain === "Owner approvals and owner reporting") { scores["owner reporting"] += 5; scores["maintenance coordination"] += 1; }
    else if (pain === "Leasing inquiry follow-up") { scores["response coverage"] += 5; }
    else if (pain === "Renewals and notices") { scores["lease renewals"] += 5; }
    else if (pain === "Chasing rent and late fees") { scores["rent collection"] += 5; }
    else if (pain === "After-hours messages land on me") { scores["response coverage"] += 4; scores["tenant communication"] += 1; scores["maintenance coordination"] += 1; }
    else if (pain === "Everyone is context-switching all day") { scores["maintenance coordination"] += 2; scores["owner reporting"] += 2; scores["response coverage"] += 2; scores["tenant communication"] += 2; scores["lease renewals"] += 1; scores["rent collection"] += 1; }
  }
  return scores;
}

const ANGLE_TIEBREAK_ORDER: BuildAngle[] = [
  "maintenance coordination",
  "owner reporting",
  "response coverage",
  "rent collection",
  "tenant communication",
  "lease renewals",
];

const SNAPSHOT_FOCUSES: Record<BuildAngle, SnapshotFocus> = {
  "maintenance coordination": {
    title: "Maintenance exceptions and vendor follow-through",
    description: "Your inputs point to a possible gap between maintenance intake, ownership, approvals, vendor follow-through, and completion evidence. This is a directional signal, not a recommendation to change software or activate a service.",
    auditQuestions: ["Where does a work order stop moving?", "Who owns the next action at each handoff?", "Which approval and vendor rules live outside the PMS?"],
    preparation: ["A recent set of work orders, including stalled examples", "Current vendor and approval path", "PMS plan and any maintenance tools in use"],
  },
  "owner reporting": {
    title: "Reporting and approval handoffs",
    description: "Your inputs suggest that recurring reporting or owner-approval work may deserve a closer workflow review. A paid Audit validates the actual process, data, and decision path.",
    auditQuestions: ["Which steps require manual rework?", "What information or approval is missing when the workflow pauses?", "What is already available in the PMS?"],
    preparation: ["One recent reporting or approval workflow", "Source reports or exports available today", "The owner of the workflow and approver path"],
  },
  "response coverage": {
    title: "Workflow ownership and follow-through",
    description: "Your inputs suggest a possible follow-through gap. Veyra would first determine whether the answer is PMS configuration, a specialist tool, a documented internal process, or a scoped build.",
    auditQuestions: ["Which recurring request has no clear owner?", "When does the workflow rely on memory or side messages?", "What current tool is underused?"],
    preparation: ["One recent recurring workflow example", "Current intake channels and owners", "PMS plan and relevant specialist tools"],
  },
  "tenant communication": {
    title: "Workflow ownership and resident follow-through",
    description: "Your inputs suggest routine communication may depend on individual capacity or side messages. A Fit Call can determine whether the process, current tools, or a more focused review is appropriate.",
    auditQuestions: ["Which messages repeatedly reopen the same work?", "Who owns the next response and escalation?", "What is already available in the PMS?"],
    preparation: ["A few recurring resident or tenant questions", "Current channels and owners", "Any communication or escalation rules in use"],
  },
  "lease renewals": {
    title: "Recurring deadline and workflow ownership",
    description: "Your inputs suggest a recurring workflow may rely on memory, manual tracking, or unclear ownership. A paid Audit determines whether the available PMS capability and process are enough.",
    auditQuestions: ["Which deadline or handoff is hardest to see?", "Who owns the next action at each stage?", "What records are already reliable in the PMS?"],
    preparation: ["One recent renewal or notice workflow", "Current tracking process", "The person accountable for the handoff"],
  },
  "rent collection": {
    title: "Recurring exception follow-through",
    description: "Your inputs suggest the exception process may deserve a closer review. Veyra does not provide collections, legal, or payment services; the Fit Call establishes whether an operations Audit is appropriate.",
    auditQuestions: ["Where does the exception process rely on memory?", "Who owns each next action and escalation?", "What current PMS process is already in place?"],
    preparation: ["A recent exception workflow", "Current reminders and handoff rules", "The owner of the workflow"],
  },
};

export function buildAuditInsights(data: AuditLeadData): AuditInsights {
  const ratio = Math.max(1, Math.round(data.units / data.teamSize));
  const p = computePressures(data);
  const topPainPoints = uniquePainPoints(data.painPoints);
  const scoreRanking = buildAngleScores(data, topPainPoints, ratio);
  const rankedAngles = (Object.keys(scoreRanking) as BuildAngle[]).sort((a, b) => {
    if (scoreRanking[b] !== scoreRanking[a]) return scoreRanking[b] - scoreRanking[a];
    return ANGLE_TIEBREAK_ORDER.indexOf(a) - ANGLE_TIEBREAK_ORDER.indexOf(b);
  });

  const primaryAngle = rankedAngles[0] || "maintenance coordination";
  const primaryRecommendation = ROADMAPS[primaryAngle];
  const likelyFocus = SNAPSHOT_FOCUSES[primaryAngle];
  const roadmap = rankedAngles.slice(0, 3).map((angle) => ({ title: ROADMAPS[angle].title, description: ROADMAPS[angle].description }));

  const ratioBase = ratio >= 100 ? 10 : ratio >= 75 ? 8 : ratio >= 50 ? 6 : 4;
  const responseLoad = p.responseIndex * 1.5;
  const maintenanceLoad = p.maintenancePressure * 2;
  const reportingLoad = p.reportingPressure * 1.5;
  const afterHoursLoad = p.afterHoursPressure * 1.5;
  const rentLoad = p.rentPressure * 1.25;
  const painLoad = Math.min(topPainPoints.length, 4) * 1.25;
  const stackLoad = data.pmSoftware === "Spreadsheets / inboxes / not sure" ? 1.5 : 0;
  const estimatedWeeklyBusyworkHours = Math.max(6, Math.round(ratioBase + responseLoad + maintenanceLoad + reportingLoad + afterHoursLoad + rentLoad + painLoad + stackLoad));

  let estimatedWeeklyTimeSaved = 5;
  if (primaryAngle === "maintenance coordination") estimatedWeeklyTimeSaved = 5 + p.maintenancePressure * 2;
  else if (primaryAngle === "owner reporting") estimatedWeeklyTimeSaved = 4 + p.reportingPressure * 2;
  else if (primaryAngle === "response coverage") estimatedWeeklyTimeSaved = 4 + p.responseIndex * 2;
  else if (primaryAngle === "tenant communication") estimatedWeeklyTimeSaved = 5 + Math.max(1, p.responseIndex);
  else if (primaryAngle === "lease renewals") estimatedWeeklyTimeSaved = 4 + Math.min(2, topPainPoints.length);
  else if (primaryAngle === "rent collection") estimatedWeeklyTimeSaved = 4 + Math.round(p.rentPressure * 1.5);
  estimatedWeeklyTimeSaved = Math.max(4, Math.min(estimatedWeeklyTimeSaved, estimatedWeeklyBusyworkHours - 2));

  const partTimeAdminEquivalent = Number((estimatedWeeklyBusyworkHours / PART_TIME_ADMIN_WEEKLY_HOURS).toFixed(1));
  const monthlyAdminEquivalent = Math.round(partTimeAdminEquivalent * PART_TIME_ADMIN_MONTHLY_COST);
  const annualAdminEquivalent = monthlyAdminEquivalent * 12;
  const quarterlyHoursReturned = estimatedWeeklyTimeSaved * 13;
  const { capacityLabel, capacityNote } = rankCapacity(ratio);
  const { stackLabel, stackNote } = buildStackNote(data.pmSoftware);

  const tier: AuditInsights["tier"] =
    estimatedWeeklyBusyworkHours >= 20 || ratio >= 75 ? "high"
    : estimatedWeeklyBusyworkHours >= 13 || p.responseIndex >= 2 || p.maintenancePressure >= 2 ? "medium"
    : "low";

  const responseIndex = p.responseIndex;
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const afterHoursIndex = Math.max(0, AFTER_HOURS_OPTIONS.indexOf(data.afterHours));
  const rentIndex = Math.max(0, RENT_COLLECTION_OPTIONS.indexOf(data.rentCollection));

  return {
    responseScore: RESPONSE_SCORES[responseIndex] || RESPONSE_SCORES[RESPONSE_SCORES.length - 1],
    maintenanceScore: MAINTENANCE_SCORES[maintenanceIndex] || MAINTENANCE_SCORES[0],
    ownerReportingScore: OWNER_REPORTING_SCORES[reportingIndex] || OWNER_REPORTING_SCORES[0],
    afterHoursScore: AFTER_HOURS_SCORES[afterHoursIndex] || AFTER_HOURS_SCORES[0],
    rentCollectionScore: RENT_COLLECTION_SCORES[rentIndex] || RENT_COLLECTION_SCORES[0],
    ratio, capacityLabel, capacityNote, stackLabel, stackNote,
    estimatedWeeklyBusyworkHours, estimatedWeeklyTimeSaved,
    partTimeAdminEquivalent, monthlyAdminEquivalent, annualAdminEquivalent, quarterlyHoursReturned,
    topPainPoints, roadmap, primaryAngle, primaryRecommendation, likelyFocus,
    qualificationNotes: [
      `PMS reported: ${data.pmSoftware}. The Fit Call checks plan, current configuration, and existing specialist tools.`,
      "The paid PMS Operations Audit, not this Snapshot, maps priority workflows, reviews available data, and produces a ranked action plan.",
      "Veyra does not replace the PMS, accounting, emergency or on-call team, vendor contracts, or legal judgment.",
    ],
    tier,
  };
}

/**
 * Sales follow-up guidance. Server-side only; never send this to the
 * browser or include it in the lead-facing report.
 */
export function buildFollowUp(data: AuditLeadData, insights: AuditInsights): { priority: "FIT_CALL" | "NURTURE"; reason: string } {
  const relevantPain = insights.topPainPoints.includes("Maintenance triage and vendor follow-up") || insights.topPainPoints.includes("Owner approvals and owner reporting") || insights.topPainPoints.includes("Everyone is context-switching all day");
  if (data.units >= 150 && data.units <= 500 && relevantPain) {
    return { priority: "FIT_CALL", reason: `Snapshot signals a Fit Call to qualify ${insights.likelyFocus.title}.` };
  }
  return { priority: "NURTURE", reason: "Snapshot captured an operating signal. Confirm owner, data readiness, and willingness to pursue a paid Audit before offering a Fit Call." };
}
