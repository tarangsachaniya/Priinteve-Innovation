"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { Media } from "@/content/types";

/**
 * Gallery as a filmstrip: on desktop the section pins and the frames travel sideways as you scroll,
 * with a progress rule and a frame counter. Each frame keeps its own proportions (nothing is cropped
 * to a grid). Mobile and reduced motion get a swipeable snap row.
 */
export function CaseGallery({ items, head }: { items: Media[]; head: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(p, (v) => -v * dist);
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(items.length - 1, Math.round(v * (items.length - 1)))));

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current;
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const frames = (
    <>
      {items.map((m, i) => (
        <li key={m.src} className="shrink-0">
          <figure>
            <div className="relative h-[52svh] overflow-hidden rounded-[1.5rem] border border-line" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
              <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 60vw, 85vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 flex max-w-[28rem] gap-3 text-[0.88rem] text-muted">
              <span className="font-serif text-lg italic leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
              {m.alt}
            </figcaption>
          </figure>
        </li>
      ))}
    </>
  );

  return (
    <>
      <div ref={wrap} className="relative hidden lg:motion-safe:block" style={{ height: `${100 + items.length * 45}svh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden pt-20">
          <div className="container-x flex items-end justify-between gap-8">
            {head}
            <p className="label shrink-0 tabular-nums text-muted">
              <span className="text-fg">{String(active + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
            </p>
          </div>
          <motion.ul ref={track} style={{ x }} className="bleed-pad flex w-max gap-6">
            {frames}
          </motion.ul>
          <div className="container-x">
            <div className="relative h-px bg-line">
              <motion.span className="absolute inset-y-0 left-0 bg-accent" style={{ width: bar, height: 2, top: -0.5 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 lg:motion-safe:hidden">
        <div className="container-x mb-10">{head}</div>
        <ul className="bleed-pad no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [&>li]:snap-start [&_figure>div]:h-[40svh]">{frames}</ul>
      </div>
    </>
  );
}
