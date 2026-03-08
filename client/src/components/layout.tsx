import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { openCalendly } from "@/lib/calendly";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToTarget = (href: string) => {
    if (!href.startsWith("#")) return;
    const node = document.querySelector(href);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMobileNavClick = (href: string) => {
    scrollToTarget(href);
    setIsMenuOpen(false);
  };

  const handleBookClick = () => {
    setIsMenuOpen(false);
    openCalendly();
  };

  const handleDemoClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (location === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "site-nav transition-all duration-300 z-50",
        isScrolled ? "is-scrolled" : "is-top"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link href="/" onClick={handleLogoClick}>
          <img
            src="/veyra-logo.svg"
            alt="Veyra Group"
            className="h-11 w-auto cursor-pointer select-none"
            loading="eager"
            draggable={false}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToTarget(item.href)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            data-testid="button-nav-demo"
            className="hidden md:inline-flex rounded-full border border-white/15 bg-white/[0.02] text-gray-200 font-semibold px-4 py-2 h-auto hover:text-white hover:border-white/30 transition"
          >
            <Link href="/demo">Try Demo</Link>
          </Button>

          <Button
            onClick={openCalendly}
            size="sm"
            data-testid="button-nav-cta"
            className="hidden md:inline-flex rounded-full bg-emerald-500 text-black font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
          >
            Book a Free Audit
          </Button>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] text-gray-200 hover:text-white hover:border-white/30 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/85 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={`mobile-${item.href}`}
                type="button"
                onClick={() => handleMobileNavClick(item.href)}
                className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-200 hover:text-white hover:border-white/20 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <Button
              asChild
              size="sm"
              className="mt-2 rounded-full border border-white/15 bg-white/[0.02] text-gray-200 font-semibold h-10 hover:text-white hover:border-white/30 transition"
              data-testid="button-nav-demo-mobile"
            >
              <Link href="/demo" onClick={handleDemoClick}>
                Try Demo
              </Link>
            </Button>

            <Button
              onClick={handleBookClick}
              size="sm"
              className="mt-2 rounded-full bg-emerald-500 text-black font-semibold h-10 hover:bg-emerald-400 transition"
              data-testid="button-nav-cta-mobile"
            >
              Book a Free Audit
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img
              src="/veyra-logo.svg"
              alt="Veyra Group"
              className="h-14 w-auto mb-4 select-none"
              loading="lazy"
              draggable={false}
            />
            <p className="text-sm text-gray-400">Built for independent property managers.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("process")} className="hover:text-white transition-colors">
                  Process
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors">
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <button onClick={() => scrollToSection("calculator")} className="hover:text-white transition-colors">
                  PM Efficiency Audit
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition-colors">
                  Back to Top
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="mailto:contact@veyragroup.ai" className="hover:text-white transition-colors">
                  contact@veyragroup.ai
                </a>
              </li>
              <li>
                <a href="tel:+13026002625" className="hover:text-white transition-colors">
                  (302) 600-2625
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/veyragroup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-xs text-gray-500">
          © 2026 Veyra Group Inc.
        </div>
      </div>
    </footer>
  );
}
