import { Navbar, Footer } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock,
  DollarSign,
  FileText,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type IntegrationLogo = {
  name: string;
  icon: string;
};

const integrationLogos: IntegrationLogo[] = [
  // Core PM Software — favicons (all visually distinct)
  { name: "AppFolio", icon: "https://www.google.com/s2/favicons?domain=appfolio.com&sz=64" },
  { name: "Buildium", icon: "https://www.google.com/s2/favicons?domain=buildium.com&sz=64" },
  { name: "Rent Manager", icon: "https://www.google.com/s2/favicons?domain=rentmanager.com&sz=64" },
  { name: "Yardi Breeze", icon: "https://www.google.com/s2/favicons?domain=yardibreeze.com&sz=64" },
  { name: "Propertyware", icon: "https://www.google.com/s2/favicons?domain=propertyware.com&sz=64" },
  { name: "RentRedi", icon: "https://www.google.com/s2/favicons?domain=rentredi.com&sz=64" },
  { name: "TenantCloud", icon: "https://www.google.com/s2/favicons?domain=tenantcloud.com&sz=64" },
  // Communication — brand icons to avoid Google "G" duplicates
  { name: "Twilio", icon: "https://api.iconify.design/simple-icons:twilio.svg?color=%23F22F46" },
  { name: "Gmail", icon: "https://cdn.simpleicons.org/gmail/EA4335" },
  { name: "Outlook", icon: "https://api.iconify.design/simple-icons:microsoftoutlook.svg?color=%230078D4" },
  { name: "Google Voice", icon: "https://www.google.com/s2/favicons?domain=voice.google.com&sz=64" },
  // Payments & Accounting
  { name: "QuickBooks", icon: "https://cdn.simpleicons.org/quickbooks/2CA01C" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/635BFF" },
  { name: "Plaid", icon: "https://www.google.com/s2/favicons?domain=plaid.com&sz=64" },
  // Operations
  { name: "DocuSign", icon: "https://www.google.com/s2/favicons?domain=docusign.com&sz=64" },
  { name: "Google Workspace", icon: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier/FF4A00" },
  // Listing/Marketing
  { name: "Zillow", icon: "https://cdn.simpleicons.org/zillow/006AFF" },
  { name: "Apartments.com", icon: "https://www.google.com/s2/favicons?domain=apartments.com&sz=64" },
  { name: "Zumper", icon: "https://www.google.com/s2/favicons?domain=zumper.com&sz=64" },
];

const problemTimeline = [
  {
    time: "6:47 AM",
    icon: "📱",
    text: "You haven't had coffee yet, but you've already got 14 unread messages. Three tenants texted overnight about the same water heater. A prospect who inquired three days ago just followed up - and you realize you never replied.",
  },
  {
    time: "12:00 PM",
    icon: "⏰",
    text: "You've handled 40 messages and completed zero of the things you actually planned to do today. Two lease renewals are overdue and Mrs. Chen has called about the same HVAC issue three times this week.",
  },
  {
    time: "11:00 PM",
    icon: "🚽",
    text: "You're in bed when your phone buzzes. Toilet overflow in unit 12C. Owner reports are still due, and that's tomorrow's problem - again.",
  },
];

const automationCards = [
  {
    title: "Tenant Communications",
    before:
      "You're personally responding to every text, email, and portal message. At 11 PM. On weekends. On vacation.",
    after:
      "AI drafts responses in your voice, triages by urgency, and handles routine questions automatically. You review and approve the ones that need you. The rest are done.",
  },
  {
    title: "Maintenance Coordination",
    before:
      "Tenant texts you -> you call the vendor -> vendor doesn't answer -> tenant follows up -> you follow up with vendor -> vendor shows up two days late.",
    after:
      "Request comes in -> automatically categorized and dispatched to the right vendor -> tenant gets a status update -> you get notified only when something needs your attention.",
  },
  {
    title: "Lease Tracking & Renewals",
    before:
      "You're checking a spreadsheet (or worse, trying to remember) when leases expire. Renewal notices go out late. Or not at all.",
    after:
      "Automated alerts 60/30/14 days before expiration. Renewal notices drafted and ready. Nothing falls through the cracks.",
  },
  {
    title: "Rent Collection Follow-Ups",
    before:
      "Rent is late. You manually send a reminder. Then another. Then a firmer one. For 12 different tenants. Every month.",
    after:
      "Automated follow-up sequences - friendly at first, firmer over time. Consistent, professional, and on-brand. You wrote the messages once. They send themselves forever.",
  },
  {
    title: "Vendor Management",
    before:
      "You're playing phone tag with 8 vendors, tracking who confirmed what on sticky notes, and apologizing to tenants for delays.",
    after:
      "Automated dispatch, follow-ups, and status tracking. Vendors get clear instructions. Tenants get updates. You get your afternoon back.",
  },
  {
    title: "Prospect Auto-Response",
    before:
      "Someone inquires about a vacant unit at 9 PM on Saturday. You see it Monday. They've already signed a lease somewhere else.",
    after:
      "Instant, personalized response with unit details, availability, and a link to schedule a showing. Seconds, not 48 hours.",
  },
  {
    title: "Owner Reporting",
    before:
      "Spending 12+ hours reformatting exports for different owners - because every owner wants a slightly different format. It's your last weekend of every month, every month, forever.",
    after:
      "Every owner gets a custom report, automatically generated, on the 1st of every month. Financials, maintenance summaries, occupancy updates - formatted to their preferences, delivered without you lifting a finger.",
  },
];

const processSteps = [
  {
    number: "1",
    duration: "Free, 15 min",
    title: "We audit your workflows",
    description:
      "You tell us where you're bleeding time. We map your current process and show you exactly what we'd automate first.",
    icon: Phone,
  },
  {
    number: "2",
    duration: "1-2 weeks",
    title: "We build your automations",
    description:
      "No templates. We build custom workflows around the tools you already use. You approve everything before it goes live.",
    icon: Wrench,
  },
  {
    number: "3",
    duration: "Ongoing",
    title: "We maintain and improve",
    description:
      "Things change. Tenants change. We monitor your automations, fix what breaks, and optimize what's working.",
    icon: Check,
  },
];

// Founding-client metrics. Leave empty until a pilot produces real, measured
// numbers — the case-study card below renders automatically once this is filled.
// Example once you have data: { value: "31", label: "Hours saved / mo" }
const caseStudyMetrics: { value: string; label: string }[] = [];

const socialProofQuotes = [
  {
    quote:
      "\"I'm exporting to Excel and spending a full weekend reformatting everything. Every owner wants something different.\"",
    attribution: "— Property Manager, 45 units",
  },
  {
    quote:
      "\"Our working theory is that 5% of the tenants cause 80% of your work. And that 5% always texts at midnight.\"",
    attribution: "— Property Manager, 200+ units",
  },
  {
    quote:
      "\"By the time I finish owner reports, the month is already over and I'm behind on everything else. There's never a break.\"",
    attribution: "— Property Manager, 150 units",
  },
  {
    quote:
      "\"I'm a one-woman show managing 60 doors. I haven't had a weekend off in 3 months. Something has to give.\"",
    attribution: "— Property Manager, 60 units",
  },
];

const whyVeyra = [
  {
    icon: MessageSquare,
    title: "Direct access to the founder",
    text: "You work with me — not a sales rep, not a ticket queue.",
  },
  {
    icon: Wrench,
    title: "No platform migration",
    text: "We build around AppFolio, Buildium, or whatever you already run.",
  },
  {
    icon: ShieldCheck,
    title: "You approve everything",
    text: "No workflow goes live until you sign off on it.",
  },
  {
    icon: Check,
    title: "We don't stop until it works",
    text: "We refine the build until it does what we agreed — at no extra cost.",
  },
];

const faqItems = [
  {
    q: "Who is this best for?",
    a: "Independent property managers running roughly 50-500 doors who wear too many hats — tenant comms, maintenance, leases, and follow-ups all run manually — and want practical automation live in weeks, not a quarter-long software rollout.",
  },
  {
    q: "Who is this not for?",
    a: "It's not a fit if you want a DIY tool with no implementation support, you need long enterprise procurement and committee approvals, or you're not ready to change a workflow this month.",
  },
  {
    q: "Is this just another SaaS platform I have to learn?",
    a: "No. We build custom automations that plug into the tools you already use. No new dashboard, no new app, no training manual.",
  },
  {
    q: "What property management software do you work with?",
    a: "AppFolio, Buildium, Rent Manager, Yardi, Propertyware — plus everything else. If your PM software has email or an API, we connect to it.",
  },
  {
    q: "Will my tenants know they're talking to AI?",
    a: "Your call. Most automations draft messages for your review. Routine replies are indistinguishable from what you'd write - because they're trained on your voice.",
  },
  {
    q: "What does it cost?",
    a: "Founding builds start at $1,500 one-time, with ongoing management from $500/month — most owners spend less than a part-time admin. Full breakdown is on the pricing page, and the audit and first call are always free.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime. No long-term contracts or penalties. If you cancel, access to the managed automations ends.",
  },
];

function IntegrationLogo({ logo }: { logo: IntegrationLogo }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="logo-carousel-item group" aria-label={logo.name}>
      <img
        src={logo.icon}
        alt={`${logo.name} logo`}
        loading="lazy"
        onError={() => setIsVisible(false)}
        className="h-7 w-auto object-contain opacity-75 group-hover:opacity-100 transition duration-300"
      />
    </div>
  );
}

export default function Home() {
  const [calculatorHeight, setCalculatorHeight] = useState(460);
  const [activeAutomationIndex, setActiveAutomationIndex] = useState(0);
  const [automationPausedUntil, setAutomationPausedUntil] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [heroTimingScale, setHeroTimingScale] = useState(1);
  const featuresSectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const hash = window.location.hash;

    // Arriving with an anchor (e.g. /#features from another page): scroll to
    // that section once it's in the DOM, accounting for the fixed header via
    // the scroll-margin-top set in CSS. Keep the hash so the URL stays shareable.
    if (hash && hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      // Double rAF so the section has mounted and laid out before we scroll.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
        })
      );
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as { type?: string; height?: number } | null;
      if (!payload || payload.type !== "roi-calculator-height") return;

      const next = Number(payload.height);
      if (!Number.isFinite(next)) return;
      setCalculatorHeight(Math.max(360, Math.min(1800, Math.round(next))));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const updateTiming = () => {
      setHeroTimingScale(media.matches ? 0.7 : 1);
    };

    updateTiming();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateTiming);
    } else {
      media.addListener(updateTiming);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", updateTiming);
      } else {
        media.removeListener(updateTiming);
      }
    };
  }, []);

  useEffect(() => {
    const target = featuresSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setFeaturesInView(true);
          setActiveAutomationIndex(0);
          setAutomationPausedUntil(Date.now() + 5000);
        } else {
          setFeaturesInView(false);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!featuresInView) return;

    const now = Date.now();
    const delay = automationPausedUntil > now ? automationPausedUntil - now : 5000;

    const timer = window.setTimeout(() => {
      if (Date.now() < automationPausedUntil) return;
      setActiveAutomationIndex((prev) => (prev + 1) % automationCards.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeAutomationIndex, automationPausedUntil, featuresInView]);

  const handleAutomationSelect = (index: number) => {
    setActiveAutomationIndex(index);
    setAutomationPausedUntil(Date.now() + 10000);
  };

  const featureIcons = [MessageSquare, Wrench, FileText, DollarSign, Users, Mail, BarChart3];
  const activeAutomation = automationCards[activeAutomationIndex];
  const ActiveAutomationIcon = featureIcons[activeAutomationIndex];
  const calculatorDisplayHeight = Math.max(360, calculatorHeight);
  const heroTiming = (seconds: number) => Number((seconds * heroTimingScale).toFixed(3));
  const homeStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <SeoHead
        title="Done-For-You Workflow Automation for Property Managers"
        description="Run the free PM Workflow Audit, get the report by email, and see which workflow Veyra should fix first."
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="hero-orb hero-orb-1"
              animate={{ x: [0, 60, 0], y: [0, 36, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-orb hero-orb-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-orb hero-orb-3"
              animate={{ x: [0, -70, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="hero-grid-overlay" />
            <div className="hero-noise-overlay" />
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-10 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.8), delay: heroTiming(0.3), ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.05] font-bold tracking-[-0.02em] hero-headline-glow"
                >
                  You didn't start a property management company to{" "}
                  <span className="hero-gradient-shimmer bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 bg-clip-text text-transparent">
                    answer texts at 11 PM.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.6), delay: heroTiming(0.9), ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-lg text-gray-400 max-w-[560px] mx-auto mt-6 leading-relaxed"
                >
                  We automate everything between the decision and the doing — so you can grow your portfolio without growing your team.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: heroTiming(0.5), delay: heroTiming(1.2), ease: [0.25, 0.4, 0.25, 1] }}
                  className="mt-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      asChild
                      size="lg"
                      data-testid="button-hero-cta-primary"
                      className="bg-emerald-500 text-black font-semibold text-lg px-8 py-4 rounded-full ring-1 ring-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:scale-[1.03] transition-all duration-200 group"
                    >
                      <a href="/audit?source=hero_primary">
                        Get Your Free Audit
                        <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </a>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Founder-led · works with the software you already use · no platform migration
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="relative py-12 border-y border-white/5 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
              {integrationLogos.map((logo) => (
                <IntegrationLogo key={logo.name} logo={logo} />
              ))}
              {integrationLogos.map((logo) => (
                <div key={`${logo.name}-duplicate`} aria-hidden="true">
                  <IntegrationLogo logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* PROBLEM */}
        <section id="problem" className="py-12 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-white mb-16"
            >
              You know this day.
            </motion.h2>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

              {problemTimeline.map((item, index) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="pl-20 pb-8 mb-8 border-b border-white/[0.03] last:border-b-0 last:pb-0 last:mb-0 relative"
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-400 absolute left-[26px] top-2 shadow-lg shadow-emerald-400/50" />
                  <p className="text-2xl font-bold text-emerald-400 mb-2 inline-flex items-center">
                    <span className="text-lg mr-2">{item.icon}</span>
                    {item.time}
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{item.text}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pl-20 relative mt-8"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  This is not a scaling problem. This is a "doing-everything-manually" problem. You're not bad at your job. You're doing three jobs - and two of them shouldn't require a human.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* WHAT WE TAKE OFF YOUR PLATE (solution + the seven workflows, merged) */}
        <section id="features" ref={featuresSectionRef} className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Here's what we take off your plate.</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">You wake up and your inbox isn't a disaster.</strong> Overnight tenant messages already have drafted replies waiting for your review. Maintenance requests are logged, categorized, and dispatched. The prospect who inquired at 2 AM got a personalized response in seconds and is already scheduled for a showing.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">⚡ Replies in seconds, not days</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">📉 Less manual busywork</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">🌙 24/7 coverage</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                  <p className="text-gray-200 italic">
                    "Veyra doesn't replace your judgment. We automate everything between the decision and the doing."
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="mt-12">
              <p className="text-gray-400 mb-6">Seven workflows, before and after Veyra:</p>

              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {automationCards.map((item, index) => {
                  const Icon = featureIcons[index];
                  const isActive = activeAutomationIndex === index;
                  return (
                    <button
                      key={item.title}
                      onClick={() => handleAutomationSelect(index)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition-all ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-white/[0.02] text-gray-500 border-white/10 hover:text-gray-300"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-[0.35fr_0.65fr] gap-8 mt-2 lg:mt-0">
                <div className="hidden lg:flex flex-col gap-2">
                  {automationCards.map((item, index) => {
                    const Icon = featureIcons[index];
                    const isActive = activeAutomationIndex === index;
                    return (
                      <button
                        key={item.title}
                        onClick={() => handleAutomationSelect(index)}
                        className={`relative py-4 px-5 rounded-xl text-left transition-all duration-300 border-l-2 ${
                          isActive
                            ? "text-white bg-white/[0.05] border-l-emerald-400"
                            : "text-gray-500 border-l-transparent hover:text-gray-300 hover:bg-white/[0.02]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-emerald-300" : "text-gray-500"}`} />
                          {item.title}
                        </span>
                        {isActive && (
                          <motion.span
                            key={`tab-progress-${index}-${automationPausedUntil}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute left-3 right-3 bottom-1 h-0.5 bg-emerald-400/30 origin-left"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAutomation.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl border border-white/6 bg-white/[0.03] p-6 md:p-8"
                  >
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                        <ActiveAutomationIcon className="w-6 h-6 text-emerald-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{activeAutomation.title}</h3>
                    </div>

                    <div className="rounded-xl bg-red-500/[0.05] border border-red-500/10 p-6 mb-4">
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-[0.12em] mb-2">Before</p>
                      <p className="text-gray-300 leading-relaxed">{activeAutomation.before}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10 p-6">
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.12em] mb-2">After</p>
                      <p className="text-gray-300 leading-relaxed">{activeAutomation.after}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* HOW IT WORKS */}
        <section id="process" className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Three steps. You're up and running in two weeks.</h2>
            </motion.div>

            <div className="relative grid md:grid-cols-3 gap-6">
              <div className="hidden md:block absolute left-[16%] right-[16%] top-8 border-t-2 border-dashed border-emerald-500/20" />

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold mx-auto">
                    {step.number}
                  </div>

                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 mt-4 hover:border-emerald-500/30 transition-colors">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-500 mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      {step.duration}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 inline-flex items-center gap-2">
                      <step.icon className="w-5 h-5 text-emerald-300" />
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* WHY VEYRA */}
        <section id="why" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why operators choose Veyra.</h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyVeyra.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl border border-white/6 bg-white/[0.02] p-6"
                  >
                    <div className="w-10 h-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* PROOF */}
        <section id="social-proof" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Proof, not promises.</h2>
              <p className="text-gray-400 mt-3">Real founding-client results will be published here exactly as measured — no inflated numbers.</p>
            </motion.div>

            {/* Founding-client results — renders automatically once caseStudyMetrics has real, measured numbers */}
            {caseStudyMetrics.length > 0 && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] p-8 text-center max-w-3xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Founding-client results</p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-xl mx-auto">
                  {caseStudyMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-2xl sm:text-3xl font-bold text-emerald-300">{metric.value}</p>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-gray-400 mt-2 mb-6 max-w-2xl mx-auto">
              Here's what property managers say out loud in public Reddit communities — real posts, <span className="text-gray-300">not Veyra clients</span>. They're the exact problems we build for.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialProofQuotes.map((item, index) => (
                <motion.div
                  key={item.quote}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <span className="absolute top-2 left-4 text-4xl text-emerald-400/30">"</span>
                  <p className="text-gray-300 text-base italic leading-relaxed pt-4">{item.quote}</p>
                  <p className="text-sm text-gray-500 mt-4 not-italic">{item.attribution} · via Reddit</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* THE AUDIT (primary offer) */}
        <section id="calculator" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">See where your hours are leaking.</h2>
              <p className="text-gray-400 mt-4">Run the free PM Workflow Audit and get a first-build recommendation — no pitch, no software talk.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-8 mt-6"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
                <iframe
                  src="/roi-calculator.html?theme=dark"
                  title="Veyra Group PM Workflow Audit"
                  loading="lazy"
                  className="w-full bg-[#0A0A0A]"
                  style={{ border: 0, height: `${calculatorDisplayHeight}px` }}
                />
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                  data-testid="button-calculator-report"
                >
                  <a href="/audit?source=home_embed">
                    Get Your Free Audit
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* WHY IT'S SAFE TO START (guarantee + founding scarcity + price anchor) */}
        <section id="guarantee" className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Why it's safe to start.</h2>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 md:p-10 text-left max-w-2xl mx-auto space-y-4">
                <p className="text-lg text-white font-semibold">We don't stop until it actually works.</p>
                <p className="text-gray-300">
                  We agree on what a workflow should do before we build it — then we keep refining it until it does, at no extra cost. You approve every workflow before it goes live; nothing runs without your sign-off.
                </p>
                <p className="text-gray-400">
                  Veyra is founder-led — you work directly with me, not a sales rep or a ticket queue. Cancel anytime; if you cancel, access to the managed automations ends.
                </p>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-white font-semibold">Veyra is taking on 5 founding clients.</p>
                  <p className="text-gray-400 mt-1">
                    Founding builds start at $1,500, with ongoing management from $500/month — most owners spend less than a part-time admin and get more.{" "}
                    <a href="/pricing" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">
                      See full pricing
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                  data-testid="button-guarantee-cta"
                >
                  <a href="/audit?source=guarantee">
                    Get Your Free Audit
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* FAQ */}
        <section id="faq" className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              FAQ
            </motion.h2>

            <div className="border-t border-white/5">
              {faqItems.map((item, index) => {
                const open = openFaqIndex === index;
                return (
                  <div key={item.q} className="border-b border-white/5 py-6">
                    <button
                      onClick={() => setOpenFaqIndex(open ? null : index)}
                      className="w-full text-left text-lg text-white font-medium cursor-pointer flex justify-between items-center"
                    >
                      <span>{item.q}</span>
                      <span className="ml-6 text-gray-400">
                        {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-400 mt-4 leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="footer-cta" className="py-12 md:py-16 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to stop being your own help desk?</h2>
              <Button asChild size="lg" className="mt-7 bg-emerald-500 text-black font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group" data-testid="button-footer-final-cta">
                <a href="/audit?source=footer_final">
                  Get Your Free Audit
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
              <p className="text-gray-500 text-sm mt-4">Get the report first. Book the call if the numbers say it is worth it.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
