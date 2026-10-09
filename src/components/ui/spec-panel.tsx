import type { ReactNode } from "react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

export type SpecRow = { title: string; line?: string; icon?: ReactNode };

const TICKS = ["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"];

/**
 * Flat "spec sheet" visual: a ruled panel with registration ticks in the corners, a header, and up to
 * four numbered rows that light up one after another (pure CSS, see .spec-row). It replaces the old WebGL
 * objects: no canvas, no 3D, nothing to load. With reduced motion the rows simply stay at rest.
 */
export function SpecPanel({ kicker, title, sub, icon, rows, status, className }: { kicker: string; title: string; sub?: string; icon: IconName; rows: SpecRow[]; status?: string; className?: string }) {
  const list = rows.slice(0, 4);
  return (
    <div className={cn("card relative isolate flex w-full flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-8", className)}>
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      {TICKS.map((c) => (
        <span key={c} aria-hidden="true" className={cn("pointer-events-none absolute size-3 border-accent/70", c)} />
      ))}

      <div className="flex items-center justify-between gap-4">
        <span className="label flex items-center gap-2 text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {kicker}
        </span>
        {status && <span className="label shrink-0 rounded-full border border-line px-3 py-1 text-[0.62rem] text-muted">{status}</span>}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-xl bg-accent-strong text-on-accent">
          <Icon name={icon} className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</p>
          {sub && <p className="mt-1 text-[0.9rem] text-muted">{sub}</p>}
        </div>
      </div>

      <ol className="mt-8 border-t border-line">
        {list.map((r, i) => (
          <li key={r.title} className="spec-row relative flex min-h-14 items-center gap-4 border-b border-line px-1 py-3" style={{ animationDelay: `${i * 2.4}s` }}>
            <span className="numeral w-6 shrink-0 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            {r.icon && <span className="shrink-0 text-muted">{r.icon}</span>}
            <span className="min-w-0 flex-1 text-[0.95rem] font-semibold leading-snug">
              {r.title}
              {r.line && <span className="block text-[0.78rem] font-normal text-muted">{r.line}</span>}
            </span>
            <span aria-hidden="true" className="spec-dot size-2 shrink-0 rounded-full bg-line" style={{ animationDelay: `${i * 2.4}s` }} />
          </li>
        ))}
      </ol>
    </div>
  );
}
