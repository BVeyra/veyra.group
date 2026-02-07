import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  LineChart,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Navbar, Footer } from "@/components/layout";
import { HeroScene } from "@/components/HeroScene";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { openCalendly, loadCalendlyScript } from "@/lib/calendly";
import { useIsMobile } from "@/hooks/use-mobile";

const sceneMoments = [
  {
    label: "Signal",
    title: "Where time leaks",
    description: "We map the exact workflows that consume headcount and never produce revenue.",
  },
  {
    label: "System",
    title: "What gets automated",
    description: "Lead routing, follow-up loops, onboarding handoffs, and reporting move to autopilot.",
  },
  {
    label: "Scale",
    title: "What your team gets back",
    description: "Hours return to sales, delivery, and growth instead of repetitive operations.",
  },
  {
    label: "Control",
    title: "How you operate after",
    description: "One clean stack, less friction, and measurable margin improvement every month.",
  },
];

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    body: "Connect tools, remove manual handoffs, and keep every deal moving without human babysitting.",
  },
  {
    icon: Sparkles,
    title: "Custom AI Ops",
    body: "Train role-specific assistants on your process so your team gets answers and drafts instantly.",
  },
  {
    icon: LineChart,
    title: "Revenue Visibility",
    body: "Operational dashboards that show bottlenecks, response times, and missed opportunities in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing Partnership",
    body: "We maintain and improve your systems every month so automation keeps pace with your business.",
  },
];

const process = [
  {
    title: "Diagnose",
    detail: "30-minute call. We isolate the highest-cost friction first.",
    timing: "Week 0",
  },
  {
    title: "Build",
    detail: "We ship production automations in 1-2 weeks with your actual stack.",
    timing: "Week 1-2",
  },
  {
    title: "Scale",
    detail: "Your team runs faster immediately, then we iterate monthly.",
    timing: "Week 3+",
  },
];

const faqItems = [
  {
    q: "How fast can this go live?",
    a: "Most builds launch in 7-14 days depending on tool access and process complexity.",
  },
  {
    q: "Will this replace my team?",
    a: "No. It removes repetitive execution so your team can focus on selling, delivery, and client outcomes.",
  },
  {
    q: "What if we already have tools?",
    a: "That is ideal. We design around your current stack and fix the workflows between tools.",
  },
  {
    q: "Do we get support after launch?",
    a: "Yes. Every build includes post-launch support, and monthly partnership is available for continuous improvements.",
  },
];

