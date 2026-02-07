export function openCalendly() {
  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: "https://calendly.com/veyragroup/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=059669&background_color=0a0f0a&text_color=ffffff"
    });
  }
}

export function loadCalendlyScript() {
  // Script is now preloaded in HTML head, this is just a fallback
}
