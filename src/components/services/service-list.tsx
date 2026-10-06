import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Service, ServiceSlug } from "@/content/types";
import { SERVICE_TINT, cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";

/** Thin-line SVG illustration per service (no WebGL on list pages). Uses currentColor. */
function Glyph({ slug }: { slug: ServiceSlug }) {
  const c = { stroke: "currentColor", fill: "none", strokeWidth: 1.4 } as const;
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden="true">
      {slug === "website-design-development" && (
        <g {...c}>
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.28} transform={`translate(${i * 14} ${-i * 12})`}>
              <rect x="30" y="50" width="130" height="90" rx="8" />
              <path d="M30 68h130" />
              <circle cx="42" cy="59" r="2" />
              <circle cx="50" cy="59" r="2" />
              <rect x="42" y="80" width="46" height="46" rx="4" />
              <path d="M98 84h50M98 96h38M98 108h44" />
            </g>
          ))}
        </g>
      )}
      {slug === "ecommerce-websites" && (
        <g {...c}>
          <rect x="82" y="64" width="76" height="62" rx="6" />
          <path d="M98 64v-8a22 22 0 0 1 44 0v8" />
          <ellipse cx="120" cy="90" rx="100" ry="34" strokeDasharray="3 5" opacity=".6" />
          <rect x="14" y="76" width="22" height="22" rx="4" transform="rotate(-12 25 87)" />
          <rect x="196" y="82" width="22" height="22" rx="4" transform="rotate(14 207 93)" />
          <circle cx="120" cy="156" r="4" />
        </g>
      )}
      {slug === "custom-web-applications" && (
        <g {...c}>
          <path d="M120 90 54 46M120 90l70-40M120 90l-62 52M120 90l66 46M54 46l-20 40M190 50l22 30" opacity=".7" />
          {[[120, 90, 10], [54, 46, 6], [190, 50, 6], [58, 142, 6], [186, 136, 6], [34, 86, 4], [212, 80, 4]].map(([x, y, r]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      )}
      {slug === "nfc-qr-solutions" && (
        <g {...c}>
          <rect x="84" y="62" width="72" height="56" rx="8" />
          <rect x="94" y="72" width="14" height="14" rx="2" />
          <path d="M116 76h30M116 86h22M94 100h52" />
          {[28, 46, 64].map((r, i) => (
            <path key={r} d={`M${120 + r} ${90 - r * 0.7}a${r} ${r} 0 0 1 0 ${r * 1.4}`} opacity={1 - i * 0.28} />
          ))}
        </g>
      )}
    </svg>
  );
}

/** Editorial service row: numeral, big serif name, a thin-line illustration inside a tinted arch. */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <Link href={`/services/${service.slug}`} className="group grid items-center gap-10 border-t border-line py-14 md:grid-cols-2 md:gap-20 md:py-20">
        <div className={cn(flip && "md:order-2")}>
          <p className="numeral text-5xl text-accent">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)]">{service.name}</h3>
          <p className="mt-6 max-w-md text-xl text-muted">{service.card}</p>
          <span className="mt-9 flex w-fit items-center gap-3 rounded-full bg-fg py-2 pl-6 pr-2 font-semibold text-bg">
            Learn more
            <span className="grid size-9 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </span>
          </span>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="tint grid aspect-[4/5] place-items-center overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] p-10 text-fg" style={{ "--tint": SERVICE_TINT[service.slug] } as React.CSSProperties}>
            <div className="size-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110 group-hover:-rotate-3">
              <Glyph slug={service.slug} />
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
