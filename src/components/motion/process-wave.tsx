"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string };

const num = (i: number) => String(i + 1).padStart(2, "0");
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

/* geometry, in SVG units: one step = 340 wide; the curve runs between a peak and a trough */
const STEP = 340;
const LEAD = 400; // flat line before the first node (matches the 40vw lead of the track)
const TOP = 30;
const BOTTOM = 170;

function wavePath(n: number) {
  const pts = Array.from({ length: n }, (_, i) => [LEAD + i * STEP, i % 2 === 0 ? TOP : BOTTOM] as const);
  let d = `M0 ${TOP} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < n; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += ` C${x0 + STEP / 2} ${y0} ${x1 - STEP / 2} ${y1} ${x1} ${y1}`;
  }
  // the path ends on the last node: nothing trails past the final step
  return { d, width: pts[n - 1][0] + STEP };
}

function Diamond({ active, className }: { active: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("absolute block", className)}>
      <span className={cn("relative block size-3 rotate-45 border transition-all duration-500", active ? "scale-125 border-accent bg-accent shadow-[0_0_18px_2px_var(--accent)]" : "border-accent/70 bg-bg")} />
    </span>
  );
}

/**
 * "How we work" as a path: the section pins while the steps travel sideways along a wave whose accent
 * stroke draws with scroll. Nodes sit on alternating peaks and troughs; the step in focus is lit and
 * the rest dim. Below `lg`, or with reduced motion, the same steps stack along a vertical line.
 */
export function ProcessWave({ steps, head }: { steps: readonly Step[]; head: ReactNode }) {
  const n = steps.length;
  const wrap = useRef<HTMLDivElement>(null);
  const clip = `wave-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(p, [0, 1], ["0vw", `${-34 * (n - 1)}vw`]);
  // the accent stroke is revealed by a clip whose right edge follows the active node exactly
  const drawn = useTransform(p, [0, 1], [LEAD, LEAD + STEP * (n - 1)]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));
  const { d, width } = wavePath(n);
  const hint = `Keep scrolling · ${WORDS[n] ?? n} steps`;

  return (
    <>
      {/* desktop: pinned horizontal path */}
      <div ref={wrap} className="relative hidden lg:motion-safe:block" style={{ height: `${n * 55 + 60}vh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-[clamp(2rem,6vh,4.5rem)] overflow-hidden pb-8 pt-24">
          <div className="container-x flex items-end justify-between gap-10">
            {head}
            <p className="label shrink-0 pb-3 text-muted">{hint}</p>
          </div>

          <div className="relative h-[24rem]">
            <motion.div className="absolute inset-y-0 left-0" style={{ x, width: `${(width / STEP) * 34}vw` }}>
              <svg aria-hidden="true" viewBox={`0 0 ${width} 200`} preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[12rem] w-full overflow-visible">
                <path d={d} fill="none" stroke="var(--line)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                <defs>
                  <clipPath id={clip}>
                    <motion.rect x="0" y="-20" height="240" style={{ width: drawn }} />
                  </clipPath>
                </defs>
                <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.25" vectorEffect="non-scaling-stroke" clipPath={`url(#${clip})`} />
              </svg>
              <ol>
                {steps.map((s, i) => {
                  const up = i % 2 === 0;
                  const on = i === active;
                  return (
                    <li key={s.title} className="absolute top-0 w-[26vw] max-w-[24rem]" style={{ left: `${((LEAD + i * STEP) / STEP) * 34}vw` }} aria-current={on ? "step" : undefined}>
                      <Diamond active={on || i < active} className={cn("-translate-x-1/2 -translate-y-1/2", up ? "top-[1.8rem]" : "top-[10.2rem]")} />
                      <div className={cn("absolute left-0 w-full transition-all duration-700 ease-out-expo", up ? "top-[4rem]" : "top-[11.8rem]", on ? "opacity-100" : "opacity-30 blur-[0.5px]")}>
                        <span className={cn("numeral text-sm", on ? "text-accent" : "text-muted")}>{num(i)}</span>
                        <h3 className={cn("mt-3 font-display text-[clamp(2rem,3.4vw,3.2rem)] uppercase leading-[0.92] tracking-[-0.03em] transition-transform duration-700 ease-out-expo", on && "-translate-y-1")}>{s.title}</h3>
                        <p className="mt-4 max-w-[20rem] text-[0.98rem] leading-relaxed text-muted">{s.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </div>

          <div className="container-x flex items-center justify-between gap-6">
            <div aria-hidden="true" className="flex gap-1.5">
              {steps.map((s, i) => (
                <span key={s.title} className={cn("h-[3px] rounded-full transition-all duration-500", i === active ? "w-10 bg-accent" : i < active ? "w-4 bg-accent/50" : "w-4 bg-line")} />
              ))}
            </div>
            <p className="label tabular-nums text-muted">
              <span className="text-fg">{num(active)}</span> / {num(n - 1)}
            </p>
          </div>
        </div>
      </div>

      {/* mobile and reduced motion: vertical path */}
      <div className="container-x lg:motion-safe:hidden">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          {head}
          <p className="label text-muted">{`${WORDS[n] ?? n} steps`}</p>
        </div>
        <ol className="relative ml-1.5 border-l border-line">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-12 pl-9 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[7px] top-1.5 block size-3 rotate-45 border border-accent bg-bg" />
              <span className="numeral text-sm text-accent">{num(i)}</span>
              <h3 className="mt-2 font-display text-3xl uppercase leading-none tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 max-w-md text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
