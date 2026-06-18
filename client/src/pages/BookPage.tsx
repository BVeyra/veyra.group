import { Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useEffect } from "react";
import { Link } from "wouter";
import { SeoHead } from "@/components/SeoHead";

const CALENDLY_EMBED_URL =
  "https://calendly.com/veyragroup/15min?background_color=050505&text_color=e5e7eb&primary_color=34d399&hide_gdpr_banner=1";

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

    const initWidget = () => {
      const calendly = (window as any).Calendly;
      if (!calendly?.initInlineWidget) return;
      widgetRoot.innerHTML = "";
      calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement: widgetRoot,
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
        title="Book a Workflow Audit Call"
        description="Schedule a 15-minute workflow audit call with Veyra to map where your property management team is bleeding time."
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.06] text-white">
            Let&apos;s Build Your{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text text-transparent">
              Automation System
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-gray-400">
            Pick a time that works for you. We&apos;ll spend 15 minutes mapping out exactly which
            tasks are costing your team the most time, and how to fix them.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          {["Free, no obligation", "15 minutes", "See how it works"].map((pill) => (
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
          Not ready to talk? No problem.{" "}
          <Link href="/" className="text-emerald-400 border-b border-emerald-400/35 hover:border-emerald-300 transition-colors">
            Explore how it works
          </Link>{" "}
          first.
        </p>
      </main>
    </div>
  );
}
