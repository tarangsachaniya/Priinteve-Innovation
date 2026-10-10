"use client";

import { useRef } from "react";

/**
 * Giant footer wordmark, set flat: a hairline outline of PRIINTEVE bleeding off the bottom edge.
 * On a fine pointer a filled copy is revealed through a soft circular mask that follows the cursor
 * (one transform-free CSS-variable write per move). Touch and reduced motion see the static outline.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
    el.dataset.on = "1";
  };
  return (
    <div ref={ref} aria-hidden="true" onPointerMove={move} onPointerLeave={() => delete ref.current?.dataset.on} className="fw relative mt-10 select-none overflow-hidden pt-4 md:mt-14">
      <p className="fw-text font-display text-[clamp(3.2rem,17.5vw,17rem)] font-bold uppercase leading-[0.78] tracking-[-0.05em] whitespace-nowrap text-center">Priinteve</p>
      <p className="fw-text fw-fill pointer-events-none absolute inset-x-0 top-4 font-display text-[clamp(3.2rem,17.5vw,17rem)] font-bold uppercase leading-[0.78] tracking-[-0.05em] whitespace-nowrap text-center">Priinteve</p>
    </div>
  );
}
