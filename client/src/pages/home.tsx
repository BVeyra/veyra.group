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
    text: "A maintenance request is already in the PMS. The details are there, but the next owner is unclear, so the work begins moving through side messages instead of a defined handoff.",
  },
  {
    time: "12:00 PM",
    icon: "⏰",
    text: "An estimate needs approval. Vendor context is split between the work order, an inbox, and someone’s memory. The request stays open while the team chases the missing piece.",
  },
  {
    time: "4:30 PM",
    icon: "✓",
    text: "The job is marked complete, but the team still lacks the evidence or closeout it needs. No one has a reliable view of what actually moved or why it stalled.",
  },
];

const automationCards = [
  {
    title: "Workflow ownership",
    before:
      "A request enters the PMS, but no one can tell who owns the next action once it crosses from intake to triage, approval, or follow-through.",
    after:
      "The Audit makes ownership explicit at each handoff and identifies what can be corrected in the current process or tools before any build is considered.",
  },
  {
    title: "Approval paths",
    before:
      "An estimate or exception waits because authority, context, and the escalation path are not available when someone needs to decide.",
    after:
      "Veyra maps the decision path and recommends the least-complex fix: current-tool configuration, operating discipline, a specialist tool, or a scoped build.",
  },
  {
    title: "Maintenance and vendor follow-through",
    before:
      "Scope, access details, timing, estimates, and status updates are chased across inboxes and calls after the work order already exists.",
    after:
      "The Audit identifies where the handoff loses context and defines the operating path. Veyra does not dispatch vendors or send live messages in the current offer.",
  },
  {
    title: "Backlogs and exceptions",
    before:
      "The routine work may be moving, but the backlog, exception, or unresolved decision has no visible owner or clear next step.",
    after:
      "The Audit separates recurring process failure from one-off workload, then ranks what needs attention first.",
  },
  {
    title: "PMS adoption and configuration",
    before:
      "The PMS has a capable feature, but the team uses a spreadsheet, inbox, or workaround because the workflow was never made usable.",
    after:
      "Veyra documents the adoption or configuration gap and starts with the system already in place whenever that is the practical answer.",
  },
  {
    title: "Tool overlap and workarounds",
    before:
      "Multiple tools hold partial context, and the team manually re-enters or reconciles information to keep work moving.",
    after:
      "The Audit clarifies whether the gap is ownership, process, adoption, or a genuinely missing capability without assuming a new platform is required.",
  },
  {
    title: "Accountability and closeout evidence",
    before:
      "A task can look finished before the work is confirmed, the evidence is captured, and the required closeout has happened.",
    after:
      "The team leaves with a defined evidence and closeout requirement, not a promise of a live managed desk, emergency response, or PMS writeback.",
  },
];

const processSteps = [
  {
    number: "1",
    duration: "Free",
    title: "PMS Operations Snapshot",
    description:
      "A preliminary view of where work may be stopping and the facts needed to decide whether a Fit Call is useful.",
    icon: Phone,
  },
  {
    number: "2",
    duration: "15 minutes",
    title: "Fit Call",
    description:
      "A short qualification for the recurring workflow, current tools, available data, decision ownership, and paid Audit fit.",
    icon: Wrench,
  },
  {
    number: "3",
    duration: "Paid engagement",
    title: "PMS Operations Audit",
    description:
      "A decision-quality map of priority workflows and verified gaps. A Workflow Build Sprint follows only through a scoped SOW.",
    icon: Check,
  },
];

// Founding-client metrics remain empty until a pilot produces supportable evidence.
const caseStudyMetrics: { value: string; label: string }[] = [];

const socialProofQuotes = [
  {
    quote: "A request in the PMS is not the same thing as a workflow that can move cleanly through a team.",
    attribution: "What the Audit tests",
  },
  {
    quote: "The first recommendation may be better PMS configuration, clearer ownership, or a specialist tool, not custom software.",
    attribution: "How Veyra scopes work",
  },
  {
    quote: "A Build Sprint is proposed only when the recurring gap is verified and the operating owner is ready to support it.",
    attribution: "The Build Sprint gate",
  },
  {
    quote: "A practical plan needs findings, priorities, owners, and evidence, not a generic automation recommendation.",
    attribution: "What the executive readout provides",
  },
];

