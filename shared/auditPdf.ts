// Server-side PDF for the free, preliminary PMS Operations Snapshot.
import React from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { AuditLeadData, AuditInsights, Severity } from "./auditEngine.js";

Font.registerHyphenationCallback((word) => [word]);
const h = React.createElement;
const colors = { ink: "#111827", text: "#374151", muted: "#6B7280", border: "#E5E7EB", brand: "#0F7A55" };
const severity: Record<Severity, string> = { green: "#0F7A55", yellow: "#A16207", orange: "#C2410C", red: "#B91C1C" };
const s = StyleSheet.create({
  page: { padding: 46, paddingBottom: 64, fontFamily: "Helvetica", color: colors.text }, header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }, brand: { fontSize: 15, fontWeight: "bold", color: colors.ink }, meta: { fontSize: 8, color: colors.muted, letterSpacing: 1.2 }, rule: { height: 2, backgroundColor: colors.brand, marginBottom: 22 }, heading: { fontSize: 22, fontWeight: "bold", color: colors.ink, marginBottom: 8 }, sub: { fontSize: 10, color: colors.muted, lineHeight: 1.55, marginBottom: 18 }, section: { marginBottom: 18 }, label: { fontSize: 8, color: colors.brand, fontWeight: "bold", letterSpacing: 1.3, marginBottom: 7 }, sectionTitle: { fontSize: 14, fontWeight: "bold", color: colors.ink, marginBottom: 6 }, body: { fontSize: 10, lineHeight: 1.55 }, card: { borderWidth: 1, borderColor: colors.border, borderRadius: 7, padding: 13, marginBottom: 9 }, row: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 6 }, rowLabel: { fontSize: 9, color: colors.muted }, rowValue: { fontSize: 9, fontWeight: "bold", color: colors.ink }, bullet: { flexDirection: "row", gap: 7, marginTop: 6 }, dot: { width: 4, height: 4, marginTop: 5, borderRadius: 2, backgroundColor: colors.brand }, bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.5 }, cta: { borderWidth: 1, borderColor: colors.brand, borderRadius: 8, padding: 16, marginTop: 8, alignItems: "center" }, ctaTitle: { fontSize: 13, fontWeight: "bold", color: colors.ink, marginBottom: 6 }, ctaBody: { fontSize: 9.5, color: colors.muted, textAlign: "center", lineHeight: 1.5, marginBottom: 10 }, ctaButton: { backgroundColor: colors.brand, color: "#fff", borderRadius: 999, paddingVertical: 8, paddingHorizontal: 20, fontSize: 10, fontWeight: "bold", textDecoration: "none" }, footer: { position: "absolute", bottom: 24, left: 46, right: 46, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8, fontSize: 8, color: colors.muted, flexDirection: "row", justifyContent: "space-between" },
});
function bullet(text: string) { return h(View, { key: text, style: s.bullet }, h(View, { style: s.dot }), h(Text, { style: s.bulletText }, text)); }
function signal(label: string, score: { label: string; severity: Severity }) { return h(View, { key: label, style: s.row }, h(Text, { style: s.rowLabel }, label), h(Text, { style: [s.rowValue, { color: severity[score.severity] }] }, score.label)); }

export function buildPDFDocument(data: AuditLeadData, insights: AuditInsights, bookingUrl: string) {
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
  return h(Document, null, h(Page, { size: "A4", style: s.page },
    h(View, { style: s.header }, h(Text, { style: s.brand }, "Veyra Group"), h(Text, { style: s.meta }, "PMS OPERATIONS SNAPSHOT")), h(View, { style: s.rule }),
    h(Text, { style: s.heading }, `PMS Operations Snapshot: ${data.company}`),
    h(Text, { style: s.sub }, `Prepared for ${data.name} on ${date}. This free Snapshot is a preliminary view based on self-reported inputs. It is not a PMS Operations Audit, performance finding, or implementation recommendation.`),
    h(View, { style: s.section }, h(Text, { style: s.label }, "LIKELY DISCUSSION AREA"), h(View, { style: s.card }, h(Text, { style: s.sectionTitle }, insights.likelyFocus.title), h(Text, { style: s.body }, insights.likelyFocus.description))),
    h(View, { style: s.section }, h(Text, { style: s.label }, "SELF-REPORTED WORKFLOW SIGNALS"), signal("Follow-through", insights.responseScore), signal("Maintenance workflow", insights.maintenanceScore), signal("Reporting / approvals", insights.ownerReportingScore), signal("After-hours internal process", insights.afterHoursScore), signal("Collections process", insights.rentCollectionScore)),
    h(View, { style: s.section }, h(Text, { style: s.label }, "WHAT A FIT CALL CHECKS"), ...insights.likelyFocus.auditQuestions.map(bullet)),
    h(View, { style: s.section }, h(Text, { style: s.label }, "USEFUL PREPARATION IF YOU BOOK"), ...insights.likelyFocus.preparation.map(bullet)),
    h(View, { style: s.cta }, h(Text, { style: s.ctaTitle }, "Next step: a 15-minute Fit Call"), h(Text, { style: s.ctaBody }, "Fifteen minutes to work out whether a PMS Operations Audit is warranted. The paid Audit maps priority workflows, reviews available data and current tools, and provides a ranked action plan."), h(Link, { src: bookingUrl, style: s.ctaButton }, "Book a 15-Minute Fit Call")),
    h(View, { style: s.footer, fixed: true }, h(Text, null, "veyragroup.ai | (220) 244-4213"), h(Text, null, "Preliminary Snapshot | no savings or outcome estimate")),
  ));
}
