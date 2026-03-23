"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useSyncExternalStore } from "react";
import * as THREE from "three";
import { 
  Float, 
  Environment, 
  PerspectiveCamera,
  Text,
  MeshDistortMaterial,
  Sphere
} from "@react-three/drei";

const PARTICLE_COUNT = 100;
const INITIAL_PARTICLES = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
    INITIAL_PARTICLES[i * 3] = (Math.random() - 0.5) * 10;
    INITIAL_PARTICLES[i * 3 + 1] = (Math.random() - 0.5) * 10;
    INITIAL_PARTICLES[i * 3 + 2] = (Math.random() - 0.5) * 5;
}

function ParticleBackground() {
  const mesh = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => INITIAL_PARTICLES, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3cff7a" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

interface CodeScreenProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

function CodeScreen({ position, rotation, scale = [1.5, 1, 0.05], color = "#3cff7a" }: CodeScreenProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh scale={scale as [number, number, number]}>
        <boxGeometry />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, (scale[2] as number) / 2 + 0.01]} scale={[scale[0] * 0.9, scale[1] * 0.8, 0.01]}>
        <planeGeometry />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <Text
        position={[0, 0, (scale[2] as number) / 2 + 0.02]}
        fontSize={0.05}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={scale[0] * 0.7}
      >
        {`const develop = () => {\n  code: "premium",\n  built_by: "PJ"\n}`}
      </Text>
    </group>
  );
}

function Laptop() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
  });

  return (
    <group ref={group} scale={[1.2, 1.2, 1.2]}>
      {/* Base */}
      <mesh position={[0, -0.05, 0]} scale={[1.2, 0.05, 0.8]}>
        <boxGeometry />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen */}
      <group position={[0, 0, -0.4]} rotation={[-Math.PI / 4, 0, 0]}>
        <mesh position={[0, 0.4, 0]} scale={[1.2, 0.8, 0.05]}>
          <boxGeometry />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* The Actual Display */}
        <mesh position={[0, 0.4, 0.03]} scale={[1.1, 0.7, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial color="#3cff7a" transparent opacity={0.1} />
        </mesh>
        <Text
          position={[0, 0.4, 0.031]}
          fontSize={0.08}
          color="#3cff7a"
        >
          {"<PJ/>"}
        </Text>
      </group>
    </group>
  );
}

function FloatingUI() {
  return (
    <>
      <CodeScreen position={[-1.8, 1, -1]} rotation={[0, 0.4, 0]} scale={[1.2, 0.8, 0.02]} />
      <CodeScreen position={[1.8, 0.5, -1.5]} rotation={[0, -0.4, 0]} scale={[1, 1.2, 0.02]} color="#3c8cff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-1.5, -1, 0]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#3cff7a" emissive="#3cff7a" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[1.5, 1.2, 0]}>
          <tetrahedronGeometry args={[0.2]} />
          <meshStandardMaterial color="#3c8cff" emissive="#3c8cff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </>
  );
}

function SceneContent({ mouseRotation }: { mouseRotation?: { x: number, y: number } }) {
  const sceneRef = useRef<THREE.Group>(null);
  const isMounted = useSyncExternalStore(
    () => () => {}, // subscribe: no-op
    () => true,      // getSnapshot: returns true on client
    () => false      // getServerSnapshot: returns false on server
  );

  useFrame(() => {
    if (!isMounted) return; // Only run frame logic if mounted on client
    if (sceneRef.current && mouseRotation) {
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, mouseRotation.x, 0.1);
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, mouseRotation.y, 0.1);
    }
  });

  return (
    <group ref={sceneRef}>
      <Laptop />
      <FloatingUI />
      <ParticleBackground />
      
      <Float speed={5} rotationIntensity={0} floatIntensity={0}>
          <Sphere args={[2.5, 64, 64]} scale={[1, 1, 1]}>
              <MeshDistortMaterial
                color="#0a0a0a"
                transparent
                opacity={0.1}
                distort={0.3}
                speed={2}
              />
          </Sphere>
      </Float>
    </group>
  );
}

export default function Workspace3D({ 
    mouseRotation 
}: { 
    scrollProgress?: number, 
    mouseRotation?: { x: number, y: number } 
}) {
  return (
    <div className="w-full h-full pointer-events-none min-h-[500px] md:min-h-[700px]">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={20} color="#3cff7a" />
        <pointLight position={[-5, -5, -5]} intensity={10} color="#3c8cff" />
        <Environment preset="city" />
        
        <SceneContent mouseRotation={mouseRotation} />
        
        <fog attach="fog" args={["#050505", 5, 15]} />
      </Canvas>
    </div>
  );
}
