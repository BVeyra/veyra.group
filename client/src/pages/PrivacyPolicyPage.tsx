import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";
import { openCalendly } from "@/lib/calendly";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SeoHead
        title="Privacy Policy"
        description="Review how Veyra Group collects, uses, and protects information across the website, workflow audits, and our automation services."
        canonicalPath="/privacy"
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
              className="rounded-full bg-emerald-500 text-white font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
            >
              Book a Free Audit
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">Privacy Policy</h1>
        <p className="text-gray-400 mt-4">Effective date: June 29, 2026</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-10">

          {/* Intro */}
          <section>
            <p className="text-gray-400 leading-relaxed">
              Veyra Group ("Veyra," "we," "us," or "our") operates the website{" "}
              <a href="https://veyragroup.ai" className="text-emerald-400 hover:underline">veyragroup.ai</a>{" "}
              and provides done-for-you workflow automation services for property management
              businesses. This Privacy Policy explains how we collect, use, share, and protect
              your information when you use our website, request a workflow audit, or use our
              services.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-4">
              <p>We may collect the following categories of information:</p>

              <div>
                <h3 className="text-white/80 font-medium mb-1">Information you provide directly</h3>
                <p>
                  Your name, email address, phone number, company details, and any workflow
                  information you share when you request an audit, onboard, or contact us for
                  support.
                </p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-1">Account and authentication data</h3>
                <p>
                  If you create an account to access a Veyra dashboard or service, we collect the
                  login and profile information you provide so we can give you access and operate
                  the service for you.
                </p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-1">Usage and technical data</h3>
                <p>
                  Information collected automatically when you visit our website, such as IP
                  address, browser type, device information, pages visited, and referring URLs.
                </p>
              </div>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-2">
              <p>We use the information we collect to:</p>
              <p>
                Provide, operate, and improve our services; schedule and deliver workflow audits
                and the resulting reports; configure, run, and support the automations we build
                for you; communicate with you by email or text message about your account, your
                audits, or our services; respond to your requests, questions, or support needs;
                comply with legal obligations; and protect the security of our services and users.
              </p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white">3. How We Share Your Information</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-3">
              <p>
                We do not sell your personal information. We share information only in the
                following limited circumstances:
              </p>
              <p>
                With trusted service providers who help us operate our services — such as website
                hosting, email delivery, scheduling, text-messaging, and analytics providers —
                solely to the extent necessary for them to perform their functions; when required
                by law, regulation, legal process, or governmental request; and to protect the
                rights, safety, or property of Veyra, our users, or the public.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white">4. Data Retention</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We retain your personal information for as long as your account is active or as
              needed to provide services, comply with legal obligations, resolve disputes, and
              enforce agreements. When data is no longer required, we delete or anonymize it.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white">5. Your Rights and Choices</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-3">
              <p>You have the following rights regarding your data:</p>
              <p>
                <span className="text-white/80 font-medium">Access and correction:</span>{" "}
                You may request access to or correction of your personal information at any time
                by contacting us.
              </p>
              <p>
                <span className="text-white/80 font-medium">Deletion:</span>{" "}
                You may request deletion of your personal information. Upon receiving a verified
                request, we will delete your data unless retention is required by law.
              </p>
              <p>
                <span className="text-white/80 font-medium">Opt-out:</span>{" "}
                You may opt out of marketing emails at any time by following the unsubscribe
                instructions in any email we send, and you may opt out of text messages at any
                time by replying STOP.
              </p>
              <p>
                Where required by applicable law (including GDPR and CCPA), we will honor all
                applicable privacy rights requests.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white">6. Security</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We use commercially reasonable technical and organizational safeguards to protect
              your information, including encryption in transit (TLS), access controls, and secure
              infrastructure practices. No system can guarantee absolute security, and we will
              promptly notify affected users and relevant authorities in the event of a data
              breach as required by law.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white">7. Cookies and Similar Technologies</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our website may use cookies and similar technologies to maintain your session,
              understand usage patterns, improve site performance, and support core functionality.
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white">8. Third-Party Services</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our website and services may integrate with third-party platforms, such as your
              property management software, scheduling tools, payment processors, and
              communication providers. Your use of those platforms is subject to their own privacy
              policies and terms of service. We are not responsible for the privacy practices of
              third-party services.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white">9. Children's Privacy</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our services are not directed to individuals under the age of 16. We do not
              knowingly collect personal information from children. If we become aware that
              we have collected data from a child, we will promptly delete it.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white">10. Updates to This Policy</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We may update this Privacy Policy from time to time. Any updates will be posted
              on this page with a revised effective date. If we make material changes, we will
              notify you by email or through a prominent notice on our website.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white">11. SMS / Text Messaging</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-3">
              <p>
                With your consent, Veyra Group may send you text (SMS) messages related to our
                services — including workflow audit scheduling, account and onboarding updates,
                service notifications, and responses to your support requests.
              </p>
              <p>
                <span className="text-white/80 font-medium">Consent:</span>{" "}
                We only send text messages to individuals who have opted in — for example, by
                providing a mobile number and agreeing to be contacted during an audit request,
                onboarding, or in a signed service agreement. Consent to receive text messages is
                not a condition of purchasing any product or service.
              </p>
              <p>
                <span className="text-white/80 font-medium">Message frequency and rates:</span>{" "}
                Message frequency varies based on your activity and service needs. Message and
                data rates may apply.
              </p>
              <p>
                <span className="text-white/80 font-medium">Opt-out and help:</span>{" "}
                You can opt out of text messages at any time by replying{" "}
                <span className="text-white/80 font-medium">STOP</span> to any message. After you
                opt out, you will receive a final confirmation and we will stop sending texts.
                Reply <span className="text-white/80 font-medium">HELP</span> for assistance, or
                contact us at{" "}
                <a href="mailto:contact@veyragroup.ai" className="text-emerald-400 hover:underline">
                  contact@veyragroup.ai
                </a>.
              </p>
              <p>
                <span className="text-white/80 font-medium">No sharing of mobile data:</span>{" "}
                Mobile opt-in information and text messaging consent will never be shared with
                third parties or affiliates for marketing or promotional purposes, and we do not
                sell your mobile information.
              </p>
            </div>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white">12. Contact</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              If you have questions about this Privacy Policy, your data, or wish to exercise
              any of your rights, please contact us at{" "}
              <a href="mailto:contact@veyragroup.ai" className="text-emerald-400 hover:underline">
                contact@veyragroup.ai
              </a>.
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
