import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/content/types";
import { PRODUCT_ID, cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Badge } from "../ui/primitives";
import { ProductArt } from "./product-art";

/** Tinted product tile with an arched crown. Used on grids and in "related" blocks. */
export function ProductCard({ product, className, delay = 0 }: { product: Product; className?: string; delay?: number }) {
  const id = PRODUCT_ID[product.slug];
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="tint group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-t-[999px] rounded-b-[2rem] p-7 pt-20 text-fg"
        style={{ "--tint": id.tint } as React.CSSProperties}
      >
        <ProductArt product={product} className="h-44 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2" />
        <div className="mt-6 flex items-center justify-between gap-3">
          <h3 className="text-4xl">{product.name}</h3>
          <Badge status={product.status} />
        </div>
        <p className="mt-3 text-[0.98rem] text-fg/75">{product.card}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
          Learn more
          <span className="grid size-8 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/** Responsive grid for all five products. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} delay={(i % 3) * 0.07} />
      ))}
    </div>
  );
}
