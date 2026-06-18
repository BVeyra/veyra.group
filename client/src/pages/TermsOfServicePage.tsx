import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";
import { openCalendly } from "@/lib/calendly";

const sections = [
  {
    title: "1. Services",
    body: "Veyra Group provides workflow audits, automation build services, and ongoing optimization and support for property management operations.",
  },
  {
    title: "2. Fees and Billing",
    body: "Fees, pricing structure, and billing cadence are defined in your service agreement. Unless stated otherwise in writing, payments are due according to the agreed schedule.",
  },
  {
    title: "3. Cancellation",
    body: "You may cancel according to the terms in your service agreement. If service is canceled, access to managed automations and managed support ends.",
  },
  {
    title: "4. Client Responsibilities",
    body: "You are responsible for providing accurate information, maintaining necessary access to your systems, and ensuring your use of our services complies with applicable laws and regulations.",
  },
  {
    title: "5. Intellectual Property",
    body: "Each party retains ownership of its pre-existing intellectual property. Any ownership, license, or usage rights for deliverables are governed by your written agreement with Veyra Group.",
  },
  {
    title: "6. Disclaimers",
    body: "Services are provided on an \"as is\" and \"as available\" basis, except as explicitly stated in a signed agreement. We do not guarantee uninterrupted operation of third-party platforms.",
  },
  {
    title: "7. Limitation of Liability",
    body: "To the maximum extent permitted by law, Veyra Group is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the services.",
  },
  {
    title: "8. Governing Law and Updates",
    body: "These Terms are governed by applicable law in the jurisdiction set forth in your agreement. We may update these Terms from time to time by posting a revised version with a new effective date.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SeoHead
        title="Terms of Service"
        description="Read the Veyra Group terms covering workflow audits, automation build services, billing, cancellation, and support."
        canonicalPath="/terms-of-service"
      />
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
            <Logo className="text-[1.7rem]" />
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
        <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">Terms of Service</h1>
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
              Questions about these Terms can be sent to{" "}
              <a href="mailto:contact@veyragroup.ai" className="text-emerald-400 hover:underline">
                contact@veyragroup.ai
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
