"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Lights, Links, Particles, Rig, rng, Slab, type SceneProps } from "./common";

export type ObjectVariant =
  | "sheets" // Xerox Buddy: files stacking up for print
  | "tables" // VentaDot: tables + incoming orders
  | "slots" // Salonly: appointment grid
  | "card" // Nectcard: NFC card + waves
  | "boxes" // Priinteve Printing: packages in transit
  | "layers" // Websites: stacked interface layers
  | "orbit" // E-commerce: products orbiting a storefront
  | "network" // Custom apps: connected system
  | "rings" // NFC & QR: tap waves
  | "chat" // WhatsApp bots: conversation bubbles
  | "relay" // Telegram bots: a message fanning out to channels
  | "agent" // AI agents: a core reasoning over connected tools
  | "flow" // Business automation: steps linked in a pipeline
  | "plug"; // AI integrations: a module docking into an app

type P = { color: string; still?: boolean };

function Sheets({ color, still }: P) {
  const scan = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (still || !scan.current) return;
    scan.current.position.y = Math.sin(s.clock.elapsedTime * 1.1) * 1.25;
  });
  return (
    <group rotation={[0.25, 0, 0]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Slab key={i} size={[2.1, 0.035, 2.8]} position={[i * 0.04, -1 + i * 0.5, 0]} rotation={[0, i * 0.12 - 0.2, 0]} color={color} fill={i === 4 ? 0.22 : 0.08} edge={i === 4 ? 1 : 0.55} emissive={i === 4 ? 0.4 : 0} />
      ))}
      <mesh ref={scan} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Tables({ color, still }: P) {
  const orders = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    if (still) return;
    orders.current.forEach((m, i) => m && (m.position.y = 0.55 + Math.sin(s.clock.elapsedTime * 1.4 + i * 1.3) * 0.12));
  });
  const spots: [number, number][] = [[-1.4, -0.9], [0, -0.9], [1.4, -0.9], [-1.4, 0.9], [0, 0.9], [1.4, 0.9]];
  return (
    <group rotation={[0.55, 0, 0]}>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, -0.2, z]}>
          <mesh>
            <cylinderGeometry args={[0.52, 0.52, 0.06, 40]} />
            <meshStandardMaterial color={color} transparent opacity={0.14} emissive={color} emissiveIntensity={0.15} />
          </mesh>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.52, 0.006, 6, 64]} />
            <meshBasicMaterial color={color} />
          </mesh>
          <mesh ref={(m) => void (orders.current[i] = m)} position={[0, 0.55, 0]}>
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color={i === 4 ? "#ffffff" : color} emissive={i === 4 ? "#ffffff" : color} emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Slots({ color, still }: P) {
  const g = useRef<THREE.Group>(null);
  const hi = new Set([2, 7, 8, 13, 16]);
  useFrame((s) => {
    if (still || !g.current) return;
    g.current.children.forEach((c, i) => (c.position.z = Math.sin(s.clock.elapsedTime * 1.2 + i * 0.5) * 0.06));
  });
  return (
    <group rotation={[-0.25, -0.35, 0]}>
      <group ref={g}>
        {Array.from({ length: 20 }, (_, i) => (
          <Slab key={i} size={[0.42, 0.42, 0.07]} position={[(i % 5) * 0.58 - 1.16, 0.87 - Math.floor(i / 5) * 0.58, 0]} color={color} fill={hi.has(i) ? 0.55 : 0.08} edge={hi.has(i) ? 1 : 0.5} emissive={hi.has(i) ? 0.7 : 0} />
        ))}
      </group>
    </group>
  );
}

