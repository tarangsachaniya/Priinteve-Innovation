"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/content/types";
import { Reveal } from "../motion/reveal";
import { BrowserFrame, PhoneFrame } from "../ui/media";
import { Button } from "../ui/primitives";
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
          <div key={p.slug} data-slot className="lg:motion-safe:sticky lg:motion-safe:top-24 lg:motion-safe:h-[min(33rem,calc(100svh-7rem))] lg:motion-safe:pb-6" style={{ zIndex: i + 1 }}>
            <article data-panel aria-labelledby={`work-${p.slug}`} className="card grid h-full origin-top overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:motion-reduce:mb-6">
              {/* info */}
              <div className="flex flex-col p-6 sm:p-8 lg:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif text-[clamp(3rem,5vw,4.5rem)] italic leading-none text-accent">{num(i)}</span>
                  <span className="label text-right text-muted">
                    {num(i)} / {num(projects.length - 1)}
                  </span>
                </div>
                <p className="label mt-6 text-muted">{p.category}</p>
                <h3 id={`work-${p.slug}`} className="mt-3 text-[clamp(2rem,3.6vw,3.2rem)] uppercase leading-[0.95] tracking-[-0.04em]">
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
                  <Button href={`/work/${p.slug}`} arrow="up-right">
                    View case study
                  </Button>
                  {p.liveUrl && (
                    <Button href={p.liveUrl} variant="secondary" arrow="up-right">
                      Live site
                    </Button>
                  )}
                </div>
              </div>
              {/* visual: the live site, framed whole (never cropped), over a soft wash of the project's own imagery */}
              <Reveal variant="mask" className="relative min-h-[17rem] overflow-hidden sm:min-h-[24rem] lg:min-h-0">
                <Link href={`/work/${p.slug}`} tabIndex={-1} aria-hidden="true" className="group absolute inset-0 block">
                  <span className="absolute inset-0 bg-[radial-gradient(80%_70%_at_60%_40%,rgb(107_142_61/0.35),transparent_70%),linear-gradient(150deg,#18330d,#0d120d)]" />
                  {p.media?.cover && p.media.cover.src !== p.media.desktop?.src && (
                    <Image src={p.media.cover.src} alt="" fill sizes="40vw" className="scale-110 object-cover opacity-35 blur-[2px] transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.14]" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[#0d120d]/70 via-[#0d120d]/20 to-transparent" />
                  <span className="absolute inset-0 grid place-items-center p-6 pb-10 sm:p-10 sm:pr-20 lg:pr-24">
                    {p.media?.desktop ? (
                      <span className="block w-full max-w-[34rem] transition-transform duration-[1400ms] ease-out-expo group-hover:-translate-y-1.5">
                        <BrowserFrame media={p.media.desktop} url={p.domain} sizes="(min-width: 1024px) 34rem, 90vw" className="shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9)]" />
                      </span>
                    ) : (
                      <ProjectArt project={p} className="aspect-[4/3] w-full max-w-[34rem]" />
                    )}
                  </span>
                </Link>
                {p.media?.mobile && <PhoneFrame media={p.media.mobile} className="pointer-events-none absolute bottom-5 right-5 hidden w-[19%] min-w-[6.5rem] max-w-[8.5rem] sm:block" />}
              </Reveal>
            </article>
          </div>
        );
      })}
    </div>
  );
}
