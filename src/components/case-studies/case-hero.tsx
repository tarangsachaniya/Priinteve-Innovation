"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Project, Service } from "@/content/types";
import { BrowserFrame, PhoneFrame } from "../ui/media";
import { ProjectArt } from "./project-list";

/**
 * Case-study opening: the project name set huge over a ledger of facts, then the live site in a browser
 * frame that starts tilted back and settles flat (and grows) as you scroll into it, with the phone view
 * sliding in beside it. The backdrop takes the project's own colours.
 */
export function CaseHero({ project, service, index, total }: { project: Project; service: Service; index: number; total: number }) {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const media = project.media;
  const [c0, c1] = project.colors;

  return (
    <header data-tone="dark" className="grain relative isolate overflow-hidden bg-bg pb-16 pt-32 text-fg md:pb-24 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: `radial-gradient(70% 55% at 70% 80%, ${c1}55, transparent 70%), radial-gradient(60% 50% at 10% 0%, ${c0}, transparent 70%)` }} />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />

      <div className="container-x relative z-10">
        <nav aria-label="Breadcrumb" className="label mb-12 flex flex-wrap items-center justify-between gap-4 text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="link-u hover:text-fg">Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight aria-hidden="true" className="size-3 opacity-60" />
              <Link href="/work" className="link-u hover:text-fg">Our Work</Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <ChevronRight aria-hidden="true" className="size-3 opacity-60" />
              <span className="text-fg">{project.name}</span>
            </li>
          </ol>
          <span>
            Case <span className="text-fg">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </span>
        </nav>

        <p className="label text-accent">{project.category}</p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[clamp(3.2rem,12vw,11rem)] uppercase leading-[0.85] tracking-[-0.06em]"
        >
          {project.name}
        </motion.h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>

        <dl className="mt-12 grid grid-cols-2 border-y border-line md:grid-cols-4">
          {[
            ["Client", project.client],
            ["Sector", project.category],
            ["Service", service.name],
            ["Live site", project.domain ?? "Not public"],
          ].map(([k, v], i) => (
            <div key={k} className={`py-5 pr-4 ${i % 2 === 1 ? "border-l border-line pl-5" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-5" : ""}`}>
              <dt className="label text-muted">{k}</dt>
              <dd className="mt-2 text-[0.95rem] font-medium [overflow-wrap:anywhere]">
                {k === "Live site" && project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-1.5">
                    {v}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* the stage */}
        <div ref={stage} className="relative mx-auto mt-16 max-w-6xl [perspective:1600px] md:mt-24">
          <motion.div style={reduce ? undefined : { rotateX, scale }} className="origin-bottom">
            {media?.desktop ? (
              <BrowserFrame media={media.desktop} url={project.domain} priority sizes="(min-width: 1280px) 72rem, 95vw" className="shadow-[0_80px_160px_-60px_rgb(0_0_0/0.95)]" />
            ) : (
              <ProjectArt project={project} priority className="aspect-[16/9] w-full" />
            )}
          </motion.div>
          {media?.mobile && (
            <motion.div style={reduce ? undefined : { y: phoneY }} className="absolute -bottom-10 -right-2 hidden w-[17%] min-w-[8rem] max-w-[12rem] md:block lg:-right-10">
              <PhoneFrame media={media.mobile} />
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
