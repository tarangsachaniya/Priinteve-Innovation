"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gate for WebGL scenes:
 * - `mounted`: the scene has been near the viewport once (so Three.js is only loaded when needed)
 * - `active`:  currently on screen (render loop runs only then)
 * - `lite`:    small / low-power device → fewer objects, lower pixel ratio
 * - `still`:   user prefers reduced motion → render a static frame, no animation
 * - `webgl`:   WebGL is available; otherwise the caller shows its static fallback
 */
export function useSceneGate() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ mounted: false, active: false, lite: false, still: false, webgl: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lite = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = true;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setState((s) => ({ ...s, lite, still, webgl }));

    const io = new IntersectionObserver(
      ([e]) => setState((s) => ({ ...s, active: e.isIntersecting, mounted: s.mounted || e.isIntersecting })),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, state] as const;
}
