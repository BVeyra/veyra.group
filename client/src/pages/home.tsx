import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BOOKING_URL = "https://veyragroup.ai/book";

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
    title: "1. Tenant Communications",
    before:
      "You're personally responding to every text, email, and portal message. At 11 PM. On weekends. On vacation.",
    after:
      "AI drafts responses in your voice, triages by urgency, and handles routine questions automatically. You review and approve the ones that need you. The rest are done.",
  },
  {
    title: "2. Maintenance Coordination",
    before:
      "Tenant texts you -> you call the vendor -> vendor doesn't answer -> tenant follows up -> you follow up with vendor -> vendor shows up two days late.",
    after:
      "Request comes in -> automatically categorized and dispatched to the right vendor -> tenant gets a status update -> you get notified only when something needs your attention.",
  },
  {
    title: "3. Lease Tracking & Renewals",
    before:
      "You're checking a spreadsheet (or worse, trying to remember) when leases expire. Renewal notices go out late. Or not at all.",
    after:
      "Automated alerts 60/30/14 days before expiration. Renewal notices drafted and ready. Nothing falls through the cracks.",
  },
  {
    title: "4. Rent Collection Follow-Ups",
    before:
      "Rent is late. You manually send a reminder. Then another. Then a firmer one. For 12 different tenants. Every month.",
    after:
      "Automated follow-up sequences - friendly at first, firmer over time. Consistent, professional, and on-brand. You wrote the messages once. They send themselves forever.",
  },
  {
    title: "5. Vendor Management",
    before:
      "You're playing phone tag with 8 vendors, tracking who confirmed what on sticky notes, and apologizing to tenants for delays.",
    after:
      "Automated dispatch, follow-ups, and status tracking. Vendors get clear instructions. Tenants get updates. You get your afternoon back.",
  },
  {
    title: "6. Prospect Auto-Response",
    before:
      "Someone inquires about a vacant unit at 9 PM on Saturday. You see it Monday. They've already signed a lease somewhere else.",
    after:
      "Instant, personalized response with unit details, availability, and a link to schedule a showing. 90 seconds, not 48 hours.",
  },
];

