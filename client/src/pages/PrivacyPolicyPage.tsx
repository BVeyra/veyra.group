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
        description="Review how Veyra Group collects, uses, and protects information across the website, audits, and connected services."
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
        <p className="text-gray-400 mt-4">Effective date: March 4, 2026</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-10">

          {/* Intro */}
          <section>
            <p className="text-gray-400 leading-relaxed">
              Veyra Group ("Veyra," "we," "us," or "our") operates the website{" "}
              <a href="https://veyragroup.ai" className="text-emerald-400 hover:underline">veyragroup.ai</a>{" "}
              and related services. This Privacy Policy explains how we collect, use, share, and protect your
              information when you use our website and services, including features that integrate with
              third-party platforms such as LinkedIn.
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
                  Your name, email address, phone number, company details, and any workflow information
                  you share during audits, onboarding, or support conversations.
                </p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-1">Account and authentication data</h3>
                <p>
                  If you create an account or authenticate via a third-party service (such as LinkedIn OAuth),
                  we receive the profile information you authorize during the authentication flow. This may
                  include your name, profile URL, email address, and profile picture.
                </p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-1">LinkedIn data</h3>
                <p>
                  When you connect your LinkedIn account, we access your LinkedIn post and content
                  engagement metrics (impressions, reactions, comments, shares, and follower
                  analytics) through the LinkedIn API. We only access the data you explicitly authorize
                  during the LinkedIn OAuth consent flow. We do not access your private messages, connections
                  list, or any data beyond the scopes you approve.
                </p>
              </div>

              <div>
                <h3 className="text-white/80 font-medium mb-1">Usage and technical data</h3>
                <p>
                  Information collected automatically when you visit our website, such as IP address,
                  browser type, device information, pages visited, and referring URLs.
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
                Provide, operate, and improve our services; display your LinkedIn content performance
                metrics and analytics within the Veyra dashboard; communicate with you about your
                account or our services; schedule and deliver workflow audits and configure automations;
                respond to your requests, questions, or support needs; comply with legal obligations;
                and protect the security of our services and users.
              </p>
              <p>
                We do not use your LinkedIn data to contact your connections, send messages on your behalf,
                or for any purpose other than displaying analytics to you within our platform.
              </p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white">3. How We Share Your Information</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-3">
              <p>
                We do not sell your personal information. We do not share your LinkedIn data with any
                third parties. We may share other information in the following limited circumstances:
              </p>
              <p>
                With trusted service providers who help us operate our services (such as hosting,
                analytics, email delivery, and scheduling providers), solely to the extent necessary
                for them to perform their functions; when required by law, regulation, legal process,
                or governmental request; and to protect the rights, safety, or property of Veyra,
                our users, or the public.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white">4. LinkedIn API Data Use</h2>
            <div className="text-gray-400 leading-relaxed mt-3 space-y-3">
              <p>
                Our use of LinkedIn data is governed by LinkedIn's API Terms of Use. Specifically:
              </p>
              <p>
                <span className="text-white/80 font-medium">Data collected:</span>{" "}
                Post engagement metrics (impressions, likes, comments, shares, click-through rates),
                follower count and demographics, and content performance analytics for posts you have
                authored on LinkedIn.
              </p>
              <p>
                <span className="text-white/80 font-medium">Purpose:</span>{" "}
                We access this data solely to display your LinkedIn content analytics within the
                Veyra dashboard, helping you understand the performance of your posts.
              </p>
              <p>
                <span className="text-white/80 font-medium">Storage and retention:</span>{" "}
                LinkedIn metrics data is cached temporarily to provide a responsive dashboard experience.
                We do not build persistent databases of LinkedIn member data beyond what is needed
                to serve your analytics views. When you disconnect your LinkedIn account or delete
                your Veyra account, we delete all associated LinkedIn data.
              </p>
              <p>
                <span className="text-white/80 font-medium">No secondary use:</span>{" "}
                We do not use LinkedIn data for advertising, profiling, resale, or any purpose other
                than displaying analytics to the authenticated user who authorized access.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white">5. Data Retention</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We retain your personal information for as long as your account is active or as needed
              to provide services, comply with legal obligations, resolve disputes, and enforce
              agreements. LinkedIn analytics data is refreshed periodically and not stored beyond
              what is necessary for your current dashboard session. When data is no longer required,
              we delete or anonymize it.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white">6. Your Rights and Choices</h2>
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
                request, we will delete your data, including any LinkedIn data we have stored,
                unless retention is required by law.
              </p>
              <p>
                <span className="text-white/80 font-medium">Withdraw consent:</span>{" "}
                You may disconnect your LinkedIn account from Veyra at any time through your
                account settings. This immediately revokes our access to your LinkedIn data.
                You may also revoke access directly from your{" "}
                <a
                  href="https://www.linkedin.com/psettings/permitted-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  LinkedIn settings
                </a>.
              </p>
              <p>
                <span className="text-white/80 font-medium">Opt-out:</span>{" "}
                You may opt out of marketing communications at any time by following the
                unsubscribe instructions in any email we send.
              </p>
              <p>
                Where required by applicable law (including GDPR and CCPA), we will honor all
                applicable privacy rights requests.
              </p>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white">7. Security</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We use commercially reasonable technical and organizational safeguards to protect your
              information, including encryption in transit (TLS), access controls, and secure
              infrastructure practices. OAuth tokens used to access LinkedIn are stored securely
              and are never exposed to the client-side application. No system can guarantee
              absolute security, and we will promptly notify affected users and relevant authorities
              in the event of a data breach as required by law.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white">8. Cookies and Similar Technologies</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our website may use cookies and similar technologies to maintain your session,
              understand usage patterns, improve site performance, and support core functionality.
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white">9. Third-Party Services</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our services integrate with third-party platforms, including LinkedIn. Your use of
              these platforms is subject to their own privacy policies and terms of service.
              We encourage you to review{" "}
              <a
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                LinkedIn's Privacy Policy
              </a>{" "}
              to understand how LinkedIn handles your data. We are not responsible for the privacy
              practices of third-party services.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white">10. Children's Privacy</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              Our services are not directed to individuals under the age of 16. We do not
              knowingly collect personal information from children. If we become aware that
              we have collected data from a child, we will promptly delete it.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white">11. Updates to This Policy</h2>
            <p className="text-gray-400 leading-relaxed mt-3">
              We may update this Privacy Policy from time to time. Any updates will be posted
              on this page with a revised effective date. If we make material changes, we will
              notify you by email or through a prominent notice on our website.
            </p>
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
