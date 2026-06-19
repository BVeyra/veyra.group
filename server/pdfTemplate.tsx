import React from "react";
import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AuditLeadData } from "./auditReport";
import { buildAuditInsights } from "./auditReport";

// Veyra new-look palette — light report, monochrome wordmark, deep emerald accent.
const colors = {
  bg: "#FFFFFF",
  card: "#F7F8F7",
  border: "#E6E8E6",
  hairline: "#ECEEED",
  emerald: "#0F7A55",
  emeraldDeep: "#0B6044",
  emeraldSoft: "#E9F1ED",
  ink: "#0A0A0A",
  body: "#4B5563",
  muted: "#6B7280",
  faint: "#9CA3AF",
  white: "#FFFFFF",
  wordmarkGroup: "#9CA3AF",
};

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: colors.bg,
    color: colors.body,
    fontFamily: "Helvetica",
  },
  // Monochrome wordmark
  logoRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 22,
  },
  logoVeyra: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    letterSpacing: -0.4,
  },
  logoGroup: {
    fontSize: 11,
    fontFamily: "Helvetica",
    color: colors.wordmarkGroup,
    letterSpacing: 0.2,
    marginLeft: 5,
  },
  heading: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    lineHeight: 1.18,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  emerald: {
    color: colors.emerald,
  },
  subtitle: {
    fontSize: 10,
    color: colors.muted,
    lineHeight: 1.6,
    marginBottom: 16,
  },
  prepared: {
    fontSize: 10.5,
    color: colors.faint,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  statLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: colors.faint,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.emerald,
    letterSpacing: -0.3,
  },
  statValueCompact: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.emerald,
    lineHeight: 1.35,
    letterSpacing: -0.2,
  },
  statMeta: {
    fontSize: 8,
    color: colors.muted,
    marginTop: 6,
    lineHeight: 1.4,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 7,
    textTransform: "uppercase",
    color: colors.emerald,
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  body: {
    fontSize: 9.5,
    color: colors.body,
    lineHeight: 1.6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingVertical: 7,
  },
  rowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 7,
  },
  rowLabel: {
    fontSize: 9,
    color: colors.muted,
    marginRight: 12,
  },
  rowValue: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    maxWidth: 240,
    textAlign: "right",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.emeraldSoft,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: colors.emeraldDeep,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  listItem: {
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: 10,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    marginBottom: 4,
  },
  listBody: {
    fontSize: 9,
    color: colors.body,
    lineHeight: 1.55,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  bulletMark: {
    fontSize: 10,
    color: colors.emerald,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: colors.body,
    lineHeight: 1.55,
  },
  footer: {
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    fontSize: 8,
    color: colors.faint,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cta: {
    backgroundColor: colors.emeraldSoft,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CFE3D9",
    padding: 18,
    marginTop: 10,
  },
  ctaTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: colors.ink,
    letterSpacing: -0.3,
    marginBottom: 8,
    textAlign: "center",
  },
  ctaBody: {
    fontSize: 9.5,
    color: colors.body,
    lineHeight: 1.6,
    textAlign: "center",
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: colors.emerald,
    color: colors.white,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    textAlign: "center",
    marginHorizontal: 90,
    textDecoration: "none",
  },
});

