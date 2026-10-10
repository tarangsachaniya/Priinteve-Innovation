"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getService } from "@/content/services";
import type { ServiceSlug } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

export type Solution = { slug: ServiceSlug; title: string };

/**
 * Card-wise solutions rail.
 * Desktop (≥1024px, motion allowed): the section pins and vertical scrolling slides the rail sideways,
 * one large card at a time, with the card nearest the centre highlighted. Focusing a card scrolls the page
 * to bring it into view, so keyboard users can reach every card.
 * Mobile / reduced motion: a native horizontal rail with scroll-snap, swiped by hand.
 */
export function SolutionsScroller({ items, head }: { items: Solution[]; head?: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const on = () => setPinned(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // horizontal distance the rail has to travel
  useEffect(() => {
    if (!pinned || !rail.current) return;
    const el = rail.current;
    const measure = () => setDist(Math.max(0, el.scrollWidth - document.documentElement.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  // scroll → translate (written straight to the DOM; React only re-renders when the active card changes)
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const cards = () => Array.from(el.children, (c) => c.firstElementChild as HTMLElement | null);
    if (!pinned || !dist) {
      el.style.transform = "";
      for (const c of cards()) c?.removeAttribute("style");
      return;
    }
    let raf = 0;
    const update = () => {
      const t = track.current;
      if (!t) return;
      const p = Math.min(1, Math.max(0, -t.getBoundingClientRect().top / dist));
      el.style.transform = `translate3d(${-p * dist}px,0,0)`;
      const pos = p * (n - 1);
      setActive(Math.round(pos));
      // card emphasis follows the scroll continuously: the nearer the centre, the larger and brighter
      cards().forEach((c, i) => {
        if (!c) return;
        const k = Math.min(1, Math.abs(i - pos));
        const e = k * k * (3 - 2 * k);
        c.style.opacity = (1 - 0.45 * e).toFixed(3);
        c.style.transform = `scale(${(1 - 0.06 * e).toFixed(4)})`;
      });
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, [pinned, dist, n]);

  const reveal = useCallback(
    (i: number) => {
      const t = track.current;
      if (!pinned || !dist || !t) return;
      const top = t.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (i / (n - 1)) * dist, behavior: "smooth" });
    },
    [pinned, dist, n],
  );

  return (
    <div ref={track} style={pinned && dist ? { height: `calc(100svh + ${dist}px)` } : undefined}>
      <div className={cn(pinned && "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16")}>
        {head && <div className="container-x">{head}</div>}
        <div
          ref={rail}
          role="list"
          aria-label="Solutions"
          className={cn("bleed-pad flex gap-4 md:gap-5", pinned ? "w-max will-change-transform" : "no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-px-6 pb-4 md:scroll-px-12")}
        >
          {items.map((it, i) => {
            const s = getService(it.slug);
            const on = pinned ? i === active : true;
            return (
              <div key={it.slug} role="listitem" className="shrink-0 snap-start">
              <Link
                href={`/services/${s.slug}`}
                onFocus={() => reveal(i)}
                className={cn(
                  "card group relative flex h-full w-[min(80vw,18rem)] flex-col overflow-hidden rounded-2xl p-5 transition-[border-color,box-shadow] duration-700 ease-out-expo sm:w-[19rem] lg:w-[20rem]",
                  on ? "border-accent/50 opacity-100 shadow-[0_40px_90px_-40px_rgb(107_142_61/0.55)]" : "border-line",
                )}
              >
                {/* depth: layered rings behind the icon */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-accent/15 transition-transform duration-1000 ease-out-expo group-hover:scale-110" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 size-36 rounded-full border border-accent/20 transition-transform duration-1000 ease-out-expo group-hover:scale-90" />
                <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 blur-3xl" />
                <span className="flex items-start justify-between">
                  <span className="numeral text-3xl text-accent/90">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative grid size-11 place-items-center rounded-xl bg-accent-strong text-on-accent shadow-[0_18px_40px_-14px_rgb(107_142_61/0.9)] transition-transform duration-700 ease-out-expo [transform:perspective(600px)_rotateX(10deg)_rotateY(-14deg)] group-hover:[transform:perspective(600px)_rotateX(0)_rotateY(0)_scale(1.06)]">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                </span>
                <h3 className="mt-6 text-[1.35rem] leading-tight">{it.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.card}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {s.includes.slice(0, 4).map((x) => (
                    <li key={x} className="rounded-full border border-line px-3 py-1 text-[0.75rem] text-muted">
                      {x}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-accent">
                  Explore {it.title}
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </Link>
              </div>
            );
          })}
        </div>
        {pinned && (
          <div aria-hidden="true" className="container-x mt-8 flex items-center gap-4">
            <span className="numeral text-sm text-muted">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 bg-line">
              <span className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300" style={{ width: `${((active + 1) / n) * 100}%`, height: 2, top: -0.5 }} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
