"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Two serif lines that slide in opposite directions as you scroll past. Static for reduced motion. */
export function WordBand({ top, bottom }: { top: string[]; bottom: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["6%", "-30%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-30%", "6%"]);

  const row = (words: string[], italic: boolean) => (
    <span className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8">
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="flex items-center gap-6 md:gap-8">
          <span className={italic ? "em" : undefined}>{w}</span>
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        </span>
      ))}
    </span>
  );

  const line = "flex w-max whitespace-nowrap font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-medium leading-[1.25]";
  return (
    <div ref={ref} data-tone="sand" className="overflow-hidden bg-bg py-8 text-fg md:py-10" role="presentation">
      <motion.div style={reduce ? undefined : { x: a }} className={line}>
        {row(top, false)}
        {row(top, false)}
      </motion.div>
      <motion.div style={reduce ? undefined : { x: b }} className={line}>
        {row(bottom, true)}
        {row(bottom, true)}
      </motion.div>
    </div>
  );
}
