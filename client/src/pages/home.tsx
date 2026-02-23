import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Bot,
  RefreshCw,
  Phone,
  Wrench,
  ShieldCheck,
  MessageSquare,
  FileText,
  DollarSign,
  Users,
  Mail,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { openCalendly } from "@/lib/calendly";
import { SpinningWheel } from "@/components/SpinningWheel";
import { SpotlightCard } from "@/components/SpotlightCard";

function ParallaxWheel() {
  return (
    <div className="hero-load-wheel relative z-10 flex justify-center items-center w-full h-[520px]">
      <SpinningWheel />
    </div>
  );
}

const logoData = [
  {
    name: "Slack",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
        <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
        <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312z"/>
        <path fill="#ECB22E" d="M15.166 18.956a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z"/>
      </svg>
    )
  },
  {
    name: "Gmail",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    )
  },
  {
    name: "Outlook",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.578.23h-8.547v-6.959l1.6 1.229c.102.086.229.127.379.127.148 0 .277-.041.379-.127l6.768-5.187c.059-.04.127-.065.202-.074.076-.01.143.003.201.04.065.038.113.085.143.143.03.057.046.12.048.189l-.357 2.52v-3.165z"/>
        <path fill="#0078D4" d="M15.072 10.688L24 4.264v-.877c0-.23-.08-.424-.238-.578-.158-.153-.352-.23-.578-.23h-8.547v7.396l.435.713z"/>
        <path fill="#0078D4" d="M0 6.109v11.578c0 .586.477 1.063 1.063 1.063h7.575c.586 0 1.063-.477 1.063-1.063V6.109c0-.586-.477-1.063-1.063-1.063H1.063C.477 5.046 0 5.523 0 6.109zm4.85 8.45c-2.092 0-3.395-1.639-3.395-3.687 0-2.148 1.357-3.787 3.45-3.787 2.147 0 3.395 1.693 3.395 3.687 0 2.148-1.357 3.787-3.45 3.787zm.027-6.082c-1.248 0-1.967 1.057-1.967 2.35 0 1.275.665 2.35 1.94 2.35 1.249 0 1.968-1.057 1.968-2.35 0-1.275-.665-2.35-1.94-2.35z"/>
      </svg>
    )
  },
  {
    name: "Notion",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="white">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.187 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-.98.7-1.027l3.459-.233 4.764 7.28v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.312-.187z"/>
      </svg>
    )
  },
  {
    name: "Sheets",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#34A853" d="M19 11V9h-6V3h-2v6H5v2h6v10h2V11z"/>
        <path fill="#188038" d="M19 3h-5v6h6V4a1 1 0 0 0-1-1z"/>
        <path fill="#34A853" d="M19 9h-5v6h6V9z"/>
        <path fill="#188038" d="M19 15h-5v6h5a1 1 0 0 0 1-1v-5z"/>
        <path fill="#34A853" d="M5 21h5v-6H4v5a1 1 0 0 0 1 1z"/>
        <path fill="#188038" d="M4 9v6h6V9H4z"/>
        <path fill="#34A853" d="M5 3a1 1 0 0 0-1 1v5h6V3H5z"/>
      </svg>
    )
  },
  {
    name: "Excel",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#217346" d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3z"/>
      </svg>
    )
  },
  {
    name: "Airtable",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path fill="#FCB400" d="M11.992 0L1.59 4.222 12.008 8.79l10.4-4.554L11.992 0z"/>
        <path fill="#18BFFF" d="M12 24l10.4-4.56V8.508l-10.4 4.557V24z"/>
        <path fill="#F82B60" d="M0 19.44L10.4 24V13.065L.4 8.51l-.4.178v10.752z"/>
      </svg>
    )
  },
  {
    name: "HubSpot",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#FF7A59">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066A2.2 2.2 0 0 0 17.231.835h-.065a2.2 2.2 0 0 0-2.2 2.199v.066a2.19 2.19 0 0 0 1.267 1.984V7.93a6.152 6.152 0 0 0-2.918 1.303l-7.7-5.996a2.596 2.596 0 1 0-1.003 1.455l7.463 5.808a6.222 6.222 0 0 0-.472 2.375c0 .903.196 1.76.545 2.533l-2.263 2.263a1.906 1.906 0 0 0-.558-.09 1.928 1.928 0 1 0 1.928 1.927c0-.2-.036-.39-.09-.569l2.227-2.227a6.223 6.223 0 1 0 4.693-10.782zm-.967 9.787a3.317 3.317 0 1 1 .034-6.634 3.317 3.317 0 0 1-.034 6.634z"/>
      </svg>
    )
  },
  {
    name: "Salesforce",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.45 0-.84-.06-1.26-.15-.63 1.41-2.04 2.4-3.69 2.4-1.05 0-2.01-.39-2.76-1.05a4.12 4.12 0 0 1-3.93 2.88c-1.62 0-3.06-.93-3.75-2.31-.42.09-.87.15-1.32.15C.93 18.225 0 15.885 0 13.005c0-2.88 2.28-5.22 5.13-5.22.48 0 .93.06 1.38.18.81-1.56 2.46-2.55 4.35-2.55.39 0 .75.03 1.146.105z"/>
      </svg>
    )
  },
  {
    name: "Calendly",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#006BFF">
        <path d="M19.655 14.262c.281-.281.663-.438 1.061-.438h1.861c.276 0 .5-.224.5-.5V10.72c0-.276-.224-.5-.5-.5h-1.861c-.398 0-.78-.157-1.061-.438l-1.318-1.318c-.281-.281-.438-.663-.438-1.061V5.543c0-.276-.224-.5-.5-.5h-2.604c-.276 0-.5.224-.5.5v1.86c0 .398-.157.78-.438 1.061l-1.318 1.318c-.281.281-.663.438-1.061.438H9.617c-.398 0-.78.157-1.061.438l-1.318 1.318c-.281.281-.438.663-.438 1.061v1.86c0 .398.157.78.438 1.061l1.318 1.318c.281.281.438.663.438 1.061v1.861c0 .276.224.5.5.5h2.604c.276 0 .5-.224.5-.5v-1.861c0-.398.157-.78.438-1.061l1.318-1.318c.281-.281.663-.438 1.061-.438h1.861c.398 0 .78-.157 1.061-.438zM12 15.75c-2.071 0-3.75-1.679-3.75-3.75S9.929 8.25 12 8.25s3.75 1.679 3.75 3.75-1.679 3.75-3.75 3.75z"/>
      </svg>
    )
  },
  {
    name: "Stripe",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
      </svg>
    )
  },
  {
    name: "QuickBooks",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#2CA01C">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.805 17.93h-1.65c-.276 0-.5-.224-.5-.5v-4.93h-3.31v4.93c0 .276-.224.5-.5.5H8.195c-.276 0-.5-.224-.5-.5V7.07c0-.276.224-.5.5-.5h1.65c.276 0 .5.224.5.5v4.43h3.31V7.07c0-.276.224-.5.5-.5h1.65c.276 0 .5.224.5.5v10.36c0 .276-.224.5-.5.5z"/>
      </svg>
    )
  },
  {
    name: "DocuSign",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#FFCC22">
        <path d="M22.5 10.5h-4.125v-9h-12.75v9H1.5L12 21l10.5-10.5zM8.625 4.5h6.75v6h-6.75v-6z"/>
      </svg>
    )
  },
  {
    name: "Zapier",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#FF4A00">
        <path d="M15.185 12l2.813-2.813a5.985 5.985 0 0 0 0-2.374l-2.813 2.813-2.813-2.813a5.985 5.985 0 0 0-2.374 0l2.813 2.813-2.813 2.813a5.985 5.985 0 0 0 0 2.374l2.813-2.813 2.813 2.813a5.985 5.985 0 0 0 2.374 0L15.185 12zm-3.187 5.998a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/>
      </svg>
    )
  },
  {
    name: "Make",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="#6D00CC">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm4 0h-2V9h2v8z"/>
      </svg>
    )
  },
  {
    name: "OpenAI",
    svg: (
      <svg className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="white">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    )
  },
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
    a: "Cancel anytime. No contracts, no penalties. You keep everything we built - it's yours.",
  },
];

