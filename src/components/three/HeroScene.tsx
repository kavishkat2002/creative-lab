import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

/* =======================
   TECH NODE
======================= */
function TechNode({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed) * 0.3;
    meshRef.current.rotation.y += 0.005 * speed;
  });

  return (
    <Float speed={speed} floatIntensity={0.4} rotationIntensity={0.2}>
      <group position={position} scale={scale}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* =======================
   DATA STREAM LINES
======================= */
function DataStream() {
  const lines = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        start: [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * -15,
        ] as [number, number, number],
        end: [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * -5,
        ] as [number, number, number],
        speed: Math.random() * 0.4 + 0.2,
        offset: Math.random() * 10,
      })),
    []
  );

  return (
    <>
      {lines.map((line, i) => (
        <AnimatedLine key={i} {...line} />
      ))}
    </>
  );
}

function AnimatedLine({
  start,
  end,
  speed,
  offset,
}: {
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  offset: number;
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity =
      ((Math.sin(state.clock.elapsedTime * speed + offset) + 1) / 2) * 0.4;
  });

  return (
    <Line
      ref={ref}
      points={[start, end]}
      color="#00B4D8"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}


/* =======================
   NETWORK PARTICLES
======================= */
function NetworkParticles() {
  const count = 100; // Optimized from 200 for better mobile/scroll performance
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;
      temp.push({ t, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Optimization: Cache frequently used values
    const elapsedTime = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      const { t, factor, x, y, z } = particle;
      
      const a = Math.cos(t) + Math.sin(t) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Update position with optimized math
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 1.5) * factor) / 10
      );

      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 2, s * 2, s * 2);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#0077b6" transparent opacity={0.4} />
    </instancedMesh>
  );
}

/* =======================
   HERO SCENE (OPTIMIZED)
======================= */
export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#020617", 10, 30]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00B4D8" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#03045E" />

        <NetworkParticles />

        <Stars
          radius={60}
          depth={40}
          count={1500}
          factor={3}
          fade
          speed={0.3}
        />

        <DataStream />

        <TechNode position={[4, 2, -6]} color="#00B4D8" speed={0.6} />
        <TechNode position={[-4, -3, -8]} color="#90E0EF" scale={1.4} speed={0.4} />
      </Canvas>
    </div>
  );
}
