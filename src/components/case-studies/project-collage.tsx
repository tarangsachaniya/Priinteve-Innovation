import Image from "next/image";
import type { Project } from "@/content/types";
import { PointerParallax } from "../motion/pointer";
import { ProjectArt } from "./project-list";

/* back to front: resting pose, then the fanned-out pose on hover */
const POSE = [
  { rest: "translate-x-[22%] -translate-y-[6%] rotate-[9deg]", fan: "group-hover:translate-x-[38%] group-hover:-translate-y-[10%] group-hover:rotate-[14deg]" },
  { rest: "-translate-x-[20%] translate-y-[2%] -rotate-[8deg]", fan: "group-hover:-translate-x-[36%] group-hover:translate-y-[4%] group-hover:-rotate-[13deg]" },
  { rest: "translate-y-[10%] -rotate-[1deg]", fan: "group-hover:translate-y-[6%] group-hover:rotate-0" },
];

/**
 * Our Work hero visual: the client projects as a fanned deck of framed cards (real imagery, serif
 * numeral, name, sector and domain). The deck tilts toward the pointer and fans out on hover. Decorative.
 */
export function ProjectCollage({ projects }: { projects: Project[] }) {
  const deck = projects.slice(0, 3);
  const order = [...deck.keys()].reverse(); // last project at the back, first in front
  return (
    <PointerParallax className="relative mx-auto hidden h-[34rem] w-full max-w-xl lg:block">
      <div aria-hidden="true" className="group absolute inset-0 grid place-items-center [perspective:1400px]">
        <div className="absolute size-[26rem] rounded-full bg-accent-strong/25 blur-[110px]" />
        <div
          className="relative w-[64%] transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]"
          style={{ transform: "rotateY(calc(var(--px, 0) * 8deg)) rotateX(calc(var(--py, 0) * -6deg))" }}
        >
          {order.map((idx, layer) => {
            const p = deck[idx];
            const pose = POSE[layer + (POSE.length - order.length)];
            const img = p.media?.cover ?? p.media?.desktop;
            const screenshot = img && img.src === p.media?.desktop?.src;
            return (
              <div
                key={p.slug}
                className={`${layer === order.length - 1 ? "relative" : "absolute inset-0"} transition-transform duration-[900ms] ease-out-expo ${pose.rest} ${pose.fan}`}
                style={{ zIndex: layer + 1 }}
              >
                <div className="rounded-[1.6rem] border border-white/10 bg-[#0d120d] p-2.5 text-[#faf8f2] shadow-[0_50px_100px_-40px_rgb(0_0_0/0.85)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem]">
                    {img ? (
                      <Image src={img.src} alt="" fill sizes="22rem" className={`object-cover ${screenshot ? "object-top" : "object-center"}`} />
                    ) : (
                      <ProjectArt project={p} className="absolute inset-0 rounded-none border-0" />
                    )}
                    <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {p.domain && <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] tracking-wide text-white/85 backdrop-blur">{p.domain}</span>}
                  </div>
                  <div className="flex items-end justify-between gap-3 px-2 pb-1.5 pt-3.5">
                    <span className="min-w-0">
                      <span className="label block truncate text-[0.56rem] text-white/50">{p.category}</span>
                      <span className="mt-1 block truncate font-display text-lg font-semibold uppercase leading-none tracking-[-0.03em]">{p.name}</span>
                    </span>
                    <span className="font-serif text-2xl italic leading-none text-[#9dbd6a]">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* floating chip */}
        <div className="absolute bottom-6 left-2 flex items-center gap-2.5 rounded-full border border-line bg-bg/85 py-2 pl-3 pr-4 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
          <span className="size-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_2px_rgb(157_189_106/0.7)]" />
          <span className="label text-[0.6rem] text-muted">
            <span className="text-fg">{String(projects.filter((p) => p.liveUrl).length).padStart(2, "0")}</span> live client sites
          </span>
        </div>
      </div>
    </PointerParallax>
  );
}
