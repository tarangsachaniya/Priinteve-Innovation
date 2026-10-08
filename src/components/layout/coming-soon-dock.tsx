"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** A small pill pinned to the corner pointing at the one product that isn't live yet. */
export function ComingSoonDock() {
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);
  const [past, setPast] = useState(false);
  // appears once the hero is behind you, so it never covers the hero actions
  useEffect(() => {
    const on = () => setPast(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!past || closed || pathname.startsWith("/products/priinteve-printing")) return null;
  return (
    <aside
      aria-label="Coming soon"
      data-tone="dark"
      className="fixed bottom-5 right-5 z-40 hidden items-center gap-4 rounded-full bg-bg py-2 pl-6 pr-2 text-fg shadow-[0_18px_50px_-18px_rgb(107_142_61/0.55)] lg:flex"
    >
      <span>
        <span className="label block text-muted">Coming soon</span>
        <span className="font-display text-lg leading-tight">Priinteve Printing</span>
      </span>
      <Link href="/products/priinteve-printing#waitlist" className="group flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent">
        Join the waitlist
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      <button type="button" aria-label="Dismiss" onClick={() => setClosed(true)} className="grid size-8 place-items-center rounded-full text-muted hover:bg-fg/10 hover:text-fg">
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
