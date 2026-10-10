import Image from "next/image";
import type { BrandProject } from "@/content/brand-work";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Branding portfolio: one editorial row per project. The cover leads, two supporting frames sit beneath
 * it, and the copy carries type, year, client and the project's own palette. Rows alternate sides on lg.
 */
export function BrandWork({ projects }: { projects: BrandProject[] }) {
  return (
    <ol className="space-y-20 md:space-y-28">
      {projects.map((p, i) => {
        const [cover, ...rest] = p.images;
        const flip = i % 2 === 1;
        return (
          <li key={p.slug} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal variant="mask" className={cn("lg:col-span-7", flip && "lg:order-2")}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-line bg-surface">
                  <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </div>
                {rest.slice(0, 2).map((m) => (
                  <div key={m.src} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line bg-surface">
                    <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 27vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </Reveal>

            <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
              <span className="font-serif text-[clamp(2.6rem,4vw,3.6rem)] italic leading-none text-accent">{num(i)}</span>
              <p className="label mt-6 text-muted">
                {p.type} · {p.year}
              </p>
              <h3 className="mt-3 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.02]">{p.name}</h3>
              <p className="mt-5 max-w-lg text-lg text-muted">{p.summary}</p>
              <dl className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="label text-muted">Client</dt>
                  <dd className="mt-1 font-semibold">{p.client}</dd>
                </div>
                {p.palette && (
                  <div>
                    <dt className="label text-muted">Palette</dt>
                    <dd className="mt-1.5 flex gap-1.5">
                      {p.palette.map((c) => (
                        <span key={c} title={c} className="size-5 rounded-full border border-line" style={{ background: c }} />
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
