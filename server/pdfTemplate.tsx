import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// ─────────────────────────────────────────────
// ALL HEX — @react-pdf does NOT support rgba()
// Values pre-blended on #0A0F0A background
// ─────────────────────────────────────────────
const C = {
  bg: '#0A0F0A',
  green: '#059669',
  greenSoft: '#08533A',
  greenFaint: '#092318',
  greenGhost: '#0A1A12',
  greenCTA: '#091F15',
  white: '#FFFFFF',
  text90: '#EBEBEB',
  text70: '#B6B9B6',
  text50: '#848884',
  text30: '#545754',
  text15: '#2F322F',
  text08: '#1E201E',
  text04: '#141614',
};

const s = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: C.bg,
    color: C.white,
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  logo: { flexDirection: 'row', marginBottom: 24 },
  logoW: { fontSize: 14, fontWeight: 'bold', color: C.white, letterSpacing: -0.3 },
  logoG: { fontSize: 14, fontWeight: 'bold', color: C.green, letterSpacing: -0.3 },
  h1: { fontSize: 24, fontWeight: 'bold', color: C.white, lineHeight: 1.2, marginBottom: 4 },
  h1Green: { color: C.green },
  subtitle: { fontSize: 9.5, color: C.text50, lineHeight: 1.6, marginBottom: 20 },
  metaLabel: { fontSize: 6.5, color: C.text30, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 2 },
  metaValue: { fontSize: 11, fontWeight: 'bold', color: C.text90, marginBottom: 16 },
  card: { borderWidth: 1, borderColor: C.greenFaint, borderRadius: 14, padding: 16, marginBottom: 10 },
  statRow: { flexDirection: 'row', marginBottom: 12 },
  statBox: {
    flex: 1, borderWidth: 1, borderColor: C.greenFaint, borderRadius: 10,
    padding: 12, alignItems: 'center', marginHorizontal: 3,
  },
  statLabel: { fontSize: 6, color: C.text30, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  statNum: { fontSize: 24, fontWeight: 'bold', color: C.green },
  statUnit: { fontSize: 6.5, color: C.text30, marginTop: 2 },
  label: { fontSize: 6.5, color: C.green, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: C.text08,
  },
  rowLast: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6,
  },
  rowLabel: { fontSize: 9.5, color: C.text50 },
  rowVal: { fontSize: 9.5, fontWeight: 'bold', color: C.text90 },
  rowValGreen: { fontSize: 11, fontWeight: 'bold', color: C.green },
  accentBox: {
    backgroundColor: C.greenCTA, borderWidth: 1.5, borderColor: C.greenSoft,
    borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 10,
  },
  accentLabel: { fontSize: 6.5, color: C.green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  accentValue: { fontSize: 24, fontWeight: 'bold', color: C.green },
  table: { borderWidth: 1, borderColor: C.greenFaint, borderRadius: 12, overflow: 'hidden', marginBottom: 10 },
  tHead: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.text08 },
  tHeadLabel: { flex: 1.5, padding: 10 },
  tHeadCell: { flex: 1, padding: 10, alignItems: 'center' },
  tHeadText: { fontSize: 6, color: C.text30, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' },
  tRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.text08 },
  tRowLast: { flexDirection: 'row' },
  tCellLabel: { flex: 1.5, padding: 10, justifyContent: 'center' },
  tCell: { flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' },
  tCellDim: { backgroundColor: C.text04 },
  tCellGreen: { backgroundColor: C.greenGhost },
  tLabelText: { fontSize: 8.5, color: C.text50 },
  tValDim: { fontSize: 12, fontWeight: 'bold', color: C.text50 },
  tValGreen: { fontSize: 12, fontWeight: 'bold', color: C.green },
  numItem: {
    flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: C.text08,
    borderRadius: 10, padding: 12, marginBottom: 5,
  },
  numCircle: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: C.greenFaint,
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1,
  },
  numText: { fontSize: 7.5, color: C.green, fontWeight: 'bold' },
  numContent: { flex: 1 },
  numTitle: { fontSize: 9.5, fontWeight: 'bold', color: C.text90, marginBottom: 2 },
  numDesc: { fontSize: 8, color: C.text50, lineHeight: 1.5 },
  step: {
    backgroundColor: C.greenGhost, borderWidth: 1, borderColor: C.greenFaint,
    borderRadius: 10, padding: 12, marginBottom: 5,
  },
  stepLabel: { fontSize: 6.5, color: C.green, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  stepTitle: { fontSize: 9.5, fontWeight: 'bold', color: C.white, marginBottom: 2 },
  stepDesc: { fontSize: 8, color: C.text50, lineHeight: 1.5 },
  agBlock: {
    borderWidth: 1, borderColor: C.text08, borderRadius: 12,
    padding: 16, marginBottom: 10,
  },
  agText: { fontSize: 9, color: C.text70, lineHeight: 1.7, marginBottom: 5 },
  agTextLast: { fontSize: 9, color: C.text70, lineHeight: 1.7 },
  agBold: { color: C.text90, fontWeight: 'bold' },
  pullquote: {
    borderLeftWidth: 2, borderLeftColor: C.green, paddingLeft: 14,
    marginBottom: 10, marginTop: 2,
  },
  pullText: { fontSize: 10, color: C.text90, fontStyle: 'italic', lineHeight: 1.5 },
  footer: {
    marginTop: 'auto', paddingTop: 12, borderTopWidth: 1, borderTopColor: C.text08,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  footerText: { fontSize: 6.5, color: C.text30, letterSpacing: 0.3 },
});

