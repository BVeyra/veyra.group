import DashboardMockup from "@/components/marketing/DashboardMockup";
import TenantChatMockup from "@/components/marketing/TenantChatMockup";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function DemoPage() {
  const [dashboardKey, setDashboardKey] = useState(0);
  const [chatKey, setChatKey] = useState(0);

  const handleReset = () => {
    setDashboardKey((prev) => prev + 1);
    setChatKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise-overlay" />
      </div>

      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <img src="/veyra-logo.svg" alt="Veyra Group" className="h-11 w-auto" loading="eager" draggable={false} />
            </Link>
            <span className="hidden md:inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs tracking-[0.14em] uppercase text-emerald-300">
              Live Demo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-full border-white/15 text-gray-200 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Demo
            </Button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              Back to site
            </Link>
            <Button
              onClick={openCalendly}
              className="rounded-full bg-emerald-500 text-black font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
            >
              Book a Free Audit
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-12">
        <section className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.08]">
            Interactive Product Demo
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-4xl leading-relaxed">
            This is a standalone mock environment for clients to test workflows. Use dashboard actions, send tenant messages, and reset the state anytime.
          </p>
        </section>

        <section className="grid xl:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:p-4">
            <DashboardMockup key={dashboardKey} />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <TenantChatMockup key={chatKey} interactive />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-lg font-semibold text-white mb-3">How to test this demo</h2>
              <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                <li>1. In the dashboard queue, click `Approve AI Draft` or `Edit & Send`.</li>
                <li>2. Confirm queue totals and confidence values update.</li>
                <li>3. In tenant chat, type a message and press Enter to send.</li>
                <li>4. Watch the mock typing indicator and automated response.</li>
                <li>5. Use `Reset Demo` to restore the default state instantly.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
