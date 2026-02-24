import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Bot,
  Phone,
  Wrench,
  ShieldCheck,
  MessageSquare,
  FileText,
  DollarSign,
  Users,
  Mail,
  Clock,
  BarChart3,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { openCalendly } from "@/lib/calendly";
import { SpinningWheel } from "@/components/SpinningWheel";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnimatePresence, motion } from "framer-motion";

function ParallaxWheel() {
  return (
    <div className="hero-load-wheel relative z-10 flex justify-center items-center w-full h-[520px]">
      <SpinningWheel />
    </div>
  );
}

const logoData = [
  { name: "AppFolio", icon: "https://www.google.com/s2/favicons?domain=appfolio.com&sz=64" },
  { name: "Buildium", icon: "https://www.google.com/s2/favicons?domain=buildium.com&sz=64" },
  { name: "Rent Manager", icon: "https://www.google.com/s2/favicons?domain=rentmanager.com&sz=64" },
  { name: "Yardi", icon: "https://www.google.com/s2/favicons?domain=yardi.com&sz=64" },
  { name: "Propertyware", icon: "https://www.google.com/s2/favicons?domain=propertyware.com&sz=64" },
  { name: "QuickBooks", icon: "https://www.google.com/s2/favicons?domain=quickbooks.intuit.com&sz=64" },
  { name: "DocuSign", icon: "https://www.google.com/s2/favicons?domain=docusign.com&sz=64" },
  { name: "Twilio", icon: "https://www.google.com/s2/favicons?domain=twilio.com&sz=64" },
  { name: "Gmail", icon: "https://www.google.com/s2/favicons?domain=mail.google.com&sz=64" },
  { name: "Outlook", icon: "https://www.google.com/s2/favicons?domain=outlook.office.com&sz=64" },
];

const problemTimeline = [
  {
    time: "6:47 AM",
    text: "You haven't had coffee yet, but you've already got 14 unread messages. Three tenants texted overnight about the same water heater. Your maintenance guy hasn't responded to the work order you sent yesterday. A prospect who inquired about unit 4B three days ago just followed up - and you realize you never replied.",
  },
  {
    time: "9:00 AM",
    text: "You're deep in email. Lease renewal for the Johnsons is due in 11 days and you haven't sent the notice. Two tenants are behind on rent and you need to send follow-ups - again. Your phone rings. It's Mrs. Chen, calling about the same HVAC issue for the third time this week.",
  },
  {
    time: "12:00 PM",
    text: "You've handled 40 messages and completed zero of the things you actually planned to do today.",
  },
  {
    time: "6:00 PM",
    text: "You're behind on everything that matters - owner reports, move-in inspections, that marketing you keep saying you'll get to.",
  },
  {
    time: "11:00 PM",
    text: "You're in bed when your phone buzzes. Toilet overflow in unit 12C.",
  },
];

const automationCards = [
  {
    title: "Tenant Communications",
    before: "You're personally responding to every text, email, and portal message. At 11 PM. On weekends. On vacation.",
    after: "AI drafts responses in your voice, triages by urgency, and handles routine questions automatically. You review and approve the ones that need you. The rest are done.",
  },
  {
    title: "Maintenance Coordination",
    before: "Tenant texts you -> you call the vendor -> vendor doesn't answer -> tenant follows up -> you follow up with vendor -> vendor shows up two days late.",
    after: "Request comes in -> automatically categorized and dispatched to the right vendor -> tenant gets a status update -> you get notified only when something needs your attention.",
  },
  {
    title: "Lease Tracking & Renewals",
    before: "You're checking a spreadsheet (or worse, trying to remember) when leases expire. Renewal notices go out late. Or not at all.",
    after: "Automated alerts 60/30/14 days before expiration. Renewal notices drafted and ready. Nothing falls through the cracks.",
  },
  {
    title: "Rent Collection Follow-Ups",
    before: "Rent is late. You manually send a reminder. Then another. Then a firmer one. For 12 different tenants. Every month.",
    after: "Automated follow-up sequences - friendly at first, firmer over time. Consistent, professional, and on-brand. You wrote the messages once. They send themselves forever.",
  },
  {
    title: "Vendor Management",
    before: "You're playing phone tag with 8 vendors, tracking who confirmed what on sticky notes, and apologizing to tenants for delays.",
    after: "Automated dispatch, follow-ups, and status tracking. Vendors get clear instructions. Tenants get updates. You get your afternoon back.",
  },
  {
    title: "Prospect Auto-Response",
    before: "Someone inquires about a vacant unit at 9 PM on Saturday. You see it Monday. They've already signed a lease somewhere else.",
    after: "Instant, personalized response with unit details, availability, and a link to schedule a showing. 90 seconds, not 48 hours.",
  },
  {
    title: "Owner Reporting",
    before: "Spending 12+ hours reformatting AppFolio exports for different owners - because every owner wants a slightly different format. It's your last weekend of every month, every month, forever.",
    after: "Every owner gets a custom report, automatically generated, on the 1st of every month. Financials, maintenance summaries, occupancy updates - formatted to their preferences, delivered without you lifting a finger.",
  },
];

