import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  CatmullRomCurve3,
  Group,
  MathUtils,
  Mesh,
  TubeGeometry,
  Vector3,
} from "three";

type SceneQuality = "full" | "lite";

interface HeroSceneProps {
  quality?: SceneQuality;
}

function HelixPath({
  radius,
  height,
  turns,
  points,
  phase,
}: {
  radius: number;
  height: number;
  turns: number;
  points: number;
  phase: number;
}) {
  const geometry = useMemo(() => {
    const path = new CatmullRomCurve3(
      Array.from({ length: points }, (_, i) => {
        const t = i / (points - 1);
        const angle = t * Math.PI * 2 * turns + phase;
        const y = (t - 0.5) * height;
        return new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      }),
      true
    );

    return new TubeGeometry(path, 220, 0.028, 10, true);
  }, [height, phase, points, radius, turns]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#1fe0ab"
        emissive="#0c7e5f"
        emissiveIntensity={0.38}
        metalness={0.18}
        roughness={0.38}
      />
    </mesh>
  );
}

function ReactorCore({ quality }: { quality: SceneQuality }) {
  const rootRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const crystalRef = useRef<Mesh>(null);
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);

  const shardCount = quality === "full" ? 20 : 10;
  const shards = useMemo(() => {
    return Array.from({ length: shardCount }, (_, index) => {
      const angle = (index / shardCount) * Math.PI * 2;
      const radius = quality === "full" ? 2.45 : 2.15;
      const y = Math.sin(index * 1.3) * 0.48;
      const scale = quality === "full" ? 0.14 + (index % 4) * 0.03 : 0.12 + (index % 3) * 0.025;
      return {
        key: `shard-${index}`,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
        rotation: [index * 0.3, -angle, index * 0.17] as [number, number, number],
        scale,
      };
    });
  }, [quality, shardCount]);

  const xPointer = useRef(0);
  const yPointer = useRef(0);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    xPointer.current = MathUtils.damp(xPointer.current, pointer.x, 3, delta);
    yPointer.current = MathUtils.damp(yPointer.current, pointer.y, 3, delta);

    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.16 + xPointer.current * 0.28;
      rootRef.current.rotation.x = yPointer.current * 0.16;
      rootRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.24;
      crystalRef.current.rotation.z = Math.sin(t * 0.35) * 0.06;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.1;
      shellRef.current.rotation.x = Math.PI * 0.08;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z = t * 0.2;
      ringARef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.25) * 0.04;
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.y = -t * 0.14;
      ringBRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <group ref={rootRef} scale={quality === "full" ? 1 : 0.9}>
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[1.12, 1]} />
        <meshPhysicalMaterial
          color="#0b120d"
          emissive="#0f6d52"
          emissiveIntensity={0.3}
          metalness={0.78}
          roughness={0.24}
          clearcoat={0.65}
          clearcoatRoughness={0.3}
        />
      </mesh>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.66, 1]} />
        <meshBasicMaterial color="#19d8a3" wireframe transparent opacity={0.26} />
      </mesh>

      <mesh ref={ringARef}>
        <torusGeometry args={[2.05, 0.022, 18, 180]} />
        <meshStandardMaterial color="#1edca8" emissive="#0f6c52" emissiveIntensity={0.28} />
      </mesh>

      {quality === "full" && (
        <mesh ref={ringBRef}>
          <torusGeometry args={[2.72, 0.016, 16, 180]} />
          <meshStandardMaterial color="#6e8ea2" emissive="#294b5b" emissiveIntensity={0.26} />
        </mesh>
      )}

      <HelixPath radius={quality === "full" ? 2.2 : 1.95} height={3.8} turns={2.5} points={120} phase={0} />
      <HelixPath
        radius={quality === "full" ? 2.2 : 1.95}
        height={3.8}
        turns={2.5}
        points={120}
        phase={Math.PI}
      />

      {quality === "full" && <HelixPath radius={2.55} height={4.5} turns={2.1} points={90} phase={Math.PI / 2} />}

      {shards.map((shard) => (
        <mesh
          key={shard.key}
          position={shard.position}
          rotation={shard.rotation}
          scale={shard.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#08100b"
            emissive="#06261d"
            emissiveIntensity={0.14}
            metalness={0.6}
            roughness={0.44}
          />
        </mesh>
      ))}

      <Sparkles
        count={quality === "full" ? 52 : 20}
        size={quality === "full" ? 1.8 : 1.5}
        speed={0.2}
        scale={quality === "full" ? [7.2, 4, 7.2] : [5.8, 3.2, 5.8]}
        color="#1de2ab"
        opacity={0.42}
      />
    </group>
  );
}

export function HeroScene({ quality = "full" }: HeroSceneProps) {
  const lite = quality === "lite";

  return (
    <Canvas
      dpr={lite ? [1, 1.2] : [1, 1.6]}
      camera={{ position: [0, 0.2, lite ? 6.8 : 8.1], fov: lite ? 41 : 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={lite ? 0.45 : 0.36} />
      <hemisphereLight color="#2be3b1" groundColor="#030906" intensity={lite ? 0.42 : 0.34} />
      <directionalLight position={[4.2, 4, 6]} color="#dffff6" intensity={1} />
      <pointLight position={[-3, -1.8, 2.2]} color="#0de0a2" intensity={0.72} />
      <pointLight position={[2.8, 2.1, -3]} color="#6f8da0" intensity={0.32} />

      <Environment preset="city" />
      <ReactorCore quality={quality} />

      {!lite && (
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.45}
            luminanceThreshold={0.28}
            luminanceSmoothing={0.44}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
