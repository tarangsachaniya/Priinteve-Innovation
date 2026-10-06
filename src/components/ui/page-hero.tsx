import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
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
  /** soft paper tint for the whole hero (defaults to bone) */
  tint?: string;
  em?: string;
};

/** Inner-page hero: big soft serif headline on paper, an arch window on the right when there is a visual. */
export function PageHero({ h1, lead, trail, badge, actions, visual, tint, em }: Props) {
  return (
    <header data-tone="light" className={cn("relative overflow-hidden bg-bg pb-20 pt-36 text-fg md:pb-28 md:pt-48", tint && "tint")} style={tint ? ({ "--tint": tint } as React.CSSProperties) : undefined}>
      <div className="container-x">
        <div className={visual ? "grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]" : ""}>
          <div>
            {trail && <Breadcrumbs trail={trail} />}
            {badge && (
              <Reveal className="mb-7" y={10}>
                {badge}
              </Reveal>
            )}
            <Heading as="h1" em={em} className="max-w-5xl text-[clamp(2.9rem,7vw,6.4rem)]">
              {h1}
            </Heading>
            {lead && (
              <Reveal delay={0.25}>
                <p className="mt-9 max-w-2xl text-xl text-fg/80 md:text-2xl md:leading-snug">
                  <Text>{lead}</Text>
                </p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.35}>
                <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
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
