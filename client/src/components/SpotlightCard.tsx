import { useEffect, useRef, useState, type HTMLAttributes } from "react";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "feature" | "step" | "fit" | "guarantee" | "faq" | "default";
};

export function SpotlightCard({
  className = "",
  children,
  variant = "default",
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tiltX: 0,
    tiltY: 0,
    intensity: 0,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;
    setReducedMotion(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      setReducedMotion(event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const applyFrame = () => {
    frameRef.current = null;
    const el = cardRef.current;
    if (!el) return;

    const { x, y, tiltX, tiltY, intensity } = pointerRef.current;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    el.style.setProperty("--spot-opacity", `${intensity}`);
    el.style.setProperty("--spot-border-opacity", `${Math.min(1, intensity * 1.2)}`);

    if (reducedMotionRef.current) {
      el.style.transform = "translateZ(0)";
      return;
    }

    el.style.transform = `perspective(1000px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg) translateZ(0)`;
  };

  const requestFrame = () => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(applyFrame);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    pointerRef.current.x = x;
    pointerRef.current.y = y;
    pointerRef.current.intensity = 1;
    pointerRef.current.tiltX = Math.max(-2, Math.min(2, px * 4));
    pointerRef.current.tiltY = Math.max(-2, Math.min(2, py * -4));
    requestFrame();

    onMouseMove?.(event);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    pointerRef.current.intensity = 1;
    requestFrame();
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    pointerRef.current.intensity = 0;
    pointerRef.current.tiltX = 0;
    pointerRef.current.tiltY = 0;
    requestFrame();
    onMouseLeave?.(event);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`spotlight-card spotlight-${variant} ${reducedMotion ? "spotlight-reduced" : ""} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
