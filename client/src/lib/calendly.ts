export const CALENDLY_URL = "https://calendly.com/veyragroup/30min";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";

let calendlyScriptPromise: Promise<void> | null = null;

function ensureCalendlyStyle() {
  if (document.querySelector(`link[href="${CALENDLY_STYLE_HREF}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CALENDLY_STYLE_HREF;
  document.head.appendChild(link);
}

function ensureCalendlyScript() {
  if ((window as any).Calendly?.initPopupWidget) {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Calendly script failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed to load"));
    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}

export function openCalendly() {
  const calendly = (window as any).Calendly;
  if (calendly?.initPopupWidget) {
    calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  ensureCalendlyStyle();
  ensureCalendlyScript()
    .then(() => {
      const loadedCalendly = (window as any).Calendly;
      if (loadedCalendly?.initPopupWidget) {
        loadedCalendly.initPopupWidget({ url: CALENDLY_URL });
        return;
      }
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    })
    .catch(() => {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    });
}

export function loadCalendlyScript() {
  ensureCalendlyStyle();
  ensureCalendlyScript().catch(() => {
    // Safe fallback in openCalendly handles direct URL.
  });
}
