import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";
import {
  Calendar,
  ClipboardCheck,
  ClipboardList,
  FileStack,
  GitBranch,
  Inbox,
  MessageSquare,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { Group, MathUtils, Mesh } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

const wheelItems: { icon: LucideIcon; label: string }[] = [
  { icon: Calendar, label: "Scheduling" },
  { icon: MessageSquare, label: "Internal Comms" },
  { icon: Inbox, label: "Inbox Cleanup" },
  { icon: ClipboardList, label: "SOPs" },
  { icon: GitBranch, label: "Workflows" },
  { icon: FileStack, label: "Knowledge Base" },
  { icon: ClipboardCheck, label: "Approvals" },
  { icon: Timer, label: "Time Saved" },
];

function WheelCore3D({ focus, mobile }: { focus: number; mobile: boolean }) {
  const rootRef = useRef<Group>(null);
  const orbRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);
  const smoothFocus = useRef(0);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    smoothFocus.current = MathUtils.damp(smoothFocus.current, focus, 5, delta);
    const f = smoothFocus.current;

    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.18 + pointer.x * 0.25;
      rootRef.current.rotation.x = pointer.y * 0.12;
    }

    if (orbRef.current) {
      orbRef.current.rotation.y = -t * 0.25;
      orbRef.current.scale.setScalar(1 + f * 0.08);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.12;
      shellRef.current.material.opacity = 0.28 + f * 0.16;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.26;
      ringARef.current.scale.setScalar(1 + f * 0.06);
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.16;
      ringBRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.35) * 0.05;
    }
  });

  return (
    <group ref={rootRef} scale={mobile ? 0.9 : 1}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color="#0c130f"
          emissive="#0f6c51"
          emissiveIntensity={0.24}
          metalness={0.8}
          roughness={0.26}
          clearcoat={0.65}
          clearcoatRoughness={0.32}
        />
      </mesh>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial color="#1ee1ab" wireframe transparent opacity={0.28} />
      </mesh>

      <mesh ref={ringARef}>
        <torusGeometry args={[1.95, 0.025, 16, 160]} />
        <meshStandardMaterial color="#1ad8a4" emissive="#0d6f53" emissiveIntensity={0.3} />
      </mesh>

      <mesh ref={ringBRef}>
        <torusGeometry args={[2.6, 0.016, 14, 160]} />
        <meshStandardMaterial color="#6f8ea2" emissive="#2f4f5f" emissiveIntensity={0.24} />
      </mesh>
    </group>
  );
}

function WheelCanvas({ focus, mobile }: { focus: number; mobile: boolean }) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [0, 0.2, mobile ? 6.4 : 7.1], fov: mobile ? 40 : 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={mobile ? 0.45 : 0.36} />
      <hemisphereLight color="#2be2af" groundColor="#040a07" intensity={mobile ? 0.44 : 0.34} />
      <directionalLight position={[4, 4.2, 6]} intensity={0.94} color="#e7fff4" />
      <pointLight position={[-2.9, -1.8, 2.1]} intensity={0.74} color="#11dfa3" />
      <pointLight position={[2.6, 1.8, -2.8]} intensity={0.28} color="#6b91a7" />

      <Environment preset="city" />
      <WheelCore3D focus={focus} mobile={mobile} />

      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.42} luminanceThreshold={0.29} luminanceSmoothing={0.45} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export function HeroScene() {
  const isMobile = useIsMobile();
  const items = isMobile ? wheelItems.slice(0, 6) : wheelItems;
  const radius = isMobile ? 122 : 188;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const speed = hoveredIndex !== null ? 0.24 : 0.42;
      setRotation((prev) => prev + dt * speed);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hoveredIndex]);

  useEffect(() => {
    if (hoveredIndex !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [hoveredIndex, items.length]);

  const highlighted = hoveredIndex ?? activeIndex;
  const focus = hoveredIndex !== null ? 1 : 0.35;

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[520px]">
      <div className="absolute inset-0 rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,35,27,0.32),rgba(9,15,12,0.7))] shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_55px_rgba(5,150,105,0.16)] overflow-hidden">
        <WheelCanvas focus={focus} mobile={isMobile} />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_50%_90%,rgba(0,0,0,0.42),transparent_58%)]" />

      <div className="absolute inset-0">
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2 + rotation;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = index === highlighted;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              type="button"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              animate={{
                scale: isActive ? 1.12 : 1,
                opacity: isActive ? 1 : 0.72,
              }}
              transition={{ duration: 0.22 }}
            >
              <span
                className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border backdrop-blur-md transition-colors ${
                  isActive
                    ? "border-emerald-300/55 bg-emerald-400/20 text-emerald-100"
                    : "border-white/15 bg-black/35 text-white/70"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-center backdrop-blur-lg sm:px-5">
          <p className="text-2xl font-semibold text-emerald-200 sm:text-3xl">10+</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">hrs/week saved</p>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[calc(100%-28px)] -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.p
            key={items[highlighted].label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-full border border-white/12 bg-black/45 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/75 backdrop-blur-md"
          >
            {items[highlighted].label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
