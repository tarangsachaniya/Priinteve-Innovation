"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

/** Deterministic PRNG so scenes look identical on every load. */
export function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type SceneProps = { lite?: boolean; still?: boolean; color?: string };

/** Pointer parallax + slow drift. `still` freezes everything for reduced-motion users. */
export function Rig({ children, still, spin = 0.12, tilt = 0.22 }: { children: ReactNode; still?: boolean; spin?: number; tilt?: number }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (still || !outer.current || !inner.current) return;
    const { x, y } = state.pointer;
    outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, -y * tilt, 0.05);
    outer.current.rotation.z = THREE.MathUtils.lerp(outer.current.rotation.z, x * tilt * 0.4, 0.05);
    outer.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    inner.current.rotation.y += dt * spin;
  });
  return (
    <group ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

export function Lights({ color = "#faf3e0" }: { color?: string }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={40} color={color} />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#6b8e3d" />
      <pointLight position={[0, 4, -4]} intensity={20} color="#9dbd6a" />
    </>
  );
}

/** Translucent glass slab with a crisp edge outline, the shared visual primitive. */
export function Slab({
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#d4e4b0",
  fill = 0.1,
  edge = 0.75,
  emissive = 0,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  fill?: number;
  edge?: number;
  emissive?: number;
}) {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(...size)), [size]);
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} transparent opacity={fill} emissive={color} emissiveIntensity={emissive} roughness={0.2} metalness={0.4} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={edge} />
      </lineSegments>
    </group>
  );
}

export function Particles({ count, spread = 7, color = "#9dbd6a", seed = 7 }: { count: number; spread?: number; color?: string; seed?: number }) {
  const geo = useMemo(() => {
    const r = rng(seed);
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (r() - 0.5) * spread * 1.6;
      p[i * 3 + 1] = (r() - 0.5) * spread;
      p[i * 3 + 2] = (r() - 0.5) * spread;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, [count, spread, seed]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.025} color={color} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Line segments between index pairs of `points`. */
export function Links({ points, pairs, color = "#9dbd6a", opacity = 0.45 }: { points: THREE.Vector3[]; pairs: [number, number][]; color?: string; opacity?: number }) {
  const geo = useMemo(() => {
    const v: number[] = [];
    for (const [a, b] of pairs) v.push(points[a].x, points[a].y, points[a].z, points[b].x, points[b].y, points[b].z);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return g;
  }, [points, pairs]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}
