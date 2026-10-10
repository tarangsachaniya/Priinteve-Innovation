import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/primitives";
import { ProductArt } from "./product-art";

/** Dark product card: interface preview on top, name and status below. Used on grids and in "related" blocks. */
export function ProductCard({ product, className, delay = 0 }: { product: Product; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <Link href={`/products/${product.slug}`} className="card card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-4 text-fg">
        <div className="flex items-center justify-between gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon name={product.icon} className="size-4" />
          </span>
          <Badge status={product.status} className="text-muted" />
        </div>
        {product.media ? (
          <div className="relative my-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-[#0d120d]">
              <Image src={(product.media.section ?? product.media.desktop).src} alt={(product.media.section ?? product.media.desktop).alt} fill sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw" className="object-cover object-top transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>
        ) : (
          <ProductArt product={product} className="my-4 aspect-[16/10] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5" />
        )}
        <h3 className="text-xl">{product.name}</h3>
        <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{product.card}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
          View product
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * Responsive grid for all five products. On lg it runs on six columns with every card two wide, so the
 * last two cards sit centred under the first three instead of leaving an empty slot at the end.
 */
export function ProductGrid({ products }: { products: Product[] }) {
  const orphans = products.length % 3;
  return (
    <div className="mx-auto grid max-w-[68rem] gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {products.map((p, i) => {
        const fromEnd = products.length - 1 - i;
        // a last row of two is centred (cards start at columns 2 and 4); a last row of one at column 3
        const start = orphans === 2 && fromEnd === 1 ? "lg:col-start-2" : orphans === 2 && fromEnd === 0 ? "lg:col-start-4" : orphans === 1 && fromEnd === 0 ? "lg:col-start-3" : "";
        return <ProductCard key={p.slug} product={p} delay={(i % 3) * 0.07} className={cn("lg:col-span-2", start)} />;
      })}
    </div>
  );
}
