import { Navbar, Footer } from "@/components/layout";
import { SeoHead } from "@/components/SeoHead";
import { TiltCard } from "@/components/TiltCard";
import { HeroOrbit } from "@/components/HeroOrbit";
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

const problemTimeline = [
  {
    time: "6:47 AM",
    icon: "📱",
    text: "You haven't had coffee yet, but you've already got 14 unread messages. Three tenants texted overnight about the same water heater. A prospect who inquired three days ago just followed up, and you realize you never replied.",
  },
  {
    time: "12:00 PM",
    icon: "⏰",
    text: "You've handled 40 messages and completed zero of the things you actually planned to do today. Two lease renewals are overdue and Mrs. Chen has called about the same HVAC issue three times this week.",
  },
  {
    time: "11:00 PM",
    icon: "🚽",
    text: "You're in bed when your phone buzzes. Toilet overflow in unit 12C. Owner reports are still due, and that's tomorrow's problem. Again.",
  },
];

const automationCards = [
  {
    title: "Tenant Communications",
    before:
      "You're personally responding to every text, email, and portal message. At 11 PM. On weekends. On vacation.",
    after:
      "The system drafts routine replies in your voice, triages by urgency, and routes real issues to the right person. You set the rules for what sends automatically and what waits for your review.",
  },
  {
    title: "Maintenance Coordination",
    before:
      "Tenant texts you -> you call the vendor -> vendor doesn't answer -> tenant follows up -> you follow up with vendor -> vendor shows up two days late.",
    after:
      "Requests become clean work orders: triaged, prioritized, and dispatched inside your cost rules. Anything over your approval threshold stops and waits for your yes. Tenants get status updates without anyone chasing.",
  },
  {
    title: "Lease Renewals",
    before:
      "You're checking a spreadsheet (or worse, trying to remember) when leases expire. Renewal notices go out late. Or not at all.",
    after:
      "Renewal windows are tracked automatically and follow-up ladders run on schedule. Offers only go out once you approve them. Nothing falls through the cracks.",
  },
  {
    title: "Rent Follow-Up",
    before:
      "Rent is late. You manually send a reminder. Then another. Then a firmer one. For 12 different tenants. Every month.",
    after:
      "Policy-based reminders that start friendly and escalate on your schedule. Consistent, professional, in your voice. Veyra never touches the money: payments stay in your PM software.",
  },
  {
    title: "Vendor Management",
    before:
      "You're playing phone tag with 8 vendors, tracking who confirmed what on sticky notes, and apologizing to tenants for delays.",
    after:
      "A managed vendor roster with COI checks, clear dispatch instructions, and automatic callback follow-up. Vendors know what to do. Tenants get updates. You get your afternoon back.",
  },
  {
    title: "After-Hours & Prospect Response",
    before:
      "It's 11 PM and the phone buzzes. Toilet overflow in 12C. You're the on-call person. And the prospect who inquired Saturday night signs somewhere else before you see the message Monday.",
    after:
      "Around-the-clock intake that classifies every message, handles the routine ones, and escalates true emergencies to a human immediately. Prospects get a fast first response with a named next-business-day owner. You define what counts as an emergency and who gets the call.",
  },
  {
    title: "Owner Reporting",
    before:
      "Spending 12+ hours reformatting exports because every owner wants a slightly different format. It's your last weekend of every month, every month, forever.",
    after:
      "Owner packets are assembled automatically from the operating record, formatted to each owner's preferences, and queued for your review. You skim, hit send, and month-end stops eating your weekend.",
  },
];

const processSteps = [
  {
    number: "1",
    duration: "Free",
    title: "PM Operations Audit",
    description:
      "We map the operation, put real numbers on the coordination drag, and identify the right place for the system to activate first.",
    icon: Phone,
  },
  {
    number: "2",
    duration: "Kickoff",
    title: "Systemize the workflows",
    description:
      "We design the rules with you: voice, thresholds, escalation paths, approvals, and channels, built around the PM software you already run.",
    icon: Wrench,
  },
  {
    number: "3",
    duration: "Ongoing",
    title: "We run it with you",
    description:
      "Services come online in the order that protects your live operation, and we keep running and refining them. The dashboard keeps exceptions visible.",
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
    icon: Clock,
    title: "An operating partner, not just software",
    text: "We map, systemize, and then run the repeat work with you, with a customized dashboard as your window into all of it. Seven services, one set of rules, one audit trail.",
  },
  {
    icon: Wrench,
    title: "No platform migration",
    text: "We work around AppFolio, Buildium, or whatever you already run. Your PMS stays the system of record.",
  },
  {
    icon: ShieldCheck,
    title: "You set the rules",
    text: "You approve the rules; exceptions and judgment calls come back to a named human. Spend never moves without a yes.",
  },
  {
    icon: Check,
    title: "Every action traceable",
    text: "Significant events land in an append-only audit trail. Money and official records stay in your software.",
  },
];

