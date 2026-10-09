"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll-driven steps for a pinned section. The track (a tall wrapper around a sticky stage) maps its
 * scroll distance onto `n` steps. The continuous progress (0..1) is written to the track as the CSS
 * variable --progress and, with the eased step position `pos` (0..n-1, fractional while changing),
 * handed to `onFrame` every frame, so visuals can follow the scroll with no React render. React only
 * re-renders when the nearest step changes. Each step holds for a beat; the change happens mid-step.
 * When the track is not displayed (mobile / reduced-motion layout), nothing runs.
 */
const ease = (t: number) => t * t * (3 - 2 * t);

export function useScrollSteps(n: number, onFrame?: (pos: number) => void) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const frame = useRef(onFrame);
  useEffect(() => {
    frame.current = onFrame;
  });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const t = track.current;
      if (!t || !t.offsetParent) return;
      const dist = t.offsetHeight - window.innerHeight;
      if (dist <= 0) return;
      const p = Math.min(1, Math.max(0, -t.getBoundingClientRect().top / dist));
      t.style.setProperty("--progress", p.toFixed(4));
      const f = p * (n - 1);
      const base = Math.min(Math.floor(f), Math.max(0, n - 2));
      const pos = n > 1 ? base + ease(Math.min(1, Math.max(0, (f - base - 0.2) / 0.6))) : 0;
      frame.current?.(pos);
      setActive(Math.round(pos));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [n]);

  /** Scroll to the middle of step i (click / keyboard navigation). */
  const go = useCallback(
    (i: number) => {
      const t = track.current;
      if (!t) return;
      const dist = t.offsetHeight - window.innerHeight;
      const top = t.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (i / Math.max(1, n - 1)) * dist, behavior: "smooth" });
    },
    [n],
  );

  return { track, active, go };
}
