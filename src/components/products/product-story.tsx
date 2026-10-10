"use client";

import { Check } from "lucide-react";
import type { Product } from "@/content/types";
import { useRef } from "react";
import { useScrollSteps } from "@/lib/use-scroll-steps";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Badge, Button, TextLink } from "../ui/primitives";
import { DeviceDuo } from "../ui/media";
import { ProductMockup } from "./product-mockups";
import { hostOf } from "./product-visual";

const STEP_VH = 80; // scroll distance per product (a beat to read, then the change)

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Primary CTA rule: live products go to their own website; only Priinteve Printing uses the waitlist. */
function Ctas({ p, tabbable = true, className }: { p: Product; tabbable?: boolean; className?: string }) {
  const t = tabbable ? 0 : -1;
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {p.liveUrl ? (
        <Button href={p.liveUrl} arrow="up-right" tabIndex={t}>
          Visit {p.name}
        </Button>
      ) : (
        <Button href={`/products/${p.slug}#waitlist`} tabIndex={t}>
          Join the waitlist
        </Button>
      )}
      <Button href={`/products/${p.slug}`} variant="ghost" tabIndex={t}>
        Product details
      </Button>
    </div>
  );
}

/** The product's visual: real website screens for live products; an illustrated stage for the one that isn't live. */
function Visual({ p, priority }: { p: Product; priority?: boolean }) {
  if (p.media) return <DeviceDuo desktop={p.media.desktop} mobile={p.media.mobile} url={hostOf(p.liveUrl)} priority={priority} />;
  return (
    <div className="relative pb-10 pr-6 sm:pb-14 sm:pr-10">
      <div data-tone="dark" className="relative grid aspect-[16/10.6] place-items-center overflow-hidden rounded-[1.25rem] border border-line bg-[radial-gradient(80%_70%_at_50%_40%,#1f3a14,#0d120d_75%)] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.6)]">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <ProductMockup product={p} className="relative z-10 w-[min(78%,26rem)]" />
        <span className="label absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/60" />
          Coming soon
        </span>
      </div>
    </div>
  );
}

const RAIL_ROW = "3.75rem"; // one rail entry; the connector runs from the first dot's centre to the last's
const COLS = "grid-cols-[11rem_minmax(0,0.85fr)_minmax(0,1.3fr)] gap-10 xl:gap-16";

/**
 * OUR PRODUCTS, explored by scrolling.
 * Desktop (motion allowed): the stage pins and scroll moves through the five products. The header shares
 * the body's column grid, so the counter sits directly above the numbered rail it describes. Changes are
 * a short, crisp hand-over: the outgoing product fades and lifts away in the first half of the change,
 * the incoming one settles in during the second half, so two products never ghost over each other.
 * Mobile and reduced motion: a plain vertical sequence, one product after another.
 */
