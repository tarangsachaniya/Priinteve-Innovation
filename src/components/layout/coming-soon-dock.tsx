"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/content/products";
import { projects } from "@/content/work";

const KEY = "priinteve-dock-dismissed";
const WAITLIST = "/products/priinteve-printing#waitlist";

type Dock = { key: string; kicker: string; title: string; href: string; cta: string; short: string; external: boolean };

/** What the dock offers on a given page: the live site on project and product pages, otherwise the waitlist. */
function dockFor(pathname: string): Dock | null {
  const [, section, slug] = pathname.split("/");
  if (section === "work" && slug) {
    const p = projects.find((x) => x.slug === slug);
    return p?.liveUrl ? { key: `work-${slug}`, kicker: "Live client project", title: p.name, href: p.liveUrl, cta: `Open ${p.domain ?? "live site"}`, short: "Open site", external: true } : null;
  }
  if (section === "products" && slug) {
    const p = products.find((x) => x.slug === slug);
    return p?.liveUrl && p.status === "Live" ? { key: `product-${slug}`, kicker: "Live product", title: p.name, href: p.liveUrl, cta: `Open ${p.name}`, short: "Open", external: true } : null;
  }
  if (pathname === "/contact") return null;
  return { key: "printing", kicker: "Coming soon", title: "Priinteve Printing", href: WAITLIST, cta: "Join the waitlist", short: "Join waitlist", external: false };
}

/**
 * Floating dock that appears once the hero is behind you. On a client project or live product page it
 * opens that live site; on Priinteve Printing's page it stays out of the way (the page has its own
 * waitlist); everywhere else it invites visitors to the Printing waitlist. Each dock can be dismissed
 * for the rest of the visit without hiding the others.
 */
export function ComingSoonDock() {
  const pathname = usePathname();
  const dock = dockFor(pathname);
  const dockKey = dock?.key ?? "";
  // read lazily: the dock renders nothing until scrolled, so server and first client render still match
  const [closed, setClosed] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return (sessionStorage.getItem(KEY) ?? "").split(",").filter(Boolean);
    } catch {
      return [];
    }
  });
  const [past, setPast] = useState(false);

  useEffect(() => {
    // shown once the hero is behind you, hidden again where the page has its own call to action
    const on = () => {
      const vh = window.innerHeight;
      const stop = Array.from(document.querySelectorAll("[data-dock-stop]")).some((el) => el.getBoundingClientRect().top < vh - 40);
      // and while a pinned, full-screen story is on stage (its visual runs to the bottom-right corner)
      const pinned = Array.from(document.querySelectorAll("[data-dock-hide]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.height > 0 && r.top <= 1 && r.bottom >= vh - 1;
      });
      setPast(window.scrollY > 700 && !stop && !pinned);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  const dismiss = () => {
    const next = [...closed, dockKey];
    setClosed(next);
    try {
      sessionStorage.setItem(KEY, next.join(","));
    } catch {
      /* ignore */
    }
  };

  if (!dock || !past || closed.includes(dock.key)) return null;
  const linkCls = "group flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3.5 py-2.5 text-sm font-semibold text-[#0d120d] transition-shadow hover:shadow-[0_0_30px_-6px_rgb(157_189_106/0.9)] sm:px-4";
  const label = (
    <>
      <span className="sm:hidden">{dock.short}</span>
      <span className="hidden sm:inline">{dock.cta}</span>
      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );
  return (
    <aside
      aria-label={`${dock.title}: ${dock.kicker}`}
      data-tone="dark"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-2xl border border-line bg-bg/95 py-2 pl-4 pr-2 text-fg shadow-[0_18px_50px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:right-5 sm:gap-4 sm:rounded-full sm:pl-6"
    >
      <span className="min-w-0 flex-1 sm:flex-none">
        <span className="label flex items-center gap-1.5 text-[0.6rem] text-muted">
          {dock.external && <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-accent" />}
          {dock.kicker}
        </span>
        <span className="block truncate font-display text-[0.92rem] font-semibold leading-tight sm:text-lg">{dock.title}</span>
      </span>
      {dock.external ? (
        <a href={dock.href} target="_blank" rel="noopener" className={linkCls}>
          {label}
        </a>
      ) : (
        <Link href={dock.href} className={linkCls}>
          {label}
        </Link>
      )}
      <button type="button" aria-label="Dismiss" onClick={dismiss} className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg">
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
