import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/** The Priinteve bird mark beside the wordmark (no trailing period: the brand is "Priinteve"). The mark is a transparent PNG in /public. */
export function Logo({ full }: { full?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex items-center gap-2.5 font-display text-[1.25rem] font-semibold leading-none tracking-tight text-fg">
      <Image src="/logo-mark.png" alt="" width={547} height={373} priority className="h-[1.7rem] w-auto" />
      <span>{full ? site.brand : site.shortName}</span>
    </Link>
  );
}