export default function Home() {
  const [calculatorHeight, setCalculatorHeight] = useState(980);

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

  const featureIcons = [MessageSquare, Wrench, FileText, DollarSign, Users, Mail];

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
                    Veyra builds custom AI automations that handle your tenant communications,
                    maintenance coordination, and lease tracking - so you can manage 200 units
                    without hiring 2 more people.
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

                  <div className="flex items-center gap-4 px-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-[rgba(12,18,14,0.8)] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#A7B1BA]"
                        >
                          {i === 3 ? "10+" : ""}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-[#7F8A95]">
                      <span className="text-[#C9D3D9] font-bold">10+ hrs/week</span> saved
                    </div>
                  </div>
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
                    {logo.svg}
                    <span className="text-[10px] text-[rgba(255,255,255,0.40)] group-hover:text-[var(--emerald)] transition-colors">
                      {logo.name}
                    </span>
                  </div>
                ))}
                {logoData.map((logo, index) => (
                  <div key={`dup-${index}`} className="logo-carousel-item group cursor-pointer" aria-hidden="true">
                    {logo.svg}
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
              <h2 className="section-title">Six things eating your day.</h2>
              <p className="section-subtitle text-[#7F8A95]">Before and after Veyra.</p>
            </div>

            <div data-reveal data-reveal-delay="1" className="max-w-6xl mx-auto mt-16 grid lg:grid-cols-2 gap-6">
              {automationCards.map((item, index) => {
                const Icon = featureIcons[index];
                return (
                  <SpotlightCard key={item.title} data-tilt className="glass-card overflow-hidden p-0">
                    <div className="p-6 border-b border-white/10 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[rgba(10,18,14,0.9)] border border-white/10 flex items-center justify-center text-[var(--emerald)]">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                      <div className="p-6 bg-red-500/5">
                        <div className="text-xs font-bold text-red-300 uppercase tracking-[0.12em] mb-3">Before</div>
                        <p className="text-[#A7B1BA] text-sm leading-relaxed">{item.before}</p>
                      </div>
                      <div className="p-6 bg-[var(--emerald)]/5">
                        <div className="text-xs font-bold text-[var(--emerald)] uppercase tracking-[0.12em] mb-3">After</div>
                        <p className="text-[#C9D3D9] text-sm leading-relaxed">{item.after}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="section-wrapper section-prelude section-dense relative">
          <div className="container mx-auto px-4 md:px-6">
            <div data-reveal className="text-center mb-16">
              <h2 className="section-title">Three steps. You're up and running in two weeks.</h2>
            </div>

            <div data-reveal data-reveal-delay="1" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {processSteps.map((step) => (
                <SpotlightCard key={step.number} data-tilt className="glass-card p-7 h-full">
                  <div className="w-12 h-12 rounded-full bg-[rgba(10,18,14,0.9)] border border-white/10 flex items-center justify-center text-[var(--emerald)] font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#7F8A95] uppercase tracking-[0.12em]">
                    <Clock size={13} />
                    {step.duration}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <step.icon className="w-4 h-4 text-[var(--emerald)]" />
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-[#A7B1BA] leading-relaxed">{step.description}</p>
                </SpotlightCard>
              ))}
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
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[rgba(10,18,14,0.32)]">
                    <iframe
                      src="/roi-calculator.html"
                      title="Veyra Group PM Efficiency Audit"
                      className="w-full bg-[#0a0f0a]"
                      style={{ border: 0, height: `${calculatorHeight}px` }}
                    />
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
                    description: "Covers up to 50 units. Cancel anytime.",
                    features: [
                      "Monitoring + fast fixes",
                      "Continuous optimization",
                      "Direct support, no ticket queue",
                    ],
                    popular: true,
                  },
                  {
                    name: "GROWTH SCALING",
                    price: "$5/unit above 50",
                    description: "Pricing grows with portfolio size and automation load.",
                    features: [
                      "Predictable unit-based scaling",
                      "No annual contracts",
                      "No hidden platform or seat fees",
                    ],
                    popular: false,
                  },
                ].map((plan, i) => (
                  <div key={i} className="relative">
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <span className="pricing-badge-pop text-xs font-semibold px-4 py-1.5 rounded-full">MOST COMMON</span>
                      </div>
                    )}
                    <SpotlightCard
                      data-tilt
                      data-tilt-scale={plan.popular ? "1.03" : undefined}
                      className={`glass-card glass-card-hover pricing-card p-8 h-full ${
                        plan.popular ? "border-[var(--emerald)]/30 pricing-card-spotlight full-build-card" : "pricing-card-secondary"
                      }`}
                    >
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
                  </div>
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
                <div className="guarantee-seal mx-auto mt-8 mb-6">
                  <ShieldCheck className="w-14 h-14 text-[#d4a853]" />
                </div>
                <p className="guarantee-title text-[rgba(255,255,255,0.92)] font-semibold text-xl mb-3">If we build it and it doesn't hit the goals we agreed on - we fix it. Free.</p>
                <p className="text-[rgba(255,255,255,0.72)] text-lg mb-3">Still not working? Keep everything we built. Pay nothing.</p>
                <p className="text-[#A7B1BA] text-base mb-3">Every automation, every workflow, every integration - it's yours. We don't hold your business hostage.</p>
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
              <div className="h-full">
                <SpotlightCard data-tilt className="fit-card h-full p-6" variant="fit">
                  <ul className="space-y-3">
                    {[
                      "You manage 5-300 units and wear too many hats",
                      "Tenant comms, maintenance, leases, and follow-ups run manually",
                      "You want practical automation live in weeks, not quarters",
                    ].map((item, i) => (
                      <li key={i} className="fit-item flex items-start gap-3">
                        <span className="fit-status fit-status-good">
                          <Check className="w-4 h-4" />
                        </span>
                        <span className="text-[#A7B1BA]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>

              <div className="h-full">
                <SpotlightCard data-tilt className="fit-card h-full p-6" variant="fit">
                  <ul className="space-y-3">
                    {[
                      "You're looking for a DIY tool with no implementation support",
                      "You need long enterprise procurement and committee approvals",
                      "You're not ready to execute workflow changes this month",
                    ].map((item, i) => (
                      <li key={i} className="fit-item flex items-start gap-3">
                        <span className="fit-status fit-status-neutral">
                          <X className="w-4 h-4" />
                        </span>
                        <span className="text-[#7F8A95]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
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

        <Footer />
      </main>
    </div>
  );
}
