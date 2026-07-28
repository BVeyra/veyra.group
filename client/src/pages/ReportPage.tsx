import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import {
  buildAuditInsights,
  type AuditInsights,
  type AuditLeadData,
  type Severity,
} from "@shared/auditEngine";

const CALENDLY_EMBED_URL =
  "https://calendly.com/veyragroup/15min?background_color=050505&text_color=e5e7eb&primary_color=0f7a55&hide_gdpr_banner=1";

const severityClasses: Record<Severity, string> = {
  green: "bg-emerald-500/15 text-emerald-300",
  yellow: "bg-yellow-500/15 text-yellow-300",
  orange: "bg-orange-500/15 text-orange-300",
  red: "bg-red-500/15 text-red-300",
};

function SignalRow({ label, severity, value }: { label: string; severity: Severity; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-2.5 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${severityClasses[severity]}`}>{value}</span>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 py-2.5 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">{label}</div>
      {children}
    </div>
  );
}

function InlineCalendly({ name, email }: { name: string; email: string }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    const init = () => {
      const calendly = (window as any).Calendly;
      if (!calendly?.initInlineWidget || !slotRef.current) return;
      slotRef.current.innerHTML = "";
      // Calendly reads name/email prefill from the scheduling URL itself.
      const embedUrl = new URL(CALENDLY_EMBED_URL);
      if (name) embedUrl.searchParams.set("name", name);
      if (email) embedUrl.searchParams.set("email", email);
      calendly.initInlineWidget({
        url: embedUrl.toString(),
        parentElement: slotRef.current,
        prefill: { name, email },
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
    if (existing) {
      if ((window as any).Calendly?.initInlineWidget) init();
      else existing.addEventListener("load", init, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [name, email]);

  return <div ref={slotRef} className="min-h-[640px] overflow-hidden rounded-2xl bg-black/25" />;
}

function ReportBody({ data, insights }: { data: AuditLeadData; insights: AuditInsights }) {
  const nextBuilds = insights.roadmap.slice(1, 3);
  const showInlineCalendar = insights.tier === "high";

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-6 py-14">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">PM Operations Audit</h1>
        <p className="mt-2 text-gray-400">
          {data.company} · {data.units} units · {data.teamSize} team member{data.teamSize > 1 ? "s" : ""}
        </p>
        <p className="mt-1 text-sm text-gray-500">Prepared for {data.name}</p>
      </div>

      <Card label="Operating Load">
        <h3 className="mb-3 text-lg font-bold text-white">
          ~{insights.estimatedWeeklyBusyworkHours} hours/week of repeatable work
        </h3>
        <StatRow label="Units per team member" value={`${insights.ratio}:1`} />
        <StatRow label="Capacity read" value={insights.capacityLabel} />
        <StatRow label="Part-time admin equivalent" value={`${insights.partTimeAdminEquivalent}x`} />
        <StatRow label="Monthly admin load" value={`$${insights.monthlyAdminEquivalent.toLocaleString()}`} />
        <StatRow label="Estimated first-activation giveback" value={`${insights.estimatedWeeklyTimeSaved} hrs/week`} />
        <p className="mt-4 rounded-xl border-l-2 border-emerald-500 bg-emerald-500/10 p-4 text-sm leading-6 text-gray-300">
          {insights.capacityNote}
        </p>
      </Card>

      <Card label="Workflow Signals">
        <h3 className="mb-3 text-lg font-bold text-white">Where the pressure is showing up</h3>
        <SignalRow label="Response coverage" severity={insights.responseScore.severity} value={insights.responseScore.label} />
        <SignalRow label="Maintenance workflow" severity={insights.maintenanceScore.severity} value={insights.maintenanceScore.label} />
        <SignalRow label="After-hours coverage" severity={insights.afterHoursScore.severity} value={insights.afterHoursScore.label} />
        <SignalRow label="Owner reporting" severity={insights.ownerReportingScore.severity} value={insights.ownerReportingScore.label} />
        <SignalRow label="Rent collection" severity={insights.rentCollectionScore.severity} value={insights.rentCollectionScore.label} />
        <StatRow label="Current stack" value={`${data.pmSoftware} · ${insights.stackLabel}`} />
        <p className="mt-4 rounded-xl border-l-2 border-emerald-500 bg-emerald-500/10 p-4 text-sm leading-6 text-gray-300">
          {insights.stackNote}
        </p>
      </Card>

      <Card label="Recommended First Activation">
        <h3 className="text-lg font-bold text-white">{insights.primaryRecommendation.title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-300">{insights.primaryRecommendation.description}</p>
        <p className="mt-4 rounded-xl border-l-2 border-emerald-500 bg-emerald-500/10 p-4 text-sm leading-6 text-gray-300">
          {insights.primaryRecommendation.fitNote}
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-400">{insights.primaryRecommendation.whyThisFirst}</p>
        <ul className="mt-4 space-y-2">
          {insights.primaryRecommendation.replaces.map((item) => (
            <li key={item} className="flex gap-3 border-b border-white/10 pb-2 text-sm text-gray-400 last:border-0">
              <span className="font-bold text-emerald-400">→</span>
              <span>
                <strong className="text-white">Replace</strong>
                <br />
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card label="What Good Looks Like In 30 Days">
        <h3 className="text-lg font-bold text-white">
          {insights.estimatedWeeklyTimeSaved} hours back is realistic if the workflow gets scoped correctly.
        </h3>
        <ul className="mt-4 space-y-2">
          {insights.primaryRecommendation.first30Days.map((item) => (
            <li key={item} className="flex gap-3 border-b border-white/10 pb-2 text-sm text-gray-400 last:border-0">
              <span className="font-bold text-emerald-400">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {nextBuilds.length > 0 && (
          <p className="mt-4 rounded-xl border-l-2 border-emerald-500 bg-emerald-500/10 p-4 text-sm leading-6 text-gray-300">
            <strong className="text-white">Next in the activation sequence:</strong>{" "}
            {nextBuilds.map((item) => item.title).join(" · ")}
          </p>
        )}
      </Card>

      <Card label="Bring This To The Audit Call">
        <h3 className="text-lg font-bold text-white">Useful prep if the report feels directionally right</h3>
        <ul className="mt-4 space-y-2">
          {insights.primaryRecommendation.callPrep.map((item) => (
            <li key={item} className="flex gap-3 border-b border-white/10 pb-2 text-sm text-gray-400 last:border-0">
              <span className="font-bold text-emerald-400">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-7 text-center">
        <h3 className="text-xl font-bold text-white">Next step: 15-minute operations audit call</h3>
        <p className="mt-2 text-sm leading-6 text-gray-300">
          Bruno maps the current process behind {insights.primaryAngle}, shows what the first activation should replace, and
          pressure-tests whether the time savings justify moving.
        </p>
        {showInlineCalendar ? (
          <div className="mt-5">
            <InlineCalendly name={data.name} email={data.email} />
          </div>
        ) : (
          <a
            href={`/book?${new URLSearchParams({ name: data.name, email: data.email }).toString()}`}
            className="mt-5 inline-block rounded-full bg-emerald-500 px-8 py-3.5 font-bold text-white transition hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Book the Operations Audit Call
          </a>
        )}
        <p className="mt-4 text-xs text-gray-500">Directional diagnostic only. Book if the first-activation recommendation feels right.</p>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const [decoded, setDecoded] = useState<AuditLeadData | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("d") || "";
    if (!token) { setLoaded(true); return; }
    const controller = new AbortController();
    void fetch(`/api/report-data?d=${encodeURIComponent(token)}`, { signal: controller.signal })
      .then(async (response) => response.ok ? response.json() as Promise<{ data?: AuditLeadData }> : null)
      .then((payload) => setDecoded(payload?.data || null))
      .catch(() => setDecoded(null))
      .finally(() => setLoaded(true));
    return () => controller.abort();
  }, []);
  const insights = useMemo(() => (decoded ? buildAuditInsights(decoded) : null), [decoded]);

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title="Your PM Operations Audit Report"
        description="Personalized PM Operations Audit report from Veyra Group."
        robots="noindex, nofollow"
      />
      <Navbar />
      <main className="pt-20">
        {!loaded ? (
          <div className="mx-auto max-w-xl px-6 py-24 text-center"><p className="leading-7 text-gray-400">Loading your report…</p></div>
        ) : decoded && insights ? (
          <ReportBody data={decoded} insights={insights} />
        ) : (
          <div className="mx-auto max-w-xl px-6 py-24 text-center">
            <h1 className="text-3xl font-bold text-white">Report link not recognized</h1>
            <p className="mt-4 leading-7 text-gray-400">
              This report link is incomplete or has been altered. Run the audit again to generate a fresh report. It
              takes about two minutes.
            </p>
            <Link
              href="/audit"
              className="mt-8 inline-block rounded-full bg-emerald-500 px-8 py-3.5 font-bold text-white transition hover:shadow-lg hover:shadow-emerald-500/30"
            >
              Run the Free Operations Audit
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
