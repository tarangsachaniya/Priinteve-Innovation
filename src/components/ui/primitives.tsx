import { ArrowRight, ArrowUpRight, Mail, Phone, Plus } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { PLACEHOLDER_RE } from "@/content/site";
import type { FaqItem } from "@/content/types";
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

/* ------------------------------------------------------------ CTA system */
/*
 * One CTA family for the whole site:
 * - primary   : olive pill with a soft glow and an arrow chip (the one main action in a block)
 * - secondary : hairline pill on the same geometry (alias `ghost`)
 * - TextLink  : inline action, accent or the blue "explore" accent, with an up-right arrow
 * Every pill shares height (3.25rem), radius, type, arrow chip and the same 0.45s expo easing.
 */
type ButtonProps = {
  href: string;
  variant?: "primary" | "solid" | "secondary" | "ghost";
  children: ReactNode;
  arrow?: "right" | "up-right" | false;
} & Omit<ComponentProps<"a">, "href">;

const BTN = {
  base: "group/btn relative inline-flex h-[3.25rem] items-center justify-center gap-3 whitespace-nowrap rounded-full pl-6 pr-2 text-[0.93rem] font-semibold transition-[background-color,border-color,box-shadow,color,transform] duration-[var(--dur)] ease-[var(--ease)] active:scale-[0.98]",
  plain: "px-6",
  primary: "bg-accent-strong text-on-accent shadow-[0_0_30px_-10px_rgb(107_142_61/0.85)] hover:shadow-[0_0_40px_-6px_rgb(157_189_106/0.9)]",
  secondary: "border border-line bg-fg/[0.03] text-fg hover:border-accent/70 hover:bg-accent-soft",
};

const isExternal = (href: string) => href.startsWith("http");

