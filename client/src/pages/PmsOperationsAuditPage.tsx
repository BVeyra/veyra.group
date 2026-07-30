import { ArrowRight, Check, FileSearch, Route, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";

const auditWork = [
  "Map how up to three priority workflows move today, including intake, ownership, approvals, handoffs, follow-through, and closeout.",
  "Review the available operating evidence and the current PMS, configuration, and specialist tools around the work.",
  "Separate a process or adoption problem from a verified recurring gap that needs a more focused solution.",
];

const outcomes = [
  "Configure or use the current PMS more effectively.",
  "Clarify ownership, procedures, approvals, and closeout expectations.",
  "Use a specialist tool where it is the least-complex answer.",
  "Scope a Workflow Build Sprint only when the recurring gap is verified.",
];

export default function PmsOperationsAuditPage() {
  return <div className="min-h-screen text-white"><SeoHead title="PMS Operations Audit for Property Managers" description="A decision-quality review of priority property-management workflows, current tools, and operating gaps." canonicalPath="/pms-operations-audit" /><Navbar />
    <main className="pt-20">
      <section className="border-b border-white/5"><div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-300">PMS Operations Audit</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-.02em] md:text-6xl">A decision-quality view of the work before you change it.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">The PMS Operations Audit establishes how priority work actually moves through one operating team, where the process stalls, what the current tools can already support, and what should happen next.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full bg-emerald-500 px-7"><Link href="/book?source=audit_service_primary">Book a 15-Minute Fit Call <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-full border-white/15 px-7"><Link href="/audit?source=audit_service_secondary">Take the Free Snapshot</Link></Button></div>
        </div><aside className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[.06] p-7"><p className="text-sm font-semibold uppercase tracking-[.16em] text-emerald-300">The engagement is for a decision</p><p className="mt-4 text-xl font-semibold leading-8">Not a generic automation recommendation. Not a promise that custom software is the answer.</p><p className="mt-4 leading-7 text-gray-400">The Fit Call determines whether the Audit is appropriate before an engagement begins.</p></aside></div>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-20"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-300">What Veyra examines</p><h2 className="mt-4 text-3xl font-bold">The operating facts behind the recurring stall.</h2><p className="mt-5 leading-8 text-gray-400">The Audit is grounded in one team and its actual workflow, not a software feature checklist.</p></div><div className="space-y-4">{auditWork.map((item, index) => <article key={item} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[.02] p-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-semibold text-emerald-300">{index + 1}</span><p className="leading-7 text-gray-300">{item}</p></article>)}</div></div></section>

      <section className="border-y border-white/5 bg-white/[.015]"><div className="mx-auto max-w-6xl px-6 py-20"><div className="grid gap-5 md:grid-cols-3"><article className="rounded-3xl border border-white/10 p-7"><FileSearch className="h-6 w-6 text-emerald-300" /><h2 className="mt-5 text-xl font-bold">Current state</h2><p className="mt-3 leading-7 text-gray-400">A shared view of the workflow, operating evidence, tool use, and the points where work stops moving.</p></article><article className="rounded-3xl border border-white/10 p-7"><Route className="h-6 w-6 text-emerald-300" /><h2 className="mt-5 text-xl font-bold">Priorities and owners</h2><p className="mt-3 leading-7 text-gray-400">Root-cause findings, ranked issues, accountable owners, and the decisions needed to move the work forward.</p></article><article className="rounded-3xl border border-white/10 p-7"><ShieldCheck className="h-6 w-6 text-emerald-300" /><h2 className="mt-5 text-xl font-bold">A practical next step</h2><p className="mt-3 leading-7 text-gray-400">An executive readout and action plan that favors the least-complex solution that can work.</p></article></div></div></section>

      <section className="mx-auto max-w-6xl px-6 py-20"><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-300">Possible outcomes</p><h2 className="mt-4 text-3xl font-bold">The recommendation can be simple.</h2><p className="mt-5 max-w-2xl leading-8 text-gray-400">Veyra does not begin with a custom-build assumption. The appropriate answer follows the evidence.</p></div><ul className="space-y-4">{outcomes.map((item) => <li key={item} className="flex gap-3 text-gray-300"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul></div></section>

      <section className="border-t border-white/5 bg-emerald-500/[.06] py-20 text-center"><div className="mx-auto max-w-3xl px-6"><h2 className="text-3xl font-bold">Start with the Fit Call.</h2><p className="mt-4 leading-7 text-gray-300">Fifteen minutes to work out whether the Audit is the right next step for your operating team.</p><Button asChild size="lg" className="mt-7 rounded-full bg-emerald-500 px-8"><Link href="/book?source=audit_service_footer">Book a 15-Minute Fit Call</Link></Button></div></section>
    </main><Footer /></div>;
}
