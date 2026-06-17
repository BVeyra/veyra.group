import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/calendly";
import { ArrowRight, FileText, LineChart, Mail } from "lucide-react";
import { useMemo } from "react";

const benefitCards = [
  {
    title: "Specific first-build recommendation",
    copy: "The report points to the workflow Veyra should fix first instead of dumping you into a generic ROI score.",
    icon: FileText,
  },
  {
    title: "Directional workload math",
    copy: "See how much repeatable admin load is sitting on the team before you ever take a call.",
    icon: Mail,
  },
  {
    title: "Honest next step",
    copy: "If the report shows a real wedge, book the call. If not, you still leave with a clearer read on the workflow.",
    icon: LineChart,
  },
];

export default function CalculatorPage() {
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
        title="Free PM Workflow Audit"
        description="Run Veyra's PM Workflow Audit, get the report by email, and see which workflow should be fixed first."
        canonicalPath="/audit"
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto grid gap-10 px-6 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                <FileText className="h-4 w-4" />
                Free report for independent property managers
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
                Run the workflow audit first.
                <span className="block bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text text-transparent">
                  Book the call second.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Get a concrete first-build recommendation, a directional read on repeatable admin load, and only take
                the call if the workflow looks worth fixing.
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

              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-7 rounded-full border-white/15 bg-white/[0.02] px-8 py-4 text-gray-100 hover:bg-white/[0.05]"
              >
                <a href={BOOKING_URL}>
                  Prefer to talk first
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-3 md:p-5">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0A0A0A]">
                <iframe
                  src={iframeSrc}
                  title="Veyra Group PM Workflow Audit"
                  style={{ width: "100%", minHeight: "1160px", border: "0", display: "block" }}
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
