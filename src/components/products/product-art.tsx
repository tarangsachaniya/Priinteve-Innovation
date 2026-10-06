import type { Product } from "@/content/types";
import { Icon } from "../ui/icon";

/** Lightweight CSS "product window" used on cards and panels (no WebGL). Illustrative sample UI. */
export function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative grid place-items-center ${className}`}>
      <div data-tone="dark" className="w-[88%] rounded-2xl bg-bg p-4 text-fg shadow-[0_30px_60px_-30px_rgb(29_26_23/0.7)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="label flex items-center gap-2 text-muted">
            <span className="grid size-6 place-items-center rounded-full bg-accent text-on-accent">
              <Icon name={product.icon} className="size-3.5" />
            </span>
            {product.mock.title}
          </span>
          <span className="flex gap-1">
            <i className="size-1.5 rounded-full bg-fg/30" />
            <i className="size-1.5 rounded-full bg-fg/30" />
            <i className="size-1.5 rounded-full bg-fg/30" />
          </span>
        </div>
        <ul className="space-y-1.5">
          {product.mock.rows.map(([label, state]) => (
            <li key={label} className="flex items-center justify-between gap-3 rounded-xl bg-fg/[0.07] px-3 py-2 text-[0.8rem]">
              <span className="truncate">{label}</span>
              <span className="label rounded-full bg-accent px-2 py-0.5 text-[0.55rem] text-on-accent">{state}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
