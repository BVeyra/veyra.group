import { Footer, Navbar } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";
import { ArrowRight, BarChart3, DollarSign, FileText, Mail, MessageSquare, Users, Wrench } from "lucide-react";

const workflowValue = [
  {
    icon: MessageSquare,
    name: "Tenant communications",
    value: "Replies in seconds instead of hours. Your evenings and weekends back.",
  },
  {
    icon: Wrench,
    name: "Maintenance coordination",
    value: "8–12 hours a week back. Intake, dispatch, and updates handled.",
  },
  {
    icon: FileText,
    name: "Lease tracking & renewals",
    value: "Renewals triggered early and automatically. Protects occupancy.",
  },
  {
    icon: DollarSign,
    name: "Rent-collection follow-ups",
    value: "On-time, on-brand reminders. Fewer late payments to chase.",
  },
  {
    icon: Users,
    name: "Vendor management",
    value: "Coordinate vendors without the phone tag.",
  },
  {
    icon: Mail,
    name: "Prospect auto-response",
    value: "Leads answered in seconds. More showings booked.",
  },
  {
    icon: BarChart3,
    name: "Owner reporting",
    value: "30+ hours a month of report prep, gone.",
  },
];

export default function PricingPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Pricing | Veyra Group",
      description:
        "Veyra pricing is custom and value-based. We scope your build and monthly management to the workflows you need and quote it on a free audit. No annual contracts.",
      url: "https://veyragroup.ai/pricing",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title="Pricing"
        description="Veyra pricing is custom and value-based. We scope your build and monthly management to the workflows you need and quote it on a free audit. No annual contracts. The audit and first call are free."
        canonicalPath="/pricing"
        structuredData={structuredData}
      />
      <Navbar />

      <main className="pt-20">
        <section className="border-b border-white/5">
          <div className="max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Pricing</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.02em] md:text-6xl">
              Every build is different. So is the price.
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-gray-400">
              Your price depends on which workflows you build and the size of your operation. We scope it on your free
              audit and give you an exact quote. No annual contract.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">What we automate</h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Build any combination. We scope your setup and monthly management to the ones you need.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workflowValue.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="glass-card rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-10 mt-10 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-white">How pricing works</h2>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Every build is different, so we don't post a flat rate. On the free audit we map your workflows, recommend
                where to start, and give you an exact build and monthly quote. You only pay once we agree it's worth building.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Veyra is built for independent firms running 50–500 doors ready to automate real operations, not a
                $20-a-month app.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-white font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
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
