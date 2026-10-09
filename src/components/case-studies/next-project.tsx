import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

/** Full-width hand-off to the next case study: its name set huge, its imagery revealed on hover. */
export function NextProject({ project }: { project: Project }) {
  const img = project.media?.cover ?? project.media?.desktop;
  return (
    <Link href={`/work/${project.slug}`} data-tone="dark" className="group relative isolate block overflow-hidden bg-bg py-20 text-fg md:py-28">
      {img && (
        <Image src={img.src} alt="" fill sizes="100vw" className="-z-10 scale-110 object-cover opacity-0 transition-all duration-[1200ms] ease-out-expo group-hover:scale-100 group-hover:opacity-40 group-focus-visible:opacity-40" />
      )}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />
      <div className="container-x">
        <div className="label flex items-center justify-between gap-4 text-muted">
          <span>Next project</span>
          <span>{project.category}</span>
        </div>
        <div className="mt-8 flex items-end justify-between gap-6 border-b border-line pb-8">
          <span className="text-[clamp(3rem,11vw,9.5rem)] font-display font-semibold uppercase leading-[0.85] tracking-[-0.06em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{project.name}</span>
          <span className="mb-2 grid size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent-strong group-hover:text-on-accent md:size-20">
            <ArrowUpRight aria-hidden="true" className="size-6 md:size-8" />
          </span>
        </div>
      </div>
    </Link>
  );
}
