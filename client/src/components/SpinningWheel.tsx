import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Inbox, 
  ClipboardList, 
  GitBranch, 
  FileStack, 
  ClipboardCheck, 
  Timer 
} from 'lucide-react';

const wheelIcons = [
  { icon: Calendar, label: 'Scheduling' },
  { icon: MessageSquare, label: 'Internal Comms' },
  { icon: Inbox, label: 'Inbox Cleanup' },
  { icon: ClipboardList, label: 'SOPs' },
  { icon: GitBranch, label: 'Workflows' },
  { icon: FileStack, label: 'Knowledge Base' },
  { icon: ClipboardCheck, label: 'Approvals' },
  { icon: Timer, label: 'Time Saved' },
];

export function SpinningWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Animated counter with Intersection Observer
  useEffect(() => {
    if (!numberRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate from 0 to 10 with smoother stepping
            const duration = 6000;
            const target = 10;
            const startTime = Date.now();
            let lastNumber = -1;
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Smoother easing function (ease-out-quart)
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = Math.round(eased * target);
              
              // Only update state when number changes to reduce re-renders
              if (current !== lastNumber) {
                lastNumber = current;
                setDisplayNumber(current);
              }
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayNumber(target);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isHovered) return;
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wheelIcons.length);
    }, 2500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const currentActiveIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const rotationDuration = prefersReducedMotion ? 0 : 30;

  return (
    <div 
      className="relative w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] md:w-[520px] md:h-[520px] aspect-square overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIndex(null);
      }}
    >
      {/* Subtle radial background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-gradient-radial from-[rgba(42,163,122,0.06)] via-[rgba(42,163,122,0.02)] to-transparent rounded-full blur-3xl" />
      </div>

      {/* Concentric ring guides - premium styled */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="stats-outer-ring-main absolute w-[85%] h-[85%] rounded-full" />
        <div className="stats-outer-ring absolute w-[60%] h-[60%] rounded-full" />
        <div className="stats-outer-ring absolute w-[40%] h-[40%] rounded-full" />
      </div>

      {/* Outer ring with icons - NO rotation on the container */}
      <div className="absolute inset-0 overflow-visible" style={{ zIndex: 50 }}>
        {wheelIcons.map((item, index) => {
          const angle = (index / wheelIcons.length) * 360;
          const isActive = index === currentActiveIndex;
          const Icon = item.icon;
          
          return (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-200px) rotate(-${angle}deg)`,
                marginLeft: '-24px',
                marginTop: '-24px',
              }}
            >
              <motion.div
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Label above icon */}
                <AnimatePresence>
                  {isActive && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="stats-tooltip"
                    >
                      <span className="text-xs font-semibold text-[#c8d4e0]">{item.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon container - premium styled */}
                <div 
                  className={`stats-icon-box ${isActive ? 'stats-icon-box-active' : ''}`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <Icon 
                    className={`stats-icon ${isActive ? 'stats-icon-active' : ''}`}
                    aria-label={item.label}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="stats-center">
          <div 
            ref={numberRef}
            className="stats-number"
            aria-label="10 plus hours per week saved"
          >
            {displayNumber}+
          </div>
          <div className="stats-label">
            hrs/week saved
          </div>
        </div>
      </div>

      {/* Mobile label display - positioned below wheel */}
      <div className="stats-mobile-label absolute left-1/2 text-center md:hidden" style={{ bottom: '-50px', transform: 'translateX(-50%)', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentActiveIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="inline-block px-4 py-2 text-sm font-medium text-[rgba(255,255,255,0.7)] bg-[rgba(15,25,15,0.8)] border border-[rgba(45,212,168,0.15)] rounded-full backdrop-blur-sm"
          >
            {wheelIcons[currentActiveIndex].label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
