import { useEffect } from "react";

const BOOKING_URL = "https://veyragroup.ai/book";

export default function BookPage() {
  useEffect(() => {
    window.location.replace(BOOKING_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="glass-shiny p-8 max-w-xl">
        <h1 className="text-3xl md:text-4xl">Redirecting to booking...</h1>
        <p className="mt-4 text-[var(--text-2)]">
          If you are not redirected automatically, use the button below.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-6 rounded-md bg-[var(--emerald)] text-black px-5 py-3 font-semibold"
        >
          Open booking page
        </a>
      </div>
    </div>
  );
}
