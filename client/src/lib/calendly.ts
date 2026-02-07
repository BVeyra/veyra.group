export const CALENDLY_INLINE_URL =
  "https://calendly.com/veyragroup/30min?hide_gdpr_banner=1&background_color=0d1d16&text_color=e8f0ec&primary_color=1a7a5a";

export function openCalendly() {
  const inlineWidget = document.getElementById("calendly-inline-widget");
  if (inlineWidget) {
    inlineWidget.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: CALENDLY_INLINE_URL,
    });
  }
}

export function loadCalendlyScript() {
  // Script is now preloaded in HTML head, this is just a fallback
}
