import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
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
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { openCalendly } from "@/lib/calendly";
import { AnimatePresence, motion } from "framer-motion";

type IntegrationLogo = {
  name: string;
  svg: string;
  fallback: string;
};

const integrationLogos: IntegrationLogo[] = [
  {
    name: "AppFolio",
    svg: "https://cdn.simpleicons.org/appfolio/34D399",
    fallback: "https://logo.clearbit.com/appfolio.com",
  },
  {
    name: "Buildium",
    svg: "https://cdn.simpleicons.org/buildium/34D399",
    fallback: "https://logo.clearbit.com/buildium.com",
  },
  {
    name: "Rent Manager",
    svg: "https://cdn.simpleicons.org/rentmanager/34D399",
    fallback: "https://logo.clearbit.com/rentmanager.com",
  },
  {
    name: "Yardi",
    svg: "https://cdn.simpleicons.org/yardi/34D399",
    fallback: "https://logo.clearbit.com/yardi.com",
  },
  {
    name: "Propertyware",
    svg: "https://cdn.simpleicons.org/propertyware/34D399",
    fallback: "https://logo.clearbit.com/propertyware.com",
  },
  {
    name: "QuickBooks",
    svg: "https://cdn.simpleicons.org/quickbooks/34D399",
    fallback: "https://logo.clearbit.com/quickbooks.intuit.com",
  },
  {
    name: "DocuSign",
    svg: "https://cdn.simpleicons.org/docusign/34D399",
    fallback: "https://logo.clearbit.com/docusign.com",
  },
  {
    name: "Twilio",
    svg: "https://cdn.simpleicons.org/twilio/34D399",
    fallback: "https://logo.clearbit.com/twilio.com",
  },
  {
    name: "Gmail",
    svg: "https://cdn.simpleicons.org/gmail/34D399",
    fallback: "https://logo.clearbit.com/mail.google.com",
  },
  {
    name: "Outlook",
    svg: "https://cdn.simpleicons.org/microsoftoutlook/34D399",
    fallback: "https://logo.clearbit.com/outlook.office.com",
  },
];

const statsData = [
  { value: "87+", label: "PMs Researched" },
  { value: "15+", label: "US Markets" },
  { value: "10+", label: "Hours/Week Saved" },
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
      "Instant, personalized response with unit details, availability, and a link to schedule a showing. 90 seconds, not 48 hours.",
  },
  {
    title: "Owner Reporting",
    before:
      "Spending 12+ hours reformatting AppFolio exports for different owners - because every owner wants a slightly different format. It's your last weekend of every month, every month, forever.",
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
      "\"We tried AppFolio's LISA. Instead of saving us time, it created a whole new set of headaches. Our closing ratio dropped 10%.\"",
    attribution: "— Property Manager, 150 units",
  },
  {
    quote:
      "\"I'm a one-woman show managing 60 doors. I haven't had a weekend off in 3 months. Something has to give.\"",
    attribution: "— Property Manager, 60 units",
  },
];

const faqItems = [
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
    q: "What if something breaks?",
    a: "That's what $500/month covers. Direct line to us, no ticket queues. If it breaks, we fix it fast.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime. No long-term contracts or penalties. If you cancel, access to the managed automations ends.",
  },
];

const fitPositiveItems = [
  { text: "You're an independent property manager who wears too many hats", icon: Building2 },
  { text: "Tenant comms, maintenance, leases, and follow-ups run manually", icon: MessageSquare },
  { text: "You want practical automation live in weeks, not quarters", icon: BarChart3 },
];

const fitNegativeItems = [
  { text: "You're looking for a DIY tool with no implementation support", icon: Wrench },
  { text: "You need long enterprise procurement and committee approvals", icon: Users },
  { text: "You're not ready to execute workflow changes this month", icon: Clock },
];

