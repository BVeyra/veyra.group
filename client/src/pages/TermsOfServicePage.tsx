import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";

const sections = [
  {
    title: "1. The Services",
    body: "Veyra Group provides PMS Operations Audits, property-management operations consulting, and, where separately agreed in a written statement of work, scoped implementation services. Veyra does not provide a live tenant or vendor communication service, vendor dispatch, emergency or on-call coverage, payment processing, or broad PMS writeback. Veyra does not provide legal, accounting, or financial advice and does not move or hold client or tenant funds.",
  },
  {
    title: "2. Eligibility and Accounts",
    body: "You must be a business or an authorized representative of a business, and at least 18 years old, to use the Services. You are responsible for the accuracy of information you provide and for maintaining the confidentiality of any account credentials.",
  },
  {
    title: "3. Client Responsibilities and Acceptable Use",
    body: "Clients are responsible for the rules, approval thresholds, and content they configure, for obtaining tenant/owner consent to be contacted, and for compliance with applicable laws including the Telephone Consumer Protection Act (TCPA), the Fair Housing Act, and state landlord-tenant and debt-collection regulations. You agree not to use the Services for unlawful, harassing, deceptive, or abusive communications. Where you supply mobile numbers of others (for example, a property manager supplying tenant numbers), you represent that you have obtained the necessary consent for those individuals to be contacted.",
  },
  {
    title: "4. Fees",
    body: "Fees, payment terms, deliverables, and cancellation terms, where applicable, are set out in a separate written proposal, statement of work, or agreement with Veyra. No service scope or delivery commitment is created by a Free PMS Operations Snapshot or Fit Call.",
  },
  {
    title: "5. Intellectual Property",
    body: "Veyra retains all rights in the Services, software, and materials we provide. You retain ownership of your data; you grant Veyra a limited license to process it solely to provide the Services.",
  },
  {
    title: "6. Disclaimers",
    body: "The Services are provided \"as is\" and \"as available.\" To the fullest extent permitted by law, Veyra disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee uninterrupted operation of third-party platforms.",
  },
  {
    title: "7. Limitation of Liability",
    body: "To the fullest extent permitted by law, Veyra will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits or revenues. Our total liability for any claim arising out of the Services will not exceed the amounts you paid to Veyra in the three (3) months preceding the claim.",
  },
  {
    title: "8. Indemnification",
    body: "You agree to indemnify and hold Veyra harmless from claims arising out of your misuse of the Services or your violation of these Terms or applicable law, including communications sent without required consent.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms are governed by the laws of the State of Ohio, without regard to conflict-of-laws rules. Venue for disputes lies in the state and federal courts located in Cuyahoga County, Ohio.",
  },
  {
    title: "10. Changes",
    body: "We may update these Terms from time to time. Continued use of the Services after changes take effect constitutes acceptance of the updated Terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SeoHead
        title="Terms of Service"
        description="Read the Veyra Group terms covering PMS Operations Audits, consulting, scoped implementation services, billing, cancellation, and support."
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
            <Button asChild size="sm" className="rounded-full bg-emerald-500 text-white font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition">
              <Link href="/audit">Take the Free Snapshot</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">Terms of Service</h1>
        <p className="text-gray-400 mt-4">Effective date: July 24, 2026</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed mt-2">{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-semibold text-white">11. SMS Messaging Program</h2>
            <div className="text-gray-400 leading-relaxed mt-2 space-y-3">
              <p>
                <span className="text-white/80 font-medium">Program name:</span>{" "}
                Veyra Group SMS Program.
              </p>
              <p>
                <span className="text-white/80 font-medium">Description:</span>{" "}
                Veyra Group sends text messages to individuals who have voluntarily opted in,
                including PMS Operations Snapshot and Fit Call scheduling, updates relating to a
                paid engagement, and customer-care replies. Recipients opt in through the consent form at{" "}
                <a href="/sms" className="text-emerald-400 hover:underline">veyragroup.ai/sms</a>{" "}
                by entering their mobile number and checking a separate, optional consent box.
                Opting in to text messages is entirely optional and is not a condition of
                purchasing, using, or continuing any Veyra Group product or service, and it is not
                bundled with these Terms or any other agreement.
              </p>
              <p>
                <span className="text-white/80 font-medium">Message frequency:</span>{" "}
                Message frequency varies based on your activity and service needs.
              </p>
              <p>
                <span className="text-white/80 font-medium">Message and data rates:</span>{" "}
                Message and data rates may apply, according to your mobile carrier plan.
              </p>
              <p>
                <span className="text-white/80 font-medium">Help and opt-out:</span>{" "}
                Reply <strong className="text-white font-semibold">HELP</strong> for help, or
                reply <strong className="text-white font-semibold">STOP</strong> to unsubscribe
                at any time. After you reply STOP, you will receive a final confirmation and no
                further messages will be sent.
              </p>
              <p>
                <span className="text-white/80 font-medium">Support:</span>{" "}
                For help, contact us at{" "}
                <a href="mailto:contact@veyragroup.ai" className="text-emerald-400 hover:underline">
                  contact@veyragroup.ai
                </a>{" "}
                or (220) 244-4213.
              </p>
              <p>
                <span className="text-white/80 font-medium">Carrier liability:</span>{" "}
                Carriers are not liable for any delayed or undelivered messages.
              </p>
              <p>
                Mobile opt-in information and consent are never shared with third parties or
                affiliates for marketing or promotional purposes. For details on how we handle
                your data, see our{" "}
                <a href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">12. Contact</h2>
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
