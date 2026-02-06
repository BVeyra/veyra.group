import { openCalendly } from "@/lib/calendly";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function BookingWidget() {
  return (
    <div className="flex justify-center">
      <motion.button
        type="button"
        onClick={openCalendly}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glow-button inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-[var(--emerald)] to-[var(--steel)] hover:from-[var(--emerald-2)] hover:to-[var(--steel)] text-white text-xl font-semibold cursor-pointer transition-all"
        aria-label="Book a call"
        data-testid="button-book-call"
      >
        Book Your Free Call
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
