"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

export type EcoNode = { key: string; label: string; href: string; icon: IconName; text: string };

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * ONE TEAM. MANY DIGITAL SYSTEMS, drawn as a flat 2D system map.
 * Products on the left, client solutions on the right, every node wired to a central Priinteve node with
 * thin right-angle lines. Lines draw in when the map scrolls into view and the nodes switch on one after
 * another (a small green indicator). Hovering or focusing a node lights its route and tells its story in
 * the Priinteve node; a pulse travels the active line. Nothing is 3D.
 * Below lg (and as the non-visual fallback) the same links are listed as a vertical flow:
 * products → Priinteve → what we build.
 */
export function Ecosystem({ products, solutions }: { products: EcoNode[]; solutions: EcoNode[] }) {
  const board = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const nodes = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [paths, setPaths] = useState<{ key: string; d: string }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hot, setHot] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const all = [...products, ...solutions];
  const current = all.find((n) => n.key === hot);
  const order = new Map(all.map((n, i) => [n.key, i]));

  const measure = useCallback(() => {
    const b = board.current, h = hub.current;
    if (!b || !h || !b.offsetParent) return;
    const br = b.getBoundingClientRect();
    const hr = h.getBoundingClientRect();
    const hy = hr.top - br.top + hr.height / 2;
    const out: { key: string; d: string }[] = [];
    nodes.current.forEach((el, key) => {
      const nr = el.getBoundingClientRect();
      const left = nr.left + nr.width / 2 < hr.left;
      const x1 = left ? nr.right - br.left : nr.left - br.left;
      const y1 = nr.top - br.top + nr.height / 2;
      const x2 = left ? hr.left - br.left : hr.right - br.left;
      const xs = left ? x2 - (x2 - x1) * 0.45 : x2 + (x1 - x2) * 0.45; // shared "bus" next to the hub
      out.push({ key, d: `M${x1.toFixed(1)},${y1.toFixed(1)} H${xs.toFixed(1)} V${hy.toFixed(1)} H${x2.toFixed(1)}` });
    });
    setSize({ w: br.width, h: br.height });
    setPaths(out);
  }, []);

  useIsoLayout(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (board.current) ro.observe(board.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setDrawn(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const node = (n: EcoNode, side: "left" | "right") => {
    const on = hot === n.key;
    const i = order.get(n.key) ?? 0;
    return (
      <li key={n.key}>
        <Link
          ref={(el) => void (el ? nodes.current.set(n.key, el) : nodes.current.delete(n.key))}
          href={n.href}
          onPointerEnter={() => setHot(n.key)}
          onPointerLeave={() => setHot(null)}
          onFocus={() => setHot(n.key)}
          onBlur={() => setHot(null)}
          className={cn(
            "group flex min-h-12 items-center gap-3 rounded-lg border bg-surface px-4 py-2.5 text-[0.92rem] font-semibold transition-[border-color,background-color,color] duration-500",
            side === "right" && "flex-row-reverse text-right",
            on ? "border-accent bg-accent-soft text-fg" : "border-line text-fg/80 hover:border-fg/30 hover:text-fg",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("size-2 shrink-0 rounded-full transition-[background-color,box-shadow] duration-700", drawn || on ? "bg-accent" : "bg-line", on && "shadow-[0_0_0_4px_rgb(157_189_106/0.2)]")}
            style={{ transitionDelay: on ? "0ms" : drawn ? `${900 + i * 90}ms` : "0ms" }}
          />
          <Icon name={n.icon} className={cn("size-4 shrink-0 transition-colors duration-500", on ? "text-accent" : "text-muted")} />
          <span className="min-w-0 truncate">{n.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* desktop map */}
      <div className="relative hidden lg:block">
        <div ref={board} className="relative grid grid-cols-[minmax(0,15rem)_1fr_minmax(0,15rem)] items-center gap-x-10 py-6 xl:grid-cols-[minmax(0,17rem)_1fr_minmax(0,17rem)]">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}>
            {paths.map((p, i) => (
              <path
                key={p.key}
                d={p.d}
                pathLength={1}
                fill="none"
                strokeWidth={1}
                className="stroke-[var(--line)]"
                style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: `stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1) ${(order.get(p.key) ?? i) * 70}ms` }}
              />
            ))}
            {paths.map((p) =>
              p.key === hot ? (
                <g key={`on-${p.key}`}>
                  <path d={p.d} fill="none" strokeWidth={1.5} className="stroke-[var(--accent)]" />
                  <circle r={3.5} className="eco-pulse fill-[var(--accent)]">
                    <animateMotion dur="1.6s" repeatCount="indefinite" path={p.d} />
                  </circle>
                </g>
              ) : null,
            )}
          </svg>

          <div className="relative">
            <p className="label mb-5 text-muted">Our products</p>
            <ul className="space-y-3">{products.map((n) => node(n, "left"))}</ul>
          </div>

          <div ref={hub} className="relative z-10 mx-auto w-full max-w-[17rem] rounded-xl border border-accent/60 bg-surface p-6 text-center" aria-live="polite">
            <span aria-hidden="true" className="absolute left-3 top-3 size-1.5 rounded-full bg-accent" />
            <span aria-hidden="true" className="absolute right-3 top-3 size-1.5 rounded-full bg-accent" />
            <div className="grid min-h-[8.5rem] place-items-center">
              {current ? (
                <div key={current.key}>
                  <span className="mx-auto grid size-10 place-items-center rounded-lg bg-accent-strong text-on-accent">
                    <Icon name={current.icon} className="size-5" />
                  </span>
                  <p className="mt-3 font-display text-base font-semibold leading-tight">{current.label}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-snug text-muted">{current.text}</p>
                </div>
              ) : (
                <div>
                  <Image src="/logo-mark.png" alt="" width={547} height={373} className="mx-auto h-9 w-auto" />
                  <p className="mt-3 font-display text-lg font-semibold">Priinteve</p>
                  <p className="mt-1 text-[0.78rem] leading-snug text-muted">One team, one stack, one way of working</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <p className="label mb-5 text-right text-muted">What we build for clients</p>
            <ul className="space-y-3">{solutions.map((n) => node(n, "right"))}</ul>
          </div>
        </div>
      </div>

      {/* below lg: vertical flow, products → Priinteve → what we build */}
      <div className="mx-auto max-w-xl lg:hidden">
        {[
          { title: "Our products", items: products },
          { title: "What we build for clients", items: solutions },
        ].map((g, gi) => (
          <div key={g.title}>
            {gi === 1 && (
              <div className="relative my-1 flex flex-col items-center">
                <span aria-hidden="true" className="h-8 w-px bg-accent/60" />
                <div className="flex items-center gap-3 rounded-lg border border-accent/60 bg-surface px-5 py-3">
                  <Image src="/logo-mark.png" alt="" width={547} height={373} className="h-6 w-auto" />
                  <span className="font-display text-lg font-semibold">Priinteve</span>
                </div>
                <span aria-hidden="true" className="h-8 w-px bg-accent/60" />
              </div>
            )}
            <p className="label mb-4 text-muted">{g.title}</p>
            <ul className="relative space-y-2.5 border-l border-accent/40 pl-5">
              {g.items.map((n) => (
                <li key={n.key} className="relative">
                  <span aria-hidden="true" className="absolute -left-5 top-1/2 h-px w-4 bg-accent/40" />
                  <Link href={n.href} className="flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface p-3 text-[0.95rem] font-semibold transition-colors hover:border-accent">
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
                    <Icon name={n.icon} className="size-4 shrink-0 text-muted" />
                    <span className="min-w-0">
                      {n.label}
                      <span className="block text-[0.8rem] font-normal text-muted">{n.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
