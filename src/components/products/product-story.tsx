"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/content/types";
import { useScrollSteps } from "@/lib/use-scroll-steps";
import { cn } from "@/lib/utils";
import { PointerParallax } from "../motion/pointer";
import { Reveal } from "../motion/reveal";
import { Product3D } from "../three/scenes";
import { Badge, Button } from "../ui/primitives";
import { DeviceDuo } from "../ui/media";
import { ProductMockup } from "./product-mockups";
import { PRODUCT_VARIANT, hostOf } from "./product-visual";

const STEP_VH = 75; // scroll distance per product

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

/** The product's visual: real website screens for live products; mockup + 3D for the one that isn't live. */
function Visual({ p, active, priority }: { p: Product; active: boolean; priority?: boolean }) {
  if (p.media) return <DeviceDuo desktop={p.media.desktop} mobile={p.media.mobile} url={hostOf(p.liveUrl)} priority={priority} />;
  return (
    <div className="relative grid aspect-[16/11] place-items-center overflow-hidden rounded-[1.5rem] border border-line bg-surface">
      {active && <Product3D variant={PRODUCT_VARIANT[p.slug]} className="absolute inset-0 opacity-70" />}
      <ProductMockup product={p} className="relative z-10 w-[78%]" />
      <span className="label absolute left-5 top-5 rounded-full border border-line bg-bg/80 px-3 py-1.5 backdrop-blur">Coming soon</span>
    </div>
  );
}

/**
 * OUR PRODUCTS, explored by scrolling.
 * Desktop (motion allowed): the stage pins; scroll moves through the five products. A numbered rail on the
 * left fills with progress and doubles as navigation (click or keyboard). Copy and visuals change with a
 * directional fade / blur / shift, and the visual tilts with the pointer.
 * Mobile and reduced motion: a plain vertical sequence, one product after another.
 */
export function ProductStory({ products, eyebrow, title }: { products: Product[]; eyebrow: string; title: string }) {
  const n = products.length;
  const { track, active, go } = useScrollSteps(n);
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
      <div ref={track} className="relative hidden lg:motion-safe:block" style={{ height: `calc(100svh + ${(n - 1) * STEP_VH}svh)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-8 pt-28">
          <div className="container-x flex items-end justify-between gap-8">
            <div>
              <p className="label flex items-center gap-3 text-muted">
                <span className="text-accent">01</span>
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
                {eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl text-[clamp(1.8rem,3vw,2.6rem)]">{title}</h2>
            </div>
            <p aria-hidden="true" className="numeral shrink-0 text-right text-muted">
              <span className="text-[2.6rem] text-fg">{num(active)}</span>
              <span className="text-xl"> / {num(n - 1)}</span>
              <span className="label mt-2 block text-[0.6rem]">Keep scrolling</span>
            </p>
          </div>

          <div className="container-x grid min-h-0 flex-1 grid-cols-[11.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] items-center gap-10 xl:gap-14">
            {/* rail */}
            <div role="tablist" aria-label="Priinteve products" aria-orientation="vertical" className="relative py-2">
              <span aria-hidden="true" className="absolute bottom-2 left-[0.55rem] top-2 w-px bg-line" />
              <span aria-hidden="true" className="absolute left-[0.55rem] top-2 w-px origin-top bg-accent" style={{ height: "calc(100% - 1rem)", transform: "scaleY(var(--progress, 0))" }} />
              <ol className="space-y-1">
                {products.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.slug}>
                      <button
                        type="button"
                        role="tab"
                        id={`ps-tab-${p.slug}`}
                        aria-selected={on}
                        aria-controls={`ps-panel-${p.slug}`}
                        tabIndex={on ? 0 : -1}
                        onClick={() => go(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        className="group flex w-full items-center gap-4 rounded-xl py-2.5 pr-2 text-left"
                      >
                        <span aria-hidden="true" className={cn("relative z-10 size-[1.15rem] shrink-0 rounded-full border-2 transition-all duration-500", on ? "border-accent bg-accent shadow-[0_0_0_5px_rgb(107_142_61/0.18)]" : i < active ? "border-accent bg-bg" : "border-line bg-bg group-hover:border-fg/40")} />
                        <span className="min-w-0">
                          <span className={cn("numeral block text-xs transition-colors", on ? "text-accent" : "text-muted")}>{num(i)}</span>
                          <span className={cn("block truncate font-display text-[1.02rem] font-semibold transition-colors duration-500", on ? "text-fg" : "text-fg/45 group-hover:text-fg/80")}>{p.name}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* copy */}
            <div className="relative grid">
              {products.map((p, i) => (
                <div key={p.slug} id={`ps-panel-${p.slug}`} role="tabpanel" aria-labelledby={`ps-tab-${p.slug}`} aria-hidden={i !== active} data-state={state(i)} className="story-step relative [grid-area:1/1]">
                  <span aria-hidden="true" className="numeral pointer-events-none absolute -top-4 right-0 select-none text-[8rem] leading-none text-transparent [-webkit-text-stroke:1px_rgb(107_142_61/0.35)]">
                    {num(i)}
                  </span>
                  <div className="relative flex flex-wrap items-center gap-3">
                    <span className="label text-accent">{p.category}</span>
                    {p.status !== "Live" && <Badge status={p.status} className="text-muted" />}
                  </div>
                  <h3 className="relative mt-4 text-[clamp(2.4rem,4.2vw,4rem)] leading-[1]">{p.name}</h3>
                  <p className="relative mt-5 max-w-md text-lg text-muted">{p.card}</p>
                  <ul className="short-hide relative mt-6 space-y-2.5">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex gap-3 text-[0.95rem]">
                        <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                        </span>
                        {f.title}
                      </li>
                    ))}
                  </ul>
                  <Ctas p={p} tabbable={i === active} className="relative mt-8" />
                </div>
              ))}
            </div>

            {/* visual */}
            <PointerParallax className="relative grid [perspective:1400px]">
              {products.map((p, i) => (
                <div key={p.slug} aria-hidden={i !== active} data-state={state(i)} className="story-step story-visual mx-auto w-full max-w-[min(100%,calc((100svh-17rem)*1.45))] [grid-area:1/1]">
                  <div className="transition-transform duration-700 ease-out-expo" style={{ transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))" }}>
                    <Visual p={p} active={i === active} priority={i === 0} />
                  </div>
                </div>
              ))}
            </PointerParallax>
          </div>
        </div>
      </div>

      {/* ---------------- mobile / reduced motion: vertical sequence ---------------- */}
      <div className="lg:motion-safe:hidden">
        <Reveal>
          <p className="label flex items-center gap-3 text-muted">
            <span className="text-accent">01</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,6vw,3rem)]">{title}</h2>
        </Reveal>
        <ol className="mt-12 space-y-16 md:space-y-24">
          {products.map((p, i) => (
            <li key={p.slug} className="grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:items-center md:gap-12">
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
                <Visual p={p} active />
              </Reveal>
            </li>
          ))}
        </ol>
        <Link href="/products" className="group mt-14 inline-flex items-center gap-2 font-semibold text-accent">
          <span className="link-u">Compare all products</span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </>
  );
}
