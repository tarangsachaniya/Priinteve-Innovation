"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "../ui/primitives";

const SPEED = 26; // ms per character
const PAUSE: Record<string, number> = { ",": 220, ".": 420, ":": 260, ";": 260 };

/** Splits text into word runs with their character offsets, and marks the accent words. */
function tokens(text: string, accents: string[]) {
  const parts = text.split(/(\s+)/);
  const starts = parts.map((_, i) => parts.slice(0, i).join("").length);
  return parts.map((t, i) => ({ t, start: starts[i], accent: accents.includes(t.replace(/[^a-z]/gi, "").toLowerCase()) }));
}

/** Renders the first `count` characters of `text`; accent words switch to serif italic once fully typed. */
function Typed({ text, count, accents }: { text: string; count: number; accents: string[] }) {
  return (
    <>
      {tokens(text, accents).map(({ t, start, accent }, i) =>
        count <= start ? null : (
          <span key={i} className={cn(accent && count >= start + t.length && "em")}>
            {t.slice(0, count - start)}
          </span>
        ),
      )}
    </>
  );
}

/**
 * OUR MISSION as a document being written: an editor window ("mission.txt") in which the mission types
 * itself out when it scrolls into view, followed by the vision as a second, quieter line. A giant outlined
 * word drifts behind it. Screen readers get the full text at once; reduced motion shows it complete.
 */
export function MissionTypewriter({ eyebrow = "Our mission", index, mission, vision, accents }: { eyebrow?: string; index?: string; mission: string; vision?: string; accents: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const inView = useInView(card, { once: true, margin: "-20% 0px" });
  const [run, setRun] = useState(0);
  const [count, setCount] = useState(0);
  const total = mission.length + (vision ? vision.length : 0);
  const shown = reduce ? total : count;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    let timer = 0;
    const all = mission + (vision ?? "");
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= all.length) return;
      const ch = all[i - 1];
      // a beat between the mission and the vision line
      const extra = i === mission.length ? 900 : (PAUSE[ch] ?? 0);
      timer = window.setTimeout(tick, SPEED + extra + (Math.random() * 18 - 9));
    };
    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, mission, vision, run]);

  const missionCount = Math.min(shown, mission.length);
  const visionCount = Math.max(0, shown - mission.length);
  const typing = shown < total;
  const onVision = shown > mission.length;
  const line = onVision ? 3 : 1;
  const col = (onVision ? visionCount : missionCount) + 1;

  return (
    <section ref={ref} data-tone="dark" aria-label={eyebrow} className="grain relative isolate overflow-hidden bg-bg py-28 text-fg md:py-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="drift pointer-events-none absolute left-1/4 top-1/3 -z-10 size-[44rem] rounded-full bg-[#6b8e3d]/20 blur-[140px]" />
      <motion.p aria-hidden="true" style={reduce ? undefined : { x: wordX }} className="pointer-events-none absolute left-0 top-1/2 -z-10 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(8rem,26vw,24rem)] font-bold uppercase leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(250_248_242/0.07)]">
        Mission
      </motion.p>

      <div className="container-x relative z-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <p className="label text-muted">Written in Ahmedabad</p>
        </div>

        {/* full text for assistive tech */}
        <div className="sr-only">
          <p>{mission}</p>
          {vision && <p>Vision: {vision}</p>}
        </div>

        <div ref={card} aria-hidden="true" className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-surface/80 shadow-[0_60px_120px_-50px_rgb(0_0_0/0.9)] backdrop-blur-md">
          {/* title bar */}
          <div className="flex items-center gap-4 border-b border-line bg-fg/[0.03] px-5 py-3.5">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-[#eed89e]/70" />
              <i className="size-2.5 rounded-full bg-accent/70" />
              <i className="size-2.5 rounded-full bg-fg/25" />
            </span>
            <span className="mx-auto rounded-full bg-fg/[0.06] px-4 py-1 font-mono text-[0.72rem] tracking-wide text-muted">priinteve / mission.txt</span>
            {!reduce && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => {
                  setCount(0);
                  setRun((r) => r + 1);
                }}
                className="label flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
              >
                <RotateCcw className="size-3" />
                Replay
              </button>
            )}
          </div>

          {/* body */}
          <div className="grid grid-cols-[2.75rem_1fr] gap-x-3 px-3 py-8 sm:grid-cols-[3.5rem_1fr] sm:px-6 md:py-12">
            <span className="select-none pt-[0.35em] text-right font-mono text-xs text-muted/50">01</span>
            <p className="min-h-[7.5em] font-display text-[clamp(1.45rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.025em] sm:min-h-[5em]">
              <Typed text={mission} count={missionCount} accents={accents} />
              {!onVision && <span className="caret ml-0.5 inline-block h-[0.95em] w-[0.08em] translate-y-[0.12em] bg-accent" />}
            </p>
            {vision && (
              <>
                <span className="select-none pt-6 text-right font-mono text-xs text-muted/50">03</span>
                <p className={cn("mt-6 min-h-[3em] font-mono text-[0.95rem] leading-relaxed text-muted transition-opacity duration-500 md:text-[1.05rem]", !onVision && "opacity-0")}>
                  <span className="text-accent">&gt; vision: </span>
                  <Typed text={vision} count={visionCount} accents={[]} />
                  {onVision && <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] bg-accent/80" />}
                </p>
              </>
            )}
          </div>

          {/* status bar */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line px-5 py-2.5 font-mono text-[0.68rem] text-muted">
            <span className="flex items-center gap-2">
              <span className={cn("size-1.5 rounded-full", typing ? "animate-pulse bg-[#eed89e]" : "bg-accent")} />
              {typing ? "Writing" : "Saved"}
            </span>
            <span className="flex gap-5">
              <span className="tabular-nums">
                Ln {line}, Col {col}
              </span>
              <span className="hidden sm:inline">UTF-8</span>
              <span className="hidden sm:inline">Ahmedabad, IN</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
