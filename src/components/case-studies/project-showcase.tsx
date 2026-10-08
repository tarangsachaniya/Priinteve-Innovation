"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import type { Project } from "@/content/types";
import { serviceBySlug } from "@/content/services";
import { usePinnedSteps } from "@/lib/use-pinned-steps";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

/** A website wireframe drawn in CSS inside a browser frame, tinted by the project's colours. Illustrative until real screenshots arrive. */
function BrowserPreview({ project }: { project: Project }) {
  const [a, b] = project.colors;
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[3rem] opacity-40 blur-3xl" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${b}, transparent)` }} />
      <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0d120d] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
        {/* chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="flex gap-1.5">
            <i className="size-2.5 rounded-full bg-white/25" />
            <i className="size-2.5 rounded-full bg-white/25" />
            <i className="size-2.5 rounded-full bg-white/25" />
          </span>
          <span className="mx-auto flex w-full min-w-0 max-w-[16rem] items-center justify-center truncate rounded-full bg-white/[0.07] px-4 py-1 text-[0.68rem] tracking-wide text-white/55">{project.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com</span>
          <span className="w-10" />
        </div>
        {/* page */}
        <div className="relative aspect-[16/11] overflow-hidden" style={{ background: `linear-gradient(150deg, ${a}, ${b})` }}>
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
          <Icon name={project.icon} aria-hidden="true" className="absolute -bottom-6 -right-6 size-56 text-white/[0.09] sm:size-72" strokeWidth={0.8} />
          <div aria-hidden="true" className="relative flex h-full flex-col gap-5 p-5 sm:p-7">
            <div className="flex items-center gap-4">
              <span className="size-6 rounded-lg bg-white/90" />
              <span className="h-1.5 w-12 rounded-full bg-white/50" />
              <span className="h-1.5 w-12 rounded-full bg-white/30" />
              <span className="h-1.5 w-12 rounded-full bg-white/30" />
              <span className="ml-auto h-6 w-20 rounded-full bg-white/90" />
            </div>
            <div className="mt-2 max-w-[70%] space-y-3">
              <span className="block h-3.5 w-full rounded-full bg-white/90" />
              <span className="block h-3.5 w-4/5 rounded-full bg-white/90" />
              <span className="block h-2 w-3/5 rounded-full bg-white/45" />
              <span className="mt-4 block h-7 w-28 rounded-full bg-white/95" />
            </div>
            <div className="mt-auto grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="rounded-xl border border-white/20 bg-white/[0.12] p-3 backdrop-blur-sm">
                  <span className="block size-5 rounded-md bg-white/70" />
                  <span className="mt-3 block h-1.5 w-4/5 rounded-full bg-white/60" />
                  <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-white/35" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Recent work: a stack of project cards on the left (the active one opens to show its summary and
 * link), a browser-window preview on the right that cross-fades as the project changes.
 * On large screens the block pins to the viewport and scrolling steps through the projects one by one
 * (clicking a card scrolls to its step); `head` (the section heading) sits inside the pinned area so stepping
 * starts the moment the section is on screen. Otherwise it is a plain tab set. Cards are real tabs; arrow keys move.
 */
export function ProjectShowcase({ projects, head }: { projects: Project[]; head?: ReactNode }) {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const { active, select, track, inner, trackStyle, innerStyle } = usePinnedSteps(projects.length);
  const p = projects[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = projects.length - 1;
    const next = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div ref={track} style={trackStyle}>
      <div ref={inner} style={innerStyle}>
        {head}
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      {/* project cards */}
      <div role="tablist" aria-label="Recent work" aria-orientation="vertical" className="min-w-0 space-y-3 lg:col-span-5">
        {projects.map((proj, i) => {
          const on = i === active;
          const svc = serviceBySlug(proj.service);
          return (
            <button
              key={proj.slug}
              ref={(el) => void (refs.current[i] = el)}
              role="tab"
              type="button"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onFocus={() => select(i)}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ease-out-expo",
                on ? "border-accent/60 bg-accent-soft shadow-[0_0_44px_-16px_rgb(107_142_61/0.8)]" : "border-line bg-surface/50 hover:border-fg/25 hover:bg-surface",
              )}
            >
              <span className="flex items-center gap-4">
                <span className={cn("numeral text-lg transition-colors duration-500", on ? "text-accent" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block font-display text-lg font-semibold leading-tight transition-colors duration-500", on ? "text-fg" : "text-fg/70 group-hover:text-fg")}>{proj.name}</span>
                  <span className="mt-0.5 block truncate text-[0.8rem] text-muted">{proj.category}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className={cn("size-5 shrink-0 transition-all duration-500", on ? "rotate-0 text-accent" : "-rotate-45 text-muted opacity-60")} />
              </span>
              <span className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <span className="overflow-hidden">
                  <span className="block pl-9 pt-4 text-[0.95rem] text-muted">{proj.summary}</span>
                  <span className="mt-4 flex flex-wrap items-center gap-3 pl-9">
                    <span className="label rounded-full border border-line px-3 py-1.5 text-[0.6rem]">{svc?.name}</span>
                    <Link href={`/work/${proj.slug}`} tabIndex={on ? 0 : -1} className="link-u inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View case study
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* browser preview */}
      <div className="min-w-0 lg:col-span-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.slug}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/work/${p.slug}`} aria-label={`${p.name}: view case study`} className="block transition-transform duration-700 ease-out-expo hover:-translate-y-1">
              <BrowserPreview project={p} />
            </Link>
          </motion.div>
        </AnimatePresence>
        <p className="label mt-5 text-center text-muted">{p.category} · project visual to be added</p>
      </div>
    </div>
      </div>
    </div>
  );
}
