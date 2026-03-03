import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/lib/calendly";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, including your name, email address, phone number, company details, and workflow information shared during audits, onboarding, and support conversations.",
  },
  {
    title: "2. How We Use Information",
    body: "We use your information to provide and improve our services, schedule and deliver workflow audits, configure automations, communicate with you, and support your account.",
  },
  {
    title: "3. How We Share Information",
    body: "We do not sell your personal information. We may share information with trusted service providers (such as scheduling, hosting, analytics, and communications vendors) solely to operate our services.",
  },
  {
    title: "4. Data Retention",
    body: "We retain information for as long as needed to provide services, satisfy legal obligations, resolve disputes, and enforce agreements. When data is no longer required, we delete or anonymize it.",
  },
  {
    title: "5. Security",
    body: "We use commercially reasonable safeguards to protect information, including access controls and secure infrastructure practices. No system can guarantee absolute security.",
  },
  {
    title: "6. Your Choices and Rights",
    body: "You may request access, correction, or deletion of your personal information by contacting us. Where required by law, we will honor applicable privacy rights requests.",
  },
  {
    title: "7. Cookies and Similar Technologies",
    body: "Our website may use cookies and similar technologies to understand usage, improve performance, and support core site functionality.",
  },
  {
    title: "8. Updates to This Policy",
    body: "We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised effective date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise-overlay" />
      </div>

      <header className="sticky top-0 z-20 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center">
            <img src="/veyra-logo.svg" alt="Veyra Group" className="h-11 w-auto" loading="eager" draggable={false} />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors"
            >
              ← Back to site
            </Link>
            <Button
              onClick={openCalendly}
              size="sm"
              className="rounded-full bg-emerald-500 text-black font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
            >
              Book a Free Audit
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">Privacy Policy</h1>
        <p className="text-gray-400 mt-4">Effective date: March 3, 2026</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed mt-2">{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-semibold text-white">9. Contact</h2>
            <p className="text-gray-400 leading-relaxed mt-2">
              Questions about this Privacy Policy can be sent to{" "}
              <a href="mailto:bruno@veyragroup.ai" className="text-emerald-400 hover:underline">
                bruno@veyragroup.ai
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
          <Link href="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
