import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Line, Sparkles } from "@react-three/drei";
import { Group, MathUtils, Mesh } from "three";

interface HeroSceneProps {
  progress: number;
  mobile: boolean;
}

function SceneRig({ progress, mobile }: HeroSceneProps) {
  const rootRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const ringARef = useRef<Mesh>(null);
  const ringBRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const smoothedProgress = useRef(progress);

  const panelCount = mobile ? 4 : 8;
  const panels = useMemo(() => {
    return Array.from({ length: panelCount }, (_, index) => {
      const angle = (index / panelCount) * Math.PI * 2;
      const radius = mobile ? 2.2 : 3.1;
      const y = (index % 2 === 0 ? 0.45 : -0.45) * (mobile ? 0.85 : 1);
      return {
        key: `panel-${index}`,
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
        rotationY: -angle + Math.PI / 2,
        width: mobile ? 0.56 : 0.74,
        height: mobile ? 0.42 : 0.52,
      };
    });
  }, [mobile, panelCount]);

  useFrame(({ camera, clock }, delta) => {
    smoothedProgress.current = MathUtils.damp(smoothedProgress.current, progress, 4, delta);
    const p = smoothedProgress.current;
    const t = clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.rotation.y = t * 0.12 + p * Math.PI * 1.35;
      rootRef.current.rotation.x = Math.sin(t * 0.2) * 0.07 + p * 0.12;
      rootRef.current.position.y = Math.sin(t * 0.45) * 0.12 - p * 0.35;
      rootRef.current.position.z = p * 0.5;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x = t * 0.2;
      shellRef.current.rotation.z = t * 0.1;
    }

    if (ringARef.current) {
      ringARef.current.rotation.x = Math.PI / 2 + p * 0.3;
      ringARef.current.rotation.z = t * 0.08;
      ringARef.current.scale.setScalar(1 + p * 0.12);
    }

    if (ringBRef.current) {
      ringBRef.current.rotation.y = t * 0.15;
      ringBRef.current.rotation.x = Math.PI / 3 + p * 0.25;
      ringBRef.current.scale.setScalar(1 + p * 0.08);
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.03;
      glowRef.current.scale.setScalar((1.15 + p * 0.08) * pulse);
    }

    camera.position.x = Math.sin(p * Math.PI * 2) * (mobile ? 0.18 : 0.7);
    camera.position.y = 0.2 + p * (mobile ? 0.24 : 0.55);
    camera.position.z = (mobile ? 6.2 : 7.2) - p * (mobile ? 0.45 : 1.2);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={mobile ? 0.58 : 0.42} />
      <hemisphereLight color="#3be2af" groundColor="#020503" intensity={mobile ? 0.42 : 0.3} />
      <directionalLight
        intensity={1.15}
        color="#4de5b2"
        position={[3.2, 3.6, 5]}
      />
      <pointLight intensity={0.8} color="#0ce8a2" position={[-3.6, -1.6, 1]} />
      <pointLight intensity={0.4} color="#9ad4ff" position={[2.8, 1.5, -3]} />

      <group ref={rootRef}>
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.6, mobile ? 32 : 52, mobile ? 32 : 52]} />
          <meshStandardMaterial
            color="#072116"
            emissive="#0f6d51"
            emissiveIntensity={0.33}
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>

        <mesh ref={shellRef}>
          <icosahedronGeometry args={[1.96, 1]} />
          <meshBasicMaterial color="#11d79f" wireframe transparent opacity={0.45} />
        </mesh>

        <mesh ref={ringARef}>
          <torusGeometry args={[2.55, 0.03, 20, 180]} />
          <meshStandardMaterial color="#17d89f" emissive="#0da579" emissiveIntensity={0.35} />
        </mesh>

        {!mobile && (
          <mesh ref={ringBRef}>
            <torusGeometry args={[3.2, 0.02, 20, 180]} />
            <meshStandardMaterial color="#5aa2bd" emissive="#2f6f86" emissiveIntensity={0.22} />
          </mesh>
        )}

        {!mobile && (
          <>
            <Line
              points={[
                [-2.1, -0.3, 1.4],
                [-1.3, 0.6, 0.8],
                [0.3, 0.85, -0.2],
                [1.45, 0.1, -1.15],
                [2.2, -0.45, -0.5],
              ]}
              color="#16dca3"
              lineWidth={1.1}
              transparent
              opacity={0.58}
            />
            <Line
              points={[
                [-2.35, 0.55, -0.8],
                [-1.0, 0.1, -1.45],
                [0.45, -0.65, -1.1],
                [1.6, -0.1, 0.15],
                [2.0, 0.5, 1.1],
              ]}
              color="#4fb0d4"
              lineWidth={0.9}
              transparent
              opacity={0.45}
            />
          </>
        )}

        {panels.map((panel, index) => (
          <group key={panel.key} position={panel.position} rotation={[0, panel.rotationY, 0]}>
            <mesh>
              <boxGeometry args={[panel.width, panel.height, 0.18]} />
              <meshStandardMaterial
                color="#07120d"
                metalness={0.52}
                roughness={0.36}
                emissive="#04140f"
                emissiveIntensity={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.095]}>
              <planeGeometry args={[panel.width * 0.84, panel.height * 0.76]} />
              <meshBasicMaterial
                color={index % 2 === 0 ? "#16dca3" : "#65a5bd"}
                transparent
                opacity={mobile ? 0.1 : 0.14}
              />
            </mesh>
          </group>
        ))}

        <Sparkles
          count={mobile ? 12 : 34}
          size={mobile ? 1.2 : 1.5}
          speed={0.2}
          scale={mobile ? [5, 3.2, 5] : [8, 4, 8]}
          color="#2be7b1"
          opacity={0.55}
        />
      </group>
    </>
  );
}

export function HeroScene({ progress, mobile }: HeroSceneProps) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.2] : [1, 1.6]}
      camera={{ position: [0, 0.2, 7], fov: mobile ? 48 : 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <SceneRig progress={progress} mobile={mobile} />
      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={0.52}
            luminanceThreshold={0.26}
            luminanceSmoothing={0.45}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
