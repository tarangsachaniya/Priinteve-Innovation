"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "../ui/media";
import { Button } from "../ui/primitives";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * OUR WORK as an editorial index: one hairline row per project with an outlined numeral and a large
 * name that fills on hover. On desktop a framed preview of the live site follows the cursor. A row
 * opens into a drawer with the summary, a scrolling gallery of the project's imagery and its links.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const list = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    const r = list.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div ref={list} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative border-t border-line">
      {/* cursor preview (desktop, fine pointer) */}
      {!reduce && (
        <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-30 hidden [@media(hover:hover)_and_(min-width:1024px)]:block">
          <AnimatePresence>
            {hover !== null && open !== hover && projects[hover].media?.desktop && (
              <motion.div
                key={hover}
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[22rem] -translate-x-1/2 -translate-y-[115%]"
              >
                <BrowserFrame media={projects[hover].media!.desktop!} url={projects[hover].domain} sizes="352px" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {projects.map((p, i) => {
        const service = serviceBySlug(p.service);
        const isOpen = open === i;
        const gallery = p.media ? [p.media.cover, ...p.media.gallery].filter((m, k, a) => a.findIndex((n) => n.src === m.src) === k) : [];
        return (
          <article key={p.slug} aria-labelledby={`wi-${p.slug}`} className="border-b border-line">
            <h3 className="m-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`wi-panel-${p.slug}`}
              onClick={() => setOpen(isOpen ? null : i)}
              onPointerEnter={() => setHover(i)}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 text-left md:grid-cols-[7rem_1fr_auto_auto] md:gap-x-8 md:py-10"
            >
              <span className={cn("font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-none tracking-[-0.05em] transition-colors duration-500", isOpen ? "text-accent" : "outline-strong group-hover:text-accent group-hover:[-webkit-text-stroke:0]")}>{num(i)}</span>
              <span className="min-w-0">
                <span id={`wi-${p.slug}`} className={cn("block [overflow-wrap:anywhere] font-display font-semibold text-[clamp(1.9rem,5.4vw,4.6rem)] uppercase leading-[0.95] tracking-[-0.045em] transition-transform duration-700 ease-out-expo md:group-hover:translate-x-3", isOpen && "md:translate-x-3")}>
                  {p.name}
                </span>
                <span className="label mt-3 block truncate text-muted md:hidden">{p.category}</span>
              </span>
              <span className="hidden max-w-[16rem] text-right md:block">
                <span className="label block text-muted">{p.category}</span>
                {service && <span className="mt-1.5 block text-[0.9rem] text-fg/80">{service.name}</span>}
              </span>
              <span className={cn("grid size-11 place-items-center rounded-full border border-line transition-all duration-500 md:size-14", isOpen ? "rotate-45 border-accent bg-accent-strong text-on-accent" : "group-hover:border-accent")}>
                <Plus aria-hidden="true" className="size-5" />
              </span>
            </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`wi-panel-${p.slug}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 pb-12 md:grid-cols-[7rem_1fr] md:gap-x-8">
                    <span aria-hidden="true" className="hidden md:block" />
                    <div className="min-w-0">
                      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{p.summary}</p>
                        <div className="flex flex-wrap gap-3">
                          <Button href={`/work/${p.slug}`} arrow="up-right">
                            View case study
                          </Button>
                          {p.liveUrl && (
                            <Button href={p.liveUrl} variant="secondary" arrow="up-right">
                              {p.domain ?? "Visit live site"}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* gallery: the live site first, then the project's own imagery */}
                      <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
                        {p.media?.desktop && (
                          <li className="w-[85%] shrink-0 snap-start sm:w-[30rem]">
                            <BrowserFrame media={p.media.desktop} url={p.domain} sizes="480px" />
                          </li>
                        )}
                        {gallery
                          .filter((m) => m.src !== p.media?.desktop?.src)
                          .map((m) => (
                            <li key={m.src} className="relative aspect-[4/3] w-[70%] shrink-0 snap-start overflow-hidden rounded-[1.25rem] border border-line sm:w-[22rem]">
                              <Image src={m.src} alt={m.alt} fill sizes="352px" className="object-cover transition-transform duration-[1200ms] ease-out-expo hover:scale-105" />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

/** Facts derived from the project list itself (no invented numbers). */
export function WorkFacts({ projects }: { projects: Project[] }) {
  const services = new Set(projects.map((p) => p.service)).size;
  const live = projects.filter((p) => p.liveUrl).length;
  const sectors = new Set(projects.map((p) => p.category)).size;
  const facts = [
    { value: projects.length, label: "Client projects shown" },
    { value: live, label: "Live sites you can visit" },
    { value: services, label: services === 1 ? "Service behind them" : "Services behind them" },
    { value: sectors, label: "Different sectors" },
  ];
  return (
    <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
      {facts.map((f, i) => (
        <div key={f.label} className={cn("border-b border-line py-8 pr-6 lg:border-b-0", i % 2 === 1 && "border-l pl-6 lg:pl-8", i >= 2 && "lg:border-l lg:pl-8")}>
          <dt className="label text-muted">{f.label}</dt>
          <dd className="mt-3 font-serif text-[clamp(3rem,6vw,5rem)] italic leading-none text-accent">{String(f.value).padStart(2, "0")}</dd>
        </div>
      ))}
    </dl>
  );
}
