"use client";

import { Check } from "lucide-react";
import { useRef, type ReactNode } from "react";
import type { Product } from "@/content/types";
import { usePinnedSteps } from "@/lib/use-pinned-steps";
import { cn } from "@/lib/utils";
import { Product3D } from "../three/scenes";
import { Badge, Button } from "../ui/primitives";
import { PRODUCT_VARIANT } from "./product-visual";
import { ProductMockup } from "./product-mockups";

/**
 * Product showcase: a vertical selector on the left, a large presentation panel on the right.
 * The panel shows the product's own interface mockup over its 3D object.
 * On large screens the block pins to the viewport and scrolling steps through the products one by one
 * (clicking a product scrolls to its step). `head` (the section heading) sits inside the pinned area, so
 * stepping starts the moment the section is on screen. On small screens, or with reduced motion, it is a plain
 * tab set with a horizontal selector strip. Keyboard: arrow keys move between tabs.
 */
export function ProductShowcase({ products, head }: { products: Product[]; head?: ReactNode }) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { active, select, track, inner, trackStyle, innerStyle } = usePinnedSteps(products.length);
  const p = products[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = products.length - 1;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div ref={track} style={trackStyle}>
      <div ref={inner} style={innerStyle}>
        {head}
    <div className="grid gap-5 lg:grid-cols-[19rem_1fr] lg:gap-6">
      {/* selector */}
      <div role="tablist" aria-label="Priinteve products" aria-orientation="vertical" className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
        {products.map((prod, i) => {
          const on = i === active;
          return (
            <button
              key={prod.slug}
              ref={(el) => void (tabs.current[i] = el)}
              role="tab"
              id={`product-tab-${prod.slug}`}
              aria-selected={on}
              aria-controls={`product-panel-${prod.slug}`}
              tabIndex={on ? 0 : -1}
              type="button"
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-500 ease-out-expo lg:w-full",
                on ? "border-accent/60 bg-accent-soft shadow-[0_0_44px_-14px_rgb(107_142_61/0.75)]" : "border-line bg-surface/60 hover:border-white/25 hover:bg-surface",
              )}
            >
              <span aria-hidden="true" className={cn("absolute inset-y-3 left-0 hidden w-[3px] rounded-full bg-accent transition-all duration-500 lg:block", on ? "opacity-100" : "scale-y-0 opacity-0")} />
              <span className={cn("numeral text-lg transition-colors", on ? "text-accent" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className={cn("block whitespace-nowrap font-display text-lg font-semibold leading-tight transition-colors", on ? "text-fg" : "text-fg/70 group-hover:text-fg")}>{prod.name}</span>
                <span className="mt-0.5 hidden truncate text-[0.8rem] text-muted lg:block">{prod.builtFor}</span>
              </span>
              {prod.status !== "Live" && <span className="label ml-auto hidden rounded-full border border-line px-2.5 py-1 text-[0.58rem] text-muted lg:inline-flex">Soon</span>}
            </button>
          );
        })}
      </div>

      {/* presentation panel: every product is stacked in one grid cell, so the panel is always as tall as the
          tallest product (no height jump while stepping); only the active one is visible */}
      <div className="card relative grid overflow-hidden rounded-[2rem]">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-accent-strong/25 blur-[100px]" />
        {products.map((prod, i) => {
          const on = i === active;
          return (
            <div
              key={prod.slug}
              id={`product-panel-${prod.slug}`}
              role="tabpanel"
              aria-labelledby={`product-tab-${prod.slug}`}
              aria-hidden={!on}
              className={cn(
                "relative grid gap-8 p-6 transition-all duration-500 ease-out-expo [grid-area:1/1] motion-reduce:transition-none sm:p-8 lg:min-h-[34rem] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6 lg:p-10",
                on ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0",
              )}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="label text-accent">{prod.builtFor}</span>
                  <Badge status={prod.status} className="text-muted" />
                </div>
                <h3 className="mt-5 text-[clamp(2rem,3.6vw,3rem)]">{prod.name}</h3>
                <p className="mt-4 max-w-md text-base text-muted sm:text-lg">{prod.card}</p>
                <ul className="mt-6 space-y-2.5">
                  {prod.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem]">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                      </span>
                      {f.replace(/\.$/, "")}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/products/${prod.slug}`} arrow="up-right" tabIndex={on ? 0 : -1}>
                    Learn more
                  </Button>
                  {prod.heroButton && (
                    <Button href={prod.heroButton.href} variant="ghost" arrow={false} tabIndex={on ? 0 : -1}>
                      {prod.heroButton.label}
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative min-h-[18rem] lg:min-h-[24rem]">
                {on && <Product3D variant={PRODUCT_VARIANT[prod.slug]} className="absolute inset-0 -z-0 scale-125 opacity-60" />}
                <ProductMockup product={prod} className="relative z-10 mt-6 lg:mt-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
      </div>
    </div>
  );
}
