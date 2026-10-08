import type { Product } from "@/content/types";
import { Icon } from "../ui/icon";

/** Lightweight CSS "product window" used on cards (no WebGL). Illustrative sample UI. */
export function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative grid place-items-center ${className}`}>
      <div className="w-full rounded-2xl border border-white/10 bg-[#131c17] p-3.5 text-[#faf8f2] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="label flex items-center gap-2 text-[0.6rem] text-white/55">
            <span className="grid size-5 place-items-center rounded-full bg-[#6b8e3d] text-white">
              <Icon name={product.icon} className="size-3" />
            </span>
            {product.mock.title}
          </span>
          <span className="flex gap-1">
            <i className="size-1.5 rounded-full bg-white/25" />
            <i className="size-1.5 rounded-full bg-white/25" />
            <i className="size-1.5 rounded-full bg-white/25" />
          </span>
        </div>
        <ul className="space-y-1.5">
          {product.mock.rows.map(([label, state]) => (
            <li key={label} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.07] px-2.5 py-1.5 text-[0.72rem]">
              <span className="truncate">{label}</span>
              <span className="label rounded-full bg-[#6b8e3d] px-2 py-0.5 text-[0.52rem] text-white">{state}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
