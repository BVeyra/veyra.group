import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const frameRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 200 };
  const motionX = useMotionValue(-1000);
  const motionY = useMotionValue(-1000);
  const x = useSpring(motionX, springConfig);
  const y = useSpring(motionY, springConfig);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    setIsCoarsePointer(media.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    const updatePosition = () => {
      frameRef.current = null;
      motionX.set(posRef.current.x);
      motionY.set(posRef.current.y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        setIsVisible(true);
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isCoarsePointer, isVisible, motionX, motionY]);

  if (isCoarsePointer) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute w-[340px] h-[340px] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(35, 96, 79, 0.05) 0%, rgba(35, 96, 79, 0.018) 44%, transparent 72%)",
        }}
      />
    </motion.div>
  );
}
