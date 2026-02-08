export const CALENDLY_URL = "https://calendly.com/veyragroup/30min";

export function openCalendly() {
  const calendlyWindow = window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  if (!calendlyWindow) {
    window.location.assign(CALENDLY_URL);
  }
}

export function loadCalendlyScript() {
  // Direct link mode. Script not required.
}
