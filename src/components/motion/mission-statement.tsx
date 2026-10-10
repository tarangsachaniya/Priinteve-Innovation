"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "../ui/primitives";

const DIM = 0.3;

/** One word whose emphasis follows the reader: muted until the scroll reaches it, then full strength. */
function Word({ word, progress, range, accent }: { word: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [DIM, 1]);
  return (
    <motion.span style={{ opacity }} className={cn(accent && "em")}>
      {word}{" "}
    </motion.span>
  );
}

/** A paragraph whose words light up in reading order across [from, to] of the section's scroll progress. */
function Highlighted({ text, progress, from, to, accents, className }: { text: string; progress: MotionValue<number>; from: number; to: number; accents: string[]; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  const step = (to - from) / words.length;
  return (
    <p className={className}>
      {words.map((w, i) => {
        const start = from + i * step;
        return <Word key={i} word={w} progress={progress} range={[start, Math.min(to, start + step * 4)]} accent={accents.includes(w.replace(/[^a-z]/gi, "").toLowerCase())} />;
      })}
    </p>
  );
}

/**
 * OUR MISSION, read rather than typed. The whole statement and the vision line are on the page the moment
 * the section appears, set in a muted tone; as you scroll, the words brighten in reading order, and what
 * you have read stays bright. Nothing waits on a timer and nothing locks the scroll. Reduced motion shows
 * the text at full strength.
 */
export function MissionStatement({ eyebrow = "Our mission", index, mission, vision, accents }: { eyebrow?: string; index?: string; mission: string; vision?: string; accents: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const { scrollYProgress: drift } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(drift, [0, 1], ["8%", "-18%"]);
  const { scrollYProgress: read } = useScroll({ target: card, offset: ["start 0.8", "end 0.5"] });
  const split = vision ? 0.72 : 1;

  return (
    <section ref={ref} data-tone="dark" aria-label={eyebrow} className="grain relative isolate overflow-hidden bg-bg py-28 text-fg md:py-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/4 top-1/3 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(107_142_61/0.22),transparent)]" />
      <motion.p aria-hidden="true" style={reduce ? undefined : { x: wordX }} className="pointer-events-none absolute left-0 top-1/2 -z-10 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(8rem,26vw,24rem)] font-bold uppercase leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(250_248_242/0.07)]">
        Mission
      </motion.p>

      <div className="container-x relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <p className="label text-muted">Written in Ahmedabad</p>
        </div>

        <div ref={card} className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[0_60px_120px_-50px_rgb(0_0_0/0.9)]">
          <div aria-hidden="true" className="flex items-center gap-4 border-b border-line bg-fg/[0.03] px-5 py-3.5">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-[#eed89e]/70" />
              <i className="size-2.5 rounded-full bg-accent/70" />
              <i className="size-2.5 rounded-full bg-fg/25" />
            </span>
            <span className="mx-auto rounded-full bg-fg/[0.06] px-4 py-1 font-mono text-[0.72rem] tracking-wide text-muted">priinteve / mission.txt</span>
            <span className="w-12" />
          </div>

          <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 px-3 py-8 sm:grid-cols-[3.5rem_1fr] sm:px-6 md:py-12">
            <span aria-hidden="true" className="select-none pt-[0.35em] text-right font-mono text-xs text-muted/50">01</span>
            {reduce ? (
              <p className="font-display text-[clamp(1.45rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.025em]">{mission}</p>
            ) : (
              <Highlighted text={mission} progress={read} from={0} to={split} accents={accents} className="font-display text-[clamp(1.45rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.025em]" />
            )}
            {vision && (
              <>
                <span aria-hidden="true" className="select-none pt-6 text-right font-mono text-xs text-muted/50">03</span>
                <div className="mt-6 font-mono text-[0.95rem] leading-relaxed md:text-[1.05rem]">
                  <span className="text-accent">&gt; vision: </span>
                  {reduce ? (
                    <span className="text-muted">{vision}</span>
                  ) : (
                    <Highlighted text={vision} progress={read} from={split} to={1} accents={[]} className="inline text-fg/90" />
                  )}
                </div>
              </>
            )}
          </div>

          <div aria-hidden="true" className="flex items-center gap-4 border-t border-line px-5 py-3 font-mono text-[0.68rem] text-muted">
            <span>Reading</span>
            <span className="relative h-px flex-1 bg-line">
              <motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: reduce ? 1 : read }} />
            </span>
            <span className="hidden sm:inline">UTF-8 · Ahmedabad, IN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
