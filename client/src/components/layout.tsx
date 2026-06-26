import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "/guides", label: "Guides" },
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
    if (location !== "/") {
      window.location.assign(`/${href}`);
      return;
    }
    const node = document.querySelector(href);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMobileNavClick = (href: string) => {
    scrollToTarget(href);
    setIsMenuOpen(false);
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
          <Logo className="text-[1.7rem] cursor-pointer" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToTarget(item.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            data-testid="button-nav-cta"
            className="hidden md:inline-flex rounded-full bg-emerald-500 text-white font-semibold px-4 py-2 h-auto hover:bg-emerald-400 transition"
          >
            <Link href="/audit?source=nav_cta">Get Your Free Audit</Link>
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
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden fixed inset-x-0 bottom-0 top-20 z-40 bg-black/70 backdrop-blur-sm"
          />
          <div className="md:hidden relative z-50 border-t border-white/10 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={`mobile-${item.href}`}
                  type="button"
                  onClick={() => handleMobileNavClick(item.href)}
                  className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-200 hover:text-white hover:border-white/20 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-gray-200 hover:text-white hover:border-white/20 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}

            <Button
              asChild
              size="sm"
              className="mt-2 rounded-full bg-emerald-500 text-white font-semibold h-10 hover:bg-emerald-400 transition"
              data-testid="button-nav-cta-mobile"
            >
              <Link href="/audit?source=nav_cta_mobile" onClick={handleDemoClick}>
                Get Your Free Audit
              </Link>
            </Button>
          </div>
          </div>
        </>
      )}
    </header>
  );
}

export function Footer() {
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      window.location.assign(`/#${id}`);
      return;
    }
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
            <Logo className="text-[2.1rem] mb-4" />
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
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/audit?source=footer_resources" className="hover:text-white transition-colors">
                  PM Workflow Audit
                </Link>
              </li>
              <li>
                <Link href="/property-management-automation-roi" className="hover:text-white transition-colors">
                  Automation ROI
                </Link>
              </li>
              <li>
                <Link href="/automated-owner-reporting-for-property-managers" className="hover:text-white transition-colors">
                  Owner Reporting
                </Link>
              </li>
              <li>
                <Link href="/automate-maintenance-coordination-property-management" className="hover:text-white transition-colors">
                  Maintenance Coordination
                </Link>
              </li>
              <li>
                <Link href="/automate-tenant-communication-property-management" className="hover:text-white transition-colors">
                  Tenant Communication
                </Link>
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
                <Link href="/privacy" className="hover:text-white transition-colors">
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