const fmt = (n: number) => '$' + Math.abs(n).toLocaleString();

const Logo = () => (
  <View style={s.logo}>
    <Text style={s.logoW}>VEYRA</Text>
    <Text style={[s.logoG, { marginLeft: 4 }]}>GROUP</Text>
  </View>
);

const Foot = ({ n }: { n: number }) => (
  <View style={s.footer}>
    <Text style={s.footerText}>veyragroup.ai  ·  contact@veyragroup.ai  ·  (302) 600-2625</Text>
    <Text style={s.footerText}>{n} / 3</Text>
  </View>
);

interface CalculatorData {
  name?: string;
  email: string;
  teamSize: number;
  hoursPerPerson: number;
  hourlyValue: number;
}

interface PDFReportProps {
  data: CalculatorData;
}

export const PDFReport: React.FC<PDFReportProps> = ({ data }) => {
  const weeklyHrs = Math.abs(Math.round(data.teamSize * data.hoursPerPerson));
  const monthlyHrs = weeklyHrs * 4;
  const dailyCost = Math.abs(Math.round((weeklyHrs / 5) * data.hourlyValue));
  const weeklyCost = Math.abs(Math.round(weeklyHrs * data.hourlyValue));
  const monthlyCost = Math.abs(Math.round(monthlyHrs * data.hourlyValue));
  const annualCost = Math.abs(Math.round(monthlyCost * 12));

  const targetHrsPerPerson = Math.max(1, Math.round(data.hoursPerPerson * 0.4));
  const projWeeklyHrs = Math.round(data.teamSize * targetHrsPerPerson);
  const projMonthlyCost = Math.abs(Math.round(projWeeklyHrs * 4 * data.hourlyValue));
  const projAnnualCost = Math.abs(Math.round(projMonthlyCost * 12));
  const annualSavings = annualCost - projAnnualCost;
  const hrsSavedMonthly = monthlyHrs - projWeeklyHrs * 4;

  const sixMoCost = Math.abs(Math.round(monthlyCost * 6));
  const threeYrCost = Math.abs(Math.round(annualCost * 3));
  const paybackDays = Math.round((2500 / monthlyCost) * 30);

  return (
    <Document>
      {/* ══════════════════════════════════════
          PAGE 1 — PROBLEM + AGITATE
          ══════════════════════════════════════ */}
      <Page size="A4" style={s.page} wrap={false}>
        <Logo />

        <Text style={s.h1}>
          Your team is busy all day.{'\n'}
          So why does <Text style={s.h1Green}>nothing move forward?</Text>
        </Text>
        <Text style={s.subtitle}>
          {data.teamSize} people. {data.hoursPerPerson} hours a week each. Spent on work a system should handle.{'\n'}
          Here's what that actually costs — whether you see it on a line item or not.
        </Text>

        <Text style={s.metaLabel}>Prepared for</Text>
        <Text style={s.metaValue}>{data.name || data.email}</Text>

        <View style={s.statRow}>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Team Size</Text>
            <Text style={s.statNum}>{data.teamSize}</Text>
            <Text style={s.statUnit}>people</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Hrs / Person / Wk</Text>
            <Text style={s.statNum}>{data.hoursPerPerson}</Text>
            <Text style={s.statUnit}>on tasks that shouldn't need them</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statLabel}>Hourly Cost</Text>
            <Text style={s.statNum}>${data.hourlyValue}</Text>
            <Text style={s.statUnit}>per team member</Text>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.label}>Where the Money Goes</Text>
          <View style={s.row}>
            <Text style={s.rowLabel}>Hours lost every week</Text>
            <Text style={s.rowVal}>{weeklyHrs} hrs</Text>
          </View>
          <View style={s.row}>
            <Text style={s.rowLabel}>That's costing you per day</Text>
            <Text style={s.rowVal}>{fmt(dailyCost)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.rowLabel}>Per week</Text>
            <Text style={s.rowVal}>{fmt(weeklyCost)}</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.rowLabel}>Per month</Text>
            <Text style={s.rowValGreen}>{fmt(monthlyCost)}</Text>
          </View>
        </View>

        <View style={s.accentBox}>
          <Text style={s.accentLabel}>What You'll Spend This Year on Work Nobody Should Be Doing</Text>
          <Text style={s.accentValue}>{fmt(annualCost)}</Text>
        </View>

        <View style={s.agBlock}>
          <Text style={s.label}>Here's What That Actually Looks Like</Text>
          <Text style={s.agText}>
            It's you — texting your crew for updates you should already have. Retyping the same job details into three different systems. Chasing down a quote you sent last week because there's no follow-up system except your memory.
          </Text>
          <Text style={s.agText}>
            Meanwhile, <Text style={s.agBold}>{weeklyHrs} hours a week</Text> burn on scheduling, status updates, invoicing, and manual data entry — the kind of work that runs a business but doesn't grow one.
          </Text>
          <Text style={s.agTextLast}>
            <Text style={s.agBold}>{fmt(monthlyCost)}</Text> leaves every month. Not because anyone's slacking. Because the way the work gets done hasn't changed in years — and your competitors' has.
          </Text>
        </View>

        <Foot n={1} />
      </Page>

      {/* ══════════════════════════════════════
          PAGE 2 — THE GAP + PROOF
          ══════════════════════════════════════ */}
      <Page size="A4" style={s.page} wrap={false}>
        <Logo />

        <Text style={s.h1}>
          The gap between where you are{'\n'}
          and <Text style={s.h1Green}>where you should be.</Text>
        </Text>
        <Text style={s.subtitle}>
          Your competitors aren't working harder. They removed the busywork.{'\n'}
          Here's the difference that makes.
        </Text>

        <View style={s.table}>
          <View style={s.tHead}>
            <View style={s.tHeadLabel}><Text style={s.tHeadText}></Text></View>
            <View style={s.tHeadCell}><Text style={s.tHeadText}>You Today</Text></View>
            <View style={s.tHeadCell}><Text style={s.tHeadText}>After Veyra</Text></View>
          </View>
          <View style={s.tRow}>
            <View style={s.tCellLabel}><Text style={s.tLabelText}>Hrs lost / person / week</Text></View>
            <View style={[s.tCell, s.tCellDim]}><Text style={s.tValDim}>{data.hoursPerPerson}</Text></View>
            <View style={[s.tCell, s.tCellGreen]}><Text style={s.tValGreen}>{targetHrsPerPerson}</Text></View>
          </View>
          <View style={s.tRow}>
            <View style={s.tCellLabel}><Text style={s.tLabelText}>Team hours wasted / month</Text></View>
            <View style={[s.tCell, s.tCellDim]}><Text style={s.tValDim}>{monthlyHrs}</Text></View>
            <View style={[s.tCell, s.tCellGreen]}><Text style={s.tValGreen}>{projWeeklyHrs * 4}</Text></View>
          </View>
          <View style={s.tRow}>
            <View style={s.tCellLabel}><Text style={s.tLabelText}>Monthly cost of busywork</Text></View>
            <View style={[s.tCell, s.tCellDim]}><Text style={s.tValDim}>{fmt(monthlyCost)}</Text></View>
            <View style={[s.tCell, s.tCellGreen]}><Text style={s.tValGreen}>{fmt(projMonthlyCost)}</Text></View>
          </View>
          <View style={s.tRowLast}>
            <View style={s.tCellLabel}><Text style={s.tLabelText}>Annual cost</Text></View>
            <View style={[s.tCell, s.tCellDim]}><Text style={s.tValDim}>{fmt(annualCost)}</Text></View>
            <View style={[s.tCell, s.tCellGreen]}><Text style={s.tValGreen}>{fmt(projAnnualCost)}</Text></View>
          </View>
        </View>

        <View style={s.accentBox}>
          <Text style={s.accentLabel}>What Your Team Gets Back</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: C.green, marginTop: 4, textAlign: 'center' }}>
            {hrsSavedMonthly} hours/month back  ·  {fmt(annualSavings)}/year saved
          </Text>
        </View>

        <View style={s.pullquote}>
          <Text style={s.pullText}>
            {hrsSavedMonthly} hours a month. That's not efficiency. That's like adding {Math.max(1, Math.round(hrsSavedMonthly / 160))} full-time {Math.max(1, Math.round(hrsSavedMonthly / 160)) === 1 ? 'person' : 'people'} — without the payroll.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.label}>The Math on Getting This Fixed</Text>
          <View style={s.row}>
            <Text style={s.rowLabel}>One-time build starts at</Text>
            <Text style={s.rowValGreen}>$2,500</Text>
          </View>
          <View style={s.row}>
            <Text style={s.rowLabel}>You save every month</Text>
            <Text style={s.rowValGreen}>{fmt(monthlyCost - projMonthlyCost)}</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.rowLabel}>Pays for itself in</Text>
            <Text style={s.rowValGreen}>{paybackDays} days</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 1, marginBottom: 6 }}>
          <Text style={{ fontSize: 8.5, color: C.text30, fontStyle: 'italic' }}>
            That's less than one week of the waste you're already paying for.
          </Text>
        </View>

        <View style={s.card}>
          <Text style={s.label}>Every Month You Wait, You Pay Full Price for Nothing</Text>
          <View style={s.row}>
            <Text style={s.rowLabel}>6 months of waiting</Text>
            <Text style={s.rowVal}>{fmt(sixMoCost)} gone</Text>
          </View>
          <View style={s.row}>
            <Text style={s.rowLabel}>12 months of waiting</Text>
            <Text style={s.rowVal}>{fmt(annualCost)} gone</Text>
          </View>
          <View style={s.rowLast}>
            <Text style={s.rowLabel}>3 years of waiting</Text>
            <Text style={s.rowVal}>{fmt(threeYrCost)} gone</Text>
          </View>
        </View>

        <Foot n={2} />
      </Page>

      {/* ══════════════════════════════════════
          PAGE 3 — THE SOLVE
          ══════════════════════════════════════ */}
      <Page size="A4" style={s.page} wrap={false}>
        <Logo />

        <Text style={s.h1}>
          You don't have a people problem.{'\n'}
          You have a <Text style={s.h1Green}>systems problem.</Text>
        </Text>
        <Text style={s.subtitle}>
          Your team is doing the work. The work itself is what's broken.{'\n'}
          Here's what's actually going wrong — and exactly how we fix it.
        </Text>

        <Text style={s.label}>Why Your Team Is Stuck</Text>
        <View style={{ marginBottom: 12 }}>
          <View style={s.numItem}>
            <View style={s.numCircle}><Text style={s.numText}>01</Text></View>
            <View style={s.numContent}>
              <Text style={s.numTitle}>"Every job gets scheduled the same way — by hand"</Text>
              <Text style={s.numDesc}>
                New lead comes in, someone writes it down, someone else enters it, a third person confirms it. Four touches for something that should take zero.
              </Text>
            </View>
          </View>
          <View style={s.numItem}>
            <View style={s.numCircle}><Text style={s.numText}>02</Text></View>
            <View style={s.numContent}>
              <Text style={s.numTitle}>"We have the tools. Nobody uses them."</Text>
              <Text style={s.numDesc}>
                You bought the CRM. You set up the project board. But nobody wired them together — so your team works around them instead of through them.
              </Text>
            </View>
          </View>
          <View style={s.numItem}>
            <View style={s.numCircle}><Text style={s.numText}>03</Text></View>
            <View style={s.numContent}>
              <Text style={s.numTitle}>"I'm the bottleneck and I know it"</Text>
              <Text style={s.numDesc}>
                Every approval, every follow-up, every status check runs through you. Not because you want it to — because there's no system to handle it without you.
              </Text>
            </View>
          </View>
        </View>

        <Text style={s.label}>What Changes When We Step In</Text>
        <View style={{ marginBottom: 12 }}>
          <View style={s.step}>
            <Text style={s.stepLabel}>Week 1–2</Text>
            <Text style={s.stepTitle}>We find the {data.hoursPerPerson} hrs/wk your people are losing — and where.</Text>
            <Text style={s.stepDesc}>
              We audit your scheduling, follow-ups, quoting, and data entry. Then we build the automations that replace them. Not next quarter. Now.
            </Text>
          </View>
          <View style={s.step}>
            <Text style={s.stepLabel}>Week 3–4</Text>
            <Text style={s.stepTitle}>Your team doesn't learn a new tool. The tool learns their workflow.</Text>
            <Text style={s.stepDesc}>
              Everything runs inside the systems they already use — their calendar, their inbox, their CRM. Zero training. Zero adoption friction.
            </Text>
          </View>
          <View style={s.step}>
            <Text style={s.stepLabel}>Month 2–3</Text>
            <Text style={s.stepTitle}>{hrsSavedMonthly} hours come back. {fmt(monthlyCost)}/mo stops disappearing.</Text>
            <Text style={s.stepDesc}>
              Jobs get scheduled faster. Follow-ups happen automatically. Your team spends time on revenue — not on busywork you didn't realize was still there.
            </Text>
          </View>
        </View>

        {/* CTA — pinned to bottom */}
        <View style={[s.accentBox, { marginTop: 'auto', marginBottom: 0, padding: 20 }]}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: C.white, marginBottom: 5, textAlign: 'center' }}>
            Get your {hrsSavedMonthly} hours back.
          </Text>
          <Text style={{ fontSize: 8.5, color: C.text50, marginBottom: 3, textAlign: 'center' }}>
            15-minute workflow audit. We'll show you the 2–3 workflows burning the most time
          </Text>
          <Text style={{ fontSize: 8.5, color: C.text50, marginBottom: 10, textAlign: 'center' }}>
            and exactly what it takes to fix them.
          </Text>
          <Link src="https://veyragroup.ai/book" style={{ textDecoration: 'none', marginBottom: 10 }}>
            <View style={{
              backgroundColor: C.green,
              borderRadius: 8,
              paddingVertical: 10,
              paddingHorizontal: 28,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: C.bg, letterSpacing: 0.3 }}>
                Book a 15-minute workflow audit {'>'}
              </Text>
            </View>
          </Link>
          <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: C.green, marginBottom: 6 }}>
            veyragroup.ai  ·  contact@veyragroup.ai  ·  (302) 600-2625
          </Text>
          <Text style={{ fontSize: 7.5, color: C.text30, fontStyle: 'italic' }}>
            Every week you wait costs you {fmt(weeklyCost)}. You already did the math.
          </Text>
        </View>

        <Foot n={3} />
      </Page>
    </Document>
  );
};
