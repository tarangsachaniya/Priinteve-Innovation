import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { serviceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Icon } from "../ui/icon";

/** Violet gradient art standing in for project screenshots until real images are supplied. */
export function ProjectArt({ project, className }: { project: Project; className?: string; arch?: boolean }) {
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-[1.75rem] border border-line", className)}
      style={{ background: `linear-gradient(160deg, ${project.colors[0]}, ${project.colors[1]})` }}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute -right-10 -top-10 size-60 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute inset-0 grid place-items-center text-white/90">
        <Icon name={project.icon} className="size-16 sm:size-24" strokeWidth={1} />
      </div>
      <p className="label absolute bottom-5 left-0 right-0 text-center text-white/80">Project visual to be added</p>
    </div>
  );
}

/** Large alternating editorial rows (Our Work). */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-24 md:space-y-40">
      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        const service = serviceBySlug(p.service);
        return (
          <Reveal key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group grid items-center gap-10 md:grid-cols-12 md:gap-8">
              <div className={cn("md:col-span-6", flip ? "md:order-2 md:col-start-7" : "md:col-start-1")}>
                <div className="overflow-hidden rounded-[1.75rem]">
                  <ProjectArt project={p} className="aspect-[4/5] transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04] md:aspect-[5/6]" />
                </div>
              </div>
              <div className={cn("md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
                <p className="numeral text-3xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="label mt-6 text-muted">{p.category}</p>
                <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)]">{p.name}</h3>
                <p className="mt-4 text-lg text-muted">{p.summary}</p>
                <p className="label mt-6 inline-block rounded-full border border-line px-4 py-2">{service?.name}</p>
                <span className="mt-9 flex w-fit items-center gap-3 rounded-full bg-accent-strong py-2 pl-6 pr-2 font-semibold text-on-accent shadow-[0_0_28px_-8px_rgb(107_142_61/0.85)]">
                  View case study
                  <span className="grid size-9 place-items-center rounded-full bg-white/20 text-on-accent transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Compact grid variant (services pages). */
export function ProjectTiles({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <div className={cn("grid gap-x-8 gap-y-14 sm:grid-cols-2", className)}>
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 2) * 0.08}>
          <Link href={`/work/${p.slug}`} className="group block">
            <div className="overflow-hidden rounded-[1.75rem]">
              <ProjectArt project={p} className="aspect-[4/3] transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="label text-muted">{p.category}</p>
                <h3 className="mt-2 text-2xl">{p.name}</h3>
                <p className="mt-2 text-[0.98rem] text-muted">{p.summary}</p>
              </div>
              <ArrowUpRight aria-hidden="true" className="mt-1 size-6 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
