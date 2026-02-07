import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Group, MathUtils, Mesh } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

function BackgroundRig({ mobile }: { mobile: boolean }) {
  const rootRef = useRef<Group>(null);
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);
  const ringCRef = useRef<Mesh>(null);
  const gridRef = useRef<Mesh>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current = max > 0 ? window.scrollY / max : 0;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    smoothProgress.current = MathUtils.damp(smoothProgress.current, targetProgress.current, 3.2, delta);
    const p = smoothProgress.current;

    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.03 + p * 0.42;
      rootRef.current.rotation.x = -0.16 + p * 0.08;
      rootRef.current.position.y = -p * 1.3;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.05;
      ringARef.current.position.y = -0.8 + p * 1.15;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.z = -t * 0.04;
      ringBRef.current.position.y = 0.7 - p * 1.35;
    }

    if (ringCRef.current) {
      ringCRef.current.rotation.z = t * 0.03 + p * 0.35;
    }

    if (gridRef.current) {
      gridRef.current.position.z = -6 + p * 1.2;
      gridRef.current.material.opacity = 0.08 + p * 0.04;
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={gridRef} position={[0, -1.5, -6]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <planeGeometry args={[40, 24, mobile ? 14 : 28, mobile ? 10 : 18]} />
        <meshBasicMaterial color="#1ee2ad" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh ref={ringARef} position={[-4.5, -0.7, -4.8]} rotation={[Math.PI / 3.2, 0.2, 0]}>
        <torusGeometry args={[2.8, 0.05, 14, 160]} />
        <meshBasicMaterial color="#19d6a3" transparent opacity={0.16} />
      </mesh>

      {!mobile && (
        <mesh ref={ringBRef} position={[5, 0.6, -6.2]} rotation={[Math.PI / 3, -0.3, 0]}>
          <torusGeometry args={[3.5, 0.04, 12, 180]} />
          <meshBasicMaterial color="#7b9bb0" transparent opacity={0.14} />
        </mesh>
      )}

      {!mobile && (
        <mesh ref={ringCRef} position={[0, -0.2, -7.2]} rotation={[Math.PI / 2.9, 0, 0]}>
          <torusGeometry args={[6.3, 0.03, 10, 180]} />
          <meshBasicMaterial color="#1bdba7" transparent opacity={0.1} />
        </mesh>
      )}

      <Sparkles
        count={mobile ? 46 : 120}
        size={mobile ? 1.35 : 1.8}
        speed={0.16}
        color="#24dca9"
        opacity={mobile ? 0.18 : 0.25}
        scale={mobile ? [15, 10, 12] : [22, 12, 16]}
      />
    </group>
  );
}

export function ScrollSceneBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.2, isMobile ? 9.2 : 8.2], fov: isMobile ? 52 : 46 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.4]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 1.2, 2.5]} intensity={0.3} color="#16d8a3" />
        <BackgroundRig mobile={isMobile} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(7,30,20,0.22),transparent_44%),linear-gradient(180deg,rgba(6,10,8,0.25),rgba(6,10,8,0.64))]" />
    </div>
  );
}
