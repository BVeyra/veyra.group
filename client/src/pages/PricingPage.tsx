import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";
import { ArrowRight } from "lucide-react";

const pricingSteps = [
  {
    step: "ONE-TIME BUILD",
    name: "CUSTOM BUILD",
    price: "$1,500 one-time",
    description: "Founding-client introductory rate (first 5 clients).",
    features: [
      "Custom automations around your existing tools",
      "Built and launched in 1-2 weeks",
      "Approve every workflow before go-live",
    ],
  },
  {
    step: "MONTHLY BASE",
    name: "BASE OPERATIONS",
    price: "$500/month",
    description: "Base operations plan. Supports 50+ unit portfolios with no cap.",
    features: ["Monitoring + fast fixes", "Continuous optimization", "Direct support, no ticket queue"],
  },
  {
    step: "USAGE SCALING",
    name: "GROWTH SCALING",
    price: "$5/unit above 50 (no cap)",
    description: "Pricing grows with portfolio size and automation load.",
    features: ["Predictable unit-based scaling", "No annual contracts", "No hidden platform or seat fees"],
  },
];

export default function PricingPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Pricing | Veyra Group",
      description:
        "Veyra pricing for independent property managers: a one-time custom build, a flat monthly base, and simple per-unit scaling. No annual contracts.",
      url: "https://veyragroup.ai/pricing",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SeoHead
        title="Pricing"
        description="Veyra pricing for independent property managers: a one-time custom build, a flat monthly base, and simple per-unit scaling. No annual contracts. The audit and first call are free."
        canonicalPath="/pricing"
        structuredData={structuredData}
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Pricing</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
              Less than a part-time hire. More than a full-time employee could do.
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-gray-400">
              Clear pricing. No annual contracts. No surprise charges. The audit and your first call are always free —
              you only pay once we agree on a workflow worth building.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
              {pricingSteps.map((plan, index) => (
                <div key={plan.name} className="contents">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                    <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-2">{plan.step}</p>
                    <h3 className="text-lg font-semibold text-white mb-3">{plan.name}</h3>
                    <p className="text-3xl font-bold text-emerald-300 mb-2">{plan.price}</p>
                    <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                          <span className="text-emerald-400 mt-[1px]">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index < pricingSteps.length - 1 && (
                    <div className="flex items-center justify-center relative min-w-[56px]">
                      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-emerald-500/20" />
                      <span className="relative z-10 text-emerald-500/30 text-2xl bg-[#050505] px-2">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="md:hidden space-y-4">
              {pricingSteps.map((plan) => (
                <div key={plan.name} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                  <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-2">{plan.step}</p>
                  <h3 className="text-lg font-semibold text-white mb-3">{plan.name}</h3>
                  <p className="text-3xl font-bold text-emerald-300 mb-2">{plan.price}</p>
                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-emerald-400 mt-[1px]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-8 mt-8 text-center">
              <p className="text-gray-400 mb-4">A part-time admin costs about $2,500/month and still cannot handle tenant ops 24/7.</p>
              <p className="text-white text-xl font-semibold">
                The question isn't whether you can afford this. It's how much longer you can afford to do it all manually.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                >
                  <a href="/audit?source=pricing">
                    Get Your Free Audit
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </Button>
                <Button
                  onClick={openCalendly}
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06]"
                >
                  Book a call instead
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