export function ProductStory({ products, eyebrow, title }: { products: Product[]; eyebrow: string; title: string }) {
  const n = products.length;
  const copy = useRef<(HTMLDivElement | null)[]>([]);
  const art = useRef<(HTMLDivElement | null)[]>([]);

  // d = this product's offset from the scroll position: out over d 0..-0.5, in over d 0.6..0
  const frame = (pos: number) => {
    for (let i = 0; i < n; i++) {
      const d = i - pos;
      const t = d <= 0 ? Math.min(1, -d / 0.5) : Math.min(1, d / 0.6);
      const o = 1 - t;
      const eo = o * o * (3 - 2 * o);
      const dir = d <= 0 ? -1 : 1;
      for (const [el, shift, scale] of [[copy.current[i], 1.25, 0], [art.current[i], 1.75, 0.02]] as const) {
        if (!el) continue;
        el.style.opacity = eo.toFixed(3);
        el.style.transform = `translate3d(0,${(dir * t * shift).toFixed(3)}rem,0) scale(${(1 - scale * t).toFixed(4)})`;
        el.style.visibility = eo <= 0.001 ? "hidden" : "visible";
      }
    }
  };
  const { track, active, go } = useScrollSteps(n, frame);
  const state = (i: number) => (i === active ? "active" : i < active ? "before" : "after");

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? Math.min(n - 1, i + 1) : e.key === "ArrowUp" || e.key === "ArrowLeft" ? Math.max(0, i - 1) : null;
    if (next === null) return;
    e.preventDefault();
    go(next);
    (e.currentTarget.parentElement?.parentElement?.children[next]?.querySelector("button") as HTMLButtonElement | null)?.focus();
  };

  return (
    <>
      {/* ---------------- desktop: pinned, scroll-driven ---------------- */}
      <div data-dock-hide ref={track} className="relative hidden lg:motion-safe:block" style={{ height: `calc(100svh + ${(n - 1) * STEP_VH}svh)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-[clamp(1.5rem,4.5vh,3rem)] overflow-hidden pb-8 pt-24">
          {/* header on the body grid: counter over the rail, heading over copy + visual */}
          <div className={cn("container-x grid items-end", COLS)}>
            <p aria-hidden="true" className="numeral text-muted">
              <span className="label mb-3 block text-[0.62rem]">Product</span>
              <span className="text-[2.75rem] text-fg">{num(active)}</span>
              <span className="text-lg"> / {num(n - 1)}</span>
            </p>
            <div className="col-span-2">
              <p className="label flex items-center gap-3 text-muted">
                <span className="text-accent">01</span>
                <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
                {eyebrow}
              </p>
              <h2 className="mt-4 max-w-[24ch] text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.04em]">{title}</h2>
            </div>
          </div>

          <div className={cn("container-x grid min-h-0 items-center", COLS)}>
            {/* rail */}
            <div role="tablist" aria-label="Priinteve products" aria-orientation="vertical" className="relative" style={{ "--row": RAIL_ROW } as React.CSSProperties}>
              <span aria-hidden="true" className="absolute bottom-[calc(var(--row)/2)] left-[calc(0.575rem-0.5px)] top-[calc(var(--row)/2)] w-px bg-line">
                <span className="absolute inset-0 origin-top bg-accent" style={{ transform: "scaleY(var(--progress, 0))" }} />
              </span>
              <ol>
                {products.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.slug} className="h-[var(--row)]">
                      <button
                        type="button"
                        role="tab"
                        id={`ps-tab-${p.slug}`}
                        aria-selected={on}
                        aria-controls={`ps-panel-${p.slug}`}
                        tabIndex={on ? 0 : -1}
                        onClick={() => go(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        className="group grid h-full w-full grid-cols-[1.15rem_1fr] items-center gap-4 text-left"
                      >
                        <span aria-hidden="true" className={cn("relative z-10 size-[1.15rem] rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-[var(--dur)]", on ? "border-accent bg-accent shadow-[0_0_0_5px_rgb(107_142_61/0.18)]" : i < active ? "border-accent bg-bg" : "border-line bg-bg group-hover:border-fg/40")} />
                        <span className="min-w-0 leading-tight">
                          <span className={cn("numeral block text-xs transition-colors duration-[var(--dur)]", on ? "text-accent" : "text-muted")}>{num(i)}</span>
                          <span className={cn("mt-1 block truncate font-display text-[1.02rem] font-semibold transition-colors duration-[var(--dur)]", on ? "text-fg" : "text-fg/50 group-hover:text-fg/80")}>{p.name}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* copy: every product stacked in one cell, so the column height never changes */}
            <div className="relative grid">
              {products.map((p, i) => (
                <div key={p.slug} ref={(el) => void (copy.current[i] = el)} id={`ps-panel-${p.slug}`} role="tabpanel" aria-labelledby={`ps-tab-${p.slug}`} aria-hidden={i !== active} data-state={state(i)} style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }} className={cn("story-step relative self-center will-change-[transform,opacity] [grid-area:1/1]", i !== active && "pointer-events-none")}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label text-accent">{p.category}</span>
                    {p.status !== "Live" && <Badge status={p.status} className="text-muted" />}
                  </div>
                  <h3 className="mt-4 text-[clamp(2.4rem,4vw,3.75rem)] leading-[1]">{p.name}</h3>
                  <p className="mt-5 max-w-md text-lg text-muted">{p.card}</p>
                  <ul className="short-hide mt-6 space-y-2.5">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex gap-3 text-[0.95rem]">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                        </span>
                        {f.title}
                      </li>
                    ))}
                  </ul>
                  <Ctas p={p} tabbable={i === active} className="mt-8" />
                </div>
              ))}
            </div>

            {/* visual */}
            <div className="relative grid">
              {products.map((p, i) => (
                <div key={p.slug} ref={(el) => void (art.current[i] = el)} aria-hidden={i !== active} data-state={state(i)} style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }} className={cn("story-step mx-auto w-full max-w-[min(100%,calc((100svh-19rem)*1.5))] self-center will-change-[transform,opacity] [grid-area:1/1]", i !== active && "pointer-events-none")}>
                  <Visual p={p} priority={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- mobile / reduced motion: vertical sequence ---------------- */}
      <div className="lg:motion-safe:hidden">
        <Reveal>
          <p className="label flex items-center gap-3 text-muted">
            <span className="text-accent">01</span>
            <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,6vw,3rem)]">{title}</h2>
        </Reveal>
        <ol className="mt-12 space-y-16 md:space-y-24">
          {products.map((p, i) => (
            <li key={p.slug} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
              <div>
                <p className="flex items-baseline gap-4">
                  <span className="numeral text-5xl text-accent">{num(i)}</span>
                  <span className="label text-muted">{p.category}</span>
                </p>
                <h3 className="mt-4 text-[clamp(2rem,7vw,3rem)] leading-none">{p.name}</h3>
                <p className="mt-4 text-lg text-muted">{p.card}</p>
                {p.status !== "Live" && <Badge status={p.status} className="mt-4 text-muted" />}
                <Ctas p={p} className="mt-7" />
              </div>
              <Reveal variant="mask">
                <Visual p={p} />
              </Reveal>
            </li>
          ))}
        </ol>
        <TextLink href="/products" className="mt-14">
          Compare all products
        </TextLink>
      </div>
    </>
  );
}
