import { Navbar, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, ArrowRight, Zap, Bot, RefreshCw, Phone, Wrench, Shield } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { openCalendly, loadCalendlyScript } from "@/lib/calendly";
import { SpinningWheel } from "@/components/SpinningWheel";
import { CursorGlow } from "@/components/CursorGlow";
import { ParallaxOrb } from "@/components/ParallaxOrb";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--emerald)] to-[var(--steel)] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

function ParallaxWheel() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ y }}
      className="hidden lg:flex justify-center items-center hero-stats-wheel"
    >
      <SpinningWheel />
    </motion.div>
  );
}

function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  
  useEffect(() => {
    const startValue = prevValue.current;
    const endValue = value;
    const duration = 400;
    let startTime: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (endValue - startValue) * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = endValue;
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);
  
  return <span className="stat-number">{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--emerald)]/5 to-[var(--steel)]/5 border border-white/5" />
    </motion.div>
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

export default function Home() {
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

  // Scroll-linked shimmer effect on accent gradient text
  useEffect(() => {
    const updateShimmer = () => {
      const shimmerElements = document.querySelectorAll('.accent-gradient');
      shimmerElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate position relative to viewport (0 = top, 1 = bottom)
        const relativePosition = 1 - (rect.top / viewportHeight);
        const clampedPosition = Math.max(0, Math.min(1, relativePosition));
        const bgPosition = clampedPosition * 100;
        
        (el as HTMLElement).style.backgroundPosition = `${bgPosition}% 0`;
      });
    };
    
    window.addEventListener('scroll', updateShimmer, { passive: true });
    updateShimmer(); // Initial call
    
    return () => window.removeEventListener('scroll', updateShimmer);
  }, []);

  const weeklyHours = teamSize * hoursPerPerson;
  const monthlyCost = weeklyHours * 4 * hourlyValue;
  const yearlyCost = monthlyCost * 12;
  const paybackWeeks = Math.max(1, Math.round(1500 / (weeklyHours * hourlyValue * 0.5)));

  const handleCalculatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.error("Error:", error);
    } finally {
      setEmailSubmitting(false);
    }
  };

  const getSliderBackground = (value: number, max: number, min: number = 1) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #047857 0%, #5a7a8f ${percentage}%, rgba(255,255,255,0.08) ${percentage}%, rgba(255,255,255,0.08) 100%)`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-foreground overflow-x-hidden flex flex-col">
      <CursorGlow />
      
      {/* Parallax background orbs */}
      <ParallaxOrb top="10vh" left="-100px" speed={0.3} size={700} opacity={0.2} blur={60} />
      <ParallaxOrb top="60vh" right="-150px" speed={0.2} size={600} color="var(--steel)" opacity={0.18} blur={50} />
      <ParallaxOrb top="140vh" left="5vw" speed={0.4} size={800} opacity={0.18} blur={70} />
      <ParallaxOrb top="220vh" right="0px" speed={0.25} size={650} color="var(--steel)" opacity={0.15} blur={55} />
      
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
        <div className="hero-spotlight"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>
                Stop doing work that doesn't <span className="accent-gradient">make you money.</span>
              </h1>
              
              <div className="text-lg text-[#7F8A95] leading-relaxed space-y-4">
                <p>The repetitive tasks. The manual processes. The busy work that fills your calendar but never fills your pipeline.</p>
                <p>We build systems that eliminate it. In <span className="text-[var(--emerald)]">2 weeks</span>. For less than one month's salary.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-2">
                <Button 
                  onClick={() => scrollToSection('calculator')}
                  size="lg"
                  data-testid="button-hero-cta-primary"
                  className="glow-button hero-cta font-semibold group"
                >
                  Find My 10 Hours
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
            </motion.div>

            <ParallaxWheel />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-4">
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
            {logoData.map((logo, index) => (
              <div key={index} className="logo-carousel-item group cursor-pointer">
                {logo.svg}
                <span className="text-[10px] text-[rgba(255,255,255,0.40)] group-hover:text-[var(--emerald)] transition-colors">{logo.name}</span>
              </div>
            ))}
            {logoData.map((logo, index) => (
              <div key={`dup-${index}`} className="logo-carousel-item group cursor-pointer" aria-hidden="true">
                {logo.svg}
                <span className="text-[10px] text-[rgba(255,255,255,0.40)] group-hover:text-[var(--emerald)] transition-colors">{logo.name}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* AGITATION SECTION */}
      <section className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>Sound <span className="accent-gradient">Familiar?</span></h2>
            
            <div className="glass-card p-8 md:p-12 space-y-6 text-lg text-[#7F8A95] leading-relaxed">
              <p className="text-[#A7B1BA]">Copying the same data into three different tools. <span className="text-[#7F8A95]">Again.</span></p>
              <p className="text-[#A7B1BA]">Manually updating a spreadsheet that should update itself. <span className="text-[#7F8A95]">Again.</span></p>
              <p className="text-[#A7B1BA]">Sending the same email you sent last week. And the week before. <span className="text-[#7F8A95]">Again.</span></p>
              <p className="text-[#A7B1BA]">Walking a new client through onboarding step by step — while actual work piles up. <span className="text-[#7F8A95]">Again.</span></p>
              
              <p className="text-[#7F8A95] pt-4">It's not hard work. It's just endless work.</p>
              
              <p className="text-[#A7B1BA] font-medium pt-4">And the worst part? While you're buried in this — the deals you should be closing, the clients you should be serving, the growth you should be focused on — that's what's getting squeezed out.</p>
              
              <p className="text-[#C9D3D9] font-semibold text-xl pt-4">Busy work doesn't make you money. It costs you money.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* WHAT WE BUILD SECTION */}
      <section id="what-i-build" className="section-wrapper relative ambient-glow-emerald">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[var(--emerald)]/3 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>What We <span className="accent-gradient">Build</span></h2>
            <p className="text-[#7F8A95] text-lg">Not strategy decks. Not consulting reports. We build the systems that do the work — so you stop doing it.</p>
          </motion.div>

          <div className="max-w-5xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bento-card hover-glow card-lift p-8 md:row-span-2"
              >
                <div className="icon-wrapper w-16 h-16 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[var(--emerald)] icon-glow" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>AUTOMATIONS</h3>
                <p className="text-[#A7B1BA] mb-2">The stuff you keep saying you'll fix "when things slow down."</p>
                <p className="text-[#7F8A95] mb-4 italic">(Things never slow down.)</p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    "New lead comes in? Sorted, tagged, routed. Before you see it. Before you forget it.",
                    "Invoice hits 7 days overdue? Reminder sent. Then another at 14. You're not chasing anyone.",
                    "Client signs on? Welcome email, intake form, calendar link — all out the door while you're still in the meeting.",
                    "Follow-up due Thursday? Already in their inbox. You were slammed. Didn't matter."
                  ].map((example, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="text-[var(--emerald)] mt-0.5">→</span>
                      <span className="text-[#7F8A95]">{example}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#A7B1BA] font-bold mb-2">You've been doing this manually because "it only takes a few minutes."</p>
                <p className="text-[#A7B1BA] font-bold">It's never a few minutes.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bento-card hover-glow card-lift p-8"
              >
                <div className="icon-wrapper w-14 h-14 flex items-center justify-center mb-5">
                  <Bot className="w-7 h-7 text-slate-400 icon-glow" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>CUSTOM AI TOOLS</h3>
                <p className="text-[#A7B1BA] mb-4">You've answered the same question 100 times. Your AI should know the answer by now.</p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--emerald)] mt-0.5">→</span>
                    <span className="text-[#7F8A95]">Support bot that actually knows your product? Built on your docs, your FAQs, your way of explaining things.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--emerald)] mt-0.5">→</span>
                    <span className="text-[#7F8A95]">Writing assistant that sounds like you? Trained on your voice, not generic AI slop.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--emerald)] mt-0.5">→</span>
                    <span className="text-[#7F8A95]">Internal tool your team keeps asking for? Built once. Used forever.</span>
                  </li>
                </ul>
                <p className="text-[#A7B1BA] font-bold mb-2">Stop being the answer to every question.</p>
                <p className="text-[#A7B1BA] font-bold">Build the thing that answers for you.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bento-card hover-glow card-lift p-8"
              >
                <div className="icon-wrapper w-14 h-14 flex items-center justify-center mb-5">
                  <RefreshCw className="w-7 h-7 text-slate-400 icon-glow" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>MONTHLY PARTNERSHIP</h3>
                <p className="text-[#A7B1BA] mb-4">You don't need a full-time hire. You need someone on call.</p>
                <p className="text-[#7F8A95] mb-4">New automations as you need them. Maintenance when things change. Updates when tools break. One Slack message away.</p>
                <p className="text-[#A7B1BA] font-bold">Like having a tech team — without hiring one.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CALCULATOR SECTION */}
      <section id="calculator" className="section-wrapper relative overflow-hidden ambient-glow-center">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-[var(--emerald)]/5 via-[var(--steel)]/3 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>The <span className="accent-gradient">Math</span></h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="glass-card glow-border p-8 md:p-12"
            >
              <div className="space-y-10">
                <div>
                  <label className="block text-[#A7B1BA] text-lg mb-4 font-semibold">
                    Team size
                  </label>
                  <div className="text-center mb-4">
                    <span className="text-6xl font-bold text-[var(--emerald)] stat-number">{teamSize}</span>
                    <span className="text-[#7F8A95] ml-2">people</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    value={teamSize}
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    data-testid="slider-team-size"
                    className="w-full rounded-lg cursor-pointer"
                    style={{ background: getSliderBackground(teamSize, 30) }}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#A7B1BA] text-lg mb-4 font-semibold">
                    Hours/week on repetitive tasks per person
                  </label>
                  <div className="text-center mb-4">
                    <span className="text-6xl font-bold text-[var(--emerald)] stat-number">{hoursPerPerson}</span>
                    <span className="text-[#7F8A95] ml-2">hours</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={hoursPerPerson}
                    onChange={(e) => setHoursPerPerson(parseInt(e.target.value))}
                    data-testid="slider-hours"
                    className="w-full rounded-lg cursor-pointer"
                    style={{ background: getSliderBackground(hoursPerPerson, 20) }}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#A7B1BA] text-lg mb-4 font-semibold">
                    Hourly cost per team member
                  </label>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {[25, 35, 50, 75, 100].map((value) => (
                      <button 
                        key={value}
                        onClick={() => setHourlyValue(value)}
                        data-testid={`button-hourly-${value}`}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all border
                          ${hourlyValue === value 
                            ? 'border-[var(--emerald)] bg-[var(--emerald)]/15 text-[var(--emerald)]' 
                            : 'border-white/10 text-muted-foreground hover:border-[var(--emerald)]/40 hover:text-foreground'
                          }`}
                      >
                        ${value}/hr
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="text-center mb-8">
                  <p className="text-[#7F8A95] mb-4">Your team spends <span className="text-[var(--emerald)] font-bold text-2xl"><AnimatedNumber value={weeklyHours} /> hours/week</span> on robot work.</p>
                  <p className="text-[#A7B1BA] font-semibold text-xl mb-4">That's costing you:</p>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">→ <span className="text-[var(--emerald)]"><AnimatedNumber value={monthlyCost} prefix="$" /></span> <span className="text-[#A7B1BA]">per month</span></p>
                    <p className="text-3xl font-bold">→ <span className="text-[var(--emerald)]"><AnimatedNumber value={yearlyCost} prefix="$" /></span> <span className="text-[#A7B1BA]">per year</span></p>
                  </div>
                  <p className="text-[#7F8A95] mt-4">Plus the mistakes. The missed follow-ups. The deals that slipped because someone was too buried to notice.</p>
                <p className="text-[#A7B1BA] italic mt-2">(What would ONE saved deal be worth to you?)</p>
                </div>

                <div className="glass-card p-6 text-center border border-[var(--emerald)]/20 mb-8">
                  <p className="text-[#A7B1BA] mb-2">A one-time build starts at <span className="text-[var(--emerald)] font-semibold">$2,000</span>.</p>
                  <p className="text-[#A7B1BA] font-bold text-lg">Pays for itself in <span className="text-[var(--emerald)]">{monthlyCost > 0 ? Math.max(1, Math.ceil((2000 / monthlyCost) * 30)) : 30}</span> days.</p>
                </div>

                {emailSubmitted ? (
                  <div className="flex items-center justify-center gap-2 text-[var(--emerald)] py-4">
                    <Check className="w-5 h-5" />
                    <span>We'll be in touch within 24 hours!</span>
                  </div>
                ) : (
                  <>
                    <p className="text-center text-muted-foreground text-sm mb-6">
                      Free 30-minute call. No pitch. Just answers.
                    </p>
                    <form onSubmit={handleCalculatorSubmit} className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={calculatorName}
                        onChange={(e) => setCalculatorName(e.target.value)}
                        data-testid="input-calc-name"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-[var(--emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--emerald)]/15 transition-all"
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={calculatorEmail}
                        onChange={(e) => setCalculatorEmail(e.target.value)}
                        required
                        data-testid="input-calc-email"
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-[var(--emerald)] focus:outline-none focus:ring-2 focus:ring-[var(--emerald)]/15 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={emailSubmitting}
                        data-testid="button-calc-submit"
                        className="glow-button font-semibold disabled:opacity-50"
                      >
                        {emailSubmitting ? "Sending..." : "Find Your 10 Hours →"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>How It <span className="accent-gradient">Works</span></h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-transparent via-[var(--emerald)]/30 to-transparent" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "1", 
                  title: "WE TALK", 
                  badge: "30 min, free",
                  desc: "You show us the mess. We tell you exactly what it costs to fix. No pitch. No pressure. If it doesn't make sense, we'll say so.",
                  details: "",
                  icon: Phone 
                },
                { 
                  step: "2", 
                  title: "WE BUILD", 
                  badge: "1-2 weeks",
                  desc: "You keep running your business. We build in the background. You'll see progress the whole way.",
                  details: "",
                  icon: Wrench 
                },
                { 
                  step: "3", 
                  title: "IT RUNS", 
                  badge: "Day 1",
                  desc: "Working system. Your team trained. 30-60 days of support included.",
                  details: "No decks. No roadmaps. No 'discovery phases.' Just the fix.",
                  icon: Check 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--emerald)]/15 to-[var(--steel)]/15 border border-white/8 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--emerald)] to-[var(--steel)] flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card glass-card-hover p-6 h-full">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>{item.title}</h3>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[var(--emerald)]/15 text-[var(--emerald)] text-xs font-medium floating-badge">{item.badge}</span>
                    </div>
                    <p className="text-[#A7B1BA] text-center mb-3">{item.desc}</p>
                    <p className="text-[#7F8A95] text-sm text-center">{item.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-32"></div>
      </section>

      <div className="section-divider" />

      {/* PRICING SECTION */}
      <section className="section-wrapper relative ambient-glow-center">
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>Simple <span className="accent-gradient">Pricing</span></h2>
            <p className="text-[#7F8A95] text-lg">No hourly rates. No surprise invoices. Just clear packages.</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "STARTER BUILD",
                  price: "Starting at $2,500",
                  description: "One problem, solved.",
                  features: ["1-2 workflow automations", "Done in ~1 week", "30 days bug-fix support"],
                  popular: false
                },
                {
                  name: "FULL BUILD",
                  price: "Starting at $4,500",
                  description: "Multiple automations. The whole workflow.",
                  features: ["Multiple workflow automations", "Done in ~2 weeks", "Walkthrough + documentation included", "60 days bug-fix support"],
                  popular: true
                },
                {
                  name: "MONTHLY PARTNER",
                  price: "Starting at $2,500/mo",
                  description: "Ongoing builds. Maintenance. Priority support.",
                  features: ["1-2 new automations or upgrades/month", "Maintenance & fixes included", "Priority response times", "Cancel anytime"],
                  popular: false
                }
              ].map((plan, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-[var(--emerald)] to-[var(--steel)] text-white text-xs font-bold px-4 py-1.5 rounded-full">MOST COMMON</span>
                    </div>
                  )}
                  <div className={`glass-card glass-card-hover p-8 h-full ${plan.popular ? 'border-[var(--emerald)]/30' : ''}`}>
                    <h3 className="text-lg font-bold mb-2" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{plan.name}</h3>
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
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[#7F8A95] mt-8 text-lg">Still cheaper than one bad hire.</p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* GUARANTEE SECTION */}
      <section className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>The <span className="accent-gradient">Guarantee</span></h2>
            
            <div className="guarantee-card text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[var(--emerald)]" />
              </div>
              <p className="text-[rgba(255,255,255,0.92)] font-semibold text-xl mb-3">If it doesn't hit the goals we agreed on, we fix it. Free.</p>
              <p className="text-[rgba(255,255,255,0.72)] text-lg mb-4">And if we can't get it working within your support window? You keep everything we built — and pay nothing.</p>
              <p className="text-[#7F8A95] text-sm italic">We've never had to use this.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* WHO THIS IS FOR SECTION */}
      <section className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>Is This a <span className="accent-gradient">Fit</span>?</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="glass-card glass-card-hover p-8"
            >
              <ul className="space-y-4">
                {[
                  "Small team wearing a lot of hats",
                  "Repetitive tasks eating your week",
                  "Ready to hand it off and have it just... work"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--emerald)] flex-shrink-0 mt-0.5" />
                    <span className="text-[#A7B1BA]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover p-8"
            >
              <ul className="space-y-4">
                {[
                  "Large org with long procurement cycles",
                  "Still exploring, not ready to build",
                  "Need internal IT sign-off first"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-[#7F8A95] flex-shrink-0 mt-0.5" />
                    <span className="text-[#7F8A95]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ABOUT SECTION */}
      <section className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>Who We <span className="accent-gradient">Are</span></h2>
            
            <div className="glass-card glow-border p-8 md:p-12 text-center">
              <div className="space-y-4 text-[#7F8A95] leading-relaxed max-w-xl mx-auto">
                <p className="text-[#A7B1BA] font-medium text-lg">We work with businesses too small to hire a full-time automation specialist — and too busy to figure this out alone.</p>
                <p className="text-[#A7B1BA] mt-4">You point at the problem. We make it go away.</p>
              </div>
              <p className="mt-8 text-[var(--emerald)] font-semibold text-lg">— Veyra Group</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ SECTION */}
      <section className="section-wrapper relative">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
            style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}
          >
            <span className="accent-gradient">FAQ</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "What exactly do you build?", a: "Two things. First — automations. The stuff you do over and over that doesn't require thinking. Lead routing, invoice reminders, client onboarding, data syncing between tools. We make it run without you. Second — custom AI tools. Think support bots that actually know your business, writing tools that sound like you, internal assistants that answer questions so you don't have to. If it's repetitive and doesn't need your brain, we can probably kill it." },
                { q: "How much of my time does this take?", a: "One 30-minute call upfront. Maybe a few async questions during the build. That's it. You don't need to project-manage this. You don't need to learn new software. You keep running your business — we handle the rest." },
                { q: "Is this just Zapier? Why can't I do this myself?", a: "You could. Same way you could do your own taxes or fix your own plumbing. The question is whether that's the best use of your time. We use tools like Zapier, Make, and custom code — but the value isn't the tool. It's knowing what to build, how to make it bulletproof, and getting it done in days instead of 'someday.' Most clients tried the DIY route. That's why they're here." },
                { q: "Why is there a price range?", a: "Complexity. A two-step automation that sends a Slack message is simpler than a five-tool workflow with conditional logic and error handling. We scope everything on the first call, so you'll know the exact price before we start. No surprises." },
                { q: "How long until it's running?", a: "Most builds are done in 1-2 weeks. Not a proposal. Not a project plan. A working system, live in your business." },
                { q: "What if something breaks later?", a: "Every build includes 30 days of support. If something breaks, we fix it. After that, you can either grab a monthly partnership for ongoing maintenance — or we document everything so your team can handle it. Either way, you're not left hanging." }
              ].map((item, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`}
                  className="glass-card glass-card-hover border border-white/10 rounded-2xl overflow-hidden px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold py-5 hover:no-underline text-left" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#7F8A95] pb-5 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FINAL CTA SECTION */}
      <section className="section-wrapper relative ambient-glow-emerald">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-card glow-border p-12 md:p-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #D4DEE4 35%, #9EADB8 70%, #6B7C87 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '0.1em' }}>Let's <span className="accent-gradient">Talk</span></h2>
            <div className="text-[#7F8A95] text-lg mb-10 leading-relaxed space-y-4">
              <p>30 minutes. That's it.</p>
              <p>We'll map out exactly what's eating your week — and what it would cost to make it stop.</p>
              <p>If automation isn't the right answer, we'll tell you. No hard sell.</p>
            </div>
            <Button 
              onClick={openCalendly}
              size="lg"
              data-testid="button-final-cta"
              className="glow-button hero-cta font-semibold group"
            >
              Book the Call
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-[#5F6972] text-sm mt-8">
              <a href="mailto:contact@veyra.group" className="text-[var(--emerald)] hover:underline">contact@veyra.group</a><br />
              <a href="tel:+13026002625" className="text-[#5F6972] hover:text-[var(--emerald)]">(302) 600-2625</a><br />
              We usually reply same day.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