const integrationNames = [
  "HubSpot",
  "Salesforce",
  "Calendly",
  "Stripe",
  "QuickBooks",
  "DocuSign",
  "Zapier",
  "Make",
  "OpenAI",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const isMobile = useIsMobile();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerPerson, setHoursPerPerson] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(35);
  const [calculatorName, setCalculatorName] = useState("");
  const [calculatorEmail, setCalculatorEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  useEffect(() => {
    loadCalendlyScript();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const next = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      setScrollProgress(next);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeSceneIndex = Math.min(
    sceneMoments.length - 1,
    Math.floor(scrollProgress * sceneMoments.length)
  );

  const weeklyHours = useMemo(() => teamSize * hoursPerPerson, [teamSize, hoursPerPerson]);
  const monthlyCost = useMemo(() => weeklyHours * 4 * hourlyValue, [weeklyHours, hourlyValue]);
  const yearlyCost = useMemo(() => monthlyCost * 12, [monthlyCost]);
  const paybackDays = useMemo(
    () => Math.max(7, Math.ceil((2000 / Math.max(1, monthlyCost)) * 30)),
    [monthlyCost]
  );

  const getSliderBackground = (value: number, max: number, min: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(90deg, rgba(22,220,163,0.95) 0%, rgba(95,157,186,0.95) ${percentage}%, rgba(255,255,255,0.08) ${percentage}%, rgba(255,255,255,0.08) 100%)`;
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCalculatorSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!calculatorEmail) return;

    setEmailSubmitting(true);
    try {
      await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: calculatorName,
          email: calculatorEmail,
          licenses: teamSize,
          hoursPerPerson,
          hourlyValue,
        }),
      });
      setEmailSubmitted(true);
    } catch (error) {
      console.error("Failed to submit calculator form", error);
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)]">
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <HeroScene progress={scrollProgress} mobile={isMobile} />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_15%_15%,rgba(10,180,130,0.24),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(90,122,143,0.18),transparent_38%),linear-gradient(180deg,rgba(4,9,7,0.48)_0%,rgba(4,9,7,0.84)_58%,rgba(4,9,7,0.94)_100%)]" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-gradient-to-r from-[var(--emerald)] via-[#43d7ac] to-[var(--steel)]"
        style={{ scaleX: scrollProgress }}
      />

      <Navbar />

      <main className="relative z-10">
        <section className="min-h-screen flex items-center pt-28 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-7"
              >
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/8 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  <Clock3 className="h-3.5 w-3.5" />
                  Operations, rebuilt in weeks
                </p>

                <h1 className="max-w-3xl text-balance text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-white">
                  Keep the team.
                  <br />
                  <span className="text-[var(--emerald)]">Remove the drag.</span>
                </h1>

                <p className="max-w-2xl text-lg text-white/72 leading-relaxed">
                  Veyra designs and deploys automation systems that cut repetitive execution, tighten response loops,
                  and recover margin. The scene behind this page shifts with scroll because your operation should too.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => scrollToSection("calculator")}
                    className="glow-button min-w-[190px]"
                    data-testid="button-hero-primary"
                  >
                    Run Cost Breakdown
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => openCalendly()}
                    className="min-w-[190px] border-white/20 bg-white/5 text-white hover:bg-white/10"
                    data-testid="button-hero-secondary"
                  >
                    Book 30-Min Call
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 pt-2 text-xs text-white/55">
                  {integrationNames.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-white/12 bg-black/20 px-3 py-1.5 tracking-wide"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                key={activeSceneIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-3xl border border-emerald-300/25 bg-black/35 p-7 backdrop-blur-xl shadow-[0_0_80px_rgba(6,190,138,0.12)]"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/90">
                  Scene State · {sceneMoments[activeSceneIndex].label}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{sceneMoments[activeSceneIndex].title}</h3>
                <p className="mt-4 text-white/72 leading-relaxed">{sceneMoments[activeSceneIndex].description}</p>

                <div className="mt-6 grid gap-3 text-sm text-white/72">
                  <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-emerald-200">Average waste recovered:</span> 120+ hours / month
                  </p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-emerald-200">Typical rollout:</span> 2 weeks to production
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 border-y border-white/6 bg-black/18">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {process.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-black/28 p-6 backdrop-blur-md"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200">{item.timing}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-white/70 leading-relaxed">{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="what-i-build" className="py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">What we build</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white tracking-tight text-balance">
                Premium operations infrastructure for lean teams.
              </h2>
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                Every engagement is implementation-focused: no static decks, no dead recommendations.
                We ship systems your team actually uses.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="rounded-2xl border border-white/12 bg-black/30 p-7 backdrop-blur-md"
                >
                  <service.icon className="h-6 w-6 text-emerald-200" />
                  <h3 className="mt-4 text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-white/70 leading-relaxed">{service.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="calculator" className="py-24 md:py-28 border-y border-white/8 bg-black/22">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-300/20 bg-black/40 p-6 md:p-10 backdrop-blur-xl">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Cost Calculator</p>
                <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white">See the waste in real numbers</h2>
              </div>

              <div className="mt-10 space-y-9">
                <div>
                  <label className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">Team size</label>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-semibold text-emerald-200">{teamSize}</span>
                    <span className="pb-1 text-white/55">people</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={teamSize}
                    onChange={(event) => setTeamSize(Number(event.target.value))}
                    data-testid="slider-team-size"
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full"
                    style={{ background: getSliderBackground(teamSize, 30, 1) }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
                    Hours per person each week
                  </label>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-semibold text-emerald-200">{hoursPerPerson}</span>
                    <span className="pb-1 text-white/55">hours</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={hoursPerPerson}
                    onChange={(event) => setHoursPerPerson(Number(event.target.value))}
                    data-testid="slider-hours"
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full"
                    style={{ background: getSliderBackground(hoursPerPerson, 20, 1) }}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">Hourly value per team member</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[25, 35, 50, 75, 100].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setHourlyValue(value)}
                        className={`rounded-xl border px-4 py-2 text-sm transition ${
                          hourlyValue === value
                            ? "border-emerald-300/80 bg-emerald-400/15 text-emerald-200"
                            : "border-white/12 bg-white/5 text-white/70 hover:border-white/25"
                        }`}
                      >
                        ${value}/hr
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Weekly lost time</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{weeklyHours.toLocaleString()}h</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Monthly cost</p>
                  <p className="mt-2 text-3xl font-semibold text-white">${monthlyCost.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-emerald-100/80">Annual cost</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-100">${yearlyCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-white/75">
                A one-time build starts at <span className="text-emerald-200">$2,000</span> and typically pays back in
                <span className="text-emerald-200"> {paybackDays} days</span>.
              </div>

              <div className="mt-8">
                {emailSubmitted ? (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-4 text-emerald-100">
                    <Check className="h-5 w-5" />
                    Report sent. Check your inbox.
                  </div>
                ) : (
                  <form onSubmit={handleCalculatorSubmit} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={calculatorName}
                      onChange={(event) => setCalculatorName(event.target.value)}
                      data-testid="input-calc-name"
                      className="rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-white placeholder:text-white/35 focus:border-emerald-300/65 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={calculatorEmail}
                      onChange={(event) => setCalculatorEmail(event.target.value)}
                      required
                      data-testid="input-calc-email"
                      className="rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-white placeholder:text-white/35 focus:border-emerald-300/65 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={emailSubmitting}
                      data-testid="button-calc-submit"
                      className="glow-button whitespace-nowrap rounded-xl px-5 py-3 disabled:opacity-60"
                    >
                      {emailSubmitting ? "Sending..." : "Send Full Report"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Execution Model</p>
                <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white">Built to ship, not to stall.</h2>
                <p className="mt-5 text-lg text-white/70 leading-relaxed">
                  We run lean, senior, and hands-on. You get one team responsible for strategy, build, and launch.
                </p>
                <Button
                  onClick={() => openCalendly()}
                  className="mt-7 glow-button"
                  data-testid="button-process-cta"
                >
                  Book 30-Min Walkthrough
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {process.map((item, index) => (
                  <article
                    key={`detail-${item.title}`}
                    className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-emerald-200">Step {index + 1}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-white/70">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-y border-white/8 bg-black/25">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="rounded-xl border border-white/10 bg-black/30 px-5"
                  >
                    <AccordionTrigger className="text-left text-white/90 hover:text-emerald-200">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/70 pb-4">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-300/25 bg-black/35 p-10 md:p-14 text-center backdrop-blur-xl">
              <h2 className="text-4xl md:text-5xl font-semibold text-white text-balance">
                Stop paying for work software should be doing.
              </h2>
              <p className="mt-5 text-lg text-white/72">
                We will show the exact 2-3 workflows to fix first, what they cost now, and how quickly they pay back.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button onClick={() => openCalendly()} className="glow-button" data-testid="button-final-cta">
                  Book 30-Min Call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("calculator")}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  Recalculate Savings
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
