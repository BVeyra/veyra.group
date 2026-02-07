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
  if ((window as any).Calendly) {
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
  const openPopup = () => {
    if ((window as any).Calendly?.initPopupWidget) {
      (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
      return true;
    }
    return false;
  };

  if (openPopup()) {
    return;
  }

  // Keep click handling synchronous so browser popup blockers don't kill the CTA.
  const fallbackWindow = window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  if (!fallbackWindow) {
    window.location.assign(CALENDLY_URL);
    return;
  }

  // Opportunistically load Calendly script for future popup usage.
  ensureCalendlyStyle();
  ensureCalendlyScript().catch(() => {
    // Ignore load failure because fallback URL already opened.
  });
}

export function loadCalendlyScript() {
  ensureCalendlyStyle();
  ensureCalendlyScript().catch(() => {
    // Fail silently; openCalendly has a URL fallback.
  });
}
