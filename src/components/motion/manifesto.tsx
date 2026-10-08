"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useCssVars } from "@/lib/use-css-vars";
import { Eyebrow } from "../ui/primitives";

const VARS = ["--m-bg0", "--m-bg1", "--m-fg0", "--m-fg1", "--m-ac0", "--m-ac1", "--m-mu0", "--m-mu1"] as const;
// fallbacks used for the very first (pre-hydration) frame
const FALLBACK = { "--m-bg0": "#faf8f2", "--m-bg1": "#050409", "--m-fg0": "#faf8f2", "--m-fg1": "#faf8f2", "--m-ac0": "#9dbd6a", "--m-ac1": "#d4e4b0", "--m-mu0": "#6b6459", "--m-mu1": "#6b6459" };

function Word({ word, i, n, progress, accent }: { word: string; i: number; n: number; progress: MotionValue<number>; accent: boolean }) {
  const start = 0.12 + (i / n) * 0.62;
  const opacity = useTransform(progress, [start, start + 0.08], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "em" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * Scroll-scrubbed statement: the page eases into the deepest tone as it enters and the words light
 * up one by one. Colours follow the active theme. Static dark panel for reduced-motion users.
 */
export function Manifesto({ eyebrow, text, accents, index }: { eyebrow: string; text: string; accents: string[]; index?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const read = useCssVars(VARS);
  const c = (k: keyof typeof FALLBACK) => read[k] || FALLBACK[k];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bg = useTransform(scrollYProgress, [0.02, 0.2], [c("--m-bg0"), c("--m-bg1")]);
  const fg = useTransform(scrollYProgress, [0.02, 0.2], [c("--m-fg0"), c("--m-fg1")]);
  const accent = useTransform(scrollYProgress, [0.02, 0.2], [c("--m-ac0"), c("--m-ac1")]);
  const muted = useTransform(scrollYProgress, [0.02, 0.2], [c("--m-mu0"), c("--m-mu1")]);
  const words = text.split(" ");
  const isAccent = (w: string) => accents.includes(w.replace(/[^a-z]/gi, "").toLowerCase());

  if (reduce)
    return (
      <section data-tone="dark" className="relative bg-bg py-28 text-fg md:py-40">
        <div className="container-x max-w-6xl">
          <Eyebrow index={index} className="mb-10">
            {eyebrow}
          </Eyebrow>
          <p className="font-display text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.12]">{text}</p>
        </div>
      </section>
    );

  return (
    <motion.section ref={ref} style={{ backgroundColor: bg, color: fg, "--fg": fg, "--accent": accent, "--muted": muted } as MotionStyle} className="relative" aria-label={eyebrow}>
      <div className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-x relative max-w-6xl">
            <Eyebrow index={index} className="mb-10">
              {eyebrow}
            </Eyebrow>
            <p className="font-display text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.12] tracking-tight" aria-label={text}>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <Word key={`${w}-${i}`} word={w} i={i} n={words.length} progress={scrollYProgress} accent={isAccent(w)} />
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
