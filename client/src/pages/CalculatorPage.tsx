import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { FileText, LineChart, Route } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const benefitCards = [
  {
    title: "Name the likely stall point",
    copy: "Get a preliminary view of whether ownership, approvals, vendor follow-through, or current-tool use deserves a closer look.",
    icon: FileText,
  },
  {
    title: "Prepare a useful Fit Call",
    copy: "Capture the PMS, workflow, and operating context needed to decide whether a paid Audit is justified.",
    icon: Route,
  },
  {
    title: "Keep the decision honest",
    copy: "The Snapshot is free and preliminary. A full PMS Operations Audit is a paid consulting engagement completed after a Fit Call.",
    icon: LineChart,
  },
];

export default function CalculatorPage() {
  const [calculatorHeight, setCalculatorHeight] = useState(1160);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as { type?: string; height?: number } | null;
      if (!payload || payload.type !== "roi-calculator-height") return;

      const next = Number(payload.height);
      if (!Number.isFinite(next)) return;
      // The results view (report cards + inline calendar) runs well past
      // Track the content rather than clamping it away.
      setCalculatorHeight(Math.max(360, Math.min(4200, Math.round(next))));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const iframeSrc = useMemo(() => {
    if (typeof window === "undefined") {
      return "/roi-calculator.html?theme=dark&entry=full_page";
    }

    const params = new URLSearchParams(window.location.search);
    params.set("theme", "dark");
    params.set("entry", "full_page");
    return `/roi-calculator.html?${params.toString()}`;
  }, []);

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title="Free PMS Operations Snapshot"
        description="Get a preliminary PMS Operations Snapshot and decide whether a 15-minute Fit Call for Veyra's paid PMS Operations Audit is appropriate."
        canonicalPath="/audit"
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto grid gap-10 px-6 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                <FileText className="h-4 w-4" />
                Free preliminary Snapshot for independent property managers
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
                See where the work may stop moving.
                <span className="block bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text text-transparent">
                  Then decide whether an Audit is warranted.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Answer a short set of questions about your PMS and recurring workflows. The Snapshot points to a
                preliminary pattern across ownership, approvals, vendor follow-through, and current-tool use, not a
                savings estimate, performance promise, or free consulting engagement.
              </p>

              <div className="mt-8 space-y-4">
                {benefitCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                          <p className="mt-2 text-sm leading-6 text-gray-400">{card.copy}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-7 max-w-xl text-sm leading-6 text-gray-500">Complete the Snapshot first. Its result will point you to a Fit Call only if a closer operational review may be appropriate.</p>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-3 md:p-5">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0A0A0A]">
                <iframe
                  src={iframeSrc}
                  title="Veyra Group PMS Operations Snapshot"
                  style={{ width: "100%", height: `${calculatorHeight}px`, minHeight: "1160px", border: "0", display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
