"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { PointerEvent } from "react";
import type { Service } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Icon } from "../ui/icon";

/**
 * Interactive service card: a pointer-following violet spotlight, a lift on hover, and an icon set in
 * orbiting rings that tilt and speed up. Pure CSS, so a page full of them costs no WebGL.
 */
export function ServiceCard({ service, index, delay = 0, className }: { service: Service; index: number; delay?: number; className?: string }) {
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <Link
        href={`/services/${service.slug}`}
        onPointerMove={track}
        className="card card-hover group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.75rem] p-6 text-fg sm:p-7"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(18rem circle at var(--mx, 50%) var(--my, 0%), rgb(107 142 61 / 0.22), transparent 65%)" }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="numeral text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="relative grid size-16 place-items-center">
            <i className="absolute inset-0 rounded-full border border-accent/30 transition-transform duration-700 ease-out-expo group-hover:scale-125 group-hover:rotate-45" style={{ borderStyle: "dashed" }} />
            <i className="absolute inset-2 rounded-full border border-accent/20 transition-transform duration-700 ease-out-expo group-hover:scale-90 group-hover:-rotate-45" />
            <span className="relative grid size-10 place-items-center rounded-xl bg-accent-soft text-accent shadow-[0_0_30px_-6px_rgb(107_142_61/0.8)] transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
              <Icon name={service.icon} className="size-5" />
            </span>
          </span>
        </div>
        <h3 className="relative mt-8 text-2xl">{service.name}</h3>
        <p className="relative mt-3 text-[0.95rem] text-muted">{service.card}</p>
        <span className="relative mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
          Learn more
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
