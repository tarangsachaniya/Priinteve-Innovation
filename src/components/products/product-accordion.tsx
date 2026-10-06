"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/content/types";
import { PRODUCT_ID, cn } from "@/lib/utils";
import { Badge } from "../ui/primitives";
import { ProductArt } from "./product-art";

/**
 * Five arched panels side by side; the active one opens wide and the rest narrow to slim arches
 * (hover, focus or tap). On small screens every panel is simply stacked open.
 */
export function ProductAccordion({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4 lg:h-[39rem] lg:flex-row lg:gap-3">
      {products.map((p, i) => {
        const on = active === i;
        const id = PRODUCT_ID[p.slug];
        return (
          <div
            key={p.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className="tint relative overflow-hidden rounded-[2rem] text-fg transition-[flex-grow] duration-700 ease-out-expo lg:min-w-0 lg:basis-0 lg:rounded-t-[14rem] lg:[flex-grow:var(--g)]"
            style={{ "--tint": id.tint, "--g": on ? 6 : 1 } as React.CSSProperties}
          >
            {/* collapsed label (desktop) */}
            <button
              type="button"
              aria-expanded={on}
              aria-label={`${p.name}: show details`}
              onClick={() => setActive(i)}
              className={cn("absolute inset-0 hidden transition-opacity duration-500 lg:block", on ? "pointer-events-none opacity-0" : "opacity-100")}
            >
              <span className="numeral absolute left-1/2 top-24 -translate-x-1/2 text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif text-3xl [text-orientation:mixed] [writing-mode:vertical-rl]" style={{ transform: "translateX(-50%) rotate(180deg)" }}>
                {p.name}
              </span>
            </button>

            <div className={cn("flex h-full flex-col p-7 transition-opacity duration-500 sm:p-9 lg:min-w-[38rem] lg:pt-24", on ? "lg:opacity-100 lg:delay-300" : "lg:pointer-events-none lg:opacity-0")}>
              <div className="flex items-start justify-between gap-4">
                <span className="numeral text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <Badge status={p.status} />
              </div>
              <h3 className="mt-6 text-[clamp(2.6rem,4.6vw,4.4rem)]">{p.name}</h3>
              <p className="label mt-3 text-fg/60">{p.builtFor}</p>
              <p className="mt-5 max-w-md text-lg text-fg/80">{p.card}</p>
              <ProductArt product={p} className="my-6 hidden h-44 shrink-0 sm:grid" />
              <Link href={`/products/${p.slug}`} className="group mt-auto inline-flex w-fit items-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 font-semibold text-bg" tabIndex={on ? 0 : -1}>
                Learn more
                <span className="grid size-9 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
