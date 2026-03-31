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

export const PAIN_OPTIONS = [
  "Tenant questions and status updates",
  "Maintenance triage and vendor follow-up",
  "Owner approvals and owner reporting",
  "Leasing inquiry follow-up",
  "Renewals and notices",
  "After-hours messages land on me",
  "Everyone is context-switching all day",
  "All of the above",
] as const;

export type PmSoftwareOption = (typeof PM_SOFTWARE_OPTIONS)[number];
export type ResponseTimeOption = (typeof RESPONSE_TIME_OPTIONS)[number];
export type MaintenanceFlowOption = (typeof MAINTENANCE_FLOW_OPTIONS)[number];
export type OwnerReportingOption = (typeof OWNER_REPORTING_OPTIONS)[number];
export type PainOption = (typeof PAIN_OPTIONS)[number];

export type AuditLeadData = {
  name: string;
  company: string;
  email: string;
  units: number;
  teamSize: number;
  pmSoftware: PmSoftwareOption;
  responseTime: ResponseTimeOption;
  maintenanceFlow: MaintenanceFlowOption;
  ownerReporting: OwnerReportingOption;
  painPoints: PainOption[];
  source?: string;
  entry?: string;
  referrer?: string;
  pageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

type Severity = "green" | "yellow" | "orange" | "red";
type BuildAngle =
  | "maintenance coordination"
  | "owner reporting"
  | "response coverage"
  | "tenant communication"
  | "lease renewals";

type ScoreCard = {
  label: string;
  message: string;
  severity: Severity;
};

type RecommendationBlueprint = {
  title: string;
  description: string;
  whyThisFirst: string;
  fitNote: string;
  replaces: string[];
  first30Days: string[];
  callPrep: string[];
};

const PART_TIME_ADMIN_WEEKLY_HOURS = 20;
const PART_TIME_ADMIN_MONTHLY_COST = 2500;

const RESPONSE_SCORES: ScoreCard[] = [
  {
    label: "Tight coverage",
    message: "Message handling looks disciplined. The risk is keeping that standard once the portfolio grows or the day gets chaotic.",
    severity: "green",
  },
  {
    label: "Mostly controlled",
    message: "The team is still getting back to people reasonably fast, but the process depends on someone having space that day.",
    severity: "yellow",
  },
  {
    label: "Reactive",
    message: "Same-day follow-up usually means good leads and frustrated residents are waiting on human bandwidth.",
    severity: "orange",
  },
  {
    label: "Backlogged",
    message: "Next-day response is not a staffing mystery. It usually means repeated work is crowding out the important work.",
    severity: "red",
  },
];

const MAINTENANCE_SCORES: ScoreCard[] = [
  {
    label: "Manual scramble",
    message: "Requests are probably moving through the team by whoever saw the message first. That creates missed urgency, vendor chase, and owner-rule drift.",
    severity: "red",
  },
  {
    label: "Tooling without control",
    message: "The portal is helping with intake, but the real work still happens in follow-up loops and side messages.",
    severity: "orange",
  },
  {
    label: "Coordinator-dependent",
    message: "This is workable until the coordinator is buried or out. The process still lives too much in one person's head.",
    severity: "yellow",
  },
  {
    label: "Documented",
    message: "Maintenance looks fairly systemized. The next gains are in faster escalation and less human babysitting.",
    severity: "green",
  },
];

const OWNER_REPORTING_SCORES: ScoreCard[] = [
  {
    label: "Rebuilt by hand",
    message: "Month-end is probably consuming skilled time that should not be spent reformatting exports and rewriting the same explanations.",
    severity: "red",
  },
  {
    label: "Template-assisted",
    message: "Templates reduce some friction, but the team still has to assemble and personalize the report each cycle.",
    severity: "orange",
  },
  {
    label: "Base automation only",
    message: "The base report exists, but human work is still needed to turn it into something owners actually want to read.",
    severity: "yellow",
  },
  {
    label: "Low-touch",
    message: "Reporting does not look like the main operational drag right now.",
    severity: "green",
  },
];

const ROADMAPS: Record<BuildAngle, RecommendationBlueprint> = {
  "maintenance coordination": {
    title: "Maintenance Coordination Command Center",
    description:
      "Turn intake, triage, vendor follow-up, and owner approvals into one tracked workflow instead of a chain of side messages.",
    whyThisFirst:
      "Maintenance is where delays compound fastest. It is usually the first place a PM team feels chaos, rework, and after-hours pressure.",
    fitNote:
      "This is the cleanest fit with Veyra's default 14-day build and the strongest wedge when requests are bouncing between tenants, vendors, and owners.",
    replaces: [
      "Inbox triage done in message order instead of urgency order",
      "Vendor chase living in text threads and memory",
      "Owner approval rules that change by property and are not written down",
    ],
    first30Days: [
      "Requests are acknowledged consistently and urgent issues surface faster",
      "Vendor follow-up and tenant updates stop depending on whoever remembers",
      "Bruno can help define which requests can move automatically and which require review",
    ],
    callPrep: [
      "Current vendor list and who handles dispatch today",
      "Owner approval thresholds or exceptions by property",
      "Two or three recent work orders that dragged longer than they should have",
    ],
  },
  "owner reporting": {
    title: "Owner Reporting Pack",
    description:
      "Pull the base numbers, layer the recurring narrative once, and ship consistent owner updates without rebuilding them every month.",
    whyThisFirst:
      "Owner reporting steals focused time in concentrated bursts. If month-end repeatedly derails the team, fixing it creates immediate breathing room.",
    fitNote:
      "Good fit when end-of-month reporting is the real bottleneck and the team is stuck reformatting the same exports over and over.",
    replaces: [
      "Manual export-cleanup-format cycles at the end of every month",
      "Owner-specific report variations living in ad hoc notes",
      "Last-minute context gathering before a report can be sent",
    ],
    first30Days: [
      "Month-end reporting becomes a process instead of a fire drill",
      "Owners get a more consistent update without more staff time",
      "The team keeps the financial source of truth and automates the repetitive assembly work around it",
    ],
    callPrep: [
      "A recent owner report or month-end pack",
      "The PM software or accounting export you start from",
      "Examples of what different owners ask for beyond the base report",
    ],
  },
  "response coverage": {
    title: "Response Coverage Layer",
    description:
      "Create a first-response path for leasing and resident messages so nothing waits for whoever happens to notice it first.",
    whyThisFirst:
      "Slow response affects occupancy, service quality, and team stress at the same time. It is one of the fastest ways to feel operational relief.",
    fitNote:
      "Good fit when slow follow-up is hurting occupancy, resident trust, or after-hours sanity and the team needs a controlled first-response system.",
    replaces: [
      "Personal phones or shared inboxes acting as the system of record",
      "Leasing or resident messages sitting until someone has time",
      "Repeat status questions that keep reopening the same thread",
    ],
    first30Days: [
      "New inquiries get a faster and more consistent first touch",
      "Routine status updates stop interrupting the whole day",
      "Escalations become clearer because low-risk messages are handled earlier",
    ],
    callPrep: [
      "The channels messages arrive through today",
      "Examples of routine messages the team types repeatedly",
      "Any message categories that must always be reviewed by a human",
    ],
  },
  "tenant communication": {
    title: "Tenant Communication Workflow",
    description:
      "Handle repeat resident questions and status updates without making the team rewrite the same message ten times a week.",
    whyThisFirst:
      "When the inbox is the bottleneck, every other workflow gets interrupted. Fixing the communication layer gives the team back focus.",
    fitNote:
      "Best when routine resident messaging is constantly pulling operators out of deeper work and the real issue is communication load, not a missing tool.",
    replaces: [
      "Copy-paste replies and one-off status updates",
      "Routine questions routed to the same overloaded people",
      "Communication consistency that depends on the individual replying",
    ],
    first30Days: [
      "Routine resident questions are answered faster and more consistently",
      "The team sees fewer interruptions from low-complexity messages",
      "Message tone and escalation rules become explicit instead of tribal knowledge",
    ],
    callPrep: [
      "Examples of routine resident messages the team handles every week",
      "Channels tenants use most often",
      "Any tone or legal boundaries Veyra should stay inside",
    ],
  },
  "lease renewals": {
    title: "Renewal and Notice Tracker",
    description:
      "Move renewals, notices, and recurring lease deadlines out of memory and into a tracked workflow with clear triggers.",
    whyThisFirst:
      "Renewal work feels small until deadlines slip. Once that happens, the team is forced into reactive cleanup.",
    fitNote:
      "Useful when renewals and notices are living in spreadsheets, calendar reminders, or someone's head.",
    replaces: [
      "Spreadsheet- or memory-based renewal tracking",
      "Late or inconsistent renewal outreach",
      "Notice deadlines that are easy to miss in a busy week",
    ],
    first30Days: [
      "Upcoming renewals become visible earlier",
      "The team has a standard path for notices and follow-up",
      "Lease deadlines stop disappearing under day-to-day message traffic",
    ],
    callPrep: [
      "Current renewal timeline and notice requirements",
      "A sample renewal spreadsheet or calendar process",
      "Examples of deadlines that slipped recently",
    ],
  },
};

export type AuditRecommendation = RecommendationBlueprint;

export type AuditInsights = {
  responseScore: ScoreCard;
  maintenanceScore: ScoreCard;
  ownerReportingScore: ScoreCard;
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
  topPainPoints: string[];
  roadmap: Array<{ title: string; description: string }>;
  primaryAngle: BuildAngle;
  primaryRecommendation: AuditRecommendation;
  followUpPriority: "HOT" | "WARM" | "LOW";
  followUpReason: string;
};

function uniquePainPoints(painPoints: PainOption[]) {
  const expanded = painPoints.includes("All of the above")
    ? PAIN_OPTIONS.filter((item) => item !== "All of the above")
    : painPoints.filter((item) => item !== "All of the above");
  return Array.from(new Set(expanded));
}

function rankCapacity(ratio: number) {
  if (ratio >= 100) {
    return {
      capacityLabel: "Burnout risk",
      capacityNote:
        "At this ratio, the problem is usually not effort. It is that repeated work and handoffs are eating the day before higher-value work happens.",
    };
  }
  if (ratio >= 75) {
    return {
      capacityLabel: "Stretched thin",
      capacityNote:
        "You are in the zone where small workflow problems start compounding into missed follow-up, after-hours stress, and hidden admin drag.",
    };
  }
  if (ratio >= 50) {
    return {
      capacityLabel: "Manageable but fragile",
      capacityNote:
        "The portfolio is still workable, but repeated work can tip the team from calm into constant catch-up very quickly.",
    };
  }
  return {
    capacityLabel: "Room to tighten the system",
    capacityNote:
      "The headcount ratio is not the main alarm yet. The opportunity is locking in cleaner workflows before growth exposes the gaps.",
  };
}

function buildStackNote(pmSoftware: PmSoftwareOption) {
  if (pmSoftware === "Spreadsheets / inboxes / not sure") {
    return {
      stackLabel: "Loose stack",
      stackNote:
        "There is no clean system of record yet. The first build should reduce operational chaos, not add another layer on top of it.",
    };
  }
  if (pmSoftware === "Propertyware / another PM stack") {
    return {
      stackLabel: "Likely workable",
      stackNote:
        "Veyra usually does best when the PM software stays in place and the repeated work around it gets automated.",
    };
  }
  return {
    stackLabel: "Known PM stack",
    stackNote:
      "Your software is a workable starting point. The win is not replacing it. The win is removing the manual work it still leaves on your team.",
    };
}

function buildAngleScores(data: AuditLeadData, painPoints: string[], ratio: number) {
  const scores: Record<BuildAngle, number> = {
    "maintenance coordination": 0,
    "owner reporting": 0,
    "response coverage": 0,
    "tenant communication": 0,
    "lease renewals": 0,
  };

  const responseIndex = Math.max(0, RESPONSE_TIME_OPTIONS.indexOf(data.responseTime));
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const maintenancePressure = MAINTENANCE_FLOW_OPTIONS.length - 1 - maintenanceIndex;
  const reportingPressure = OWNER_REPORTING_OPTIONS.length - 1 - reportingIndex;

  scores["response coverage"] += responseIndex * 3;
  scores["tenant communication"] += responseIndex;
  scores["maintenance coordination"] += maintenancePressure * 3;
  scores["owner reporting"] += reportingPressure * 3;

  if (ratio >= 75) {
    scores["maintenance coordination"] += 2;
    scores["response coverage"] += 2;
    scores["tenant communication"] += 1;
  } else if (ratio >= 50) {
    scores["maintenance coordination"] += 1;
    scores["response coverage"] += 1;
  }

  if (data.pmSoftware === "Spreadsheets / inboxes / not sure") {
    scores["maintenance coordination"] += 1;
    scores["owner reporting"] += 1;
    scores["response coverage"] += 1;
  }

  for (const pain of painPoints) {
    if (pain === "Tenant questions and status updates") {
      scores["tenant communication"] += 4;
      scores["response coverage"] += 2;
    } else if (pain === "Maintenance triage and vendor follow-up") {
      scores["maintenance coordination"] += 5;
      scores["response coverage"] += 1;
    } else if (pain === "Owner approvals and owner reporting") {
      scores["owner reporting"] += 5;
      scores["maintenance coordination"] += 1;
    } else if (pain === "Leasing inquiry follow-up") {
      scores["response coverage"] += 5;
    } else if (pain === "Renewals and notices") {
      scores["lease renewals"] += 5;
    } else if (pain === "After-hours messages land on me") {
      scores["response coverage"] += 4;
      scores["tenant communication"] += 1;
      scores["maintenance coordination"] += 1;
    } else if (pain === "Everyone is context-switching all day") {
      scores["maintenance coordination"] += 2;
      scores["owner reporting"] += 2;
      scores["response coverage"] += 2;
      scores["tenant communication"] += 2;
      scores["lease renewals"] += 1;
    }
  }

  return scores;
}

export function buildAuditInsights(data: AuditLeadData): AuditInsights {
  const ratio = Math.max(1, Math.round(data.units / data.teamSize));
  const responseIndex = Math.max(0, RESPONSE_TIME_OPTIONS.indexOf(data.responseTime));
  const maintenanceIndex = Math.max(0, MAINTENANCE_FLOW_OPTIONS.indexOf(data.maintenanceFlow));
  const reportingIndex = Math.max(0, OWNER_REPORTING_OPTIONS.indexOf(data.ownerReporting));
  const maintenancePressure = MAINTENANCE_FLOW_OPTIONS.length - 1 - maintenanceIndex;
  const reportingPressure = OWNER_REPORTING_OPTIONS.length - 1 - reportingIndex;
  const topPainPoints = uniquePainPoints(data.painPoints);

  const scoreRanking = buildAngleScores(data, topPainPoints, ratio);
  const rankedAngles = (Object.keys(scoreRanking) as BuildAngle[]).sort((a, b) => {
    if (scoreRanking[b] !== scoreRanking[a]) {
      return scoreRanking[b] - scoreRanking[a];
    }

    const order: BuildAngle[] = [
      "maintenance coordination",
      "owner reporting",
      "response coverage",
      "tenant communication",
      "lease renewals",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });

  const primaryAngle = rankedAngles[0] || "maintenance coordination";
  const primaryRecommendation = ROADMAPS[primaryAngle];
  const roadmap = rankedAngles.slice(0, 3).map((angle) => ({
    title: ROADMAPS[angle].title,
    description: ROADMAPS[angle].description,
  }));

  const ratioBase = ratio >= 100 ? 10 : ratio >= 75 ? 8 : ratio >= 50 ? 6 : 4;
  const responseLoad = responseIndex * 1.5;
  const maintenanceLoad = maintenancePressure * 2;
  const reportingLoad = reportingPressure * 1.5;
  const painLoad = Math.min(topPainPoints.length, 4) * 1.25;
  const stackLoad = data.pmSoftware === "Spreadsheets / inboxes / not sure" ? 1.5 : 0;
  const estimatedWeeklyBusyworkHours = Math.max(
    6,
    Math.round(ratioBase + responseLoad + maintenanceLoad + reportingLoad + painLoad + stackLoad),
  );

  let estimatedWeeklyTimeSaved = 5;
  if (primaryAngle === "maintenance coordination") {
    estimatedWeeklyTimeSaved = 5 + maintenancePressure * 2;
  } else if (primaryAngle === "owner reporting") {
    estimatedWeeklyTimeSaved = 4 + reportingPressure * 2;
  } else if (primaryAngle === "response coverage") {
    estimatedWeeklyTimeSaved = 4 + responseIndex * 2;
  } else if (primaryAngle === "tenant communication") {
    estimatedWeeklyTimeSaved = 5 + Math.max(1, responseIndex);
  } else if (primaryAngle === "lease renewals") {
    estimatedWeeklyTimeSaved = 4 + Math.min(2, topPainPoints.length);
  }
  estimatedWeeklyTimeSaved = Math.max(4, Math.min(estimatedWeeklyTimeSaved, estimatedWeeklyBusyworkHours - 2));

  const partTimeAdminEquivalent = Number(
    (estimatedWeeklyBusyworkHours / PART_TIME_ADMIN_WEEKLY_HOURS).toFixed(1),
  );
  const monthlyAdminEquivalent = Math.round(partTimeAdminEquivalent * PART_TIME_ADMIN_MONTHLY_COST);
  const annualAdminEquivalent = monthlyAdminEquivalent * 12;
  const quarterlyHoursReturned = estimatedWeeklyTimeSaved * 13;

  const { capacityLabel, capacityNote } = rankCapacity(ratio);
  const { stackLabel, stackNote } = buildStackNote(data.pmSoftware);

  let followUpPriority: AuditInsights["followUpPriority"] = "LOW";
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
    ratio,
    capacityLabel,
    capacityNote,
    stackLabel,
    stackNote,
    estimatedWeeklyBusyworkHours,
    estimatedWeeklyTimeSaved,
    partTimeAdminEquivalent,
    monthlyAdminEquivalent,
    annualAdminEquivalent,
    quarterlyHoursReturned,
    topPainPoints,
    roadmap,
    primaryAngle,
    primaryRecommendation,
    followUpPriority,
    followUpReason,
  };
}
