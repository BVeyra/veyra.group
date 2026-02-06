import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxOrbProps {
  className?: string;
  speed?: number;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  top?: string;
  left?: string;
  right?: string;
}

export function ParallaxOrb({ 
  className = '',
  speed = 0.2,
  size = 400,
  color = 'var(--emerald)',
  opacity = 0.15,
  blur = 80,
  top = '0px',
  left,
  right,
}: ParallaxOrbProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -600 * speed]);

  return (
    <motion.div
      className={`fixed pointer-events-none ${className}`}
      style={{ 
        y,
        top,
        left,
        right,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        borderRadius: '50%',
        zIndex: 0,
      }}
    />
  );
}
