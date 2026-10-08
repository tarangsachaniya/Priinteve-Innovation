import { cn } from "@/lib/utils";

/**
 * Endless large-type marquee. Each track holds two identical groups and slides by exactly -50%, so the
 * loop restarts on an identical frame: no jump, no gap (every group carries the same trailing gap).
 * Row 1 is set solid, row 2 as an outline and runs the other way. Pauses on hover; with reduced motion
 * the duplicate is hidden and the words wrap, static.
 */
function Row({ items, reverse, duration, outline, label }: { items: string[]; reverse?: boolean; duration: number; outline?: boolean; label: string }) {
  const group = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className={cn("marquee-group", hidden && "marquee-dup")}>
      {items.map((w) => (
        <li key={w} className="flex items-center gap-[var(--gap)]">
          <span className={cn(outline && "marquee-outline")}>{w}</span>
          <span aria-hidden="true" className="grid size-[0.42em] place-items-center">
            <span className="size-[0.28em] rotate-45 rounded-[0.05em] bg-accent" />
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee", reverse && "marquee-reverse")} style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}>
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export function Marquee({ products, solutions }: { products: string[]; solutions: string[] }) {
  return (
    <section aria-label="Our products and what we build" data-tone="dark" className="relative overflow-hidden bg-bg py-10 text-fg md:py-16">
      <div className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-semibold uppercase leading-[1.02] tracking-[-0.035em]">
        <Row items={products} duration={70} label="Our products" />
        <Row items={solutions} reverse outline duration={90} label="What we build" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent md:w-40" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent md:w-40" />
    </section>
  );
}
