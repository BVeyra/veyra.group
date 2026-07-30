import { Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useEffect } from "react";
import { Link } from "wouter";
import { SeoHead } from "@/components/SeoHead";

const CALENDLY_EMBED_URL =
  "https://calendly.com/veyragroup/15min?background_color=050505&text_color=e5e7eb&primary_color=0f7a55&hide_gdpr_banner=1";

export default function BookPage() {
  useEffect(() => {
    const styleHref = "https://assets.calendly.com/assets/external/widget.css";
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    const widgetRoot = document.getElementById("book-calendly-widget");
    if (!widgetRoot) return;

    if (!document.querySelector(`link[href="${styleHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleHref;
      document.head.appendChild(link);
    }

    const params = new URLSearchParams(window.location.search);
    const prefillName = params.get("name") || "";
    const prefillEmail = params.get("email") || "";
    // Calendly reads name/email prefill from the scheduling URL itself.
    const embedUrl = new URL(CALENDLY_EMBED_URL);
    if (prefillName) embedUrl.searchParams.set("name", prefillName);
    if (prefillEmail) embedUrl.searchParams.set("email", prefillEmail);

    const initWidget = () => {
      const calendly = (window as any).Calendly;
      if (!calendly?.initInlineWidget) return;
      widgetRoot.innerHTML = "";
      calendly.initInlineWidget({
        url: embedUrl.toString(),
        parentElement: widgetRoot,
        prefill: { name: prefillName, email: prefillEmail },
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`,
    );
    if (existingScript) {
      if ((window as any).Calendly?.initInlineWidget) {
        initWidget();
      } else {
        existingScript.addEventListener("load", initWidget, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SeoHead
        title="Book a 15-Minute Fit Call"
        description="Schedule a free 15-minute Fit Call to determine whether Veyra's paid PMS Operations Audit is the right next step."
        canonicalPath="/book"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise-overlay" />
      </div>

      <style>
        {`
          .book-calendly-widget {
            min-width: 320px;
            height: 760px;
            color-scheme: light;
            border-radius: 16px;
          }
          @media (max-width: 900px) {
            .book-calendly-widget {
              height: 720px;
            }
          }
          @media (max-width: 640px) {
            .book-calendly-widget {
              height: 690px;
            }
          }
        `}
      </style>

      <header className="sticky top-0 z-20 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center">
            <Logo className="text-[1.7rem]" />
          </Link>
          <Link href="/" className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors">
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-16 relative z-10">
        <section className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-300">Bring the handoff that keeps stalling</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.06] text-white">Book a <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text text-transparent">15-Minute Fit Call</span></h1>
          <p className="max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-gray-400">
            Bring one recurring workflow: request, triage, assigned owner, approval, vendor handoff, follow-through,
            or closeout. This is a qualification conversation, not a free full Audit. We will decide whether a
            PMS Operations Audit is justified by your current tools, volume, ownership, approval path, data readiness,
            and decision-maker fit.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          {["Free 15 minutes", "Qualification for a paid Audit", "No replacement PMS or live messaging"].map((pill) => (
            <div key={pill} className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Check size={14} className="text-emerald-400" />
              {pill}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 md:p-4 shadow-[0_0_0_1px_rgba(52,211,153,0.08),0_30px_80px_-40px_rgba(0,0,0,0.9),0_0_120px_rgba(52,211,153,0.08)]">
          <div
            id="book-calendly-widget"
            className="calendly-inline-widget book-calendly-widget"
            data-url={CALENDLY_EMBED_URL}
            style={{ minWidth: "320px", colorScheme: "light" }}
          />
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Prefer to start with the preliminary Snapshot?{" "}
          <Link href="/audit" className="text-emerald-400 border-b border-emerald-400/35 hover:border-emerald-300 transition-colors">
            Take the Free PMS Operations Snapshot
          </Link>{" "}
          first.
        </p>
      </main>
    </div>
  );
}
