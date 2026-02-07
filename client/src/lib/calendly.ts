export const CALENDLY_URL = "https://calendly.com/veyragroup/30min";

export function openCalendly() {
  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: CALENDLY_URL,
    });
  }
}

export function loadCalendlyScript() {
  const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
  if (document.querySelector(`script[src="${scriptSrc}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = scriptSrc;
  script.async = true;
  document.body.appendChild(script);
}