function HeroDashboardMockup() {
  const rows = [
    {
      title: "📱 Unit 12C — Toilet overflow",
      status: "Auto-dispatched ✓",
      statusClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    },
    {
      title: "📱 Unit 4B — When is rent due?",
      status: "Auto-replied ✓",
      statusClass: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    },
    {
      title: "📱 Unit 8A — Noise complaint",
      status: "Flagged for review ⚠️",
      statusClass: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    },
  ];

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[560px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 shadow-2xl shadow-emerald-500/5 will-change-transform"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <p className="text-sm text-gray-400">Veyra Dashboard</p>
        <div className="inline-flex items-center gap-2 text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.title}
            className="rounded-xl bg-white/[0.03] border border-white/5 p-4 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-200">{row.title}</p>
            <span className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap ${row.statusClass}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">3 messages handled today · 0 requiring attention</p>
    </motion.div>
  );
}

function IntegrationLogo({ logo }: { logo: IntegrationLogo }) {
  return (
    <div className="logo-carousel-item group" aria-label={logo.name}>
      <img
        src={logo.svg}
        alt={`${logo.name} logo`}
        loading="lazy"
        onError={(event) => {
          const target = event.currentTarget;
          if (target.src !== logo.fallback) {
            target.src = logo.fallback;
            target.onerror = null;
          }
        }}
        className="w-8 h-8 object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
      />
      <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">{logo.name}</span>
    </div>
  );
}

