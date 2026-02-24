import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { openCalendly } from "@/lib/calendly";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTarget = (href: string) => {
    if (!href.startsWith("#")) return;
    const node = document.querySelector(href);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <Link href="/">
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

        <Button
          onClick={openCalendly}
          size="sm"
          data-testid="button-nav-cta"
          className="rounded-full bg-emerald-500 text-black font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
        >
          Book a Free Audit
        </Button>
      </div>
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
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-xs text-gray-500">
          © 2026 Veyra Group Inc. |{" "}
          <a href="mailto:bruno@veyragroup.ai" className="text-emerald-400 hover:underline">
            bruno@veyragroup.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
