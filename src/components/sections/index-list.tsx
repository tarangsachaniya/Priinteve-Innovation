"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/icon";

export type IndexItem = { label: string; icon: IconName; text: string; href: string; cta: string; tint: string };

/**
 * Editorial index: big serif rows that fade the others on hover while a tinted arch preview follows
 * the cursor (fine pointers only). Each row is a plain link, so touch and keyboard users lose nothing.
 */
export function IndexList({ items }: { items: IndexItem[] }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 26, mass: 0.5 });

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    x.set(e.clientX - r.left + 28);
    y.set(e.clientY - r.top - 110);
  };

  const cur = hover !== null ? items[hover] : null;
  return (
    <ul ref={box} onPointerMove={move} onPointerLeave={() => setHover(null)} className="relative border-t border-line">
      {items.map((it, i) => (
        <li key={it.label}>
          <Link
            href={it.href}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={cn("group grid items-baseline gap-3 border-b border-line py-8 transition-opacity duration-500 md:grid-cols-[5rem_1.2fr_1fr_auto] md:gap-8 md:py-10", hover !== null && hover !== i && "md:opacity-35")}
          >
            <span className="numeral text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] transition-transform duration-500 ease-out-expo group-hover:translate-x-3">{it.label}</span>
            <span className="max-w-md text-lg text-muted">{it.text}</span>
            <span className="label inline-flex items-center gap-2 md:justify-self-end">
              {it.cta}
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}

      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ x, y, ["--tint" as string]: cur?.tint }}
          animate={{ opacity: cur ? 1 : 0, scale: cur ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
          className="tint pointer-events-none absolute left-0 top-0 z-10 hidden h-56 w-40 place-items-center overflow-hidden rounded-t-[999px] rounded-b-2xl text-fg md:grid"
        >
          {cur && <Icon name={cur.icon} className="size-14" strokeWidth={1.1} />}
        </motion.div>
      )}
    </ul>
  );
}
