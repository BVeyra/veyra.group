// PDF report template for the PM Operations Audit. Server-side only
// (imported by api/generate-report.ts and server/pdfGenerator.tsx).
//
// Design: enterprise report — white page, ink/gray hierarchy, hairline rules.
// Brand emerald #0f7a55 (the live-site primary) appears only as accents:
// header rule, stat bars, section labels, severity dots, CTA button.
//
// Plain .ts with React.createElement (no JSX): Vercel's file tracer resolves
// ".js" imports to ".ts" files but not ".tsx", so a .tsx module here would be
// silently dropped from the serverless bundle.
import React from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AuditInsights, AuditLeadData, Severity } from "./auditEngine.js";

// Default hyphenation breaks words mid-heading ("Manage-ment", "Track-er").
Font.registerHyphenationCallback((word) => [word]);

const h = React.createElement;

const c = {
  ink: "#111827",
  text: "#1F2937",
  muted: "#6B7280",
  faint: "#9CA3AF",
  border: "#E5E7EB",
  brand: "#0F7A55",
};

const severityColor: Record<Severity, string> = {
  green: "#0F7A55",
  yellow: "#A16207",
  orange: "#C2410C",
  red: "#B91C1C",
};

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingHorizontal: 46, paddingBottom: 58, backgroundColor: "#FFFFFF", color: c.text, fontFamily: "Helvetica" },

  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 },
  wordmarkVeyra: { fontSize: 14, fontWeight: "bold", color: c.ink },
  wordmarkGroup: { fontSize: 14, color: c.muted },
  headerMeta: { fontSize: 7, color: c.faint, letterSpacing: 1.6, textTransform: "uppercase" },
  brandRule: { height: 2, backgroundColor: c.brand, marginBottom: 22 },

  heading: { fontSize: 20, fontWeight: "bold", lineHeight: 1.3, marginBottom: 6, color: c.ink },
  subtitle: { fontSize: 9.5, color: c.muted, lineHeight: 1.6, marginBottom: 10 },
  prepared: { fontSize: 8.5, color: c.faint, marginBottom: 20 },

  grid: { flexDirection: "row", gap: 14, marginBottom: 22 },
  statCard: { flex: 1, borderLeftWidth: 2, borderLeftColor: c.brand, paddingLeft: 10, paddingVertical: 2 },
  statLabel: { fontSize: 6.5, textTransform: "uppercase", color: c.muted, letterSpacing: 1.2, marginBottom: 5 },
  statValue: { fontSize: 17, fontWeight: "bold", color: c.ink },
  statValueCompact: { fontSize: 11, fontWeight: "bold", color: c.ink, lineHeight: 1.35 },
  statMeta: { fontSize: 7.5, color: c.muted, marginTop: 4, lineHeight: 1.4 },

  section: { marginBottom: 18 },
  sectionLabel: { fontSize: 7, textTransform: "uppercase", color: c.brand, letterSpacing: 1.6, fontWeight: "bold", marginBottom: 6 },
  sectionRule: { height: 1, backgroundColor: c.border, marginBottom: 9 },
  sectionTitle: { fontSize: 12.5, fontWeight: "bold", marginBottom: 5, color: c.ink },
  body: { fontSize: 9, color: c.text, lineHeight: 1.6 },

  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: c.border, paddingVertical: 5.5 },
  rowLast: { flexDirection: "row", justifyContent: "space-between", paddingTop: 5.5 },
  rowLabel: { fontSize: 8.5, color: c.muted },
  rowValueWrap: { flexDirection: "row", alignItems: "center", gap: 5, maxWidth: 260 },
  rowValue: { fontSize: 8.5, fontWeight: "bold", color: c.ink, textAlign: "right" },
  dot: { width: 5, height: 5, borderRadius: 2.5 },

  kicker: { alignSelf: "flex-start", fontSize: 7, fontWeight: "bold", color: c.brand, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 5 },

  divider: { borderTopWidth: 1, borderTopColor: c.border, paddingTop: 8, marginTop: 9 },
  listTitle: { fontSize: 9.5, fontWeight: "bold", color: c.ink, marginBottom: 3 },
  listBody: { fontSize: 8.5, color: c.text, lineHeight: 1.55, marginBottom: 3 },

  bullet: { flexDirection: "row", alignItems: "flex-start", gap: 7, marginTop: 5 },
  bulletMark: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: c.brand, marginTop: 4 },
  bulletText: { flex: 1, fontSize: 8.5, color: c.text, lineHeight: 1.55 },

  footer: { position: "absolute", bottom: 22, left: 46, right: 46, paddingTop: 8, borderTopWidth: 1, borderTopColor: c.border, fontSize: 7.5, color: c.faint, flexDirection: "row", justifyContent: "space-between" },

  cta: { borderWidth: 1, borderColor: c.border, borderRadius: 6, padding: 16, marginTop: 4, alignItems: "center" },
  ctaTitle: { fontSize: 12, fontWeight: "bold", color: c.ink, marginBottom: 5, textAlign: "center" },
  ctaBody: { fontSize: 8.5, color: c.muted, lineHeight: 1.55, textAlign: "center", marginBottom: 10, maxWidth: 380 },
  ctaButton: { backgroundColor: c.brand, color: "#FFFFFF", fontSize: 9.5, fontWeight: "bold", paddingVertical: 8, paddingHorizontal: 26, borderRadius: 999, textAlign: "center", textDecoration: "none" },
});

