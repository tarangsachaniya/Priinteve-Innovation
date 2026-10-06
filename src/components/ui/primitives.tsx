import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { PLACEHOLDER_RE } from "@/content/site";
import { cn, type Tone } from "@/lib/utils";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";

/** Renders plan copy; "[to confirm]" markers become visible placeholder chips. */
export function Text({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="placeholder-chip" data-placeholder>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------ Button */
type ButtonProps = {
  href: string;
  /** primary = clay fill · solid = ink fill · ghost = hairline outline */
  variant?: "primary" | "solid" | "ghost";
  children: ReactNode;
  arrow?: "right" | "up-right" | false;
} & Omit<ComponentProps<"a">, "href">;

const BTN = {
  base: "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[0.95rem] font-semibold transition-colors duration-500",
  primary: "bg-accent text-on-accent",
  solid: "bg-fg text-bg",
  ghost: "border border-fg/40 text-fg hover:border-fg",
};
/** the colour that wipes up from the bottom on hover */
const WIPE = {
  primary: "bg-fg",
  solid: "bg-accent",
  ghost: "bg-fg",
};
const HOVER_TEXT = {
  primary: "group-hover/btn:text-bg",
  solid: "group-hover/btn:text-on-accent",
  ghost: "group-hover/btn:text-bg",
};

/** Internal links use next/link; external, tel:, mailto: and #anchors use a plain anchor. Hover wipes colour upward. */
export function Button({ href, variant = "primary", arrow = "right", children, className, ...rest }: ButtonProps) {
  const cls = cn(BTN.base, BTN[variant], className);
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span aria-hidden="true" className={cn("absolute inset-0 translate-y-[102%] rounded-[50%_50%_0_0/100%_100%_0_0] transition-all duration-500 ease-out-expo group-hover/btn:translate-y-0 group-hover/btn:rounded-none", WIPE[variant])} />
      <span className={cn("relative flex items-center gap-3 transition-colors duration-500", HOVER_TEXT[variant])}>
        {children}
        {arrow && <Arrow aria-hidden="true" className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" />}
      </span>
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...(href.startsWith("http") ? { rel: "noopener" } : {})} {...rest}>
      {inner}
    </a>
  );
}

/* ------------------------------------------------------------ Labels */
export function Badge({ status, className }: { status: "Live" | "Coming soon"; className?: string }) {
  const live = status === "Live";
  return (
    <span className={cn("label inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5", className)}>
      <span className={cn("size-1.5 rounded-full bg-current", live && "animate-pulse", !live && "opacity-50")} />
      {status}
    </span>
  );
}

/** Small-caps label with a rule and optional chapter number: "01 — What we make". */
export function Eyebrow({ children, className, index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-3 text-muted", className)}>
      {index && <span className="text-accent">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ Section */
/** Full-bleed band on paper (`light`, `sand`), espresso (`dark`) or clay (`clay`). */
export function Section({ children, tone = "light", tight, id, className }: { children: ReactNode; tone?: Tone; tight?: boolean; id?: string; className?: string }) {
  return (
    <section id={id} data-tone={tone} className={cn("relative bg-bg text-fg", tight ? "py-16 md:py-20" : "py-24 md:py-36", className)}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  em,
  index,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  /** phrase in the title to set in italic clay */
  em?: string;
  index?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-14 max-w-4xl md:mb-20", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={10}>
          <Eyebrow index={index} className="mb-7">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Heading em={em} className="text-[clamp(2.5rem,6vw,5rem)]">
        {title}
      </Heading>
      {text && (
        <Reveal delay={0.2}>
          <p className="mt-7 max-w-2xl text-xl text-muted">
            <Text>{text}</Text>
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ Lists */
/** Hairline-ruled list rows with a small clay dash. */
export function Checklist({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn("border-t border-line", columns && "md:grid md:grid-cols-2 md:gap-x-16")}>
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 4) * 0.04} y={12}>
          <li className="flex gap-5 border-b border-line py-5 text-lg">
            <span aria-hidden="true" className="mt-[0.85em] h-px w-5 shrink-0 bg-accent" />
            <span>
              <Text>{item}</Text>
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/** Numbered editorial rows: italic numeral left, copy right. */
export function Steps({ items }: { items: ({ title?: string; text: string } | string)[]; columns?: 3 | 4 }) {
  return (
    <ol className="border-t border-line">
      {items.map((it, i) => {
        const step = typeof it === "string" ? { text: it } : it;
        return (
          <Reveal key={i} y={16}>
            <li className="grid items-baseline gap-4 border-b border-line py-8 md:grid-cols-[8rem_1fr] md:gap-10 md:py-10">
              <span aria-hidden="true" className="numeral text-5xl text-accent md:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {step.title && <h3 className="text-3xl md:text-4xl">{step.title}</h3>}
                <p className={cn("max-w-2xl text-xl", step.title ? "mt-3 text-muted" : "text-fg")}>
                  <Text>{step.text}</Text>
                </p>
              </div>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-4xl border-t border-line">
      {items.map(({ q, a }, i) => (
        <Reveal key={q} delay={(i % 4) * 0.04} y={12}>
          <details className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 font-serif text-2xl leading-snug md:text-3xl [&::-webkit-details-marker]:hidden">
              <span className="flex gap-6">
                <span className="numeral mt-1 text-xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <Text>{q}</Text>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-current transition-all duration-500 group-open:rotate-45 group-open:bg-fg group-open:text-bg">
                <Plus aria-hidden="true" className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-8 pl-14 pr-16 text-lg text-muted">
              <Text>{a}</Text>
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function Note({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("mt-8 max-w-3xl rounded-2xl border border-dashed border-fg/40 px-6 py-5 text-base text-fg", className)}>
      <Text>{children}</Text>
    </p>
  );
}

export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((c) => (
        <li key={c} className="rounded-full border border-fg/40 px-5 py-2.5 text-base">
          {c}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ CTA / links */
export function CtaBand({ heading, sub, children, em }: { heading: string; sub?: string; children: ReactNode; em?: string }) {
  return (
    <Section tone="brand" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-white/10 blur-3xl" />
      <div className="relative max-w-5xl">
        <Heading em={em} className="text-[clamp(2.8rem,7.4vw,6.4rem)]">
          {heading}
        </Heading>
        {sub && (
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-xl text-fg/90">{sub}</p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-3">{children}</div>
        </Reveal>
      </div>
    </Section>
  );
}

export function LinkCard({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between gap-4 border-t border-line py-8 transition-colors hover:text-accent">
      <span>
        <span className="label text-muted">{eyebrow}</span>
        <span className="mt-2 block font-serif text-3xl md:text-4xl">{title}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="size-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </Link>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Reveal>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-fg/60">
              {head.map((h) => (
                <th key={h} scope="col" className="label py-4 pr-6 text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line transition-colors hover:bg-fg/[0.03]">
                {r.map((c, j) => (
                  <td key={j} className={cn("py-6 pr-6 align-top", j === 0 ? "font-serif text-3xl" : "text-muted")}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
