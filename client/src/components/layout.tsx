import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openCalendly, loadCalendlyScript } from "@/lib/calendly";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadCalendlyScript();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    setIsMobileMenuOpen(false);
    openCalendly();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-shiny glass-shiny-nav border-b border-white/12 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold tracking-tight cursor-pointer text-[#A7B1BA]">
            VEYRA<span className="text-[var(--emerald)]">GROUP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Button 
            onClick={handleCTA}
            size="lg"
            data-testid="button-nav-cta"
            className="glow-button font-semibold"
          >
            Book a Call →
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-shiny glass-shiny-nav border-b border-white/12 p-4">
          <Button 
            onClick={handleCTA}
            data-testid="button-nav-cta-mobile"
            className="w-full glow-button"
          >
            Book a Call →
          </Button>
        </div>
      )}
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
              <h3 className="text-xl font-bold text-[#8a9299] mb-3">VEYRA<span className="text-[var(--emerald)]">GROUP</span></h3>
              <p className="text-[#7F8A95] text-sm mb-4">Built for small teams that hate busywork.</p>
              <p className="text-xs text-[#5F6972]">Trusted by 50+ small teams.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-sm font-semibold text-[#A7B1BA] mb-4 tracking-wide">NAVIGATE</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => scrollToSection('what-i-build')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Services</button>
                <button onClick={() => scrollToSection('calculator')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Calculator</button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">How It Works</button>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm transition-colors">Back to Top ↑</button>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold text-[#A7B1BA] mb-4 tracking-wide">CONTACT</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:contact@veyra.group" className="text-[#7F8A95] hover:text-[var(--emerald)] text-sm font-medium transition-colors">
                  contact@veyra.group
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
            <p className="text-xs text-[#5F6972]">© 2026 Veyra Group Inc. All rights reserved.</p>
            {import.meta.env.DEV && (
              <p className="text-xs text-[#3F4952] mt-1 font-mono">Build: {new Date().toISOString().slice(0, 16)}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
