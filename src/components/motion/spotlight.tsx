"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor spotlight for a section: a soft green light follows the pointer and, inside it, the background
 * grid shows brighter. Listens on the parent section; fine pointers with motion allowed only.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        el.style.setProperty("--sx", `${(e.clientX - r.left).toFixed(0)}px`);
        el.style.setProperty("--sy", `${(e.clientY - r.top).toFixed(0)}px`);
        el.dataset.on = "1";
      });
    };
    const leave = () => delete el.dataset.on;
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="spotlight pointer-events-none absolute inset-0">
      <div className="spotlight-glow absolute inset-0" />
      <div className="spotlight-grid absolute inset-0" />
    </div>
  );
}
