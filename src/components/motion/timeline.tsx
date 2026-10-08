"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Text } from "../ui/primitives";
import { Heading } from "./heading";

type Step = { title: string; text: string };

/**
 * Vertical scroll timeline: a sticky title on the left, steps on the right joined by a line that
 * draws as you scroll. The step nearest the middle of the screen lights up.
 */
export function Timeline({ eyebrow, title, steps, index }: { eyebrow: string; title: string; steps: Step[]; index?: string }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 65%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const items = wrap.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <div className="lg:sticky lg:top-36 lg:self-start">
        <Eyebrow index={index} className="mb-7">
          {eyebrow}
        </Eyebrow>
        <Heading className="text-[clamp(2rem,4.4vw,3.5rem)]">{title}</Heading>
        <p className="numeral mt-10 hidden text-6xl text-accent lg:block" aria-hidden="true">
          {String(active + 1).padStart(2, "0")}
          <span className="text-3xl text-muted"> / {String(steps.length).padStart(2, "0")}</span>
        </p>
      </div>

      <ol ref={wrap} className="relative">
        <span aria-hidden="true" className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-line" />
        <motion.span aria-hidden="true" style={reduce ? { scaleY: 1 } : { scaleY: line }} className="absolute bottom-0 left-[1.1rem] top-2 w-px origin-top bg-accent" />
        {steps.map((s, i) => (
          <li key={s.title} data-step={i} className="relative pb-24 pl-16 last:pb-0 md:pb-32">
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 grid size-9 place-items-center rounded-full border border-current bg-bg text-xs font-semibold transition-colors duration-500"
              style={{ background: i <= active ? "var(--accent)" : "var(--bg)", color: i <= active ? "var(--on-accent)" : "var(--fg)", borderColor: i <= active ? "var(--accent)" : "var(--line)" }}
            >
              {i + 1}
            </span>
            <div className={`transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-40"}`}>
              <h3 className="text-[clamp(1.8rem,3.4vw,2.8rem)]">{s.title}</h3>
              <p className="mt-4 max-w-lg text-lg text-muted">
                <Text>{s.text}</Text>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
