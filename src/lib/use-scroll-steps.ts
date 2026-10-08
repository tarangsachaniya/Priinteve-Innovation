"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll-driven steps for a pinned section. The track (a tall wrapper around a sticky stage) maps its
 * scroll distance onto `n` equal steps. The continuous progress (0..1) is written to the track as the CSS
 * variable --progress (no React render per frame); React only re-renders when the active step changes.
 * When the track is not displayed (mobile / reduced-motion layout), nothing runs.
 */
export function useScrollSteps(n: number) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const t = track.current;
      if (!t || !t.offsetParent) return;
      const dist = t.offsetHeight - window.innerHeight;
      if (dist <= 0) return;
      const p = Math.min(1, Math.max(0, -t.getBoundingClientRect().top / dist));
      t.style.setProperty("--progress", p.toFixed(4));
      setActive(Math.min(n - 1, Math.floor(p * n * 0.9999)));
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
      window.scrollTo({ top: top + ((i + 0.5) / n) * dist, behavior: "smooth" });
    },
    [n],
  );

  return { track, active, go };
}
