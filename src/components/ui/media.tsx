import { Check } from "lucide-react";
import Image from "next/image";
import type { Block } from "@/content/blocks";
import type { Feature, Media, Plan } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "../motion/reveal";
import { Icon } from "./icon";
import { Text } from "./primitives";
import type { IconName } from "@/content/types";

/** A screenshot in browser chrome. `url` is the real address shown in the bar. */
export function BrowserFrame({ media, url, className, priority, sizes = "(min-width: 1024px) 50vw, 100vw" }: { media: Media; url?: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.25rem] border border-line bg-[#0d120d] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.6)]", className)}>
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-white/25" />
          <i className="size-2.5 rounded-full bg-white/25" />
          <i className="size-2.5 rounded-full bg-white/25" />
        </span>
        {url && <span className="mx-auto min-w-0 max-w-[18rem] truncate rounded-full bg-white/[0.07] px-4 py-1 text-center text-[0.68rem] tracking-wide text-white/60">{url}</span>}
        <span aria-hidden="true" className="w-10" />
      </div>
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}

/** A screenshot in a simple phone frame. */
export function PhoneFrame({ media, className }: { media: Media; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border-[6px] border-[#0d120d] bg-[#0d120d] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]", className)}>
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="240px" className="block h-auto w-full rounded-[1.5rem]" />
    </div>
  );
}

/** Desktop screenshot with a phone overlapping the corner: the standard product/project hero visual. */
export function DeviceDuo({ desktop, mobile, url, priority }: { desktop: Media; mobile?: Media; url?: string; priority?: boolean }) {
  return (
    <div className="relative pb-10 pr-6 sm:pb-14 sm:pr-10">
      <BrowserFrame media={desktop} url={url} priority={priority} />
      {mobile && <PhoneFrame media={mobile} className="absolute bottom-0 right-0 w-[26%] min-w-[6.5rem] max-w-[11rem]" />}
    </div>
  );
}

/** Long-form content blocks (legal pages). */
export function Prose({ blocks, className }: { blocks: Block[]; className?: string }) {
  return (
    <div className={cn("max-w-3xl text-[1.06rem] leading-[1.8] text-fg/90", className)}>
      {blocks.map((b, i) => {
        if ("h2" in b) return <h2 key={i} className="mb-4 mt-12 text-2xl md:text-[1.75rem] first:mt-0">{b.h2}</h2>;
        if ("h3" in b) return <h3 key={i} className="mb-3 mt-8 text-xl">{b.h3}</h3>;
        if ("p" in b) return <p key={i} className="mb-5"><Text>{b.p}</Text></p>;
        if ("callout" in b)
          return (
            <p key={i} className="my-8 rounded-2xl border-l-[3px] border-accent bg-accent-soft px-6 py-5 font-medium text-fg">
              {b.callout}
            </p>
          );
        const List = "ul" in b ? "ul" : "ol";
        const items = "ul" in b ? b.ul : b.ol;
        return (
          <List key={i} className="mb-6 space-y-2.5 pl-1">
            {items.map((it, j) => (
              <li key={it} className="flex gap-3">
                {List === "ul" ? (
                  <span aria-hidden="true" className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                ) : (
                  <span aria-hidden="true" className="numeral mt-[0.3em] w-6 shrink-0 text-accent">{j + 1}.</span>
                )}
                <span>
                  <Text>{it}</Text>
                </span>
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}

/** Feature cards in a responsive grid. */
export function FeatureGrid({ items, icon = "sparkles", columns = 3 }: { items: Feature[]; icon?: IconName; columns?: 2 | 3 }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 0.05} y={14} className="h-full">
          <div className="card flex h-full flex-col rounded-[1.5rem] p-6">
            <span className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon name={icon} className="size-4" />
              </span>
              <span className="numeral text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <h3 className="mt-5 text-lg">{f.title}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{f.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Product pricing as published on the product's own website. */
export function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div className={cn("grid gap-5", plans.length === 2 ? "md:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-3")}>
      {plans.map((pl, i) => (
        <Reveal key={pl.name} delay={i * 0.06} className="h-full">
          <div className={cn("card relative flex h-full flex-col rounded-[1.75rem] p-7", pl.featured && "border-accent/60 shadow-[0_0_60px_-24px_rgb(107_142_61/0.8)]")}>
            {pl.featured && <span className="label absolute right-6 top-6 rounded-full bg-accent-strong px-3 py-1 text-[0.6rem] text-on-accent">Popular</span>}
            <p className="label text-muted">{pl.name}</p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight">{pl.price}</span>
              {pl.period && <span className="text-sm text-muted">{pl.period}</span>}
            </p>
            {pl.note && <p className="mt-3 text-[0.95rem] text-muted">{pl.note}</p>}
            <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
              {pl.items.map((it) => (
                <li key={it} className="flex gap-3 text-[0.95rem]">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
