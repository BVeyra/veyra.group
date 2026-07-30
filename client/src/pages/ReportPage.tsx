import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { buildAuditInsights, type AuditLeadData, type Severity } from "@shared/auditEngine";

const severityClasses: Record<Severity, string> = {
  green: "bg-emerald-500/15 text-emerald-300",
  yellow: "bg-yellow-500/15 text-yellow-300",
  orange: "bg-orange-500/15 text-orange-300",
  red: "bg-red-500/15 text-red-300",
};

const localPreviewData: AuditLeadData = {
  name: "Operations Team",
  company: "Sample Property Management",
  email: "preview@veyragroup.ai",
  units: 180,
  teamSize: 4,
  pmSoftware: "Buildium",
  pmSoftwareUsed: ["Buildium"],
  responseTime: "Same day if someone is watching it",
  maintenanceFlow: "Portal or PM software, but routing and follow-up are still manual",
  ownerReporting: "Templates help, but the team still rebuilds the report",
  afterHours: "The team rotates on-call, but the rules live in people's heads",
  rentCollection: "PM software sends reminders; we work the exceptions by hand",
  painPoints: ["Maintenance triage and vendor follow-up", "Owner approvals and owner reporting"],
};

function Signal({ label, value, severity, detail }: { label: string; value: string; severity: Severity; detail: string }) {
  return <article className="rounded-3xl border border-white/10 bg-white/[.02] p-6"><p className="text-sm text-gray-400">{label}</p><p className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${severityClasses[severity]}`}>{value}</p><p className="mt-4 text-sm leading-6 text-gray-300">{detail}</p></article>;
}

export default function ReportPage() {
  const [data, setData] = useState<AuditLeadData | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "1") {
      setData(localPreviewData);
      setLoaded(true);
      return;
    }
    const token = new URLSearchParams(window.location.search).get("d") || "";
    if (!token) { setLoaded(true); return; }
    const controller = new AbortController();
    void fetch(`/api/report-data?d=${encodeURIComponent(token)}`, { signal: controller.signal })
      .then(async (response) => response.ok ? response.json() as Promise<{ data?: AuditLeadData }> : null)
      .then((payload) => setData(payload?.data || null)).catch(() => setData(null)).finally(() => setLoaded(true));
    return () => controller.abort();
  }, []);
  const snapshot = useMemo(() => data ? buildAuditInsights(data) : null, [data]);
  return <div className="min-h-screen text-white"><SeoHead title="Your PMS Operations Snapshot" description="A preliminary PMS Operations Snapshot from Veyra Group." robots="noindex, nofollow" /><Navbar /><main className="pt-20">
    {!loaded ? <div className="mx-auto max-w-xl px-6 py-24 text-center text-gray-400">Loading your Snapshot...</div> : !data || !snapshot ? <div className="mx-auto max-w-xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Snapshot link not recognized</h1><p className="mt-4 text-gray-400">Run the free Snapshot again to generate a fresh link.</p><Link href="/audit" className="mt-8 inline-block rounded-full bg-emerald-500 px-7 py-3 font-semibold">Take the Free Snapshot</Link></div> : <div className="mx-auto max-w-4xl space-y-6 px-6 py-14">
      <header className="text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-300">Free preliminary Snapshot</p><h1 className="mt-3 text-3xl font-bold">PMS Operations Snapshot</h1><p className="mt-3 text-gray-400">{data.company} | {data.units} units | {data.teamSize} team member{data.teamSize === 1 ? "" : "s"}</p></header>
      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[.06] p-7"><p className="text-sm font-semibold uppercase tracking-[.16em] text-emerald-300">Likely discussion area</p><h2 className="mt-3 text-2xl font-bold">{snapshot.likelyFocus.title}</h2><p className="mt-3 leading-7 text-gray-300">{snapshot.likelyFocus.description}</p></section>
      <section className="grid gap-4 md:grid-cols-2"><Signal label="Follow-through" value={snapshot.responseScore.label} severity={snapshot.responseScore.severity} detail={snapshot.responseScore.message} /><Signal label="Maintenance workflow" value={snapshot.maintenanceScore.label} severity={snapshot.maintenanceScore.severity} detail={snapshot.maintenanceScore.message} /><Signal label="Reporting and approvals" value={snapshot.ownerReportingScore.label} severity={snapshot.ownerReportingScore.severity} detail={snapshot.ownerReportingScore.message} /><Signal label="After-hours internal process" value={snapshot.afterHoursScore.label} severity={snapshot.afterHoursScore.severity} detail={snapshot.afterHoursScore.message} /></section>
      <section className="rounded-3xl border border-white/10 bg-white/[.02] p-7"><h2 className="text-xl font-bold">What a Fit Call checks</h2><ul className="mt-4 space-y-3 text-gray-300">{snapshot.likelyFocus.auditQuestions.map((item) => <li key={item}>• {item}</li>)}</ul><p className="mt-5 text-sm leading-6 text-gray-400">A free 15-minute Fit Call determines whether a PMS Operations Audit is justified. The paid Audit maps priority workflows, reviews available data, assesses current tools, and provides a ranked action plan.</p></section>
      <section className="rounded-3xl border border-white/10 bg-white/[.02] p-7"><h2 className="text-xl font-bold">Useful preparation, if you book</h2><ul className="mt-4 space-y-3 text-gray-300">{snapshot.likelyFocus.preparation.map((item) => <li key={item}>• {item}</li>)}</ul></section>
      <section className="rounded-3xl border border-white/10 bg-white/[.02] p-7"><h2 className="text-xl font-bold">Boundaries</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-gray-400">{snapshot.qualificationNotes.map((item) => <li key={item}>• {item}</li>)}</ul></section>
      <section className="rounded-3xl border border-emerald-500/35 bg-emerald-500/[.08] p-7 text-center"><h2 className="text-2xl font-bold">Decide whether the paid Audit fits.</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-300">The Fit Call is a qualification conversation, not a free full Audit or a commitment to a Build Sprint.</p><a href={`/book?${new URLSearchParams({ name: data.name, email: data.email }).toString()}`} className="mt-6 inline-block rounded-full bg-emerald-500 px-8 py-3.5 font-semibold">Book a 15-Minute Fit Call</a></section>
    </div>}
  </main><Footer /></div>;
}
