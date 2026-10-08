import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { serviceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Icon } from "../ui/icon";

/**
 * Project visual: the project's own cover image when we have one, otherwise a branded tile with the
 * project's icon (used for Quantivo, which has no published imagery).
 */
export function ProjectArt({ project, className, sizes = "(min-width: 768px) 50vw, 100vw", priority }: { project: Project; className?: string; sizes?: string; priority?: boolean }) {
  const cover = project.media?.cover;
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-[1.75rem] border border-line", className)}
      style={cover ? undefined : { background: `linear-gradient(160deg, ${project.colors[0]}, ${project.colors[1]})` }}
    >
      {cover ? (
        <Image src={cover.src} alt={cover.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
          <div aria-hidden="true" className="absolute -right-10 -top-10 size-60 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute inset-0 grid place-items-center text-white/90">
            <Icon name={project.icon} className="size-16 sm:size-24" strokeWidth={1} />
          </div>
          <p aria-hidden="true" className="absolute bottom-5 left-0 right-0 text-center font-display text-lg font-semibold text-white/85">
            {project.name}
          </p>
        </>
      )}
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
