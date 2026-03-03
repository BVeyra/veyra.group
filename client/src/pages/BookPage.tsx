import { Check } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

const CALENDLY_EMBED_URL =
  "https://calendly.com/veyragroup/15min?background_color=0d1d16&text_color=e8f0ec&primary_color=2dd4a0&hide_gdpr_banner=1";

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1d16",
        color: "#e8f0ec",
        fontFamily: "'Outfit', 'Inter', sans-serif",
      }}
    >
      <style>
        {`
          .book-calendly-widget {
            min-width: 320px;
            height: 700px;
            color-scheme: light;
          }
          @media (max-width: 600px) {
            .book-calendly-widget {
              height: 800px;
            }
          }
        `}
      </style>

      <header
        style={{
          borderBottom: "1px solid rgba(45, 212, 160, 0.08)",
          position: "sticky",
          top: 0,
          backdropFilter: "blur(10px)",
          background: "rgba(13, 29, 22, 0.88)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex" }}>
            <span style={{ color: "#2dd4a0", fontWeight: 800, fontSize: "28px", letterSpacing: "-0.03em" }}>
              V
            </span>
            <span style={{ color: "#e8f0ec", fontWeight: 700, fontSize: "28px", letterSpacing: "-0.03em" }}>
              EYRA GROUP
            </span>
          </Link>
          <Link
            href="/"
            style={{
              color: "rgba(232, 240, 236, 0.7)",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 20px 64px" }}>
        <section style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Let&apos;s Build Your <span style={{ color: "#2dd4a0" }}>Automation System</span>
          </h1>
          <p
            style={{
              maxWidth: "860px",
              margin: "20px auto 0",
              color: "rgba(232, 240, 236, 0.55)",
              fontSize: "18px",
              lineHeight: 1.6,
            }}
          >
            Pick a time that works for you. We&apos;ll spend 15 minutes mapping out exactly which
            tasks are costing your team the most time — and how to fix them.
          </p>
        </section>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px 22px",
            marginBottom: "26px",
          }}
        >
          {["Free, no obligation", "15 minutes", "Save 10+ hrs/week"].map((pill) => (
            <div
              key={pill}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "rgba(232, 240, 236, 0.4)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              <Check size={14} color="#2dd4a0" />
              {pill}
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(45, 212, 160, 0.08)",
          }}
        >
          <div
            id="book-calendly-widget"
            className="calendly-inline-widget book-calendly-widget"
            data-url={CALENDLY_EMBED_URL}
            style={{ minWidth: "320px", height: "700px", colorScheme: "light" }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "15px",
            color: "rgba(232, 240, 236, 0.55)",
          }}
        >
          Not ready to talk? No problem.{" "}
          <Link
            href="/"
            style={{
              color: "#2dd4a0",
              textDecoration: "none",
              borderBottom: "1px solid rgba(45, 212, 160, 0.35)",
            }}
          >
            Explore how it works
          </Link>{" "}
          first.
        </p>
      </main>
    </div>
  );
}