function NfcCard({ color, still }: P) {
  const waves = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    if (still) return;
    waves.current.forEach((m, i) => {
      if (!m) return;
      const t = (s.clock.elapsedTime * 0.5 + i / 3) % 1;
      m.scale.setScalar(0.5 + t * 1.6);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.6;
    });
  });
  return (
    <group rotation={[-0.35, 0.45, 0.1]}>
      <Slab size={[2.7, 1.7, 0.07]} color={color} fill={0.2} edge={1} emissive={0.25} />
      <Slab size={[0.42, 0.32, 0.09]} position={[-0.85, 0.35, 0.02]} color="#ffffff" fill={0.5} />
      <Slab size={[1.2, 0.08, 0.09]} position={[0.25, -0.45, 0.02]} color={color} fill={0.6} />
      <Slab size={[0.8, 0.08, 0.09]} position={[-0.05, -0.65, 0.02]} color={color} fill={0.35} />
      <group position={[0, 0, 0.5]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={(m) => void (waves.current[i] = m)}>
            <torusGeometry args={[1, 0.012, 8, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Boxes({ color }: P) {
  const spots: [number, number, number, number][] = [[-0.9, -0.7, 0, 1], [0.25, -0.7, 0.3, 1], [1.3, -0.8, -0.2, 0.8], [-0.35, 0.45, 0.1, 0.9], [0.8, 0.4, 0.2, 0.75]];
  return (
    <group rotation={[0.3, -0.5, 0]}>
      {spots.map(([x, y, z, s], i) => (
        <Slab key={i} size={[s, s, s]} position={[x, y, z]} rotation={[0, i * 0.3, 0]} color={color} fill={i === 3 ? 0.3 : 0.07} edge={i === 3 ? 1 : 0.4} emissive={i === 3 ? 0.4 : 0} />
      ))}
    </group>
  );
}

function Layers({ color }: P) {
  return (
    <group rotation={[0.1, -0.5, 0]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[i * 0.35 - 0.35, i * 0.28 - 0.28, -i * 0.65 + 0.6]}>
          <Slab size={[2.7, 1.75, 0.04]} color={color} fill={i === 0 ? 0.2 : 0.07} edge={i === 0 ? 1 : 0.5} emissive={i === 0 ? 0.25 : 0} />
          <Slab size={[2.7, 0.2, 0.06]} position={[0, 0.78, 0.01]} color={color} fill={0.35} />
          <Slab size={[1.1, 0.9, 0.06]} position={[-0.7, -0.1, 0.01]} color={color} fill={0.15} />
          <Slab size={[1.0, 0.1, 0.06]} position={[0.7, 0.2, 0.01]} color={color} fill={0.3} />
          <Slab size={[0.7, 0.1, 0.06]} position={[0.55, -0.05, 0.01]} color={color} fill={0.2} />
        </group>
      ))}
    </group>
  );
}

function Orbit({ color, still }: P) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!still && g.current) g.current.rotation.y += dt * 0.5;
  });
  return (
    <group rotation={[0.35, 0, 0.15]}>
      <Slab size={[1.2, 1.2, 1.2]} color={color} fill={0.25} edge={1} emissive={0.4} />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.006, 6, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <group ref={g}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return <Slab key={i} size={[0.38, 0.38, 0.38]} position={[Math.cos(a) * 2, 0, Math.sin(a) * 2]} rotation={[a, a, 0]} color={i === 0 ? "#ffffff" : color} fill={0.35} emissive={0.5} />;
        })}
      </group>
    </group>
  );
}

