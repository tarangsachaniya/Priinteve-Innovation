"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/content/types";
import { Reveal } from "../motion/reveal";
import { BrowserFrame, PhoneFrame } from "../ui/media";
import { ProjectArt } from "./project-list";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * OUR WORK as a case-study journey. Each project is a large editorial panel. On desktop the panels pin
 * and stack: the next project slides up over the current one, which recedes (scales down and dims) as
 * it is covered. On mobile and with reduced motion the panels simply follow one another.
 */
export function WorkStory({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      const slots = Array.from(root.querySelectorAll<HTMLElement>("[data-slot]"));
      const panels = slots.map((s) => s.querySelector<HTMLElement>("[data-panel]"));
      slots.forEach((_, i) => {
        const panel = panels[i];
        if (!panel) return;
        const next = slots[i + 1];
        if (!mq.matches || !next) {
          panel.style.transform = "";
          panel.style.filter = "";
          return;
        }
        const vh = window.innerHeight;
        const q = Math.min(1, Math.max(0, (vh - next.getBoundingClientRect().top) / (vh - 96)));
        panel.style.transform = `scale(${(1 - 0.07 * q).toFixed(4)})`;
        panel.style.filter = `brightness(${(1 - 0.45 * q).toFixed(3)})`;
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
      {projects.map((p, i) => {
        const service = serviceBySlug(p.service);
        return (
          <div key={p.slug} data-slot className="lg:motion-safe:sticky lg:motion-safe:top-24 lg:motion-safe:h-[calc(100svh-7rem)] lg:motion-safe:pb-6" style={{ zIndex: i + 1 }}>
            <article data-panel aria-labelledby={`work-${p.slug}`} className="card grid h-full origin-top overflow-hidden rounded-[2rem] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:motion-reduce:mb-6">
              {/* info */}
              <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                <div className="flex items-center justify-between gap-4">
                  <span className="numeral text-[clamp(3rem,6vw,5.5rem)] text-accent">{num(i)}</span>
                  <span className="label text-right text-muted">
                    {num(i)} / {num(projects.length - 1)}
                  </span>
                </div>
                <p className="label mt-6 text-muted">{p.category}</p>
                <h3 id={`work-${p.slug}`} className="mt-3 text-[clamp(2rem,4.2vw,3.8rem)] uppercase leading-[0.95] tracking-[-0.04em]">
                  {p.name}
                </h3>
                <p className="mt-5 max-w-md text-lg text-muted">{p.summary}</p>
                {service && (
                  <p className="mt-6 text-sm">
                    <span className="label mr-3 text-muted">Service</span>
                    <Link href={`/services/${service.slug}`} className="link-u font-semibold">
                      {service.name}
                    </Link>
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                  <Link href={`/work/${p.slug}`} className="group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-[0.92rem] font-semibold text-on-accent">
                    View case study
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.92rem] font-semibold transition-colors hover:border-accent">
                      Visit live site
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  )}
                </div>
              </div>
              {/* visual */}
              <Reveal variant="mask" className="relative min-h-[16rem] sm:min-h-[22rem] lg:min-h-0">
                <Link href={`/work/${p.slug}`} tabIndex={-1} aria-hidden="true" className="group absolute inset-0 block overflow-hidden lg:rounded-none">
                  {p.media?.cover && p.media.cover.src === p.media.desktop?.src ? (
                    // the cover is a full-page screenshot: frame it instead of cropping it
                    <span className="absolute inset-0 grid place-items-center bg-[radial-gradient(80%_70%_at_60%_40%,rgb(107_142_61/0.35),transparent_70%),linear-gradient(150deg,#18330d,#0d120d)] p-6 sm:p-10">
                      <span className="block w-full max-w-[40rem] transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]">
                        <BrowserFrame media={p.media.desktop} url={p.domain} sizes="(min-width: 1024px) 45vw, 90vw" />
                      </span>
                    </span>
                  ) : p.media?.cover ? (
                    <Image src={p.media.cover.src} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]" />
                  ) : (
                    <ProjectArt project={p} className="absolute inset-0 rounded-none border-0" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  {p.domain && p.media?.cover.src !== p.media?.desktop?.src && <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3.5 py-1.5 text-[0.72rem] text-white backdrop-blur">{p.domain}</span>}
                </Link>
                {p.media?.mobile && <PhoneFrame media={p.media.mobile} className="pointer-events-none absolute bottom-6 right-6 hidden w-[22%] min-w-[7rem] max-w-[10rem] sm:block" />}
              </Reveal>
            </article>
          </div>
        );
      })}
    </div>
  );
}
