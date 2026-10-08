"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { products } from "@/content/products";
import { nav, type NavLink } from "@/content/navigation";
import { site } from "@/content/site";
import { cn, type Tone } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

type Menu = "products" | "services";

const MOBILE_GROUPS: { title: string; links: NavLink[] }[] = [
  { title: "Products", links: nav.products },
  { title: "Services", links: nav.serviceMenu.map(({ label, href }) => ({ label, href })) },
  { title: "AI & Automation", links: nav.serviceMenu.find((m) => m.children)?.children ?? [] },
  { title: "Explore", links: [...nav.main, { label: "Contact", href: "/contact" }] },
];

/**
 * Product header: wordmark, quiet links, a Contact pill. Products and Services open a mega panel
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
  const barRef = useRef<HTMLDivElement>(null);
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
  const [hover, setHover] = useState<string | null>(null);
  const items: { key: string; label: string; href?: string; menu?: Menu }[] = [
    { key: "products", label: "Products", menu: "products" },
    { key: "services", label: "Services", menu: "services" },
    ...nav.main.map((l) => ({ key: l.href, label: l.label, href: l.href })),
  ];

  const panelTone = menu ? "light" : tone;
  const productItems = products.map((p) => ({ href: `/products/${p.slug}`, name: p.name, text: p.card, note: p.status === "Live" ? null : p.status }));

  return (
    <>
      <header className={cn("pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 pt-3 text-fg transition-transform duration-500 ease-out-expo md:px-6", hidden && !menu && !sheet && "-translate-y-[130%]")}>
        <div ref={barRef} data-tone={menu ? "light" : tone} onMouseLeave={() => { setMenu(null); setHover(null); }} className="pointer-events-auto mx-auto max-w-6xl">
          <div
            className={cn(
              "flex h-[3.75rem] items-center justify-between rounded-full border bg-bg/80 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ease-out-expo",
              solid || menu ? "border-line shadow-[0_18px_50px_-24px_rgb(0_0_0/0.45)]" : "border-line/60 shadow-[0_8px_30px_-22px_rgb(0_0_0/0.3)]",
            )}
          >
            <Logo />

            <nav aria-label="Main" className="relative hidden items-center gap-1 lg:flex" onMouseLeave={() => setHover(null)}>
              {items.map((it) => {
                const active = it.menu ? is(`/${it.menu}`) || menu === it.menu : is(it.href!);
                const cls = cn("relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300", active || hover === it.key ? "text-fg" : "text-muted");
                const inner = (
                  <>
                    {hover === it.key && <motion.span layoutId="nav-hover" aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                    {active && <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-accent-soft" />}
                    {it.label}
                    {it.menu && <ChevronDown aria-hidden="true" className={cn("size-3.5 transition-transform duration-300", menu === it.menu && "rotate-180")} />}
                  </>
                );
                return it.menu ? (
                  <button
                    key={it.key}
                    type="button"
                    aria-expanded={menu === it.menu}
                    aria-controls="mega"
                    onMouseEnter={() => { setMenu(it.menu!); setHover(it.key); }}
                    onClick={() => setMenu((m) => (m === it.menu ? null : it.menu!))}
                    className={cls}
                  >
                    {inner}
                  </button>
                ) : (
                  <Link key={it.key} href={it.href!} onMouseEnter={() => { setMenu(null); setHover(it.key); }} {...(active ? { "aria-current": "page" as const } : {})} className={cls}>
                    {inner}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href={nav.cta.href}
                className="group hidden items-center gap-2 rounded-full bg-accent-strong py-2 pl-5 pr-2 text-[0.9rem] font-semibold text-on-accent shadow-[0_0_28px_-8px_rgb(107_142_61/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-4px_rgb(157_189_106/0.9)] sm:inline-flex"
              >
                {nav.cta.label}
                <span className="grid size-7 place-items-center rounded-full bg-current/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </span>
              </Link>
              <button
                ref={btnRef}
                type="button"
                aria-expanded={sheet}
                aria-controls="mobile-sheet"
                aria-label="Open menu"
                onClick={() => setSheet(true)}
                className="grid size-10 place-items-center rounded-full bg-fg/[0.06] transition-colors hover:bg-fg/[0.12] lg:hidden"
              >
                <MenuIcon className="size-5" aria-hidden="true" />
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
              className="mt-2 hidden overflow-hidden rounded-[1.75rem] border border-line bg-bg shadow-[0_40px_90px_-30px_rgb(0_0_0/0.5)] lg:block"
            >
              <div className="grid grid-cols-[13rem_1fr] gap-10 p-8">
                <div>
                  <p className="label text-muted">{menu === "products" ? "Our products" : "Solutions we build"}</p>
                  <Link href={menu === "products" ? "/products" : "/services"} className="group mt-4 inline-flex items-center gap-2 font-display text-2xl font-semibold leading-tight">
                    {menu === "products" ? "All products" : "All services"}
                    <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <p className="mt-4 text-sm text-muted">
                    {menu === "products" ? "Ready-to-use tools we build and run ourselves." : "Digital systems we build for your business."}
                  </p>
                </div>
                {menu === "products" ? (
                  <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
                    {productItems.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="group block border-t border-line py-4">
                          <span className="flex items-center justify-between font-display text-lg font-semibold transition-colors group-hover:text-accent">
                            {it.name}
                            {it.note && <span className="label rounded-full border border-current px-2.5 py-1 text-muted">{it.note}</span>}
                          </span>
                          <span className="mt-1 block max-w-md text-[0.9rem] text-muted">{it.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
                    {nav.serviceMenu.map((it) => (
                      <li key={it.href} className={it.children ? "col-span-2 row-span-2" : undefined}>
                        <Link href={it.href} className="group block border-t border-line py-4">
                          <span className="flex items-center justify-between font-display text-lg font-semibold transition-colors group-hover:text-accent">
                            {it.label}
                            {it.children && <span className="label rounded-full bg-accent-soft px-2.5 py-1 text-accent">New</span>}
                          </span>
                          <span className="mt-1 block max-w-md text-[0.9rem] text-muted">{it.text}</span>
                        </Link>
                        {it.children && (
                          <ul className="mb-2 flex flex-wrap gap-2">
                            {it.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-muted transition-colors hover:border-accent hover:text-fg">
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
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
                  <button type="button" onClick={() => setSheet(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-line">
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
                          <Link href={l.href} className="flex items-baseline justify-between border-b border-line py-3.5 font-display text-2xl font-semibold">
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
