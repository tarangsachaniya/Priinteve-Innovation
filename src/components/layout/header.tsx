"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { nav, type NavLink } from "@/content/navigation";
import { site } from "@/content/site";
import { cn, type Tone } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

type Menu = "products" | "services";

const MOBILE_GROUPS: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: nav.products },
  { title: "Services", links: nav.services },
  { title: "Explore", links: [...nav.main, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }] },
];

/**
 * Editorial header: serif wordmark, quiet links, a Contact pill. Products and Services open a mega panel
 * with short descriptions. The bar takes the tone of whatever section is beneath it and tucks away on
 * scroll down. Below `lg` a full-height sheet carries the same links.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [sheet, setSheet] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  // Close menus on navigation ("adjust state when a prop changes").
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenu(null);
    setSheet(false);
  }

  const detect = useCallback(() => {
    const y = window.scrollY;
    setSolid(y > 24);
    setHidden(y > lastY.current && y > 180);
    lastY.current = y;
    const els = document.elementsFromPoint(window.innerWidth / 2, 40);
    for (const el of els) {
      if (barRef.current?.contains(el)) continue;
      const t = el.closest<HTMLElement>("[data-tone]");
      if (t && !t.closest("#mobile-sheet") && !t.closest("#preloader")) {
        setTone((t.dataset.tone as Tone) ?? "light");
        return;
      }
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(detect);
    };
    raf = requestAnimationFrame(detect);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [detect, pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setSheet(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Scroll lock + focus trap while the mobile sheet is open.
  useEffect(() => {
    if (!sheet) return;
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    const panel = sheetRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []);
    window.setTimeout(() => focusables()[0]?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const btn = btnRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
      btn?.focus();
    };
  }, [sheet]);

  const is = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  const link = (active: boolean) => cn("link-u relative py-2 text-[0.98rem] font-medium", active ? "text-fg" : "text-fg/70 hover:text-fg");

  const panelTone = menu ? "light" : tone;
  const items = menu === "products" ? products.map((p) => ({ href: `/products/${p.slug}`, name: p.name, text: p.card, note: p.status === "Live" ? null : p.status })) : services.map((s) => ({ href: `/services/${s.slug}`, name: s.name, text: s.card, note: null }));

  return (
    <>
      <header
        ref={barRef}
        data-tone={menu ? "light" : tone}
        onMouseLeave={() => setMenu(null)}
        className={cn("fixed inset-x-0 top-0 z-[60] text-fg transition-all duration-500 ease-out-expo", hidden && !menu && !sheet && "-translate-y-full", (solid || menu) && "border-b border-line bg-bg/90 backdrop-blur-xl")}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {(["products", "services"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-expanded={menu === k}
                aria-controls="mega"
                onMouseEnter={() => setMenu(k)}
                onClick={() => setMenu((m) => (m === k ? null : k))}
                className={link(is(`/${k}`) || menu === k)}
              >
                {k === "products" ? "Products" : "Services"}
              </button>
            ))}
            {nav.main.map((l) => (
              <Link key={l.href} href={l.href} onMouseEnter={() => setMenu(null)} {...(is(l.href) ? { "aria-current": "page" as const } : {})} className={link(is(l.href))}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={nav.cta.href} className="group hidden items-center gap-2 rounded-full border border-fg/50 px-5 py-2.5 text-[0.92rem] font-semibold transition-colors duration-300 hover:bg-fg hover:text-bg sm:inline-flex">
              {nav.cta.label}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              ref={btnRef}
              type="button"
              aria-expanded={sheet}
              aria-controls="mobile-sheet"
              onClick={() => setSheet(true)}
              className="grid h-11 place-items-center rounded-full border border-fg/50 px-5 text-[0.92rem] font-semibold lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>

        {/* mega panel */}
        <AnimatePresence>
          {menu && (
            <motion.div
              id="mega"
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-tone={panelTone}
              className="hidden border-t border-line bg-bg lg:block"
            >
              <div className="container-x grid grid-cols-[14rem_1fr] gap-12 py-10">
                <div>
                  <p className="label text-muted">{menu === "products" ? "Products" : "Services"}</p>
                  <Link href={menu === "products" ? "/products" : "/services"} className="group mt-4 inline-flex items-center gap-2 font-serif text-3xl leading-tight">
                    {menu === "products" ? "All products" : "All services"}
                    <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <ul className={cn("grid gap-x-10 gap-y-2", menu === "products" ? "grid-cols-2" : "grid-cols-2")}>
                  {items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="group block border-t border-line py-4">
                        <span className="flex items-center justify-between font-serif text-2xl transition-colors group-hover:text-accent">
                          {it.name}
                          {it.note && <span className="label rounded-full border border-current px-2.5 py-1 text-muted">{it.note}</span>}
                        </span>
                        <span className="mt-1 block max-w-md text-[0.95rem] text-muted">{it.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* mobile sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            id="mobile-sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-tone="dark"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-bg text-fg lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col pb-10">
              <div className="flex h-20 items-center justify-between">
                <Logo />
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button type="button" onClick={() => setSheet(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-fg/50">
                    <X className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <nav aria-label="Site" className="mt-6 flex-1 space-y-10">
                {MOBILE_GROUPS.map((g, gi) => (
                  <div key={g.title}>
                    <p className="label mb-3 text-muted">{g.title}</p>
                    <ul>
                      {g.links.map((l, i) => (
                        <motion.li key={l.href} initial={reduce ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + gi * 0.08 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                          <Link href={l.href} className="flex items-baseline justify-between border-b border-line py-3.5 font-serif text-3xl">
                            {l.label}
                            {l.note && <span className="label text-muted">{l.note}</span>}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              <div className="label mt-10 space-y-2 text-muted">
                <a href={site.phoneHref} className="block">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="block">{site.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
