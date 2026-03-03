export const BOOKING_URL = "https://veyragroup.ai/book";

export function openCalendly() {
  const popup = window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(BOOKING_URL);
  }
}