const faqItems = [
  {
    q: "Is this just another SaaS platform I have to learn?",
    a: "No. We build custom automations that plug into the tools you already use. No new dashboard, no new app, no training manual.",
  },
  {
    q: "What property management software do you work with?",
    a: "All of them. AppFolio, Buildium, Rent Manager, Yardi, even spreadsheets. If it exists, we can probably connect to it.",
  },
  {
    q: "Will my tenants know they're talking to AI?",
    a: "Your call. Most automations draft messages for your review. Routine replies are indistinguishable from what you'd write - because they're trained on your voice.",
  },
  {
    q: "What if something breaks?",
    a: "That's what $500/month covers. Direct line to us, no ticket queues. If it breaks, we fix it fast.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime. No long-term contracts or penalties. If you cancel, access to the managed automations ends.",
  },
];

export default function Home() {
  const [calculatorHeight, setCalculatorHeight] = useState(980);
  const [activeAutomationIndex, setActiveAutomationIndex] = useState(0);
  const [billingView, setBillingView] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      nodes.forEach((node) => node.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    const timers: number[] = [];
    const listeners = cards.map((card) => {
      const baseScale = card.dataset.tiltScale ? ` scale(${card.dataset.tiltScale})` : "";
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
        const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)${baseScale}`;
      };
      const enter = () => {
        card.style.willChange = "transform";
        card.style.transition = "transform 150ms ease-out";
      };
      const leave = () => {
        card.style.transition = "transform 400ms ease-out";
        card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)${baseScale}`;
        timers.push(
          window.setTimeout(() => {
            card.style.willChange = "auto";
          }, 400)
        );
      };
      return { card, move, enter, leave };
    });

    listeners.forEach(({ card, move, enter, leave }) => {
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
    });

    return () => {
      listeners.forEach(({ card, move, enter, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as { type?: string; height?: number } | null;
      if (!payload || payload.type !== "roi-calculator-height") return;

      const next = Number(payload.height);
      if (!Number.isFinite(next)) return;

      setCalculatorHeight(Math.max(700, Math.min(2200, Math.round(next))));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

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
        "No templates. We build custom AI workflows around the tools you already use. You approve everything before it goes live.",
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

  const featureIcons = [MessageSquare, Wrench, FileText, DollarSign, Users, Mail, BarChart3];
  const activeAutomation = automationCards[activeAutomationIndex];
  const ActiveAutomationIcon = featureIcons[activeAutomationIndex];

  const fitPositiveItems = [
    { text: "You're an independent property manager who wears too many hats", icon: Building2 },
    { text: "Tenant comms, maintenance, leases, and follow-ups run manually", icon: MessageSquare },
    { text: "You want practical automation live in weeks, not quarters", icon: Zap },
  ];

  const fitNegativeItems = [
    { text: "You're looking for a DIY tool with no implementation support", icon: Wrench },
    { text: "You need long enterprise procurement and committee approvals", icon: Users },
    { text: "You're not ready to execute workflow changes this month", icon: Clock },
  ];

  return (
    <div className="min-h-screen font-sans text-foreground flex flex-col">
      <Navbar />
      <main className="page-content-enter flex flex-col">
        <section className="hero-section relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
          <div className="hero-spotlight" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              <div className="relative z-20 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--emerald)] text-xs font-medium mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--emerald)] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--emerald)]" />
                  </span>
                  Accepting New Clients for Q2 2026
                </div>

                <h1 className="hero-title hero-load-headline">
                  You didn't start a property management company to answer texts at 11 PM.
                </h1>

                <div className="hero-copy hero-load-subtext text-lg text-[#7F8A95] leading-relaxed space-y-4">
                  <p>
                    We handle your tenants, your maintenance requests, and your owner reports -
                    so you can grow your portfolio without growing your team.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-2">
                  <Button
                    onClick={openCalendly}
                    size="lg"
                    data-testid="button-hero-cta-primary"
                    className="glow-button hero-cta hero-load-cta font-semibold group"
                  >
                    Book a Free 15-Min Workflow Audit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <ParallaxWheel />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-4">
            <div className="logo-carousel-wrapper">
              <div className="logo-carousel-track">
                {logoData.map((logo, index) => (
                  <div key={index} className="logo-carousel-item group cursor-pointer">
                    <span className="w-7 h-7 rounded-full border border-white/15 bg-[rgba(8,14,11,0.82)] flex items-center justify-center group-hover:border-[var(--emerald)]/40 transition-colors overflow-hidden">
                      <img src={logo.icon} alt={`${logo.name} logo`} className="w-5 h-5" loading="lazy" />
                    </span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.40)] group-hover:text-[var(--emerald)] transition-colors">
                      {logo.name}
                    </span>
                  </div>
                ))}
                {logoData.map((logo, index) => (
                  <div key={`dup-${index}`} className="logo-carousel-item group cursor-pointer" aria-hidden="true">
                    <span className="w-7 h-7 rounded-full border border-white/15 bg-[rgba(8,14,11,0.82)] flex items-center justify-center group-hover:border-[var(--emerald)]/40 transition-colors overflow-hidden">
                      <img src={logo.icon} alt="" className="w-5 h-5" loading="lazy" />
                    </span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.40)] group-hover:text-[var(--emerald)] transition-colors">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-open relative" id="problem">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 data-reveal className="section-title text-center">You know this day.</h2>

              <div data-reveal data-reveal-delay="1" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
                {problemTimeline.map((item) => (
                  <SpotlightCard key={item.time} data-tilt className="glass-card p-6">
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--emerald)] mb-3">{item.time}</p>
                    <p className="text-[#A7B1BA] leading-relaxed">{item.text}</p>
                  </SpotlightCard>
                ))}
              </div>

              <div data-reveal data-reveal-delay="2" className="max-w-4xl mx-auto mt-8">
                <SpotlightCard data-tilt className="glass-card p-7 md:p-9 text-center">
                  <p className="text-[#C9D3D9] text-lg leading-relaxed">
                    This is not a scaling problem. This is a "doing-everything-manually" problem.
                    You're not bad at your job. You're doing three jobs - and two of them shouldn't
                    require a human.
                  </p>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-dense relative" id="solution">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              <div>
                <h2 data-reveal className="section-title mb-8">What changes when the busywork handles itself.</h2>
                <div data-reveal data-reveal-delay="1" className="space-y-5 text-[#A7B1BA] leading-relaxed">
                  <p>
                    <strong className="text-[#C9D3D9]">You wake up and your inbox isn't a disaster.</strong> Tenant messages from overnight? Already drafted responses waiting for your review. Maintenance requests? Logged, categorized, and dispatched.
                  </p>
                  <p>
                    <strong className="text-[#C9D3D9]">That prospect who inquired at 2 AM?</strong> They got a personalized response in 90 seconds. They're already scheduled for a showing.
                  </p>
                  <p>
                    <strong className="text-[#C9D3D9]">Rent is 3 days late?</strong> The follow-up sequence already started. Friendly, professional, on-brand - like you wrote it yourself. Because you did. Once.
                  </p>
                  <div className="rounded-2xl p-6 border border-[var(--emerald)]/30 bg-[rgba(10,18,14,0.32)] mt-8">
                    <p className="text-[#C9D3D9] italic">
                      "Veyra doesn't replace your judgment. We automate everything between the decision and the doing."
                    </p>
                  </div>
                </div>
              </div>

              <div data-reveal data-reveal-delay="2" className="relative">
                <SpotlightCard data-tilt className="glass-card p-7 md:p-8">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[rgba(10,18,14,0.9)] border border-white/10 flex items-center justify-center">
                        <Bot size={18} className="text-[var(--emerald)]" />
                      </div>
                      <div>
                        <div className="font-bold text-white">Veyra Agent</div>
                        <div className="text-xs text-[#7F8A95]">Active now</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[var(--emerald)]/15 text-[var(--emerald)] text-xs font-medium">
                      Automated
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[rgba(10,18,14,0.9)] border border-white/10 flex-shrink-0" />
                      <div className="bg-[rgba(10,18,14,0.8)] border border-white/10 rounded-2xl rounded-tl-none p-4 text-sm text-[#A7B1BA] max-w-[85%]">
                        Hi, my toilet is overflowing in unit 12C. Help!
                      </div>
                    </div>
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-[var(--emerald)] flex-shrink-0 flex items-center justify-center">
                        <Bot size={15} className="text-[#0a0f0a]" />
                      </div>
                      <div className="bg-[var(--emerald)] text-[#0a0f0a] rounded-2xl rounded-tr-none p-4 text-sm max-w-[85%]">
                        I'm sorry to hear that. I just dispatched Mike from Speedy Plumbing. ETA ~45 mins. Please turn off the water valve behind the toilet if possible.
                      </div>
                    </div>
                    <div className="text-center pt-1">
                      <span className="text-xs text-[#7F8A95]">Ticket #4921 created • Vendor notified</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-wrapper section-dense relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div data-reveal className="text-center mb-4">
              <h2 className="section-title">Seven things eating your day.</h2>
              <p className="section-subtitle text-[#7F8A95]">Before and after Veyra.</p>
            </div>

            <div className="max-w-6xl mx-auto mt-14">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
              >
                {automationCards.map((item, index) => {
                  const Icon = featureIcons[index];
                  const isActive = index === activeAutomationIndex;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveAutomationIndex(index)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-all ${
                        isActive
                          ? "border-[var(--emerald)]/50 bg-[var(--emerald)]/15 text-[#D8F4EA]"
                          : "border-white/10 bg-[rgba(10,18,14,0.72)] text-[#8DA49A] hover:border-[var(--emerald)]/30"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAutomation.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6"
                >
                  <SpotlightCard data-tilt className="glass-card overflow-hidden p-0">
                    <div className="grid lg:grid-cols-[0.9fr_1.9fr]">
                      <div className="p-7 border-b lg:border-b-0 lg:border-r border-white/10 bg-[rgba(7,14,11,0.75)]">
                        <div className="w-[72px] h-[72px] mb-5 rounded-2xl border border-[var(--emerald)]/30 bg-[var(--emerald)]/10 text-[var(--emerald)] flex items-center justify-center">
                          <ActiveAutomationIcon size={34} />
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">{activeAutomation.title}</h3>
                      </div>

                      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-7 bg-red-500/5">
                          <div className="text-xs font-bold text-red-300 uppercase tracking-[0.12em] mb-3">Before</div>
                          <p className="text-[#A7B1BA] text-sm leading-relaxed">{activeAutomation.before}</p>
                        </div>
                        <div className="p-7 bg-[var(--emerald)]/5">
                          <div className="text-xs font-bold text-[var(--emerald)] uppercase tracking-[0.12em] mb-3">After</div>
                          <p className="text-[#C9D3D9] text-sm leading-relaxed">{activeAutomation.after}</p>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="process" className="section-wrapper section-prelude section-dense relative">
          <div className="container mx-auto px-4 md:px-6">
            <div data-reveal className="text-center mb-16">
              <h2 className="section-title">Three steps. You're up and running in two weeks.</h2>
            </div>

            <div className="max-w-6xl mx-auto relative">
              <div className="hidden md:block absolute left-[14%] right-[14%] top-[38px] h-px bg-gradient-to-r from-transparent via-[var(--emerald)]/40 to-transparent" />
              <div className="grid md:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <SpotlightCard data-tilt className="glass-card p-7 h-full relative">
                      <div className="w-[76px] h-[76px] rounded-full bg-[linear-gradient(160deg,rgba(53,184,146,0.24),rgba(11,24,19,0.94))] border border-[var(--emerald)]/45 flex items-center justify-center text-[var(--emerald)] font-bold text-3xl mb-5 mx-auto md:mx-0">
                        {step.number}
                      </div>
                      <div className="flex items-center gap-2 mb-3 text-xs text-[#7F8A95] uppercase tracking-[0.12em]">
                        <Clock size={13} />
                        {step.duration}
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <step.icon className="w-5 h-5 text-[var(--emerald)]" />
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-[#A7B1BA] leading-relaxed">{step.description}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="calculator" className="section-wrapper section-dense relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div data-reveal className="text-center mb-12">
                <h2 className="section-title">PM Efficiency <span className="section-accent">Audit</span></h2>
                <p className="section-subtitle text-[#7F8A95] mt-4">
                  Use the interactive calculator below to see your vacancy and ops opportunity.
                </p>
              </div>

              <div data-reveal data-reveal-delay="1" className="w-full">
                <SpotlightCard data-tilt className="glass-card glow-border p-4 md:p-6">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(7,13,11,0.92)] p-3 md:p-4">
                    <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0a0f0a]">
                    <iframe
                      src="/roi-calculator.html?theme=dark"
                      title="Veyra Group PM Efficiency Audit"
                      className="w-full bg-[#0a0f0a]"
                      style={{ border: 0, height: `${calculatorHeight}px` }}
                    />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="glow-button font-semibold px-6" data-testid="button-open-calculator-page">
                      <a href="/calculator">Open Full Calculator</a>
                    </Button>
                    <Button onClick={openCalendly} size="lg" className="glow-button font-semibold px-6" data-testid="button-calculator-book">
                      Book a Free Audit
                    </Button>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-dense section-pricing relative" id="pricing">
          <div className="container mx-auto px-4 md:px-6">
            <div data-reveal className="text-center mb-16 max-w-5xl mx-auto">
              <h2 className="section-title">Less than a part-time hire. More than a full-time employee could do.</h2>
              <p className="section-subtitle text-[#7F8A95]">Clear pricing. No annual contracts. No surprise charges.</p>
              <div className="mt-6 inline-flex p-1 rounded-full border border-white/10 bg-[rgba(8,14,11,0.8)]">
                <button
                  type="button"
                  onClick={() => setBillingView("monthly")}
                  className={`px-5 py-2 text-sm rounded-full transition-colors ${billingView === "monthly" ? "bg-[var(--emerald)]/20 text-[#D7F4EA]" : "text-[#8FA69C]"}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingView("annual")}
                  className={`px-5 py-2 text-sm rounded-full transition-colors ${billingView === "annual" ? "bg-[var(--emerald)]/20 text-[#D7F4EA]" : "text-[#8FA69C]"}`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div data-reveal data-reveal-delay="1" className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "CUSTOM BUILD",
                    price: "$1,500 one-time",
                    description: "Founding-client introductory rate (first 5 clients).",
                    features: [
                      "Custom automations around your existing tools",
                      "Built and launched in 1-2 weeks",
                      "Approve every workflow before go-live",
                    ],
                    popular: false,
                  },
                  {
                    name: "BASE OPERATIONS",
                    price: "$500/month",
                    description: "Base operations plan. Supports 50+ unit portfolios with no cap.",
                    features: [
                      "Monitoring + fast fixes",
                      "Continuous optimization",
                      "Direct support, no ticket queue",
                    ],
                    popular: true,
                  },
                  {
                    name: "GROWTH SCALING",
                    price: "$5/unit above 50 (no cap)",
                    description: "Pricing grows with portfolio size and automation load.",
                    features: [
                      "Predictable unit-based scaling",
                      "No annual contracts",
                      "No hidden platform or seat fees",
                    ],
                    popular: false,
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className={`relative ${plan.popular ? "md:-translate-y-2" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <span className="pricing-badge-pop text-xs font-semibold px-4 py-1.5 rounded-full">Most Popular</span>
                      </div>
                    )}
                    <SpotlightCard
                      data-tilt
                      data-tilt-scale={plan.popular ? "1.03" : undefined}
                      className={`glass-card glass-card-hover pricing-card p-8 h-full ${
                        plan.popular ? "border-[var(--emerald)]/30 pricing-card-spotlight full-build-card" : "pricing-card-secondary"
                      }`}
                    >
                      {plan.popular && <div className="h-2" />}
                      <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-[var(--emerald)] mb-3">{plan.price}</p>
                      <p className="text-[#7F8A95] text-sm mb-6">{plan.description}</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-[var(--emerald)] flex-shrink-0 mt-0.5" />
                            <span className="text-[#A7B1BA]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>

              <SpotlightCard data-tilt className="glass-card p-7 md:p-8 mt-8 text-center">
                <p className="text-[#A7B1BA] mb-2">A part-time admin costs about $2,500/month and still cannot handle tenant ops 24/7.</p>
                <p className="text-[#A7B1BA] mb-2">That's less than 12 hours of a part-time admin at minimum wage.</p>
                <p className="text-[#C9D3D9] font-semibold text-lg mt-4">The question isn't whether you can afford this. It's how much longer you can afford to do it all manually.</p>
                <div className="mt-6">
                  <Button onClick={openCalendly} size="lg" className="glow-button hero-cta font-semibold group" data-testid="button-pricing-cta">
                    Book Your Free Workflow Audit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-breathe relative" id="guarantee">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 data-reveal className="section-title">Hit your goals or don't pay. Period.</h2>

              <div data-reveal data-reveal-delay="1" className="guarantee-card text-center">
                <div className="mx-auto h-1 w-28 rounded-full bg-[var(--emerald)]/70 mb-6" />
                <div className="guarantee-seal mx-auto mt-8 mb-6">
                  <ShieldCheck className="w-14 h-14 text-[var(--emerald)]" />
                </div>
                <p className="guarantee-title text-[rgba(255,255,255,0.92)] font-semibold text-xl mb-3">If we build it and it doesn't hit the goals we agreed on - we fix it. Free.</p>
                <p className="text-[rgba(255,255,255,0.72)] text-lg mb-3">Still not working? You don't pay.</p>
                <p className="text-[#A7B1BA] text-base mb-3">Everything is fully managed while you're active. If you cancel, access to the managed automations ends.</p>
                <p className="text-[#C9D3D9] font-semibold">You risk nothing. We risk everything. That's how confident we are.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-statement relative" id="founding">
          <div className="container mx-auto px-4 md:px-6">
            <div data-reveal className="max-w-3xl mx-auto text-center">
              <h2 className="section-title">Founding Client Program</h2>
              <div className="statement-block text-center">
                <div className="space-y-4 text-[#7F8A95] leading-relaxed max-w-xl mx-auto">
                  <p className="text-[#A7B1BA] font-medium text-lg">We're accepting 5 founding clients at our introductory build rate of $1,500 (increasing after).</p>
                  <p className="text-[#A7B1BA]">Founding clients get priority support, direct access to our automation team, and input on new features.</p>
                  <p className="text-[#A7B1BA]">Book your workflow audit to see if you qualify.</p>
                </div>
                <div className="mt-8">
                  <Button onClick={openCalendly} size="lg" className="glow-button hero-cta font-semibold group" data-testid="button-founding-cta">
                    Book a Free 15-Min Workflow Audit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-dense relative" id="fit">
          <div className="container mx-auto px-4 md:px-6">
            <div data-reveal className="text-center mb-16">
              <h2 className="section-title">Is This a <span className="section-accent">Fit</span>?</h2>
            </div>

            <div data-reveal data-reveal-delay="1" className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <SpotlightCard data-tilt className="fit-card h-full p-6" variant="fit">
                  <ul className="space-y-3">
                    {fitPositiveItems.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                      <li key={i} className="fit-item flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl border border-[var(--emerald)]/35 bg-[var(--emerald)]/10 flex items-center justify-center text-[var(--emerald)] flex-shrink-0">
                          <ItemIcon className="w-4 h-4" />
                        </span>
                        <span className="fit-status fit-status-good">
                          <Check className="w-5 h-5" />
                        </span>
                        <span className="text-[#A7B1BA]">{item.text}</span>
                      </li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="h-full"
              >
                <SpotlightCard data-tilt className="fit-card h-full p-6" variant="fit">
                  <ul className="space-y-3">
                    {fitNegativeItems.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                      <li key={i} className="fit-item flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl border border-[rgba(130,164,190,0.3)] bg-[rgba(111,137,156,0.16)] flex items-center justify-center text-[#9AB4C6] flex-shrink-0">
                          <ItemIcon className="w-4 h-4" />
                        </span>
                        <span className="fit-status fit-status-neutral">
                          <X className="w-5 h-5" />
                        </span>
                        <span className="text-[#7F8A95]">{item.text}</span>
                      </li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-prelude section-faq relative" id="faq">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 data-reveal className="section-title text-center">FAQ</h2>

            <div data-reveal data-reveal-delay="1">
              <Accordion type="single" collapsible className="faq-accordion mx-auto w-full max-w-[980px]">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <AccordionItem value={`item-${i}`} className="faq-card border-none px-0">
                      <AccordionTrigger className="faq-question text-xl py-6 hover:no-underline text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="faq-answer pb-7 text-base leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section-wrapper section-dense relative footer-cta-band" id="footer-cta">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="max-w-4xl mx-auto text-center py-8"
            >
              <h2 className="section-title mb-4">Ready to stop being your own help desk?</h2>
              <Button asChild size="lg" className="glow-button hero-cta font-semibold group text-base px-12 py-6" data-testid="button-footer-final-cta">
                <a href="/book">
                  Book Your Free Workflow Audit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="text-[#B6C7BF] mt-4">15 minutes. We'll show you exactly which workflows to automate first.</p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
