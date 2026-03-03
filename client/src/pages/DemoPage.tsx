import { Footer, Navbar } from "@/components/layout";
import DashboardMockup from "@/components/marketing/DashboardMockup";
import TenantChatMockup from "@/components/marketing/TenantChatMockup";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const demoFaqItems = [
  {
    q: "Is this connected to live tenant data?",
    a: "No. This is a safe mock-data demo environment so you can test interactions without touching production systems.",
  },
  {
    q: "Do the action buttons in the dashboard actually work?",
    a: "Yes. Approve, edit, reopen, and chat send controls all run mock state transitions so you can test the full interaction flow.",
  },
  {
    q: "Can we customize this demo to our portfolio workflows?",
    a: "Yes. We can customize the demo data and flows for your portfolio, vendors, and communication style during onboarding.",
  },
];

export default function DemoPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <main className="pt-20">
        <section id="features" className="py-16 md:py-28 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">What changes when the busywork handles itself.</h1>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">You wake up and your inbox isn't a disaster.</strong> Tenant messages from overnight? Already drafted responses waiting for your review. Maintenance requests? Logged, categorized, and dispatched.
                </p>
                <p>
                  <strong className="text-white">That prospect who inquired at 2 AM?</strong> They got a personalized response in 90 seconds. They're already scheduled for a showing.
                </p>
                <p>
                  <strong className="text-white">Rent is 3 days late?</strong> The follow-up sequence already started. Friendly, professional, on-brand - like you wrote it yourself. Because you did. Once.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">⚡ 90-second response</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">📉 80% fewer manual tasks</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">🌙 24/7 coverage</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                  <p className="text-gray-200 italic">
                    "Veyra doesn't replace your judgment. We automate everything between the decision and the doing."
                  </p>
                </div>
              </div>
            </motion.div>

            <div id="process" className="mt-12 md:mt-16 scroll-mt-28">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                <DashboardMockup />
              </motion.div>
            </div>

            <div id="pricing" className="mt-10 scroll-mt-28">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              >
                <TenantChatMockup />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-16 md:py-20 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Interactive Demo Controls</h2>
              <p className="text-gray-400 mt-3">
                Try the dashboard approval actions and tenant chat send flow above. All interactions run on mock data only.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  variant="outline"
                  className="rounded-full px-6 py-2 border-white/15 text-gray-200 hover:text-white"
                >
                  Reset Demo View
                </Button>
                <Button
                  onClick={openCalendly}
                  className="rounded-full bg-emerald-500 text-black font-semibold px-6 py-2 h-auto hover:bg-emerald-400 transition"
                >
                  Book a Free Audit
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24 scroll-mt-28">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Demo FAQ</h2>
            <div className="border-t border-white/5">
              {demoFaqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={item.q} className="border-b border-white/5 py-6">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left text-lg text-white font-medium flex justify-between items-center"
                    >
                      <span>{item.q}</span>
                      <span className="ml-6 text-gray-400">
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-400 mt-4 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
