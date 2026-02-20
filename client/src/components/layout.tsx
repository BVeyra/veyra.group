import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const BOOKING_URL = "https://veyragroup.ai/book";

export function Navbar() {
  return (
    <header className="site-nav transition-all duration-300 glass-shiny-nav py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <Link href="/">
          <img
            src="/veyra-logo.svg"
            alt="Veyra Group"
            className="h-12 w-auto cursor-pointer select-none"
            draggable={false}
          />
        </Link>

        <Button
          asChild
          size="lg"
          data-testid="button-nav-cta"
          className="glow-button font-semibold h-10 sm:h-11 px-4 sm:px-6 whitespace-nowrap"
        >
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a Free Audit</span>
            <span className="ml-1">-&gt;</span>
          </a>
        </Button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--emerald)]/30 to-transparent" />
      <div className="py-10 bg-white/[0.02]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-6">
            <Button asChild size="lg" className="glow-button h-11 px-6 text-sm font-semibold">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                Book Your Free Workflow Audit -&gt;
              </a>
            </Button>
          </div>
          <p className="text-xs text-[#7F8A95]">
            © 2026 Veyra Group Inc. |{" "}
            <a href="mailto:bruno@veyragroup.ai" className="hover:text-[var(--emerald)] transition-colors">
              bruno@veyragroup.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
