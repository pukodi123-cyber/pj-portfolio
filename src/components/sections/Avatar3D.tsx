"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { 
  Float, 
  MeshDistortMaterial, 
  Environment, 
  Sphere,
  Stars,
  PerspectiveCamera,
} from "@react-three/drei";

function TechNode({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5} 
        metalness={0.9} 
        roughness={0.1} 
        transparent 
        opacity={0.8} 
      />
    </mesh>
  );
}

function Constellation() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 30;
  
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push([
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4
        ]);
    }
    return temp;
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <TechNode key={i} position={p as [number, number, number]} color={i % 2 === 0 ? "#3cff7a" : "#3c8cff"} />
      ))}
      
      {/* Central Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#3cff7a"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive="#3cff7a"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Avatar3D({ scrollProgress }: { scrollProgress?: number }) {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[700px] pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Environment preset="city" />
        
        <Constellation />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={["#050505", 5, 20]} />
      </Canvas>
    </div>
  );
}