function fmtMoney(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function footer() {
  return h(View, { style: s.footer, fixed: true },
    h(Text, null, "veyragroup.ai · contact@veyragroup.ai · (220) 244-4213"),
    h(Text, { render: ({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}` }),
  );
}

function header() {
  return [
    h(View, { key: "wordmark", style: s.headerRow },
      h(Text, null,
        h(Text, { style: s.wordmarkVeyra }, "Veyra"),
        h(Text, { style: s.wordmarkGroup }, " Group"),
      ),
      h(Text, { style: s.headerMeta }, "PM Operations Audit"),
    ),
    h(View, { key: "rule", style: s.brandRule }),
  ];
}

function sectionLabel(label: string) {
  return [
    h(Text, { key: "label", style: s.sectionLabel }, label),
    h(View, { key: "rule", style: s.sectionRule }),
  ];
}

function signalRow(label: string, value: string, severity?: Severity, last?: boolean) {
  return h(View, { key: label, style: last ? s.rowLast : s.row },
    h(Text, { style: s.rowLabel }, label),
    h(View, { style: s.rowValueWrap },
      severity ? h(View, { style: [s.dot, { backgroundColor: severityColor[severity] }] }) : null,
      h(Text, { style: s.rowValue }, value),
    ),
  );
}

function bullet(text: string) {
  return h(View, { key: text, style: s.bullet },
    h(View, { style: s.bulletMark }),
    h(Text, { style: s.bulletText }, text),
  );
}

export function buildPDFDocument(data: AuditLeadData, insights: AuditInsights, bookingUrl: string) {
  const painText = insights.topPainPoints.length > 0
    ? insights.topPainPoints.join(", ")
    : "Repeated work across maintenance, communication, and reporting";
  // One runner-up only: the full ranked roadmap lives on the web report page,
  // and the PDF must hold two pages for every persona.
  const nextBuilds = insights.roadmap.slice(1, 2);
  // Server clocks are UTC; pin to Eastern so late-evening submissions don't
  // get stamped with tomorrow's date.
  const preparedDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
  const inputSignals = [
    insights.responseScore.message,
    insights.maintenanceScore.message,
    insights.afterHoursScore.message,
    insights.ownerReportingScore.message,
    insights.rentCollectionScore.message,
    insights.stackNote,
  ];

  return h(Document, null,
    // Page 1: Audit Overview
    h(Page, { size: "A4", style: s.page },
      ...header(),
      h(Text, { style: s.heading }, `Operations Audit: ${data.company}`),
      h(Text, { style: s.subtitle }, "A directional diagnostic built from your audit inputs. The goal is to identify the first workflow Veyra should fix — not to force a broad platform decision."),
      h(Text, { style: s.prepared }, `Prepared for ${data.name} · ${data.email} · ${preparedDate}`),

      h(View, { style: s.grid },
        h(View, { style: s.statCard },
          h(Text, { style: s.statLabel }, "Units / Team"),
          h(Text, { style: s.statValue }, `${data.units} / ${data.teamSize}`),
          h(Text, { style: s.statMeta }, `${insights.ratio}:1 ratio`),
        ),
        h(View, { style: s.statCard },
          h(Text, { style: s.statLabel }, "Repeatable Admin Load"),
          h(Text, { style: s.statValue }, `~${insights.estimatedWeeklyBusyworkHours} hrs/wk`),
          h(Text, { style: s.statMeta }, `${fmtMoney(insights.monthlyAdminEquivalent)}/mo admin equivalent`),
        ),
        h(View, { style: s.statCard },
          h(Text, { style: s.statLabel }, "Recommended First Activation"),
          h(Text, { style: s.statValueCompact }, insights.primaryRecommendation.title),
          h(Text, { style: s.statMeta }, `~${insights.estimatedWeeklyTimeSaved} hrs/week giveback`),
        ),
      ),

      h(View, { style: s.section },
        ...sectionLabel("Operational Snapshot"),
        h(Text, { style: s.sectionTitle }, insights.capacityLabel),
        h(Text, { style: s.body }, insights.capacityNote),
        h(View, { style: { marginTop: 4 } },
          signalRow("Response coverage", insights.responseScore.label, insights.responseScore.severity),
          signalRow("Maintenance workflow", insights.maintenanceScore.label, insights.maintenanceScore.severity),
          signalRow("After-hours coverage", insights.afterHoursScore.label, insights.afterHoursScore.severity),
          signalRow("Owner reporting", insights.ownerReportingScore.label, insights.ownerReportingScore.severity),
          signalRow("Rent collection", insights.rentCollectionScore.label, insights.rentCollectionScore.severity),
          signalRow("Current stack", data.pmSoftware),
          signalRow("Pressure points", painText, undefined, true),
        ),
      ),

      h(View, { style: s.section },
        ...sectionLabel("What The Inputs Suggest"),
        ...inputSignals.map((message) => bullet(message)),
      ),

      footer(),
    ),

    // Page 2: Recommendation + Next Steps
    h(Page, { size: "A4", style: s.page },
      ...header(),
      h(Text, { style: s.heading }, "Recommended First Activation"),

      h(View, { style: [s.section, { marginTop: 8 }] },
        h(Text, { style: s.kicker }, insights.primaryAngle),
        h(Text, { style: s.sectionTitle }, insights.primaryRecommendation.title),
        h(Text, { style: s.body }, insights.primaryRecommendation.description),
        h(View, { style: s.divider },
          h(Text, { style: s.listTitle }, "Why this first"),
          h(Text, { style: s.listBody }, insights.primaryRecommendation.whyThisFirst),
        ),
        h(View, { style: s.divider },
          h(Text, { style: s.listTitle }, "Why it matches Veyra"),
          h(Text, { style: s.listBody }, insights.primaryRecommendation.fitNote),
        ),
      ),

      h(View, { style: s.section },
        ...sectionLabel("What It Replaces"),
        ...insights.primaryRecommendation.replaces.map((item) => bullet(item)),
      ),

      h(View, { style: s.section },
        ...sectionLabel("What Good Looks Like In 30 Days"),
        ...insights.primaryRecommendation.first30Days.map((item) => bullet(item)),
        ...(nextBuilds.length > 0 ? [
          h(View, { key: "next-builds", style: s.divider },
            h(Text, { style: s.listTitle }, "Next in line"),
            ...nextBuilds.map((item) => h(Text, { key: item.title, style: s.listBody }, `${item.title} — ${item.description}`)),
          ),
        ] : []),
      ),

      h(View, { style: s.section },
        ...sectionLabel("Prep For The Audit Call"),
        ...insights.primaryRecommendation.callPrep.map((item) => bullet(item)),
      ),

      h(View, { style: s.cta, wrap: false },
        h(Text, { style: s.ctaTitle }, "Next step: 15-minute operations audit call"),
        h(Text, { style: s.ctaBody }, "We will map the current process, show what the first activation should replace, and pressure-test whether the time savings justify moving."),
        h(Link, { src: bookingUrl, style: s.ctaButton }, "Book the audit call"),
      ),

      footer(),
    ),
  );
}
