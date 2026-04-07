export const BOOKING_URL = "/book";

/**
 * Navigate to the booking page using client-side routing.
 * Uses History API + popstate event so Wouter picks up the route change
 * without triggering a full page reload.
 */
export function openCalendly() {
  window.history.pushState(null, "", BOOKING_URL);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
