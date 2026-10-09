"use client";

import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const VERBS = /(print|build|automate|launch)/gi;

/** Headline with the accent phrase (`em`) highlighted, or, by default, the four verbs. */
function Headline({ text, em }: { text: string; em?: string }) {
  const at = em ? text.indexOf(em) : -1;
  if (em && at >= 0)
    return (
      <>
        {text.slice(0, at)}
        <span className="em">{em}</span>
        {text.slice(at + em.length)}
      </>
    );
  return (
    <>
      {text.split(VERBS).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="em">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** One row of the stack. The text drifts right and a fill sweeps in from the left on hover or focus. */
function Row({ href, icon, label, children, primary, external }: { href: string; icon: ReactNode; label: string; children: ReactNode; primary?: boolean; external?: boolean }) {
  const cls = cn(
    "group/row relative isolate flex min-h-[4.5rem] items-center justify-between gap-4 overflow-hidden px-5 py-4 transition-colors duration-500 md:px-7",
    primary ? "min-h-[6.5rem] bg-accent-strong text-on-accent md:min-h-[8rem]" : "text-fg",
  );
  const inner = (
    <>
      {/* fill sweep */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100",
          primary ? "bg-fg" : "bg-fg/[0.08]",
        )}
      />
      <span className={cn("flex min-w-0 items-center gap-4 transition-transform duration-500 ease-out-expo group-hover/row:translate-x-1.5 group-focus-visible/row:translate-x-1.5", primary && "group-hover/row:text-bg group-focus-visible/row:text-bg")}>
        <span aria-hidden="true" className={cn("grid size-9 shrink-0 place-items-center rounded-full border", primary ? "border-current" : "border-line text-accent")}>
          {icon}
        </span>
        <span className="min-w-0">
          <span className={cn("label block text-[0.62rem]", primary ? "opacity-70" : "text-muted")}>{label}</span>
          <span className={cn("block truncate font-display font-semibold tracking-tight", primary ? "text-2xl md:text-4xl" : "text-lg md:text-xl")}>{children}</span>
        </span>
      </span>
      {external ? (
        <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover/row:-translate-y-1 group-hover/row:translate-x-1" />
      ) : (
        <ArrowRight aria-hidden="true" className={cn("shrink-0 transition-transform duration-500 ease-out-expo group-hover/row:translate-x-2 group-focus-visible/row:translate-x-2", primary ? "size-7 group-hover/row:text-bg" : "size-5")} />
      )}
    </>
  );
  const focus = "focus-visible:outline-offset-[-4px]";
  return href.startsWith("/") ? (
    <Link href={href} className={cn(cls, focus)}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cn(cls, focus)}>
      {inner}
    </a>
  );
}

/**
 * Closing call to action. Headline on the left; on the right a single bordered panel holding the three
 * ways to reach us. One interaction idea: a soft spotlight follows the cursor across the panel
 * (fine pointers, motion allowed), while each row answers with a fill sweep and a nudge.
 */
export function ContactCtaBand({ heading, sub, em, eyebrow = "Let's work together" }: { heading: string; sub?: string; em?: string; eyebrow?: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = panel.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
  };

  return (
    <section data-tone="brand" aria-label={eyebrow} className="relative isolate overflow-hidden bg-bg py-20 text-fg md:py-28 lg:py-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -left-40 -z-10 size-[34rem] rounded-full bg-[#eed89e]/10 blur-[120px]" />

      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div>
          <p className="label mb-8 flex items-center gap-3 text-muted">
            <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
            {eyebrow}
          </p>
          <h2 className="text-[clamp(2.2rem,6.4vw,5.4rem)] leading-[1.02] tracking-[-0.04em]">
            <Headline text={heading} em={em} />
          </h2>
          {sub && <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{sub}</p>}
        </div>

        <div
          ref={panel}
          onPointerMove={move}
          className="cta-panel relative isolate divide-y divide-line overflow-hidden rounded-[1.75rem] border border-line bg-bg-2/70 backdrop-blur-sm"
        >
          <span
            aria-hidden="true"
            className="cta-spot pointer-events-none absolute inset-0 z-10"
          />
          <Row href="/contact" label="Start here" icon={<ArrowRight className="size-4" />} primary>
            Start a project
          </Row>
          <Row href={site.phoneHref} label="Call us" icon={<Phone className="size-4" />}>
            {site.phone}
          </Row>
          <Row href={`mailto:${site.email}`} label="Email us" icon={<Mail className="size-4" />}>
            {site.email}
          </Row>
        </div>
      </div>
    </section>
  );
}