function fmtMoney(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

const Wordmark = () => (
  <View style={styles.logoRow}>
    <Text style={styles.logoVeyra}>Veyra</Text>
    <Text style={styles.logoGroup}>Group</Text>
  </View>
);

type PDFReportProps = {
  data: AuditLeadData;
};

export const PDFReport = ({ data }: PDFReportProps) => {
  const insights = buildAuditInsights(data);
  const painText =
    insights.topPainPoints.length > 0
      ? insights.topPainPoints.join(", ")
      : "Repeated work across maintenance, communication, and reporting";

  const nextBuilds = insights.roadmap.slice(1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Wordmark />
        <Text style={styles.heading}>
          Your PM Workflow Audit for <Text style={styles.emerald}>{data.company}</Text>
        </Text>
        <Text style={styles.subtitle}>
          This is a directional diagnostic built from your audit inputs. The goal is to identify the first workflow Veyra
          should fix, not to force a broad platform decision.
        </Text>
        <Text style={styles.prepared}>
          Prepared for {data.name} · {data.email}
        </Text>

        <View style={styles.grid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Units / Team</Text>
            <Text style={styles.statValue}>
              {data.units} / {data.teamSize}
            </Text>
            <Text style={styles.statMeta}>{insights.ratio} units per team member</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Repeatable Admin Load</Text>
            <Text style={styles.statValue}>{insights.estimatedWeeklyBusyworkHours} hrs/wk</Text>
            <Text style={styles.statMeta}>{fmtMoney(insights.monthlyAdminEquivalent)} / month of part-time admin equivalent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Best First Build</Text>
            <Text style={styles.statValueCompact}>{insights.primaryRecommendation.title}</Text>
            <Text style={styles.statMeta}>{insights.estimatedWeeklyTimeSaved} hours/week back if the first build is scoped correctly</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Operational Load</Text>
          <Text style={styles.sectionTitle}>{insights.capacityLabel}</Text>
          <Text style={styles.body}>{insights.capacityNote}</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Response coverage</Text>
            <Text style={styles.rowValue}>{insights.responseScore.label}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Maintenance workflow</Text>
            <Text style={styles.rowValue}>{insights.maintenanceScore.label}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Owner reporting</Text>
            <Text style={styles.rowValue}>{insights.ownerReportingScore.label}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Current stack</Text>
            <Text style={styles.rowValue}>
              {data.pmSoftware} · {insights.stackLabel}
            </Text>
          </View>
          <View style={styles.rowLast}>
            <Text style={styles.rowLabel}>Pressure points surfaced</Text>
            <Text style={styles.rowValue}>{painText}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>What The Inputs Suggest</Text>
          <Text style={styles.sectionTitle}>The first win is removing repeated handoffs, not adding more software.</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              Response note: {insights.responseScore.message}
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              Maintenance note: {insights.maintenanceScore.message}
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              Reporting note: {insights.ownerReportingScore.message}
            </Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              Stack note: {insights.stackNote}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>veyragroup.ai · contact@veyragroup.ai</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Wordmark />
        <Text style={styles.heading}>
          Start with the workflow that removes the <Text style={styles.emerald}>most drag</Text>.
        </Text>
        <Text style={styles.subtitle}>
          The best first build should be narrow, concrete, and easy for your team to feel within the first month.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Recommended First Build</Text>
          <Text style={styles.sectionTitle}>{insights.primaryRecommendation.title}</Text>
          <Text style={styles.badge}>{insights.primaryAngle}</Text>
          <Text style={styles.body}>{insights.primaryRecommendation.description}</Text>
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>Why this first</Text>
            <Text style={styles.listBody}>{insights.primaryRecommendation.whyThisFirst}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listTitle}>Why it matches Veyra</Text>
            <Text style={styles.listBody}>{insights.primaryRecommendation.fitNote}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>What It Should Replace</Text>
          {insights.primaryRecommendation.replaces.map((item) => (
            <View key={item} style={styles.bullet}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>What Good Looks Like In 30 Days</Text>
          {insights.primaryRecommendation.first30Days.map((item) => (
            <View key={item} style={styles.bullet}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          {nextBuilds.length > 0 ? (
            <View style={styles.listItem}>
              <Text style={styles.listTitle}>Next in line after the first build</Text>
              {nextBuilds.map((item) => (
                <Text key={item.title} style={styles.listBody}>
                  {item.title}: {item.description}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Useful Prep For The Audit Call</Text>
          {insights.primaryRecommendation.callPrep.map((item) => (
            <View key={item} style={styles.bullet}>
              <Text style={styles.bulletMark}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Next step: a 15-minute workflow audit call.</Text>
          <Text style={styles.ctaBody}>
            Bruno will map the current process, show what the first build should replace, and pressure-test whether the
            time back is real enough to justify moving.
          </Text>
          <Link src="https://veyragroup.ai/book" style={styles.ctaButton}>
            Book the workflow audit
          </Link>
        </View>

        <View style={styles.footer}>
          <Text>veyragroup.ai · contact@veyragroup.ai</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};