const faqItems = [
  {
    q: "Who is this best for?",
    a: "Independent residential property managers running roughly 50-500 doors, where the owner still feels the operational drag. Tenant comms, maintenance, renewals, and follow-ups all run by hand, and you want that work run for you without switching software.",
  },
  {
    q: "Who is this not for?",
    a: "National chains, REITs, and non-residential portfolios. It's also not a fit if you want a DIY tool with no implementation support, or you need long enterprise procurement and committee approvals.",
  },
  {
    q: "Is this just another SaaS platform I have to learn?",
    a: "No. Veyra is an operations consultancy, not software you buy and figure out. We systemize your workflows and then run them around the tools you already use, so you can keep working from your inbox, phone, and PM software. You also get a customized Veyra dashboard with work orders, approvals, activity, and operating health in one place. Some owners run their whole operation from it; others check it once a week and live off the digests. Both work.",
  },
  {
    q: "Where does AI fit in?",
    a: "Where it earns its place. Routine drafting, triage, and follow-up sequences run automatically inside rules you approve. Judgment calls, spend, and anything sensitive stay with humans. A lot of what we systemize is not AI at all, just clear process that finally gets written down and followed.",
  },
  {
    q: "What property management software do you work with?",
    a: "AppFolio, Buildium, Rent Manager, Rentvine, DoorLoop, and Yardi Breeze, plus most others. Where there's an API we connect live; where there isn't, we sync exports. Either way, your PMS stays the system of record.",
  },
  {
    q: "Will my tenants know they're talking to AI?",
    a: "Your call. Routine replies are drafted in your voice and are indistinguishable from what you'd write. You decide what sends automatically and what waits for review, and anything sensitive routes to a human.",
  },
  {
    q: "What does it cost?",
    a: "One engagement, priced by portfolio size: a one-time implementation plus a monthly operating investment. We quote your exact numbers after the free PM Operations Audit, so the quote reflects your actual operation. The audit and the report are free.",
  },
  {
    q: "What's the commitment?",
    a: "A 90-day initial term covers design, configuration, staged activation, and calibration. After that the agreement runs month-to-month with 30 days' notice.",
  },
];

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

    // No anchor: start at the top.
    if (!(hash && hash.length > 1)) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    // Arriving with an anchor (e.g. /#features from another page): jump to that
    // section. We use an INSTANT scroll (temporarily overriding the global
    // `scroll-behavior: smooth`, which otherwise animates from the top and gets
    // cancelled by layout shifts as fonts/images load) and re-correct the
    // position a few times as the page settles. The 96px offset matches the
    // fixed header (mirrors scroll-margin-top in CSS).
    const id = decodeURIComponent(hash.slice(1));

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo(0, Math.max(0, top));
      root.style.scrollBehavior = prevBehavior;
    };

    requestAnimationFrame(scrollToTarget);
    const timers = [
      window.setTimeout(scrollToTarget, 150),
      window.setTimeout(scrollToTarget, 500),
    ];
    window.addEventListener("load", scrollToTarget);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("load", scrollToTarget);
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as { type?: string; height?: number } | null;
      if (!payload || payload.type !== "roi-calculator-height") return;

      const next = Number(payload.height);
      if (!Number.isFinite(next)) return;
      setCalculatorHeight(Math.max(360, Math.min(4200, Math.round(next))));
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
      "@type": "Organization",
      "@id": "https://veyragroup.ai/#organization",
      name: "Veyra Group",
      legalName: "Veyra Group Inc.",
      url: "https://veyragroup.ai",
      logo: "https://veyragroup.ai/veyra-logo.svg",
      description:
        "Veyra Group helps independent property managers systemize tenant communications, maintenance, renewals, rent follow-up, vendors, after-hours response, and owner reporting, then runs those systems for them.",
      email: "contact@veyragroup.ai",
      telephone: "+1-220-244-4213",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wilmington",
        addressRegion: "DE",
        addressCountry: "US",
      },
      sameAs: ["https://www.linkedin.com/company/veyragroup/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Veyra Group",
      url: "https://veyragroup.ai",
    },
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
        title="Operations Consultants for Property Managers"
        description="Veyra helps independent property managers systemize tenant communications, maintenance, renewals, rent follow-up, vendors, after-hours response, and owner reporting, then runs those systems for you. Start with the free PM Operations Audit."
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="hero-aurora" />
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
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.5), delay: heroTiming(0.1), ease: [0.25, 0.4, 0.25, 1] }}
                  className="mb-6 flex justify-center lg:justify-start"
                >
                  <span className="hero-pill">
                    <span className="pill-dot" />
                    Operations consultants for independent property managers
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.8), delay: heroTiming(0.3), ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] font-bold tracking-[-0.02em] hero-headline-glow"
                >
                  You didn't start a property management company to{" "}
                  <span className="text-emerald-400">
                    answer texts at 11 PM.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.6), delay: heroTiming(0.9), ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-lg text-gray-400 max-w-[540px] mx-auto lg:mx-0 mt-6 leading-relaxed"
                >
                  We map how your operation actually runs, systemize the repeat work your PM software still leaves on your team, and then run those systems for you. AI where it earns its place, humans everywhere judgment matters. Grow the portfolio without growing the team.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: heroTiming(0.5), delay: heroTiming(1.2), ease: [0.25, 0.4, 0.25, 1] }}
                  className="mt-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                    <Button
                      asChild
                      size="lg"
                      data-testid="button-hero-cta-primary"
                      className="bg-emerald-500 text-white font-semibold text-lg px-8 py-4 rounded-full ring-1 ring-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:scale-[1.03] transition-all duration-200 group"
                    >
                      <a href="/audit?source=hero_primary">
                        Get the Free Operations Audit
                        <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </a>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Works around the software you already run · your PMS stays the system of record
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: heroTiming(1), delay: heroTiming(0.6), ease: [0.25, 0.4, 0.25, 1] }}
                className="hidden lg:flex justify-center items-center"
              >
                <HeroOrbit />
              </motion.div>
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
                  This isn't a scaling problem. It's a doing-everything-manually problem. You're doing three jobs, and two of them shouldn't need a human.
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
                    <p className="text-emerald-400 text-sm font-medium">🌙 After-hours intake built in</p>
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
              <p className="text-gray-400 mb-6">Seven services, one operating layer. Before and after Veyra:</p>

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
                    className="glass-card rounded-2xl p-6 md:p-8"
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
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">First we map it. Then we systemize it. Then we run it.</h2>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 mb-4 text-center">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.1em] text-gray-500"
                >
                  <Clock className="w-3.5 h-3.5" />
                  {step.duration}
                </div>
              ))}
            </div>

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

                  <div className="glass-card rounded-2xl p-6 mt-4">
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
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <TiltCard className="glass-card group h-full rounded-2xl p-6">
                      <div className="w-10 h-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-5 h-5 text-emerald-300" />
                      </div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.text}</p>
                    </TiltCard>
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
              {/* "Proof, not promises" framing returns automatically once caseStudyMetrics has real numbers (i.e. after a founding client is signed). Until then, show a neutral heading. */}
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {caseStudyMetrics.length > 0 ? "Proof, not promises." : "What operators are dealing with."}
              </h2>
              {caseStudyMetrics.length > 0 && (
                <p className="text-gray-400 mt-3">Real founding-client results will be published here exactly as measured, with no inflated numbers.</p>
              )}
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
              Here's what property managers say in public Reddit threads. Real posts, <span className="text-gray-300">not Veyra clients</span>. They're the exact problems we systemize away.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialProofQuotes.map((item, index) => (
                <motion.div
                  key={item.quote}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-card relative rounded-2xl p-6"
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
              <p className="text-gray-400 mt-4">Run the free PM Operations Audit and see which part of your operation we would systemize first. No pitch, no software talk.</p>
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
                  title="Veyra Group PM Operations Audit"
                  loading="lazy"
                  className="w-full bg-[#0A0A0A]"
                  style={{ border: 0, height: `${calculatorDisplayHeight}px` }}
                />
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-white font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                  data-testid="button-calculator-report"
                >
                  <a href="/audit?source=home_embed">
                    Get the Free Operations Audit
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* GUARANTEE / TERMS (no lock-in + founding scarcity + price anchor) */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Your rules. Your software. Your call.</h2>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 md:p-10 text-left max-w-2xl mx-auto space-y-4">
                <p className="text-lg text-white font-semibold">Automation with accountability.</p>
                <p className="text-gray-300">
                  You approve the rules: voice, hours, thresholds, escalation paths, and protected boundaries. The system runs the repeat work inside them, and exceptions and judgment calls come back to a named human. Spend never moves without a yes.
                </p>
                <p className="text-gray-400">
                  Money and official records stay in your PM software. Every significant action lands in an append-only audit trail, so you can always see what ran and why. After the 90-day initial term, the agreement runs month-to-month with 30 days' notice.
                </p>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-white font-semibold">Veyra is taking on a small group of founding clients.</p>
                  <p className="text-gray-400 mt-1">
                    Run the free PM Operations Audit to see if the fit is there.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 text-white font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all group"
                  data-testid="button-guarantee-cta"
                >
                  <a href="/audit?source=guarantee">
                    Get the Free Operations Audit
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
              <Button asChild size="lg" className="mt-7 bg-emerald-500 text-white font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group" data-testid="button-footer-final-cta">
                <a href="/audit?source=footer_final">
                  Get the Free Operations Audit
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
