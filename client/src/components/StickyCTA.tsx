import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { openCalendly } from '@/lib/calendly';

export function StickyCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 400], [0, 1]);
  const y = useTransform(scrollY, [200, 400], [100, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={openCalendly}
        className="glow-button group font-semibold"
        data-testid="button-sticky-cta"
      >
        <span className="text-sm">Book a Call</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
