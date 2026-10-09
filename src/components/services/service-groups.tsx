"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { serviceCategories, servicesIn } from "@/content/services";
import { Icon } from "../ui/icon";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Services grouped by category, as a stack: each category is a deep-green panel that pins under the
 * header; the next one slides up over it while the covered panel recedes (scales down and dims).
 * Each panel pairs the category story and everything it covers with a list of its service pages.
 * Mobile and reduced motion: the panels simply follow one another.
 */
export function ServiceGroups() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      const slots = Array.from(root.querySelectorAll<HTMLElement>("[data-slot]"));
      slots.forEach((slot, i) => {
        const panel = slot.querySelector<HTMLElement>("[data-panel]");
        const next = slots[i + 1];
        if (!panel) return;
        if (!mq.matches || !next) {
          panel.style.transform = "";
          panel.style.filter = "";
          return;
        }
        const vh = window.innerHeight;
        const q = Math.min(1, Math.max(0, (vh - next.getBoundingClientRect().top) / (vh - 120)));
        panel.style.transform = `scale(${(1 - 0.06 * q).toFixed(4)})`;
        panel.style.filter = `brightness(${(1 - 0.4 * q).toFixed(3)})`;
      });
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    mq.addEventListener("change", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      mq.removeEventListener("change", on);
    };
  }, []);

  return (
    <div ref={wrap} className="space-y-6 lg:space-y-0">
      {serviceCategories.map((cat, ci) => {
        const items = servicesIn(cat.key);
        return (
          <div key={cat.key} id={cat.anchor} data-slot className="scroll-mt-28 lg:motion-safe:sticky lg:motion-safe:top-24 lg:motion-safe:pb-8" style={{ zIndex: ci + 1 }}>
            <article
              data-panel
              data-tone="dark"
              aria-labelledby={`cat-${cat.anchor}`}
              className="grain relative isolate origin-top overflow-hidden rounded-[2rem] border border-line bg-bg text-fg shadow-[0_-30px_80px_-40px_rgb(0_0_0/0.6)] lg:min-h-[min(36rem,calc(100svh-9rem))]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[30rem] rounded-full bg-[#6b8e3d]/25 blur-[110px]" />
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-[0.18em] right-6 -z-10 select-none font-display text-[clamp(8rem,18vw,15rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(250_248_242/0.08)]">
                {num(ci)}
              </span>

              <div className="relative z-10 grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-14">
                {/* story */}
                <div className="flex flex-col">
                  <p className="label flex items-center gap-3 text-muted">
                    <span className="font-serif text-2xl normal-case italic tracking-normal text-accent">{num(ci)}</span>
                    <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
                    {num(ci)} / {num(serviceCategories.length - 1)}
                  </p>
                  <h3 id={`cat-${cat.anchor}`} className="mt-6 text-[clamp(2rem,4vw,3.4rem)] leading-[1] tracking-[-0.045em]">
                    {cat.name}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{cat.blurb}</p>
                  <ul aria-label={`${cat.name}: what we build`} className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
                    {cat.items.map((it) => (
                      <li key={it} className="rounded-full border border-line bg-fg/[0.04] px-3.5 py-1.5 text-[0.8rem] text-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* service pages */}
                <ul className="self-center border-t border-line">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group relative isolate flex items-center gap-5 overflow-hidden border-b border-line py-5 pr-2">
                        <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent-soft transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent-strong group-hover:text-on-accent">
                          <Icon name={s.icon} className="size-[1.1rem]" />
                        </span>
                        <span className="min-w-0 flex-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                          <span className="block font-display text-xl font-semibold tracking-[-0.02em]">{s.name}</span>
                          <span className="mt-1 block text-[0.9rem] leading-snug text-muted">{s.card}</span>
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-muted transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
