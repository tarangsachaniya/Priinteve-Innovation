import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { nav } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "./logo";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="label mb-6 font-sans text-muted">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-u text-[1.05rem]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-bg pt-24 text-fg">
      <div className="container-x">
        <p className="max-w-4xl font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]" style={{ fontVariationSettings: '"SOFT" 60' }}>
          Print any thing, <span className="em">anywhere,</span> on demand.
        </p>

        <div className="mt-20 grid gap-14 border-t border-line pt-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo full />
            <ul className="mt-8 space-y-3 text-[1.02rem]">
              <li>
                <a href={site.phoneHref} className="link-u inline-flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-4 text-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-u inline-flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-4 text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.cardsUrl} rel="noopener" className="link-u text-muted hover:text-fg">
                  Nectcard sign-in · cards.priinteve.com
                </a>
              </li>
            </ul>
          </div>
          <Col title="Products" links={nav.products} />
          <Col title="Services and Our Work" links={[...nav.services, { label: "Our Work", href: "/work" }]} />
          <Col title="Company" links={[...nav.company, ...nav.legal]} />
        </div>

        <div className="label mt-16 flex flex-col justify-between gap-3 border-t border-line pt-6 text-muted sm:flex-row">
          <span>
            © {site.year} {site.name} (India)
          </span>
          <span>priinteve.com</span>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-serif text-[clamp(4rem,19vw,17rem)] italic leading-[0.8] text-fg/[0.06]" style={{ fontVariationSettings: '"SOFT" 100' }}>
        Priinteve
      </p>
    </footer>
  );
}
