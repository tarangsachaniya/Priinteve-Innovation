"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_TOP = 92; // clearance for the floating navbar (it ends ~72px from the top)
const BOTTOM_GAP = 16;

/**
 * Pin a block to the viewport and step through `n` items as the page scrolls.
 *
 * The scroll track is sized to the block's own (measured) height plus one step per extra item, so the
 * block unpins exactly after the last step, with no empty tail. The block is centred vertically when
 * the viewport has room; when it is taller than the space below the navbar it is scaled down to fit,
 * so it never slides under the navbar or off the bottom. Only active on wide screens that allow
 * motion; elsewhere `pinned` is false, `trackStyle`/`innerStyle` are empty and `active` is driven by
 * `select` alone.
 */
export function usePinnedSteps(n: number, stepVh = 55) {
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ h: 0, vis: 0, scale: 1, top: MIN_TOP, step: 480 });
  const track = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const on = () => setPinned(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // measure the block; keep the tallest height seen so the track never shrinks while cards expand
  useEffect(() => {
    if (!pinned || !inner.current) return;
    const el = inner.current;
    const measure = () => {
      const vh = window.innerHeight;
      setDims((d) => {
        const h = Math.max(d.h, el.offsetHeight); // layout height, unaffected by our own scale
        const avail = vh - MIN_TOP - BOTTOM_GAP;
        const scale = h > avail ? Math.max(0.6, avail / h) : 1;
        const vis = Math.round(h * scale);
        const top = Math.max(MIN_TOP, Math.round((vh - vis) / 2));
        const step = Math.round((vh * stepVh) / 100);
        return d.h === h && d.vis === vis && d.top === top && d.step === step && d.scale === scale ? d : { h, vis, scale, top, step };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, stepVh]);

  const dist = (n - 1) * dims.step + 1; // scroll distance while pinned

  useEffect(() => {
    if (!pinned || !dims.h) return;
    const on = () => {
      const el = track.current;
      if (!el) return;
      const progress = (dims.top - el.getBoundingClientRect().top) / dist;
      setActive(Math.min(n - 1, Math.max(0, Math.floor(progress * (n - 1) + 0.5))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pinned, dims, dist, n]);

  const select = useCallback(
    (i: number) => {
      setActive(i);
      const el = track.current;
      if (!pinned || !el) return;
      const trackTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: trackTop - dims.top + i * dims.step, behavior: "smooth" });
    },
    [pinned, dims],
  );

  return {
    active,
    select,
    track,
    inner,
    pinned,
    trackStyle: pinned && dims.h ? { height: dims.vis + (n - 1) * dims.step } : undefined,
    innerStyle: pinned
      ? {
          position: "sticky" as const,
          top: dims.top,
          ...(dims.scale < 1 ? { transform: `scale(${dims.scale})`, transformOrigin: "top center", marginBottom: dims.vis - dims.h } : {}),
        }
      : undefined,
  };
}