const faqs = [
  {
    question: "Is this just another SaaS platform I have to learn?",
    answer:
      "No. We build custom automations that plug into the tools you already use. No new dashboard, no new app, no training manual.",
  },
  {
    question: "What property management software do you work with?",
    answer:
      "All of them. AppFolio, Buildium, Rent Manager, Yardi, even spreadsheets. If it exists, we can probably connect to it.",
  },
  {
    question: "Will my tenants know they're talking to AI?",
    answer:
      "Your call. Most automations draft messages for your review. Routine replies are indistinguishable from what you'd write - because they're trained on your voice.",
  },
  {
    question: "What if something breaks?",
    answer:
      "That's what $500/month covers. Direct line to us, no ticket queues. If it breaks, we fix it fast.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Cancel anytime. No contracts, no penalties. You keep everything we built - it's yours.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-[var(--text)] page-content-enter">
      <Navbar />

      <main className="relative z-10 pt-28 pb-20">
        <section className="section-wrapper">
          <div className="container">
            <div className="glass-shiny p-8 md:p-12 lg:p-16 text-center">
              <p className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--emerald-subtle)] px-4 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--emerald)] uppercase mb-6">
                AI Automation for Property Managers
              </p>
              <h1 className="max-w-5xl mx-auto">
                You didn't start a property management company to answer texts at 11 PM.
              </h1>
              <p className="mx-auto mt-6 max-w-4xl text-lg md:text-xl text-[var(--text-2)] leading-relaxed">
                Veyra builds custom AI automations that handle your tenant communications,
                maintenance coordination, and lease tracking - so you can manage 200 units without
                hiring 2 more people.
              </p>
              <div className="mt-9 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="glow-button h-12 px-7 text-base font-semibold"
                  data-testid="button-hero-cta"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Book a Free 15-Min Workflow Audit -&gt;
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="problem">
          <div className="container">
            <h2 className="text-center">You know this day.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {problemTimeline.map((block) => (
                <article key={block.time} className="glass-shiny p-6">
                  <p className="text-sm font-semibold tracking-[0.12em] text-[var(--emerald)] uppercase mb-3">
                    {block.time}
                  </p>
                  <p className="text-[var(--text-2)] leading-relaxed">{block.text}</p>
                </article>
              ))}
            </div>
            <div className="glass-shiny p-6 md:p-8 mt-6">
              <p className="text-lg text-[var(--text)] leading-relaxed">
                This is not a scaling problem. This is a "doing-everything-manually" problem.
                You're not bad at your job. You're doing three jobs - and two of them shouldn't
                require a human.
              </p>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="solution">
          <div className="container">
            <h2>What changes when the busywork handles itself.</h2>
            <div className="mt-8 glass-shiny p-6 md:p-9 space-y-5">
              <p>
                You wake up and your inbox isn't a disaster. Tenant messages from overnight?
                Already drafted responses waiting for your review. Maintenance requests? Logged,
                categorized, and dispatched to the right vendor - before you opened your eyes.
              </p>
              <p>
                That prospect who inquired at 2 AM? They got a personalized response in 90
                seconds. They're already scheduled for a showing.
              </p>
              <p>
                Lease renewals coming up in 60 days? You got a heads-up last week. Notices are
                drafted. You just approve and send.
              </p>
              <p>
                Rent is 3 days late? The follow-up sequence already started. Friendly,
                professional, on-brand - like you wrote it yourself. Because you did. Once.
              </p>
              <p>
                You still make every decision. You still run your business. You just stop being
                the person who has to type every message, remember every deadline, and chase every
                vendor.
              </p>
              <p className="text-[var(--text)] font-semibold">
                Veyra doesn't replace your judgment. We automate everything between the decision
                and the doing.
              </p>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="how-it-works">
          <div className="container">
            <h2>Three steps. You're up and running in two weeks.</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <article className="glass-shiny p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--emerald)] mb-3">
                  Step 1
                </p>
                <h3 className="text-2xl mb-3">We audit your workflows (free, 15 min)</h3>
                <p>
                  You tell us where you're bleeding time. We map your current process - how tenant
                  requests come in, how you dispatch maintenance, how you track leases - and show
                  you exactly what we'd automate first.
                </p>
              </article>
              <article className="glass-shiny p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--emerald)] mb-3">
                  Step 2
                </p>
                <h3 className="text-2xl mb-3">We build your automations (1-2 weeks)</h3>
                <p>
                  No templates. No "one-size-fits-all." We build custom AI workflows around the
                  tools you already use - your email, your phone system, your property management
                  software. You approve everything before it goes live.
                </p>
              </article>
              <article className="glass-shiny p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--emerald)] mb-3">
                  Step 3
                </p>
                <h3 className="text-2xl mb-3">We maintain and improve (ongoing)</h3>
                <p>
                  Things change. Tenants change. Your portfolio grows. We monitor your
                  automations, fix what breaks, and optimize what's working. $500/month. Cancel
                  anytime.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="automation-cards">
          <div className="container">
            <h2>Six things eating your day - before and after Veyra.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {automationCards.map((card) => (
                <article key={card.title} className="glass-shiny p-7">
                  <h3 className="text-2xl mb-4">{card.title}</h3>
                  <p className="text-sm uppercase tracking-[0.12em] text-[#f87171] font-semibold mb-2">
                    Before
                  </p>
                  <p className="text-[var(--text-2)] mb-4">{card.before}</p>
                  <p className="text-sm uppercase tracking-[0.12em] text-[var(--emerald)] font-semibold mb-2">
                    After
                  </p>
                  <p className="text-[var(--text-2)]">{card.after}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="pricing">
          <div className="container">
            <h2>Less than a part-time hire. More than a full-time employee could do.</h2>
            <div className="mt-8 glass-shiny p-7 md:p-10 space-y-5">
              <p>
                A part-time admin costs you $2,500/month. They work 20 hours a week, take
                vacations, call in sick, and still can't respond to tenants at 2 AM.
              </p>
              <p>Veyra costs:</p>
              <p>
                <strong>$1,500 to build</strong> - your custom automations, designed around your
                exact workflows. One-time. (We're offering this rate to our first 5 clients, then
                raising it.)
              </p>
              <p>
                <strong>$500/month for up to 50 units.</strong> Above 50 units: $500 + $5/unit for
                every unit above 50. Your price grows with your portfolio - and so does your
                savings.
              </p>
              <p>That's less than 12 hours of a part-time admin at minimum wage.</p>
              <p>
                That's it. One product. One price structure. No annual contracts. No surprise
                charges. Cancel anytime.
              </p>
              <p>
                Your automations work 24/7. They don't take PTO. They don't forget lease renewals.
                They don't need training when you change a process - we update them for you.
              </p>
              <p className="text-[var(--text)] font-semibold">
                The question isn't whether you can afford this. It's how much longer you can afford
                to do it all manually.
              </p>
              <div className="pt-2">
                <Button asChild size="lg" className="glow-button h-12 px-7 text-base font-semibold">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Book Your Free Workflow Audit -&gt;
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="guarantee">
          <div className="container">
            <h2>Hit your goals or don't pay. Period.</h2>
            <div className="mt-8 glass-shiny p-7 md:p-9 space-y-5">
              <p>
                If we build it and it doesn't hit the goals we agreed on - we fix it. Free.
              </p>
              <p>Still not working? Keep everything we built. Pay nothing.</p>
              <p>
                Every automation, every workflow, every integration - it's yours. We don't hold
                your business hostage.
              </p>
              <p className="text-[var(--text)] font-semibold">
                You risk nothing. We risk everything. That's how confident we are.
              </p>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="founding">
          <div className="container">
            <h2>Founding Client Program</h2>
            <div className="mt-8 glass-shiny p-7 md:p-9 space-y-5">
              <p>
                We're accepting 5 founding clients at our introductory build rate of $1,500
                (increasing after). Founding clients get priority support, direct access to our
                automation team, and input on new features.
              </p>
              <p>Book your workflow audit to see if you qualify.</p>
              <div>
                <Button asChild size="lg" className="glow-button h-12 px-7 text-base font-semibold">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Book a Free 15-Min Workflow Audit -&gt;
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="faq">
          <div className="container">
            <h2>FAQ</h2>
            <div className="mt-8 glass-shiny p-2 md:p-3">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="border-b border-[var(--border)] px-4 md:px-6">
                    <AccordionTrigger className="text-left text-base md:text-lg text-[var(--text)] hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[var(--text-2)] leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section-wrapper" id="footer-cta">
          <div className="container">
            <div className="glass-shiny p-8 md:p-12 text-center">
              <h2>Ready to stop being your own help desk?</h2>
              <div className="mt-7">
                <Button asChild size="lg" className="glow-button h-12 px-7 text-base font-semibold">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Book Your Free Workflow Audit -&gt;
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-[var(--muted)]">
                In 15 minutes, we'll show you exactly which workflows we'd automate and how much
                time you'd get back.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