/** Internal links use next/link; external, tel:, mailto: and #anchors use a plain anchor. */
export function Button({ href, variant = "primary", arrow = "right", children, className, ...rest }: ButtonProps) {
  const secondary = variant === "ghost" || variant === "secondary";
  const cls = cn(BTN.base, !arrow && BTN.plain, secondary ? BTN.secondary : BTN.primary, className);
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      {children}
      {arrow && (
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-[var(--dur)]", secondary ? "bg-fg/[0.07] group-hover/btn:bg-accent-strong group-hover/btn:text-on-accent" : "bg-black/15")}>
          <Arrow aria-hidden="true" className={cn("size-4 transition-transform duration-[var(--dur)] ease-[var(--ease)]", arrow === "up-right" ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" : "group-hover/btn:translate-x-0.5")} />
        </span>
      )}
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...(isExternal(href) ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
      {inner}
    </a>
  );
}

/** Inline text action. `blue` is the deliberate "explore" accent used for secondary links in lists. */
export function TextLink({ href, children, tone = "accent", className }: { href: string; children: ReactNode; tone?: "accent" | "blue"; className?: string }) {
  const cls = cn(
    "group/tl inline-flex items-center gap-1.5 font-semibold transition-colors duration-[var(--dur)]",
    tone === "blue" ? "text-link hover:text-link-strong" : "text-accent hover:text-fg",
    className,
  );
  const inner = (
    <>
      <span className="link-u">{children}</span>
      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-[var(--dur)] ease-[var(--ease)] group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5" />
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} {...(isExternal(href) ? { target: "_blank", rel: "noopener" } : {})}>
      {inner}
    </a>
  );
}

/* ------------------------------------------------------------ Labels */
export function Badge({ status, className }: { status: "Live" | "Coming soon"; className?: string }) {
  const live = status === "Live";
  return (
    <span className={cn("label inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5 text-[0.62rem]", className)}>
      <span className={cn("size-1.5 rounded-full bg-current", live && "animate-pulse", !live && "opacity-50")} />
      {status}
    </span>
  );
}

/** Small-caps label with a rule and optional chapter number: "01 · What we make". */
export function Eyebrow({ children, className, index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-3 text-muted", className)}>
      {index && <span className="text-accent">{index}</span>}
      <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ Section */
/** Full-bleed band: base (`light`), lifted (`sand`), deepest (`dark`) or violet (`brand`). */
export function Section({ children, tone = "light", tight, id, className }: { children: ReactNode; tone?: Tone; tight?: boolean; id?: string; className?: string }) {
  return (
    <section id={id} data-tone={tone} className={cn("relative overflow-x-clip bg-bg text-fg", tight ? "py-14 md:py-20" : "py-24 md:py-32", className)}>
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
  /** phrase in the title set in the violet accent */
  em?: string;
  index?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-12 max-w-3xl md:mb-16", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={10}>
          <Eyebrow index={index} className="mb-7">
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Heading em={em} className="text-[clamp(2.1rem,4.8vw,3.9rem)] leading-[1.02]">
        {title}
      </Heading>
      {text && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            <Text>{text}</Text>
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ Lists */
/** Hairline-ruled list rows with a small violet dash. */
export function Checklist({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn("border-t border-line", columns && "md:grid md:grid-cols-2 md:gap-x-16")}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={(i % 4) * 0.04} y={12} className="flex gap-5 border-b border-line py-4 text-base">
            <span aria-hidden="true" className="mt-[0.6em] size-[5px] shrink-0 rotate-45 bg-accent" />
            <span>
              <Text>{item}</Text>
            </span>
          </Reveal>
      ))}
    </ul>
  );
}

/** Numbered rows: numeral left, copy right. */
export function Steps({ items }: { items: ({ title?: string; text: string } | string)[]; columns?: 3 | 4 }) {
  return (
    <ol className="border-t border-line">
      {items.map((it, i) => {
        const step = typeof it === "string" ? { text: it } : it;
        return (
          <Reveal as="li" key={i} y={16} className="grid items-baseline gap-4 border-b border-line py-8 md:grid-cols-[6rem_1fr] md:gap-10 md:py-8">
              <span aria-hidden="true" className="numeral text-3xl text-accent md:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {step.title && <h3 className="text-2xl md:text-3xl">{step.title}</h3>}
                <p className={cn("max-w-2xl text-lg", step.title ? "mt-3 text-muted" : "text-fg")}>
                  <Text>{step.text}</Text>
                </p>
              </div>
            </Reveal>
        );
      })}
    </ol>
  );
}

export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("max-w-4xl border-t border-line", className)}>
      {items.map(({ q, a, link }, i) => (
        <Reveal key={q} delay={(i % 4) * 0.04} y={12}>
          <details className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 font-display text-lg font-medium leading-snug md:text-xl [&::-webkit-details-marker]:hidden">
              <span className="flex gap-5">
                <span className="font-serif text-2xl italic leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <Text>{q}</Text>
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-open:rotate-45 group-open:border-accent group-open:bg-accent-strong group-open:text-on-accent">
                <Plus aria-hidden="true" className="size-4" />
              </span>
            </summary>
            <div className="max-w-3xl pb-7 pl-12 pr-4 text-base text-muted md:pr-14">
              <p>
                <Text>{a}</Text>
              </p>
              {link && (
                <Link href={link.href} {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="group/l mt-3 inline-flex items-center gap-1.5 font-semibold text-accent">
                  <span className="link-u">{link.label}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                </Link>
              )}
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((c) => (
        <li key={c} className="rounded-full border border-line bg-fg/[0.03] px-5 py-2.5 text-[0.95rem]">
          {c}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------ CTA / links */
/** Renders `text` with the `em` phrase highlighted (no word-by-word masking, so nothing can clip). */
export function EmText({ text, em }: { text: string; em?: string }) {
  const at = em ? text.indexOf(em) : -1;
  if (!em || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="em">{em}</span>
      {text.slice(at + em.length)}
    </>
  );
}

export type CtaAction = { href: string; label: string; value?: string; icon?: "arrow" | "phone" | "mail"; primary?: boolean };

const CTA_ICON = { arrow: ArrowUpRight, phone: Phone, mail: Mail };

/**
 * Closing call to action: deep-green band with grain, a slow ambient glow and an outlined watermark.
 * The heading runs wide with its phrase in cream serif italic over a drawn underline; the actions
 * sit below as tiles (primary project tile, then phone and email).
 */
export function CtaBand({ heading, sub, em, eyebrow = "Let's work together", actions }: { heading: string; sub?: string; em?: string; eyebrow?: string; actions: CtaAction[] }) {
  return (
    <section data-tone="brand" data-dock-stop className="grain relative isolate overflow-hidden bg-bg py-24 text-fg md:py-32">
      <div aria-hidden="true" className="drift pointer-events-none absolute -right-40 -top-48 -z-10 size-[42rem] rounded-full bg-[#6b8e3d]/40 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -left-40 -z-10 size-[34rem] rounded-full bg-[#eed89e]/10 blur-[120px]" />
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-[0.2em] right-0 select-none whitespace-nowrap font-display text-[clamp(6rem,20vw,19rem)] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(250_248_242/0.09)]">
        Let&apos;s talk
      </p>
      <div className="container-x relative z-10">
        <Reveal>
          <p className="label mb-8 flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
            {eyebrow}
          </p>
          <h2 className="max-w-[22ch] text-[clamp(2.2rem,5.6vw,4.8rem)] leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
            <CtaHeading text={heading} em={em} />
          </h2>
          {sub && <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{sub}</p>}
        </Reveal>
        <Reveal delay={0.15} className={cn("mt-12 grid gap-3 md:mt-16", actions.length > 2 ? "md:grid-cols-[1.4fr_1fr_1fr]" : actions.length === 2 ? "md:grid-cols-[1.4fr_1fr]" : "md:max-w-xl")}>
          {actions.map((a) => {
            const Icon = CTA_ICON[a.icon ?? "arrow"];
            const cls = cn(
              "group relative flex min-h-[8rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1",
              a.primary ? "border-transparent bg-accent text-on-accent hover:shadow-[0_30px_60px_-24px_rgb(238_216_158/0.55)]" : "border-line bg-fg/[0.04] hover:border-accent/60 hover:bg-fg/[0.07]",
            );
            const inner = (
              <>
                <span className="flex items-start justify-between gap-4">
                  <span className={cn("label", a.primary ? "opacity-70" : "text-muted")}>{a.label}</span>
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:-rotate-12 group-hover:scale-110", a.primary ? "bg-[#18330d] text-accent" : "bg-accent-soft text-accent")}>
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                </span>
                <span className={cn("mt-6 block break-words font-display font-semibold tracking-[-0.02em]", a.primary ? "text-[clamp(1.5rem,2.4vw,2rem)]" : "text-lg md:text-xl")}>{a.value ?? a.label}</span>
              </>
            );
            return a.href.startsWith("/") ? (
              <Link key={a.href} href={a.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <a key={a.href} href={a.href} className={cls} {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                {inner}
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/** Heading with the `em` phrase in serif italic over an underline that draws in once. */
function CtaHeading({ text, em }: { text: string; em?: string }) {
  const at = em ? text.indexOf(em) : -1;
  if (!em || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="em draw-underline">{em}</span>
      {text.slice(at + em.length)}
    </>
  );
}

export function LinkCard({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between gap-4 border-t border-line py-8 transition-colors hover:text-accent">
      <span>
        <span className="label text-muted">{eyebrow}</span>
        <span className="mt-2 block font-display text-2xl font-semibold md:text-3xl">{title}</span>
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
            <tr className="border-b border-line">
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
                  <td key={j} className={cn("py-5 pr-6 align-top", j === 0 ? "font-display text-xl font-semibold" : "text-muted")}>
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
