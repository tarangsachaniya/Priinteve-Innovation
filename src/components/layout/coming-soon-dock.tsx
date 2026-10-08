"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KEY = "priinteve-dock-dismissed";
const WAITLIST = "/products/priinteve-printing#waitlist";

/**
 * Floating notice for the one product that isn't live yet: Priinteve Printing. It appears once the hero is
 * behind you, stays dismissed for the rest of the visit, and is never shown on the pages of live products
 * (their CTA is their own website) or on Priinteve Printing's own page.
 */
export function ComingSoonDock() {
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const on = () => {
      let dismissed = false;
      try {
        dismissed = sessionStorage.getItem(KEY) === "1";
      } catch {
        /* storage blocked: the dock can still be closed for this page view */
      }
      setPast(window.scrollY > 700 && !dismissed);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const dismiss = () => {
    setClosed(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!past || closed || pathname.startsWith("/products/") || pathname === "/contact") return null;
  return (
    <aside
      aria-label="Priinteve Printing: coming soon"
      data-tone="dark"
      className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl border border-line bg-bg/95 py-2 pl-4 pr-2 text-fg shadow-[0_18px_50px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:right-5 sm:gap-4 sm:rounded-full sm:pl-6"
    >
      <span className="min-w-0 flex-1 sm:flex-none">
        <span className="label block text-[0.6rem] text-muted">Coming soon</span>
        <span className="block truncate font-display text-[0.92rem] font-semibold leading-tight sm:text-lg">Priinteve Printing</span>
      </span>
      <Link href={WAITLIST} className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3.5 py-2.5 text-sm sm:px-4 font-semibold text-on-accent transition-shadow hover:shadow-[0_0_30px_-6px_rgb(157_189_106/0.9)]">
        <span className="sm:hidden">Join waitlist</span>
        <span className="hidden sm:inline">Join the waitlist</span>
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
      <button type="button" aria-label="Dismiss" onClick={dismiss} className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg">
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
