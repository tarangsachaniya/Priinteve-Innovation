"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { PointerParallax } from "../motion/pointer";
import { Icon } from "../ui/icon";

export type EcoNode = { key: string; label: string; href: string; icon: IconName; text: string };

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * ONE TEAM. MANY DIGITAL SYSTEMS.
 * Products on the left, client solutions on the right, every node wired to a central Priinteve hub.
 * Lines draw in when the board scrolls into view; hovering or focusing a node lights its connection and
 * tells its story in the hub; a pulse travels the active line. The board tilts gently with the pointer.
 * Below lg (and as the non-visual fallback) the same links are listed in two connected columns.
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

  const measure = useCallback(() => {
    const b = board.current, h = hub.current;
    if (!b || !h || !b.offsetParent) return;
    const br = b.getBoundingClientRect();
    const hr = h.getBoundingClientRect();
    const hx = hr.left - br.left + hr.width / 2;
    const hy = hr.top - br.top + hr.height / 2;
    const r = hr.width / 2;
    const out: { key: string; d: string }[] = [];
    nodes.current.forEach((el, key) => {
      const nr = el.getBoundingClientRect();
      const left = nr.left + nr.width / 2 < hr.left;
      const x1 = left ? nr.right - br.left : nr.left - br.left;
      const y1 = nr.top - br.top + nr.height / 2;
      const x2 = left ? hx - r : hx + r;
      const y2 = hy + (y1 - hy) * 0.18;
      const mx = (x1 + x2) / 2;
      out.push({ key, d: `M${x1.toFixed(1)},${y1.toFixed(1)} C${mx.toFixed(1)},${y1.toFixed(1)} ${mx.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}` });
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

  const node = (n: EcoNode, i: number, side: "left" | "right") => (
    <li key={n.key}>
      <Link
        ref={(el) => void (el ? nodes.current.set(n.key, el) : nodes.current.delete(n.key))}
        href={n.href}
        onPointerEnter={() => setHot(n.key)}
        onPointerLeave={() => setHot(null)}
        onFocus={() => setHot(n.key)}
        onBlur={() => setHot(null)}
        className={cn(
          "eco-node group flex items-center gap-3 rounded-full border bg-surface/90 py-2 pl-2 pr-4 text-[0.9rem] font-semibold backdrop-blur transition-[border-color,box-shadow,color] duration-500",
          side === "right" && "flex-row-reverse pl-4 pr-2 text-right",
          hot === n.key ? "border-accent text-fg shadow-[0_0_40px_-10px_rgb(107_142_61/0.9)]" : "border-line text-fg/80 hover:text-fg",
        )}
        style={{ transitionDelay: drawn ? "0ms" : `${i * 40}ms` }}
      >
        <span className={cn("grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-500", hot === n.key ? "bg-accent-strong text-on-accent" : "bg-accent-soft text-accent")}>
          <Icon name={n.icon} className="size-4" />
        </span>
        {n.label}
      </Link>
    </li>
  );

  return (
    <>
      {/* desktop board */}
      <PointerParallax className="relative hidden [perspective:1600px] lg:block">
        <div
          ref={board}
          className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-16 py-6 transition-transform duration-700 ease-out-expo xl:gap-24"
          style={{ transform: "rotateX(calc(var(--py, 0) * -2.5deg)) rotateY(calc(var(--px, 0) * 3deg))" }}
        >
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}>
            {paths.map((p, i) => {
              const on = p.key === hot;
              return (
                <g key={p.key}>
                  <path d={p.d} pathLength={1} fill="none" strokeWidth={on ? 2 : 1} className={cn("transition-[stroke,stroke-width] duration-500", on ? "stroke-[var(--accent)]" : "stroke-[var(--line)]")} style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: `stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1) ${i * 60}ms, stroke 0.5s, stroke-width 0.5s` }} />
                  {on && (
                    <circle r={4} className="eco-pulse fill-[var(--accent)]">
                      <animateMotion dur="1.6s" repeatCount="indefinite" path={p.d} />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="relative">
            <p className="label mb-5 text-muted">Our products</p>
            <ul className="space-y-3">{products.map((n, i) => node(n, i, "left"))}</ul>
          </div>

          <div ref={hub} className="relative grid size-[17rem] place-items-center rounded-full xl:size-[19rem]">
            <span aria-hidden="true" className="eco-ring absolute inset-0 rounded-full border border-dashed border-accent/40" />
            <span aria-hidden="true" className="absolute inset-5 rounded-full border border-line" />
            <span aria-hidden="true" className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgb(107_142_61/0.3),transparent_70%)] blur-xl" />
            <div className="card relative grid size-[11.5rem] place-items-center rounded-full p-6 text-center xl:size-[13rem]" aria-live="polite">
              {current ? (
                <div key={current.key}>
                  <span className="mx-auto grid size-10 place-items-center rounded-full bg-accent-strong text-on-accent">
                    <Icon name={current.icon} className="size-5" />
                  </span>
                  <p className="mt-3 font-display text-base font-semibold leading-tight">{current.label}</p>
                  <p className="mt-1.5 text-[0.75rem] leading-snug text-muted">{current.text}</p>
                </div>
              ) : (
                <div>
                  <Image src="/logo-mark.png" alt="" width={547} height={373} className="mx-auto h-9 w-auto" />
                  <p className="mt-3 font-display text-lg font-semibold">Priinteve</p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-muted">One team, one stack, one way of working</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <p className="label mb-5 text-right text-muted">What we build for clients</p>
            <ul className="space-y-3">{solutions.map((n, i) => node(n, i, "right"))}</ul>
          </div>
        </div>
      </PointerParallax>

      {/* mobile: connected columns */}
      <div className="grid gap-10 sm:grid-cols-2 lg:hidden">
        {[
          { title: "Our products", items: products },
          { title: "What we build for clients", items: solutions },
        ].map((g) => (
          <div key={g.title}>
            <p className="label mb-5 text-muted">{g.title}</p>
            <ul className="relative space-y-3 border-l border-accent/40 pl-5">
              {g.items.map((n) => (
                <li key={n.key} className="relative">
                  <span aria-hidden="true" className="absolute -left-[1.6rem] top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-accent bg-bg" />
                  <Link href={n.href} className="flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3 text-[0.95rem] font-semibold">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Icon name={n.icon} className="size-4" />
                    </span>
                    <span>
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
