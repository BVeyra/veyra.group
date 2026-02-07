import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── DESIGN TOKENS ───
const EMERALD = '#059669';
const DARK_METAL = '#111411';
const MID_METAL = '#1a1e1a';

// ─── MATERIALS ───
function useDarkMetal() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(DARK_METAL),
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 0.4,
        clearcoatRoughness: 0.3,
        envMapIntensity: 0.6,
      }),
    []
  );
}

function useEmissiveGreen(intensity = 2.5) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(EMERALD),
        emissive: new THREE.Color(EMERALD),
        emissiveIntensity: intensity,
        metalness: 0.5,
        roughness: 0.4,
      }),
    [intensity]
  );
}

function useMidMetal() {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(MID_METAL),
        metalness: 0.85,
        roughness: 0.35,
        clearcoat: 0.3,
        envMapIntensity: 0.5,
      }),
    []
  );
}

// ─── CORE: Faceted sphere with glowing edge wireframe ───
function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const darkMetal = useDarkMetal();
  const greenMat = useEmissiveGreen(3);

  const edgesGeo = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.1, 1);
    return new THREE.EdgesGeometry(ico, 15);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08;
      wireRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={new THREE.IcosahedronGeometry(1.05, 1)} material={darkMetal} />
      <lineSegments ref={wireRef} geometry={edgesGeo}>
        <lineBasicMaterial color={EMERALD} transparent opacity={0.6} linewidth={1} />
      </lineSegments>
      {/* Inner glow point light */}
      <pointLight color={EMERALD} intensity={2} distance={6} decay={2} />
    </group>
  );
}

// ─── ORBITAL RING: Thin torus with faceted surface ───
function OrbitalRing({
  radius = 2.5,
  tube = 0.02,
  tilt = 0,
  rotationSpeed = 0.03,
  segments = 64,
}: {
  radius?: number;
  tube?: number;
  tilt?: number;
  rotationSpeed?: number;
  segments?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const midMetal = useMidMetal();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = tilt;
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} material={midMetal}>
      <torusGeometry args={[radius, tube, 6, segments]} />
    </mesh>
  );
}

// ─── FLOATING MODULE: Beveled box with green accent edge ───
function FloatingModule({
  position,
  size = [0.35, 0.35, 0.35],
  delay = 0,
  floatSpeed = 1,
  floatIntensity = 0.3,
}: {
  position: [number, number, number];
  size?: [number, number, number];
  delay?: number;
  floatSpeed?: number;
  floatIntensity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const darkMetal = useDarkMetal();
  const greenMat = useEmissiveGreen(2);

  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(size[0], size[1], size[2]);
    return new THREE.EdgesGeometry(box);
  }, [size]);

  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={floatIntensity}>
      <group ref={groupRef} position={position}>
        {/* Main body */}
        <mesh material={darkMetal}>
          <boxGeometry args={size} />
        </mesh>
        {/* Green edge wireframe */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={EMERALD} transparent opacity={0.35} />
        </lineSegments>
        {/* Tiny accent light on one face */}
        <mesh position={[0, size[1] / 2 + 0.005, 0]} material={greenMat}>
          <planeGeometry args={[size[0] * 0.5, size[2] * 0.15]} />
        </mesh>
      </group>
    </Float>
  );
}

// ─── CONNECTOR: Thin cylinder between elements ───
function Connector({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const greenMat = useEmissiveGreen(1.5);

  const { position, rotation, length } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const dir = e.clone().sub(s);
    const len = dir.length();
    dir.normalize();

    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const euler = new THREE.Euler().setFromQuaternion(quat);

    return {
      position: [mid.x, mid.y, mid.z] as [number, number, number],
      rotation: euler,
      length: len,
    };
  }, [start, end]);

  return (
    <mesh ref={ref} position={position} rotation={rotation} material={greenMat}>
      <cylinderGeometry args={[0.008, 0.008, length, 4]} />
    </mesh>
  );
}

// ─── PARTICLE FIELD: Tiny floating dots ───
function ParticleField({ count = 90 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.4 + Math.random() * 2.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={EMERALD}
        size={0.012}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ─── MAIN SCENE ASSEMBLY ───
function Mechanism() {
  const groupRef = useRef<THREE.Group>(null);

  // Module positions arranged in a structured formation
  const modules = useMemo(() => {
    const items: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 1.8;
      const yOffset = (i % 2 === 0 ? 0.3 : -0.3) + Math.sin(angle) * 0.2;
      const baseSize = 0.25 + Math.random() * 0.15;
      items.push({
        pos: [
          Math.cos(angle) * r,
          yOffset,
          Math.sin(angle) * r,
        ],
        size: [baseSize, baseSize * (0.6 + Math.random() * 0.8), baseSize],
      });
    }
    return items;
  }, []);

  // Connector pairs - connect adjacent modules
  const connectors = useMemo(() => {
    const pairs: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < modules.length; i += 2) {
      const next = (i + 1) % modules.length;
      pairs.push({ start: modules[i].pos, end: modules[next].pos });
    }
    // Connect some modules to core
    pairs.push({ start: modules[0].pos, end: [0, 0, 0] });
    pairs.push({ start: modules[4].pos, end: [0, 0, 0] });
    return pairs;
  }, [modules]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef} scale={0.9}>
      <Core />

      {/* Orbital rings at different tilts */}
      <OrbitalRing radius={1.35} tube={0.012} tilt={0.3} rotationSpeed={0.05} />
      <OrbitalRing radius={2.0} tube={0.01} tilt={-0.5} rotationSpeed={-0.03} />
      <OrbitalRing radius={2.45} tube={0.008} tilt={0.8} rotationSpeed={0.02} />

      {/* Floating modules */}
      {modules.map((m, i) => (
        <FloatingModule
          key={i}
          position={m.pos}
          size={m.size}
          delay={i * 0.5}
          floatSpeed={0.8 + i * 0.1}
          floatIntensity={0.15 + (i % 3) * 0.1}
        />
      ))}

      {/* Green connectors */}
      {connectors.map((c, i) => (
        <Connector key={i} start={c.start} end={c.end} />
      ))}

      {/* Particle field */}
      <ParticleField count={150} />
    </group>
  );
}

// ─── CAMERA RIG ───
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle camera breathing
    camera.position.x = Math.sin(t * 0.1) * 0.25;
    camera.position.y = Math.cos(t * 0.08) * 0.18 + 0.45;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── EXPORTED COMPONENT ───
export function HeroScene() {
  return (
    <div className="w-full h-full" style={{ minHeight: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.45, 7.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, 2, -5]}
          intensity={0.2}
          color={EMERALD}
        />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Scene */}
        <Mechanism />
        <CameraRig />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={0.6}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
