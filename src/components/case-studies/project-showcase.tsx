"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { serviceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";
import { ProjectArt } from "./project-list";

const STEP_MS = 6000;

/**
 * Recent work as a split view: a numbered index on the left, a large preview on the right that
 * cross-fades as you hover, focus or tap an entry. It also advances on its own (paused on hover and for
 * reduced-motion users). Entries are real buttons, the preview links to the case study.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = projects[active];
  const service = serviceBySlug(p.service);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => {
      setActive((a) => (a + 1) % projects.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, cycle, paused, reduce, projects.length]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = projects.length - 1;
    const next = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* preview */}
      <div className="lg:order-2 lg:col-span-7">
        <Link href={`/work/${p.slug}`} className="group relative block overflow-hidden rounded-[2rem]" aria-label={`${p.name}: view case study`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={p.slug}
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectArt project={p} className="aspect-[5/4] w-full sm:aspect-[4/3]" />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-full bg-bg/90 py-2 pl-6 pr-2 text-fg backdrop-blur" data-tone="light">
            <span className="label truncate">{p.category}</span>
            <span className="flex shrink-0 items-center gap-2 rounded-full bg-fg py-2 pl-5 pr-2 text-sm font-semibold text-bg">
              View case study
              <span className="grid size-7 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </span>
        </Link>
      </div>

      {/* index */}
      <ol role="tablist" aria-label="Recent work" aria-orientation="vertical" className="lg:order-1 lg:col-span-5">
        {projects.map((proj, i) => {
          const on = i === active;
          return (
            <li key={proj.slug} role="presentation" className="border-t border-fg/30 last:border-b">
              <button
                ref={(el) => void (refs.current[i] = el)}
                role="tab"
                type="button"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => select(i)}
                onFocus={() => setActive(i)}
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group relative block w-full py-6 text-left"
              >
                <span className="flex items-baseline gap-5">
                  <span className={cn("numeral text-2xl transition-colors duration-500", on ? "text-accent" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("font-serif text-[clamp(1.7rem,2.8vw,2.5rem)] leading-tight transition-all duration-500", on ? "translate-x-2 text-fg" : "text-fg/45 group-hover:text-fg/80")}>{proj.name}</span>
                </span>
                <span className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <span className="overflow-hidden">
                    <span className="block pb-2 pl-[3.2rem] pt-4 text-lg text-muted">{proj.summary}</span>
                    <span className="label ml-[3.2rem] inline-block rounded-full border border-fg/40 px-3.5 py-1.5">{service?.name}</span>
                  </span>
                </span>
                {on && !reduce && !paused && (
                  <motion.span
                    key={`bar-${cycle}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
