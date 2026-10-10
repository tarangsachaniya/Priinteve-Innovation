"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { LayoutDashboard, MousePointerClick, ScanLine, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Text } from "../ui/primitives";
import { Heading } from "./heading";

type Step = { title: string; text: string; examples?: string[] };

const ICONS: LucideIcon[] = [ScanLine, MousePointerClick, LayoutDashboard];

/**
 * A three-step process read as one line. Heading and lead share a row; below, the steps sit on a single
 * connector that fills as the section scrolls through, and each node lights as the fill reaches it.
 * Everything is readable from the start: inactive steps are only slightly quieter, never hidden.
 * Below lg the same line runs vertically.
 */
export function Timeline({ eyebrow, title, lead, steps, index }: { eyebrow: string; title: string; lead?: string; steps: Step[]; index?: string }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.85", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });
  const [reached, setReached] = useState(reduce ? steps.length - 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.min(steps.length - 1, Math.floor(v * (steps.length - 1) + 0.15))));
  const lit = (i: number) => reduce || i <= reached;

  return (
    <div>
      <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Eyebrow index={index} className="mb-7">
            {eyebrow}
          </Eyebrow>
          <Heading className="max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02]">{title}</Heading>
        </div>
        {lead && <p className="max-w-md text-lg text-muted lg:ml-auto">{lead}</p>}
      </div>

      <ol ref={wrap} className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
        {/* lg connector: first node centre to last node centre, filled with scroll */}
        <span aria-hidden="true" className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-6 hidden h-px bg-line lg:block">
          <motion.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: reduce ? 1 : fill }} />
        </span>

        {steps.map((s, i) => {
          const I = ICONS[i] ?? ScanLine;
          const on = lit(i);
          return (
            <li key={s.title} className="relative grid grid-cols-[3rem_1fr] content-start gap-x-5 lg:grid-cols-1 lg:justify-items-center lg:text-center">
              {/* below lg: a segment from this node to the next one only */}
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-6 top-6 h-[calc(100%+2.5rem)] w-px bg-line lg:hidden">
                  <span className={cn("absolute inset-0 origin-top bg-accent transition-transform duration-[var(--dur-slow)] ease-[var(--ease)]", lit(i + 1) ? "scale-y-100" : "scale-y-0")} />
                </span>
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 grid size-12 place-items-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-slow)] ease-[var(--ease)]",
                  on ? "border-accent bg-accent-strong text-on-accent shadow-[0_0_0_6px_var(--accent-soft)]" : "border-line bg-bg text-muted",
                )}
              >
                <I className="size-5" />
              </span>
              <div className={cn("transition-opacity duration-[var(--dur-slow)] lg:mt-7", on ? "opacity-100" : "opacity-60")}>
                <p className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.1rem)]">{s.title}</h3>
                <p className="mt-3 max-w-sm text-[1.02rem] text-muted lg:mx-auto">
                  <Text>{s.text}</Text>
                </p>
                {s.examples && (
                  <ul className="mt-5 flex flex-wrap gap-2 lg:justify-center">
                    {s.examples.map((e) => (
                      <li key={e} className="rounded-full border border-line bg-surface px-3 py-1 text-[0.8rem] text-fg/80">
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