export default function Home() {
  const [calculatorHeight, setCalculatorHeight] = useState(980);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [activeAutomationIndex, setActiveAutomationIndex] = useState(0);
  const [automationPausedUntil, setAutomationPausedUntil] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [featuresInView, setFeaturesInView] = useState(false);
  const calculatorSectionRef = useRef<HTMLDivElement | null>(null);
  const featuresSectionRef = useRef<HTMLElement | null>(null);

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

  const toggleCalculator = () => {
    const next = !calculatorOpen;
    setCalculatorOpen(next);

    if (next) {
      window.setTimeout(() => {
        calculatorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 260);
    }
  };

  const featureIcons = [MessageSquare, Wrench, FileText, DollarSign, Users, Mail, BarChart3];
  const activeAutomation = automationCards[activeAutomationIndex];
  const ActiveAutomationIcon = featureIcons[activeAutomationIndex];

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden">
          <div className="hero-mesh-bg absolute inset-0 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
                >
                  You didn't start a property management company to{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                    answer texts at 11 PM.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-lg text-gray-400 max-w-[480px] mt-6 leading-relaxed"
                >
                  We handle your tenants, your maintenance requests, and your owner reports - so you can grow your portfolio without growing your team.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="mt-8"
                >
                  <Button
                    onClick={openCalendly}
                    size="lg"
                    data-testid="button-hero-cta-primary"
                    className="bg-emerald-500 text-black font-semibold text-lg px-8 py-4 rounded-full hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 group"
                  >
                    Book a Free 15-Min Workflow Audit
                    <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Button>
                </motion.div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Serving property managers across 15+ US markets
                </div>
              </div>

              <div className="relative mt-6 lg:mt-0">
                <div className="absolute -top-5 right-6 z-20 rounded-full border border-emerald-500/30 bg-black/70 px-3 py-1.5 text-xs text-emerald-300 backdrop-blur">
                  10+ hrs/week saved
                </div>
                <HeroDashboardMockup />
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section className="py-10 md:py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center relative"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  {index < statsData.length - 1 && (
                    <span className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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

        <section id="problem" className="py-16 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="pl-20 mb-12 relative"
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-400 absolute left-[26px] top-2 shadow-lg shadow-emerald-400/50" />
                  <p className="text-2xl font-bold text-emerald-400 mb-2">{item.time}</p>
                  <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{item.text}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="pl-20 relative"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  This is not a scaling problem. This is a "doing-everything-manually" problem. You're not bad at your job. You're doing three jobs - and two of them shouldn't require a human.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="solution" className="py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What changes when the busywork handles itself.</h2>
              <div className="space-y-6 text-gray-400 leading-relaxed">
                <p>
                  <strong className="text-white">You wake up and your inbox isn't a disaster.</strong> Tenant messages from overnight? Already drafted responses waiting for your review. Maintenance requests? Logged, categorized, and dispatched.
                </p>
                <p>
                  <strong className="text-white">That prospect who inquired at 2 AM?</strong> They got a personalized response in 90 seconds. They're already scheduled for a showing.
                </p>
                <p>
                  <strong className="text-white">Rent is 3 days late?</strong> The follow-up sequence already started. Friendly, professional, on-brand - like you wrote it yourself. Because you did. Once.
                </p>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                  <p className="text-gray-200 italic">
                    "Veyra doesn't replace your judgment. We automate everything between the decision and the doing."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{ scale: [1, 1.015, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-[320px] rounded-[40px] border-2 border-white/10 bg-black p-3 shadow-2xl shadow-emerald-500/10 will-change-transform"
              >
                <div className="w-24 h-5 bg-black rounded-full mx-auto mb-4 border border-white/5" />

                <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#0D1110] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Veyra Agent</p>
                        <p className="text-xs text-gray-500">Active now</p>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
                      Automated
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex-shrink-0" />
                    <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
                      Hi, my toilet is overflowing in unit 12C. Help!
                    </div>
                  </div>

                  <div className="flex gap-2 flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-black" />
                    </div>
                    <div className="rounded-2xl rounded-tr-none bg-emerald-500 text-black px-3 py-2 text-sm">
                      I'm sorry to hear that. I just dispatched Mike from Speedy Plumbing. ETA ~45 mins. Please turn off the water valve behind the toilet if possible.
                    </div>
                  </div>

                  <p className="text-center text-xs text-gray-500">Ticket #4921 created • Vendor notified</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="features" ref={featuresSectionRef} className="py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Seven things eating your day.</h2>
              <p className="text-gray-400 mt-3">Before and after Veyra.</p>
            </motion.div>

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
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="process" className="py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
                  viewport={{ once: true, margin: "-100px" }}
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

        <section id="social-proof" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Property managers are saying it out loud.</h2>
              <p className="text-gray-400 mt-3">
                These are real posts from PM communities. We just built the fix.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialProofQuotes.map((item, index) => (
                <motion.div
                  key={item.quote}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition"
                >
                  <span className="absolute top-2 left-4 text-4xl text-emerald-400/30">"</span>
                  <p className="text-gray-300 text-base italic leading-relaxed pt-4">{item.quote}</p>
                  <p className="text-sm text-gray-500 mt-4 not-italic">{item.attribution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="calculator" ref={calculatorSectionRef} className="py-16 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">PM Efficiency Audit</h2>
              <p className="text-gray-400 mt-4">See how much time and money you're leaving on the table.</p>

              <button
                type="button"
                onClick={toggleCalculator}
                className="mt-6 border border-emerald-500/30 text-emerald-400 px-6 py-3 rounded-full hover:bg-emerald-500/10 transition"
              >
                {calculatorOpen ? "Close Calculator ↑" : "Open Calculator ↓"}
              </button>
            </motion.div>

            <AnimatePresence initial={false}>
              {calculatorOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-8 mt-6">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A]">
                      <iframe
                        src="/roi-calculator.html?theme=dark"
                        title="Veyra Group PM Efficiency Audit"
                        loading="lazy"
                        className="w-full bg-[#0A0A0A]"
                        style={{ border: 0, height: `${calculatorHeight}px` }}
                      />
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild size="lg" className="bg-emerald-500 text-black font-semibold rounded-full px-6" data-testid="button-open-calculator-page">
                        <a href="/calculator">Open Full Calculator</a>
                      </Button>
                      <Button
                        onClick={openCalendly}
                        size="lg"
                        className="bg-emerald-500 text-black font-semibold rounded-full px-6"
                        data-testid="button-calculator-book"
                      >
                        Book a Free Audit
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="pricing" className="py-16 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto">
                Less than a part-time hire. More than a full-time employee could do.
              </h2>
              <p className="text-gray-400 mt-4">Clear pricing. No annual contracts. No surprise charges.</p>
            </motion.div>

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
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -4, borderColor: "rgba(52,211,153,0.2)" }}
                  className={`relative rounded-2xl border p-8 ${
                    plan.popular
                      ? "md:scale-105 border-emerald-500/30 bg-white/[0.03] shadow-lg shadow-emerald-500/10"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-white mb-3">{plan.name}</h3>
                  <p className="text-3xl font-bold text-emerald-300 mb-2">{plan.price}</p>
                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-emerald-400 mt-[1px]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-8 mt-8 text-center">
              <p className="text-gray-400 mb-4">A part-time admin costs about $2,500/month and still cannot handle tenant ops 24/7.</p>
              <p className="text-white text-xl font-semibold">
                The question isn't whether you can afford this. It's how much longer you can afford to do it all manually.
              </p>
              <Button
                onClick={openCalendly}
                size="lg"
                className="mt-6 bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                data-testid="button-pricing-cta"
              >
                Book Your Free Workflow Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="guarantee" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Hit your goals or don't pay. Period.</h2>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-10 text-center max-w-2xl mx-auto">
                <p className="text-xl text-white font-semibold mb-3">
                  If we build it and it doesn't hit the goals we agreed on - we fix it. Free.
                </p>
                <p className="text-gray-300 text-lg mb-3">Still not working? You don't pay.</p>
                <p className="text-gray-400 mb-4">
                  Everything is fully managed while you're active. If you cancel, access to the managed automations ends.
                </p>
                <p className="text-white font-semibold">You risk nothing. We risk everything. That's how confident we are.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="founding" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border border-white/6 bg-white/[0.02] p-8 md:p-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Founding Client Program</h2>
              <p className="text-gray-300 text-lg mb-4">
                We're accepting 5 founding clients at our introductory build rate of $1,500 (increasing after).
              </p>
              <p className="text-gray-400 mb-2">
                Founding clients get priority support, direct access to our automation team, and input on new features.
              </p>
              <p className="text-gray-400">Book your workflow audit to see if you qualify.</p>

              <Button
                onClick={openCalendly}
                size="lg"
                className="mt-7 bg-emerald-500 text-black font-semibold rounded-full px-8 py-4 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                data-testid="button-founding-cta"
              >
                Book a Free 15-Min Workflow Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="fit" className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Is This a <span className="text-emerald-400">Fit</span>?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6"
              >
                <ul className="space-y-4">
                  {fitPositiveItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl border border-emerald-500/35 bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="w-6 h-6 rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-200 flex items-center justify-center flex-shrink-0 mt-[3px]">
                          <Check className="w-4 h-4" />
                        </span>
                        <span className="text-gray-300">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-6"
              >
                <ul className="space-y-4">
                  {fitNegativeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-xl border border-white/20 bg-white/[0.03] flex items-center justify-center text-gray-300 flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="w-6 h-6 rounded-full border border-gray-500/30 bg-gray-500/10 text-gray-300 flex items-center justify-center flex-shrink-0 mt-[3px]">
                          <X className="w-4 h-4" />
                        </span>
                        <span className="text-gray-400">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

        <section id="faq" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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

        <section id="footer-cta" className="py-16 md:py-24 bg-gradient-to-t from-emerald-500/10 via-emerald-500/5 to-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to stop being your own help desk?</h2>
              <Button asChild size="lg" className="mt-7 bg-emerald-500 text-black font-semibold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all group" data-testid="button-footer-final-cta">
                <a href="/book">
                  Book Your Free Workflow Audit
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </Button>
              <p className="text-gray-500 text-sm mt-4">15 minutes. We'll show you exactly which workflows to automate first.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