function Network({ color, still }: P) {
  const { pts, pairs } = useMemo(() => {
    const r = rng(11);
    const pts = Array.from({ length: 11 }, () => new THREE.Vector3((r() - 0.5) * 3.4, (r() - 0.5) * 2.6, (r() - 0.5) * 2.4));
    const pairs: [number, number][] = [];
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) if (pts[i].distanceTo(pts[j]) < 1.9) pairs.push([i, j]);
    return { pts, pairs };
  }, []);
  const m = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    if (still) return;
    m.current.forEach((x, i) => x?.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 1.5 + i) * 0.25));
  });
  return (
    <group>
      <Links points={pts} pairs={pairs} color={color} opacity={0.5} />
      {pts.map((p, i) => (
        <mesh key={i} position={p} ref={(x) => void (m.current[i] = x)}>
          <sphereGeometry args={[i === 0 ? 0.2 : 0.11, 16, 16]} />
          <meshStandardMaterial color={i === 0 ? "#ffffff" : color} emissive={color} emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Rings({ color, still }: P) {
  const r = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    if (still) return;
    r.current.forEach((m, i) => {
      if (!m) return;
      const t = (s.clock.elapsedTime * 0.45 + i / 4) % 1;
      m.scale.setScalar(0.4 + t * 2.2);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
    });
  });
  return (
    <group rotation={[1.1, 0, 0.3]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(m) => void (r.current[i] = m)}>
          <torusGeometry args={[1, 0.012, 8, 96]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}
      <Slab size={[0.5, 0.5, 0.1]} color={color} fill={0.5} edge={1} emissive={0.6} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

function Chat({ color, still }: P) {
  const dots = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    if (still) return;
    dots.current.forEach((m, i) => m && (m.position.y = -0.62 + Math.max(0, Math.sin(s.clock.elapsedTime * 3 - i * 0.7)) * 0.1));
  });
  const msgs: { x: number; y: number; w: number; mine?: boolean }[] = [
    { x: -0.5, y: 1.0, w: 1.7 },
    { x: 0.55, y: 0.35, w: 1.5, mine: true },
    { x: -0.45, y: -0.3, w: 1.9 },
  ];
  return (
    <group rotation={[-0.15, -0.45, 0]}>
      {msgs.map((m, i) => (
        <Slab key={i} size={[m.w, 0.5, 0.08]} position={[m.x, m.y, i * 0.12]} color={m.mine ? "#ffffff" : color} fill={m.mine ? 0.3 : 0.14} edge={m.mine ? 1 : 0.7} emissive={m.mine ? 0.4 : 0.15} />
      ))}
      <group position={[-0.95, -0.62, 0.36]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.24, -0.62, 0]} ref={(m) => void (dots.current[i] = m)}>
            <sphereGeometry args={[0.07, 14, 14]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Relay({ color, still }: P) {
  const pk = useRef<(THREE.Mesh | null)[]>([]);
  const targets: [number, number, number][] = [[1.7, 1.0, 0], [1.9, -0.1, 0.2], [1.6, -1.1, -0.1]];
  useFrame((s) => {
    if (still) return;
    pk.current.forEach((m, i) => {
      if (!m) return;
      const t = (s.clock.elapsedTime * 0.5 + i / 3) % 1;
      const [tx, ty, tz] = targets[i];
      m.position.set(-1.4 + (tx + 1.4) * t, ty * t, tz * t);
      m.scale.setScalar(1 - t * 0.4);
    });
  });
  return (
    <group rotation={[0.15, -0.35, 0]}>
      <Slab size={[0.9, 0.9, 0.1]} position={[-1.4, 0, 0]} color={color} fill={0.3} edge={1} emissive={0.5} />
      {targets.map((t, i) => (
        <group key={i}>
          <Slab size={[0.7, 0.5, 0.08]} position={t} color={color} fill={0.12} edge={0.8} />
          <mesh ref={(m) => void (pk.current[i] = m)}>
            <octahedronGeometry args={[0.11, 0]} />
            <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const AGENT_TOOLS: [number, number, number][] = [[-1.9, 0.9, 0], [1.9, 0.8, 0.2], [0, -1.7, 0.1]];

function Agent({ color, still }: P) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!still && ring.current) ring.current.rotation.z += dt * 0.6;
  });
  const pts = useMemo(() => [new THREE.Vector3(0, 0, 0), ...AGENT_TOOLS.map((t) => new THREE.Vector3(...t))], []);
  return (
    <group rotation={[0.2, -0.3, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.25} metalness={0.5} wireframe />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[1, 0.01, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <Links points={pts} pairs={[[0, 1], [0, 2], [0, 3]]} color={color} opacity={0.6} />
      {AGENT_TOOLS.map((t, i) => (
        <Slab key={i} size={[0.75, 0.55, 0.08]} position={t} color={color} fill={0.14} edge={0.85} emissive={0.2} />
      ))}
    </group>
  );
}

function Flow({ color, still }: P) {
  const pulse = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (still || !pulse.current) return;
    pulse.current.position.x = -2.25 + ((s.clock.elapsedTime * 0.55) % 1) * 4.5;
  });
  return (
    <group rotation={[-0.35, -0.3, 0]}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[-2.25 + i * 1.5, (i % 2) * 0.35 - 0.17, 0]}>
          <Slab size={[0.85, 0.85, 0.12]} color={color} fill={i === 3 ? 0.3 : 0.12} edge={i === 3 ? 1 : 0.75} emissive={i === 3 ? 0.5 : 0.1} />
        </group>
      ))}
      <mesh>
        <boxGeometry args={[4.5, 0.012, 0.012]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

function Plug({ color, still }: P) {
  const mod = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (still || !mod.current) return;
    mod.current.position.x = 1.45 + Math.max(0, Math.sin(s.clock.elapsedTime * 0.9)) * 0.7;
  });
  return (
    <group rotation={[-0.2, -0.45, 0]}>
      <Slab size={[2.6, 1.8, 0.08]} position={[-0.7, 0, 0]} color={color} fill={0.12} edge={0.85} />
      <Slab size={[2.6, 0.22, 0.1]} position={[-0.7, 0.8, 0.02]} color={color} fill={0.35} />
      <Slab size={[0.6, 0.6, 0.1]} position={[0.58, 0, 0.02]} color={color} fill={0.4} edge={1} emissive={0.4} />
      <group ref={mod} position={[1.45, 0, 0.02]}>
        <Slab size={[0.9, 0.9, 0.14]} color="#ffffff" fill={0.3} edge={1} emissive={0.6} />
        <mesh position={[-0.55, 0, 0]}>
          <boxGeometry args={[0.2, 0.28, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
        </mesh>
      </group>
    </group>
  );
}

const VARIANTS = { sheets: Sheets, tables: Tables, slots: Slots, card: NfcCard, boxes: Boxes, layers: Layers, orbit: Orbit, network: Network, rings: Rings, chat: Chat, relay: Relay, agent: Agent, flow: Flow, plug: Plug };

export default function ObjectCanvas({ variant, color = "#9dbd6a", lite, still, active }: SceneProps & { variant: ObjectVariant; active: boolean }) {
  const Cmp = VARIANTS[variant];
  return (
    <Canvas
      dpr={[1, lite ? 1.25 : 1.6]}
      camera={{ position: [0, 0.1, 9], fov: 38 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : active ? "always" : "never"}
      aria-hidden="true"
    >
      <Lights />
      <Rig still={still} spin={variant === "orbit" || variant === "network" || variant === "agent" ? 0.15 : 0.05} tilt={0.28}>
        <Cmp color={color} still={still} />
      </Rig>
      <Particles count={lite ? 40 : 110} spread={7} color={color} seed={3} />
    </Canvas>
  );
}