const whyVeyra = [
  {
    icon: Clock,
    title: "Operations consulting, not another platform",
    text: "We map the work as it runs today, identify the root cause of recurring gaps, and build only when the diagnosis supports it.",
  },
  {
    icon: Wrench,
    title: "Current tools first",
    text: "Your PMS remains the system of record. The Audit checks what can be fixed through adoption, configuration, process, or an existing specialist tool.",
  },
  {
    icon: ShieldCheck,
    title: "A practical, prioritized plan",
    text: "The paid Audit gives leadership a current-state diagnosis, root-cause findings, prioritized issues, and a 30/60/90-day action plan.",
  },
  {
    icon: Check,
    title: "Clear current boundaries",
    text: "The current offer does not include live tenant or vendor messaging, 24/7 emergency response, payments, vendor dispatch, PMS writeback, or broad PMS integrations.",
  },
];

const faqItems = [
  {
    q: "Who is this best for?",
    a: "Independent, third-party residential property managers with a recurring workflow that does not move cleanly through the team, useful information to examine, and a stakeholder able to make an operating decision.",
  },
  {
    q: "Who is this not for?",
    a: "It is not a fit for a firm seeking generic AI, a replacement PMS, emergency coverage, live outsourced maintenance operations, or a cheap tracker with no implementation work.",
  },
  {
    q: "Will Veyra replace our PMS?",
    a: "No. Veyra begins with the tools you already use and makes a recommendation only after the paid Audit separates a configuration or adoption issue from a verified workflow gap.",
  },
  {
    q: "What happens in the free Snapshot and Fit Call?",
    a: "The free Snapshot is preliminary: it identifies a likely stall point and the facts still needed. The free 15-minute Fit Call decides whether a PMS Operations Audit is warranted; neither is a free full diagnosis or implementation plan.",
  },
  {
    q: "What is included in the PMS Operations Audit?",
    a: "For one office in the initial scope, the Audit maps up to three priority workflows, reviews current-tool use and available information, identifies ownership, approvals, and handoffs, and delivers a prioritized recommendation and executive readout.",
  },
  {
    q: "Will Veyra send tenant or vendor messages, dispatch vendors, or write back to the PMS?",
    a: "No. Those capabilities are outside the current commercial offer. Veyra does not sell a live Managed Exception Desk, 24/7 emergency coverage, live tenant/vendor messaging, payments, or PMS writeback today.",
  },
  {
    q: "How is the work scoped?",
    a: "The Free PMS Operations Snapshot and 15-minute Fit Call are free. Veyra scopes the PMS Operations Audit and any Workflow Build Sprint to the operating need identified, before an engagement begins.",
  },
  {
    q: "What can a Workflow Build Sprint include?",
    a: "Only the defined work supported by the Audit and a scoped SOW, for example current-tool configuration, workflow documentation, implementation, and training. It is not a broad integration or managed-services promise.",
  },
];

