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

function Wheel3DCanvas({ size, reducedMotion }: { size: number; reducedMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderSize = Math.round(Math.min(size * 2.2, 1240));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(renderSize, renderSize);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const glowGroup = new THREE.Group();
    scene.add(glowGroup);

    scene.add(new THREE.AmbientLight(0x102e25, 0.3));

    const keyLight = new THREE.PointLight(0x2aa989, 1.75, 28);
    keyLight.position.set(3.1, 1.8, 5.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x1f7b63, 0.9, 24);
    fillLight.position.set(-2.8, -2.1, 4.9);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x6f9cb9, 0.28, 18);
    rimLight.position.set(0, 3.6, -2.2);
    scene.add(rimLight);

    const ringMaterial = (opacity: number) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x27896f,
        metalness: 0.55,
        roughness: 0.32,
        clearcoat: 0.8,
        clearcoatRoughness: 0.26,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      });
      materials.push(mat);
      return mat;
    };

    const ringRadii = [3.75, 3.05, 2.34, 1.7];
    const ringTubes = [0.024, 0.021, 0.018, 0.015];
    const ringTilts = [0.49, 0.54, 0.45, 0.5];
    const ringOpacities = [0.08, 0.065, 0.05, 0.038];

    const rings = ringRadii.map((radius, index) => {
      const geo = new THREE.TorusGeometry(radius, ringTubes[index], 18, 168);
      geometries.push(geo);
      const mesh = new THREE.Mesh(geo, ringMaterial(ringOpacities[index]));
      mesh.rotation.x = Math.PI * ringTilts[index];
      mesh.rotation.z = index % 2 ? 0.2 : -0.12;
      glowGroup.add(mesh);
      return mesh;
    });

    const coreGeo = new THREE.SphereGeometry(1.05, 32, 32);
    geometries.push(coreGeo);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x1f8a6e,
      transparent: true,
      opacity: 0.032,
    });
    materials.push(coreMat);
    const core = new THREE.Mesh(coreGeo, coreMat);
    glowGroup.add(core);

    const haloGeo = new THREE.RingGeometry(1.3, 1.42, 80);
    geometries.push(haloGeo);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2a9d80,
      transparent: true,
      opacity: 0.075,
      side: THREE.DoubleSide,
    });
    materials.push(haloMat);
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI * 0.5;
    glowGroup.add(halo);

    const pointsGeo = new THREE.BufferGeometry();
    const pointsCount = 120;
    const points = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i += 1) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 2.2;
      points[i * 3] = r * Math.sin(p) * Math.cos(t);
      points[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      points[i * 3 + 2] = r * Math.cos(p);
    }

    pointsGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
    geometries.push(pointsGeo);

    const pointsMat = new THREE.PointsMaterial({
      color: 0x2a9d80,
      size: 0.012,
      transparent: true,
      opacity: 0.21,
      sizeAttenuation: true,
    });
    materials.push(pointsMat);

    const particles = new THREE.Points(pointsGeo, pointsMat);
    glowGroup.add(particles);

    const nodes: { mesh: THREE.Mesh; ringIndex: number; angle: number; speed: number }[] = [];
    for (let i = 0; i < 14; i += 1) {
      const nodeGeo = new THREE.SphereGeometry(0.038, 10, 10);
      geometries.push(nodeGeo);

      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: 0x2fb08d,
        emissive: 0x1a6b56,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.25,
        transparent: true,
        opacity: 0.68,
      });
      materials.push(nodeMat);

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      glowGroup.add(node);
      nodes.push({
        mesh: node,
        ringIndex: i % ringRadii.length,
        angle: (i / 14) * Math.PI * 2,
        speed: reducedMotion ? 0 : 0.05 + (i % 4) * 0.02,
      });
    }

    const linePairs: Array<[number, number]> = [
      [0, 4],
      [2, 7],
      [3, 9],
      [6, 11],
      [8, 13],
    ];

    const lines: THREE.Line[] = linePairs.map(() => {
      const lineGeo = new THREE.BufferGeometry();
      const arr = new Float32Array(36);
      lineGeo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      geometries.push(lineGeo);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x2d8f74,
        transparent: true,
        opacity: 0.05,
      });
      materials.push(lineMat);

      const line = new THREE.Line(lineGeo, lineMat);
      glowGroup.add(line);
      return line;
    });

    const handlePointer = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      pointerRef.current.x = (x - 0.5) * 2;
      pointerRef.current.y = (y - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointer);

    const clock = new THREE.Clock();
    let raf = 0;
    let isAnimating = true;

    const tick = () => {
      if (!isAnimating) return;
      raf = window.requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const motionScalar = reducedMotion ? 0 : 1;

      rings[0].rotation.z = -0.16 + t * 0.04 * motionScalar;
      rings[1].rotation.z = 0.2 - t * 0.06 * motionScalar;
      rings[2].rotation.z = -0.08 + t * 0.08 * motionScalar;
      rings[3].rotation.z = t * -0.11 * motionScalar;

      const corePulse = 1 + Math.sin(t * 1.15) * 0.025 * motionScalar;
      core.scale.set(corePulse, corePulse, corePulse);
      coreMat.opacity = 0.04 + Math.sin(t * 0.95) * 0.008;

      halo.rotation.z = t * 0.09 * motionScalar;
      haloMat.opacity = 0.09 + Math.sin(t * 1.1) * 0.025;

      nodes.forEach((node, idx) => {
        const radius = ringRadii[node.ringIndex];
        const tilt = ringTilts[node.ringIndex] * Math.PI;
        const angle = node.angle + t * node.speed;

        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = -z * Math.sin(tilt);
        const zTilted = z * Math.cos(tilt);

        node.mesh.position.set(x, y, zTilted);

        const pulse = 1 + Math.sin(t * 2.2 + idx * 0.35) * 0.14 * motionScalar;
        node.mesh.scale.set(pulse, pulse, pulse);
      });

      lines.forEach((line, index) => {
        const [aIdx, bIdx] = linePairs[index];
        const a = nodes[aIdx].mesh.position;
        const b = nodes[bIdx].mesh.position;
        const positions = line.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < 12; i += 1) {
          const f = i / 11;
          positions[i * 3] = a.x + (b.x - a.x) * f;
          positions[i * 3 + 1] = a.y + (b.y - a.y) * f;
          positions[i * 3 + 2] = a.z + (b.z - a.z) * f;
        }

        line.geometry.attributes.position.needsUpdate = true;
        const lineMaterial = line.material as THREE.LineBasicMaterial;
        lineMaterial.opacity = 0.04 + Math.sin(t + index) * 0.02;
      });

      particles.rotation.y = t * 0.018 * motionScalar;
      particles.rotation.x = Math.sin(t * 0.07) * 0.08 * motionScalar;

      camera.position.x += (pointerRef.current.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (-pointerRef.current.y * 0.45 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      keyLight.intensity = 1.7 + Math.sin(t * 1.4) * 0.18;

      renderer.render(scene, camera);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating) {
          isAnimating = true;
          tick();
        } else if (!entry.isIntersecting && isAnimating) {
          isAnimating = false;
          window.cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.06 }
    );
    intersectionObserver.observe(mount);

    tick();

    return () => {
      isAnimating = false;
      window.cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handlePointer);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();
    };
  }, [size, reducedMotion]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: Math.round(Math.min(size * 2.2, 1240)),
        height: Math.round(Math.min(size * 2.2, 1240)),
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export function SpinningWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [canvasSize, setCanvasSize] = useState(560);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltLayerRef = useRef<HTMLDivElement>(null);
  const tiltFrameRef = useRef<number | null>(null);
  const tiltTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);

      if (width < 640) {
        setCanvasSize(420);
      } else if (width < 1024) {
        setCanvasSize(500);
      } else {
        setCanvasSize(560);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!numberRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) return;

          setHasAnimated(true);
          const duration = 1600;
          const target = 10;
          const start = performance.now();

          const animate = (timestamp: number) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayNumber(Math.round(eased * target));

            if (progress < 1) {
              window.requestAnimationFrame(animate);
            }
          };

          window.requestAnimationFrame(animate);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wheelIcons.length);
    }, 2600);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  const applyTilt = useCallback(() => {
    tiltFrameRef.current = null;
    const layer = tiltLayerRef.current;
    if (!layer) return;
    layer.style.transform = `rotateX(${tiltTargetRef.current.x.toFixed(2)}deg) rotateY(${tiltTargetRef.current.y.toFixed(2)}deg)`;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;

      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      tiltTargetRef.current = { x: y * -5, y: x * 5 };
      if (tiltFrameRef.current === null) {
        tiltFrameRef.current = window.requestAnimationFrame(applyTilt);
      }
    },
    [applyTilt, isMobile, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    tiltTargetRef.current = { x: 0, y: 0 };
    if (tiltFrameRef.current === null) {
      tiltFrameRef.current = window.requestAnimationFrame(applyTilt);
    }
    setIsHovered(false);
    setHoveredIndex(null);
  }, [applyTilt]);

  useEffect(
    () => () => {
      if (tiltFrameRef.current !== null) {
        window.cancelAnimationFrame(tiltFrameRef.current);
      }
    },
    []
  );

  const currentActiveIndex = hoveredIndex ?? activeIndex;
  const orbitRadius = Math.round(canvasSize * 0.39);
  const getTooltipPosition = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const offset = isMobile ? 72 : 88;
    const x = Math.sin(radians) * offset;
    const y = -Math.cos(radians) * offset;

    return {
      left: '50%',
      top: '50%',
      bottom: 'auto',
      transform: `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))`,
    } as const;
  };

  return (
    <div
      ref={containerRef}
      className="hero-wheel-shell relative aspect-square w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] lg:w-[560px] lg:h-[560px] overflow-visible"
      style={{ perspective: 1300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tiltLayerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
          transition: prefersReducedMotion || isMobile ? 'none' : 'transform 0.18s ease-out',
        }}
      >
        {!isMobile && <Wheel3DCanvas size={canvasSize} reducedMotion={prefersReducedMotion} />}

        <div className="wheel-horizon wheel-horizon-1" />
        <div className="wheel-horizon wheel-horizon-2" />

        <div className="wheel-depth-glow" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="stats-outer-ring-main absolute w-[86%] h-[86%] rounded-full" />
          <div className="stats-outer-ring absolute w-[64%] h-[64%] rounded-full" />
          <div className="stats-outer-ring absolute w-[42%] h-[42%] rounded-full" />
        </div>

        <div className="absolute inset-0 overflow-visible" style={{ zIndex: 8 }}>
          {wheelIcons.map((item, index) => {
            const angle = (index / wheelIcons.length) * 360;
            const isActive = index === currentActiveIndex;
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${orbitRadius}px) rotate(-${angle}deg)`,
                  marginLeft: '-26px',
                  marginTop: '-26px',
                }}
              >
                <motion.div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    scale: isActive ? 1.07 : 1,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <AnimatePresence>
                    {hoveredIndex === index && !isMobile && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        style={getTooltipPosition(angle)}
                        className="stats-tooltip absolute pointer-events-none whitespace-nowrap rounded-2xl border border-[rgba(132,208,184,0.28)] bg-[linear-gradient(160deg,rgba(7,13,11,0.94),rgba(12,23,18,0.86))] px-4 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.42),0_0_24px_rgba(34,129,104,0.18),inset_0_1px_0_rgba(217,243,234,0.08)] backdrop-blur-[2px]"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgba(99,205,170,0.95)] shadow-[0_0_10px_rgba(44,148,118,0.8)] mr-2 align-middle" />
                        <span className="align-middle text-[13px] font-semibold leading-none tracking-[0.01em] text-[rgba(229,244,238,0.94)]">
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`stats-icon-box ${isActive ? 'stats-icon-box-active' : ''}`}>
                    <Icon className={`stats-icon ${isActive ? 'stats-icon-active' : ''}`} aria-label={item.label} />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 6 }}>
          <div className="stats-center">
            <div ref={numberRef} className="stats-number" aria-label="10 plus hours per week saved">
              {displayNumber}+
            </div>
            <div className="stats-label">hrs/week saved</div>
          </div>
        </div>
      </div>

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
            className="inline-block px-4 py-2 text-sm font-medium text-[rgba(255,255,255,0.7)] bg-[rgba(10,16,13,0.72)] border border-[rgba(63,208,164,0.22)] rounded-full backdrop-blur-sm"
          >
            {wheelIcons[currentActiveIndex].label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
