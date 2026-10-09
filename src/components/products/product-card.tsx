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
      <Link href={`/products/${product.slug}`} className="card card-hover group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[1.75rem] p-6 text-fg">
        <div className="flex items-center justify-between gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon name={product.icon} className="size-5" />
          </span>
          <Badge status={product.status} className="text-muted" />
        </div>
        {product.media ? (
          <div className="relative my-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] border border-line bg-[#0d120d]">
              <Image src={(product.media.section ?? product.media.desktop).src} alt={(product.media.section ?? product.media.desktop).alt} fill sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw" className="object-cover object-top transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>
        ) : (
          <ProductArt product={product} className="my-6 aspect-[16/10] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5" />
        )}
        <h3 className="text-2xl">{product.name}</h3>
        <p className="mt-2 text-[0.95rem] text-muted">{product.card}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
          View product
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

/** Responsive grid for all five products. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} delay={(i % 3) * 0.07} />
      ))}
    </div>
  );
}
