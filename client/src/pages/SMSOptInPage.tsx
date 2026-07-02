import { useState } from "react";
import { Link } from "wouter";
import { Logo } from "@/components/Logo";
import { SeoHead } from "@/components/SeoHead";

export default function SMSOptInPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SeoHead
        title="Text Message Updates — Sign Up"
        description="Opt in to receive text message updates from Veyra Group about your workflow audit, account, and service. Consent is optional; reply STOP to opt out."
        canonicalPath="/sms"
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
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.02em]">Text Message Updates</h1>
        <p className="text-gray-400 mt-4 leading-relaxed">
          Opt in to receive text messages from Veyra Group about your workflow audit, account,
          onboarding, and service updates. Signing up for texts is optional and is not required to
          use our services.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          {submitted ? (
            <div className="text-gray-200">
              <h2 className="text-xl font-semibold text-white">You're opted in ✅</h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Thanks — we'll text you at {phone}. You can reply <span className="font-semibold text-white">STOP</span> at
                any time to opt out, or <span className="font-semibold text-white">HELP</span> for help.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
                  Mobile number <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                  placeholder="(555) 555-5555"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-white/20 bg-white/[0.04] accent-emerald-500"
                />
                <span className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-semibold text-white">(Optional)</span> I agree to receive
                  recurring text messages from Veyra Group about my workflow
                  audit, account, and service updates. Message frequency varies. Message and data
                  rates may apply. Reply <span className="font-semibold text-white">STOP</span> to opt
                  out, <span className="font-semibold text-white">HELP</span> for help. Consent is not
                  a condition of purchase, and carriers are not liable for delayed or undelivered
                  messages. See our{" "}
                  <a href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</a>{" "}
                  and{" "}
                  <a href="/terms-of-service" className="text-emerald-400 hover:underline">Terms of Service</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreed || !phone}
                className="w-full rounded-full bg-emerald-500 text-white font-semibold px-5 py-3 hover:bg-emerald-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sign up for text updates
              </button>

              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting, you confirm the mobile number is yours and you consent to receive
                texts as described above. Mobile opt-in information is never shared with third
                parties or affiliates for marketing purposes.
              </p>
            </form>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
            Privacy Policy
          </Link>
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
