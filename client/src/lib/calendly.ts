export const BOOK_PAGE_PATH = "/book";

export function openCalendly() {
  if (window.location.pathname === BOOK_PAGE_PATH) {
    return;
  }
  window.history.pushState({}, "", BOOK_PAGE_PATH);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
