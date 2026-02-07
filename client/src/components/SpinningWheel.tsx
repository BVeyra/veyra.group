import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MessageSquare,
  Inbox,
  ClipboardList,
  GitBranch,
  FileStack,
  ClipboardCheck,
  Timer,
} from 'lucide-react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────
   VEYRA SPINNING WHEEL — 3D Interactive Rebuild
   
   Drop-in replacement: same export, same CSS classes,
   same icons. Adds Three.js 3D orbital layer behind
   the existing CSS wheel for depth + interactivity.
   ───────────────────────────────────────────────────── */

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

// ─── Three.js 3D Background Layer ───
function Wheel3DCanvas({ size }: { size: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Detect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderSize = Math.round(size * 1.7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(renderSize, renderSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x059669, 0.3));

    const light1 = new THREE.PointLight(0x059669, 2.5, 18);
    light1.position.set(3, 2, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x047857, 1.5, 18);
    light2.position.set(-2, -3, 4);
    scene.add(light2);

    // ── Ring material ──
    const makeRingMat = (opacity: number) =>
      new THREE.MeshPhysicalMaterial({
        color: 0x059669,
        metalness: 0.8,
        roughness: 0.15,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      });

    // ── 4 Orbital Rings (matching 4 CSS concentric rings) ──
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.3, 0.03, 16, 160),
      makeRingMat(0.3)
    );
    ring1.rotation.x = Math.PI * 0.48;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.75, 0.025, 16, 128),
      makeRingMat(0.22)
    );
    ring2.rotation.x = Math.PI * 0.53;
    ring2.rotation.z = 0.12;
    scene.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.02, 16, 96),
      makeRingMat(0.15)
    );
    ring3.rotation.x = Math.PI * 0.46;
    ring3.rotation.z = -0.08;
    scene.add(ring3);

    const ring4 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.015, 16, 80),
      makeRingMat(0.1)
    );
    ring4.rotation.x = Math.PI * 0.5;
    scene.add(ring4);

    // ── Central glow sphere ──
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x059669,
        transparent: true,
        opacity: 0.04,
      })
    );
    scene.add(core);

    // ── Orbiting node spheres ──
    const nodes: { mesh: THREE.Mesh; ring: number; angle: number; speed: number }[] = [];
    for (let i = 0; i < 16; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshPhysicalMaterial({
          color: 0x059669,
          emissive: 0x059669,
          emissiveIntensity: 0.5,
          metalness: 0.3,
          roughness: 0.3,
          transparent: true,
          opacity: 0.75,
        })
      );
      scene.add(sphere);
      nodes.push({
        mesh: sphere,
        ring: i % 4,
        angle: (i / 16) * Math.PI * 2 + Math.random() * 0.4,
        speed: prefersReduced ? 0 : 0.06 + (i % 4) * 0.035,
      });
    }

    // ── Particle field ──
    const pCount = 120;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.2 + Math.random() * 2.2;
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0x059669,
        size: 0.015,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    // ── Data flow lines (connecting nodes) ──
    const lines: { line: THREE.Line; from: number; to: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.BufferGeometry();
      const pts = new Float32Array(63); // 21 segments × 3
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          color: 0x059669,
          transparent: true,
          opacity: 0.06,
        })
      );
      scene.add(line);
      lines.push({ line, from: i, to: (i + 4) % 16 });
    }

    // ── Mouse tracking ──
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    // ── Animation ──
    const clock = new THREE.Clock();
    let frameId: number;

    const radii = [3.3, 2.75, 2.15, 1.55];
    const tilts = [0.48, 0.53, 0.46, 0.5];

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const speed = prefersReduced ? 0 : 1;

      // Rotate rings
      ring1.rotation.z = t * 0.05 * speed;
      ring2.rotation.z = 0.12 + t * -0.07 * speed;
      ring3.rotation.z = -0.08 + t * 0.09 * speed;
      ring4.rotation.z = t * -0.11 * speed;

      // Pulse core
      const pulse = 1 + Math.sin(t * 1.5) * 0.05 * speed;
      core.scale.set(pulse, pulse, pulse);
      core.material.opacity = 0.03 + Math.sin(t * 1.2) * 0.01;

      // Move nodes along tilted rings
      nodes.forEach((n) => {
        const a = n.angle + t * n.speed;
        const rad = radii[n.ring];
        const tilt = tilts[n.ring] * Math.PI;
        const x = rad * Math.cos(a);
        const z = rad * Math.sin(a);
        const cy = -z * Math.sin(tilt);
        const cz = z * Math.cos(tilt);
        n.mesh.position.set(x, cy, cz);
        const sp = 1 + Math.sin(t * 2.5 + n.angle) * 0.18 * speed;
        n.mesh.scale.set(sp, sp, sp);
      });

      // Update data flow lines
      lines.forEach((l) => {
        const from = nodes[l.from].mesh.position;
        const to = nodes[l.to].mesh.position;
        const positions = l.line.geometry.attributes.position.array as Float32Array;
        for (let j = 0; j <= 20; j++) {
          const frac = j / 20;
          positions[j * 3] = from.x + (to.x - from.x) * frac;
          positions[j * 3 + 1] = from.y + (to.y - from.y) * frac;
          positions[j * 3 + 2] = from.z + (to.z - from.z) * frac;
        }
        l.line.geometry.attributes.position.needsUpdate = true;
        (l.line.material as THREE.LineBasicMaterial).opacity =
          0.03 + Math.sin(t + l.from) * 0.025;
      });

      // Rotate particles
      particles.rotation.y = t * 0.012 * speed;
      particles.rotation.x = Math.sin(t * 0.07) * 0.06 * speed;

      // Mouse-reactive camera
      camera.position.x += (mouse.current.x * 0.7 - camera.position.x) * 0.035;
      camera.position.y += (mouse.current.y * 0.45 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      // Light breathing
      light1.intensity = 2.5 + Math.sin(t * 1.3) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: Math.round(size * 1.7),
        height: Math.round(size * 1.7),
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── Main SpinningWheel Export ───
export function SpinningWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(520);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Responsive canvas size
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCanvasSize(420);
      else if (w < 768) setCanvasSize(480);
      else setCanvasSize(520);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Animated counter
  useEffect(() => {
    if (!numberRef.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 6000;
            const target = 10;
            const startTime = Date.now();
            let lastNumber = -1;
            const step = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = Math.round(eased * target);
              if (current !== lastNumber) {
                lastNumber = current;
                setDisplayNumber(current);
              }
              if (progress < 1) requestAnimationFrame(step);
              else setDisplayNumber(target);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Auto-rotate active icon
  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wheelIcons.length);
    }, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -6, y: x * 6 });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setHoveredIndex(null);
  }, []);

  const currentActiveIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <div
      ref={containerRef}
      className="relative w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] md:w-[520px] md:h-[520px] aspect-square overflow-visible"
      style={{ perspective: 1200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: prefersReducedMotion ? 'none' : 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Three.js 3D Canvas Layer ── */}
        <Wheel3DCanvas size={canvasSize} />

        {/* Flow halo to blend hero with full-page background */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(18,220,165,0.08)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[185%] w-[185%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(18,220,165,0.05)]" />

        {/* Subtle radial background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 bg-gradient-radial from-[rgba(42,163,122,0.06)] via-[rgba(42,163,122,0.02)] to-transparent rounded-full blur-3xl" />
        </div>

        {/* Concentric ring guides - premium styled */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="stats-outer-ring-main absolute w-[85%] h-[85%] rounded-full" />
          <div className="stats-outer-ring absolute w-[60%] h-[60%] rounded-full" />
          <div className="stats-outer-ring absolute w-[40%] h-[40%] rounded-full" />
        </div>

        {/* Outer ring with icons */}
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
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isActive && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="stats-tooltip"
                      >
                        <span className="text-xs font-semibold text-[#c8d4e0]">
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon box */}
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
            <div className="stats-label">hrs/week saved</div>
          </div>
        </div>
      </div>

      {/* Mobile label */}
      <div
        className="stats-mobile-label absolute left-1/2 text-center md:hidden"
        style={{ bottom: '-50px', transform: 'translateX(-50%)', zIndex: 10 }}
      >
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
