"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * Soft clay forms, ray-marched: a handful of spheres melt into each other (smooth minimum), lit by one
 * warm key light with a gentle rim. The pointer nudges the forms and the light. No geometry, one quad.
 */
const FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uA;
uniform vec3 uB;
uniform float uSteps;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
  float t = uTime * 0.45;
  vec3 m = vec3(uMouse * 0.45, 0.0);
  float d = length(p - vec3(sin(t) * 0.3, cos(t * 0.8) * 0.22, 0.0) - m * 0.5) - 0.82;
  d = smin(d, length(p - vec3(cos(t * 1.1) * 0.78, sin(t * 0.9) * 0.58, 0.1) + m * 0.2) - 0.5, 0.55);
  d = smin(d, length(p - vec3(sin(t * 0.7 + 2.0) * 0.72, -cos(t) * 0.66, -0.1)) - 0.44, 0.55);
  d = smin(d, length(p - vec3(-sin(t * 1.3) * 0.84, 0.58 * sin(t * 0.6), 0.05)) - 0.34, 0.5);
  return d;
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0025, 0.0);
  return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}

void main() {
  vec2 uv = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.6;
  vec3 ro = vec3(0.0, 0.0, 3.4);
  vec3 rd = normalize(vec3(uv, -1.7));

  float t = 0.0;
  bool hit = false;
  vec3 p = ro;
  for (int i = 0; i < 64; i++) {
    if (float(i) > uSteps) break;
    p = ro + rd * t;
    float d = map(p);
    if (d < 0.0015) { hit = true; break; }
    t += d;
    if (t > 7.0) break;
  }

  // soft ground shadow
  vec2 g = (uv - vec2(0.0, -1.05)) * vec2(0.95, 2.6);
  vec3 col = mix(uBg, uBg * 0.8, exp(-dot(g, g) * 1.6) * 0.75);

  if (hit) {
    vec3 n = normalAt(p);
    vec3 l = normalize(vec3(-0.55 + uMouse.x * 0.7, 0.75 + uMouse.y * 0.4, 0.8));
    float dif = clamp(dot(n, l), 0.0, 1.0);
    float wrap = dif * 0.72 + 0.28;
    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.4);
    float spec = pow(clamp(dot(reflect(-l, n), -rd), 0.0, 1.0), 26.0);
    vec3 base = mix(uA, uB, clamp(n.y * 0.5 + 0.5, 0.0, 1.0));
    col = base * wrap + vec3(1.0, 0.92, 0.84) * spec * 0.32 + fres * uB * 0.28;
    col *= 0.9 + 0.1 * smoothstep(-1.0, 1.0, n.y);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export type ClayColors = { bg: string; a: string; b: string };

function Clay({ colors, lite, still }: { colors: ClayColors; lite?: boolean; still?: boolean }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBg: { value: new THREE.Color(colors.bg) },
      uA: { value: new THREE.Color(colors.a) },
      uB: { value: new THREE.Color(colors.b) },
      uSteps: { value: lite ? 40 : 60 },
    }),
    [colors, lite],
  );
  const mat = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uRes.value.set(state.size.width, state.size.height);
    if (still) {
      u.uTime.value = 4.2;
      return;
    }
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value.x += (state.pointer.x - u.uMouse.value.x) * 0.05;
    u.uMouse.value.y += (state.pointer.y - u.uMouse.value.y) * 0.05;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} depthWrite={false} depthTest={false} />
    </mesh>
  );
}

export default function ClayCanvas({ colors, lite, still, active }: { colors: ClayColors; lite?: boolean; still?: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={[1, lite ? 1 : 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : active ? "always" : "never"}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <Clay colors={colors} lite={lite} still={still} />
    </Canvas>
  );
}