export default function Home() {
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
        "Veyra Group diagnoses the handoffs where property-management work stalls, prioritizes practical fixes, and builds only verified workflow gaps.",
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
        title="PMS Operations Consulting for Property Managers"
        description="Your PMS tracks the work. Veyra identifies the gaps that keep it from moving, then gives leadership a practical, prioritized action plan. Start with a free PMS Operations Snapshot."
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
                  Your PMS tracks the work. Veyra closes the gaps that{" "}
                  <span className="text-emerald-400">
                    keep it from moving.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: heroTiming(0.6), delay: heroTiming(0.9), ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-lg text-gray-400 max-w-[540px] mx-auto lg:mx-0 mt-6 leading-relaxed"
                >
                  A request can be in the PMS and still stall: the next owner is unclear, an approval has no path, vendor follow-through lives in side messages, or completion is never verified. Veyra diagnoses the working process, prioritizes fixes, and scopes a Build Sprint only for a verified gap.
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
                        Get the Free PMS Operations Snapshot
                        <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </a>
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Preliminary Snapshot first · Fit Call second · paid Audit only if it is justified
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
              The issue is not that the work exists. It is that the workflow stops moving.
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
                  Veyra looks for the operating gap behind the symptom: unclear ownership, missing approval paths, PMS adoption gaps, overlapping tools, missing procedures, or no evidence that the work actually closed.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* WHAT VEYRA DIAGNOSES */}
        <section id="features" ref={featuresSectionRef} className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Veyra diagnoses.</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">The Audit is not a generic software recommendation.</strong> It examines ownership and handoffs, approval paths, maintenance and vendor follow-through, backlogs and exceptions, PMS adoption, tool overlap, procedures, visibility, accountability, and closeout evidence.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">Ownership and handoffs</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">Approvals and follow-through</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3 text-center">
                    <p className="text-emerald-400 text-sm font-medium">Evidence and closeout</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                  <p className="text-gray-200 italic">
                    "The first answer may be better use of the PMS, a process change, or a specialist tool, not a custom build."
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="mt-12">
              <p className="text-gray-400 mb-6">Common operating gaps the Audit examines:</p>

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
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-[0.12em] mb-2">What we look for</p>
                      <p className="text-gray-300 leading-relaxed">{activeAutomation.before}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/10 p-6">
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-[0.12em] mb-2">What the Audit clarifies</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">A clear path from preliminary signal to practical action plan.</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {caseStudyMetrics.length > 0 ? "Proof, not promises." : "What a decision-quality Audit is designed to clarify."}
              </h2>
              {caseStudyMetrics.length > 0 && (
                <p className="text-gray-400 mt-3">Real founding-client results will be published here exactly as measured, with no inflated numbers.</p>
              )}
            </motion.div>

            {/* Founding-client results render automatically once caseStudyMetrics has real, measured numbers */}
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

            <p className="text-center text-gray-400 mt-2 mb-6 max-w-2xl mx-auto">No synthetic benchmarks, testimonials, staffing ratios, time-saved claims, or ROI calculations. The paid Audit is designed to establish the facts for one operating team.</p>

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
                  <p className="text-sm font-semibold text-emerald-300">{item.attribution}</p>
                  <p className="text-gray-300 text-base leading-relaxed mt-4">{item.quote}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        {/* AUDIT BOUNDARIES */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What the paid Audit delivers and what Veyra does not provide today.</h2>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 md:p-10 text-left max-w-2xl mx-auto space-y-4">
                <p className="text-lg text-white font-semibold">A practical operating diagnosis.</p>
                <p className="text-gray-300">
                  The PMS Operations Audit produces a current-state diagnosis, root-cause findings, a prioritized issue list, what can be fixed in the current PMS or tools, what needs a process change, what may warrant a specialist tool, and what, if anything, warrants a Veyra Build Sprint.
                </p>
                <p className="text-gray-400">
                  The executive readout includes a practical 30/60/90-day action plan without promising a result. A Workflow Build Sprint is optional and offered only through a scoped statement of work after the diagnosis.
                </p>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-white font-semibold">Current technical and operating boundaries.</p>
                  <p className="text-gray-400 mt-1">
                    Buildium is read-only/self-service verification; generic systems use secure imports; AppFolio and Rent Manager use assisted paths. Veyra does not offer live PMS writeback, broad PMS integrations, live tenant/vendor messaging, payments, vendor dispatch, emergency response, or 24/7 coverage.
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
                    Get the Free PMS Operations Snapshot
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
              <h2 className="text-3xl md:text-4xl font-bold text-white">Start by identifying the operational problem, not by buying another tool.</h2>
              <Button asChild size="lg" className="mt-7 bg-emerald-500 text-white font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group" data-testid="button-footer-final-cta">
                <a href="/audit?source=footer_final">
                  Get the Free PMS Operations Snapshot
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
              <p className="text-gray-500 text-sm mt-4">Use the Snapshot to identify a preliminary issue. A 15-minute Fit Call determines whether the paid Audit is the right next step.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
