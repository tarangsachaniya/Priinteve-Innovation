import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";
import { Text } from "./primitives";

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="label flex flex-wrap items-center gap-2 text-muted">
        <li>
          <Link href="/" className="link-u hover:text-fg">
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.name} className="flex items-center gap-2" {...(i === trail.length - 1 ? { "aria-current": "page" as const } : {})}>
            <ChevronRight aria-hidden="true" className="size-3 opacity-60" />
            {c.href ? (
              <Link href={c.href} className="link-u hover:text-fg">
                {c.name}
              </Link>
            ) : (
              <span className="text-fg">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Props = {
  h1: string;
  lead?: string;
  trail?: Crumb[];
  badge?: ReactNode;
  actions?: ReactNode;
  /** right-hand visual, normally an <Arch> */
  visual?: ReactNode;
  em?: string;
};

/** Inner-page hero: confident sans headline over a faint grid and violet glow, a framed visual on the right when there is one. */
export function PageHero({ h1, lead, trail, badge, actions, visual, em }: Props) {
  return (
    <header data-tone="light" className="relative overflow-hidden bg-bg pb-16 pt-32 text-fg md:pb-24 md:pt-40">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-accent-strong/20 blur-[120px]" />
      <div className="container-x">
        <div className={visual ? "grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]" : ""}>
          <div>
            {trail && <Breadcrumbs trail={trail} />}
            {badge && (
              <Reveal className="mb-7" y={10}>
                {badge}
              </Reveal>
            )}
            <Heading as="h1" em={em} className="max-w-5xl text-[clamp(2.2rem,5vw,4rem)]">
              {h1}
            </Heading>
            {lead && (
              <Reveal delay={0.25}>
                <p className="mt-7 max-w-2xl text-lg text-muted md:text-xl md:leading-relaxed">
                  <Text>{lead}</Text>
                </p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.35}>
                <div className="mt-9 flex flex-wrap gap-3">{actions}</div>
              </Reveal>
            )}
          </div>
          {visual}
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
    </header>
  );
}
