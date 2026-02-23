import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { openCalendly } from "@/lib/calendly";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    openCalendly();
  };

  return (
    <header 
      className={cn(
        "site-nav transition-all duration-300",
        isScrolled ? "glass-shiny-nav is-scrolled py-3" : "glass-shiny-nav py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <img
            src="/veyra-logo.svg"
            alt="Veyra Group"
            className="h-12 w-auto cursor-pointer select-none"
            draggable={false}
          />
        </Link>

        <Button
          onClick={handleCTA}
          size="lg"
          data-testid="button-nav-cta"
          className="glow-button font-semibold h-10 sm:h-11 px-4 sm:px-6 whitespace-nowrap"
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book Free Audit</span>
          <span className="ml-1">→</span>
        </Button>
      </div>
    </header>
  );
}

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--emerald)]/30 to-transparent" />
      <div className="py-14 bg-white/[0.02]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div className="text-center md:text-left">
              <img
                src="/veyra-logo.svg"
                alt="Veyra Group"
                className="h-16 w-auto mb-3 mx-auto md:mx-0 select-none"
                draggable={false}
              />
              <p className="text-[#7F8A95] text-sm mb-4">Built for small teams that hate busywork.</p>
              <p className="text-xs text-[#5F6972]">Built for independent property managers.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-sm font-semibold text-[#A7B1BA] mb-4 tracking-wide">NAVIGATE</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('features')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Features</button>
                <button onClick={() => scrollToSection('process')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Process</button>
                <button onClick={() => scrollToSection('pricing')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Pricing</button>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Back to Top ↑</button>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold text-[#A7B1BA] mb-4 tracking-wide">CONTACT</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:contact@veyragroup.ai" className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm font-medium transition-colors">
                  contact@veyragroup.ai
                </a>
                <a href="tel:+13026002625" className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm font-medium transition-colors">
                  (302) 600-2625
                </a>
                <div className="flex items-center justify-center md:justify-end gap-3 mt-2">
                  <a href="https://www.linkedin.com/company/veyragroup/" target="_blank" rel="noopener noreferrer" className="text-[#7F8A95] hover:text-[var(--emerald)] transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-[#5F6972]">
              © 2026 Veyra Group Inc. |{" "}
              <a href="mailto:bruno@veyragroup.ai" className="text-[var(--emerald)] hover:underline">
                bruno@veyragroup.ai
              </a>
            </p>
            {import.meta.env.DEV && (
              <p className="text-xs text-[#3F4952] mt-1 font-mono">Build: {new Date().toISOString().slice(0, 16)}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
