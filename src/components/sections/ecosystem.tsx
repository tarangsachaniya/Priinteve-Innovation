"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

export type EcoNode = { key: string; label: string; href: string; icon: IconName; text: string };

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Wire = { key: string; d: string; x: number; y: number; hx: number; hy: number };

/**
 * OUR PRODUCTS → PRIINTEVE → WHAT WE BUILD.
 * Two columns of equal-width node cards wired into a central hub. Each wire leaves its card edge and lands
 * on the hub's rim at the angle it arrives from, so the connections fan in evenly instead of bunching.
 * Wires draw in once the board is in view; hovering or focusing a card lights its wire, sends a pulse along
 * it and tells that node's story in the hub. Sized to fit one laptop viewport (about 1366 × 768).
 * Below lg the same links are listed in two connected columns.
 */
export function Ecosystem({ products, solutions }: { products: EcoNode[]; solutions: EcoNode[] }) {
  const board = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const nodes = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [wires, setWires] = useState<Wire[]>([]);
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
    const cx = hr.left - br.left + hr.width / 2;
    const cy = hr.top - br.top + hr.height / 2;
    const r = hr.width / 2 + 4;
    const out: Wire[] = [];
    nodes.current.forEach((el, key) => {
      const nr = el.getBoundingClientRect();
      const left = nr.left + nr.width / 2 < hr.left;
      const x1 = (left ? nr.right : nr.left) - br.left;
      const y1 = nr.top - br.top + nr.height / 2;
      // land on the rim, spread over ±55° around the horizontal
      const span = Math.max(-1, Math.min(1, (y1 - cy) / (br.height / 2)));
      const a = span * (55 * Math.PI) / 180;
      const x2 = cx + (left ? -1 : 1) * r * Math.cos(a);
      const y2 = cy + r * Math.sin(a);
      const k = Math.abs(x2 - x1) * 0.55;
      const c1 = x1 + (left ? k : -k);
      const c2 = x2 + (left ? -k * 0.6 : k * 0.6);
      out.push({ key, x: x1, y: y1, hx: x2, hy: y2, d: `M${x1.toFixed(1)},${y1.toFixed(1)} C${c1.toFixed(1)},${y1.toFixed(1)} ${c2.toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}` });
    });
    setSize({ w: br.width, h: br.height });
    setWires(out);
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
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setDrawn(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const node = (n: EcoNode, side: "left" | "right") => {
    const on = hot === n.key;
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
            "flex h-10 w-full items-center gap-3 rounded-xl border bg-surface px-2.5 text-[0.9rem] font-semibold transition-[border-color,box-shadow,color] duration-[var(--dur)]",
            side === "right" && "flex-row-reverse text-right",
            on ? "border-accent text-fg shadow-[0_0_32px_-10px_rgb(157_189_106/0.8)]" : "border-line text-fg/85 hover:text-fg",
          )}
        >
          <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg transition-colors duration-[var(--dur)]", on ? "bg-accent-strong text-on-accent" : "bg-accent-soft text-accent")}>
            <Icon name={n.icon} className="size-[0.95rem]" />
          </span>
          <span className="min-w-0 flex-1 truncate">{n.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* desktop board */}
      <div ref={board} className="relative hidden grid-cols-[minmax(0,15rem)_1fr_minmax(0,15rem)] items-center gap-10 lg:grid xl:grid-cols-[minmax(0,16rem)_1fr_minmax(0,16rem)]">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}>
          {wires.map((w, i) => {
            const on = w.key === hot;
            return (
              <g key={w.key}>
                <path
                  d={w.d}
                  pathLength={1}
                  fill="none"
                  strokeWidth={on ? 1.75 : 1}
                  strokeLinecap="round"
                  style={{
                    stroke: on ? "var(--accent)" : "rgb(157 189 106 / 0.28)",
                    strokeDasharray: 1,
                    strokeDashoffset: drawn ? 0 : 1,
                    transition: `stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1) ${i * 45}ms, stroke 0.45s, stroke-width 0.45s`,
                  }}
                />
                <circle cx={w.x} cy={w.y} r={2.5} style={{ fill: on ? "var(--accent)" : "rgb(157 189 106 / 0.5)", transition: "fill 0.45s" }} />
                <circle cx={w.hx} cy={w.hy} r={2} style={{ fill: on ? "var(--accent)" : "rgb(157 189 106 / 0.35)", transition: "fill 0.45s" }} />
                {on && (
                  <circle r={3.5} className="eco-pulse" style={{ fill: "var(--accent)" }}>
                    <animateMotion dur="1.4s" repeatCount="indefinite" path={w.d} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        <div className="relative">
          <p className="label mb-3 flex items-center justify-between text-muted">
            Our products <span className="numeral text-accent">{String(products.length).padStart(2, "0")}</span>
          </p>
          {/* five products spread over the same height as the nine services */}
          <ul className="flex flex-col justify-between" style={{ height: `calc(${solutions.length} * 2.5rem + ${solutions.length - 1} * 0.375rem)` }}>{products.map((n) => node(n, "left"))}</ul>
        </div>

        <div className="relative grid place-items-center">
          <div ref={hub} className="relative grid size-[14.5rem] place-items-center rounded-full xl:size-[16rem]">
            <span aria-hidden="true" className="eco-ring absolute inset-0 rounded-full border border-dashed border-accent/35" />
            <span aria-hidden="true" className="absolute inset-4 rounded-full border border-line" />
            <span aria-hidden="true" className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgb(107_142_61/0.35),transparent_70%)]" />
            <div className="card relative grid size-[10.5rem] place-items-center rounded-full p-5 text-center xl:size-[11.5rem]" aria-live="polite">
              {current ? (
                <div key={current.key}>
                  <span className="mx-auto grid size-9 place-items-center rounded-full bg-accent-strong text-on-accent">
                    <Icon name={current.icon} className="size-4" />
                  </span>
                  <p className="mt-2.5 font-display text-[0.95rem] font-semibold leading-tight">{current.label}</p>
                  <p className="mt-1 line-clamp-3 text-[0.72rem] leading-snug text-muted">{current.text}</p>
                </div>
              ) : (
                <div>
                  <Image src="/logo-mark.webp" alt="" width={547} height={373} className="mx-auto h-8 w-auto" />
                  <p className="mt-2.5 font-display text-lg font-semibold">Priinteve</p>
                  <p className="mt-1 text-[0.72rem] leading-snug text-muted">One team, one stack</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <p className="label mb-3 flex flex-row-reverse items-center justify-between text-muted">
            What we build <span className="numeral text-accent">{String(solutions.length).padStart(2, "0")}</span>
          </p>
          <ul className="space-y-1.5">{solutions.map((n) => node(n, "right"))}</ul>
        </div>
      </div>

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
                  <Link href={n.href} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-[0.95rem] font-semibold">
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
