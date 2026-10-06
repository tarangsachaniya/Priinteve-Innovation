import Link from "next/link";
import { site } from "@/content/site";

/** Serif wordmark with a clay full stop. */
export function Logo({ full }: { full?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="font-serif text-[1.7rem] leading-none tracking-tight text-fg" style={{ fontVariationSettings: '"SOFT" 100' }}>
      {full ? site.name : site.shortName}
      <span className="text-accent">.</span>
    </Link>
  );
}
