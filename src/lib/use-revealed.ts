"use client";

import { useEffect, useRef, useState } from "react";

type Entry = { el: Element; margin: number; done: () => void };

const entries = new Set<Entry>();
let bound = false;
let raf = 0;

function check() {
  raf = 0;
  const vh = window.innerHeight;
  for (const e of Array.from(entries)) {
    // revealed once its top edge is above the trigger line, including anything already scrolled past
    if (e.el.getBoundingClientRect().top < vh * (1 - e.margin)) {
      entries.delete(e);
      e.done();
    }
  }
  if (!entries.size && bound) {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", schedule);
    bound = false;
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(check);
}

/**
 * One-shot "has this scrolled into view" flag. Unlike IntersectionObserver's `whileInView`, it also fires
 * for elements that were flicked past between frames (fast iOS momentum scrolling), so content never
 * stays stuck in its hidden state. All elements share a single scroll listener.
 */
export function useRevealed<T extends Element>(margin = 0.08) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    entries.add({ el, margin, done: () => setShown(true) });
    if (!bound) {
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      window.addEventListener("pageshow", schedule);
      bound = true;
    }
    schedule();
    return () => {
      for (const e of entries) if (e.el === el) entries.delete(e);
    };
  }, [margin]);

  return [ref, shown] as const;
}
