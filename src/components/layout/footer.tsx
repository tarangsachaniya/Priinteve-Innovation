import { FooterWordmark } from "./footer-wordmark";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { nav } from "@/content/navigation";
import { site } from "@/content/site";
import { CookieSettingsButton } from "./cookie-consent";
import { Logo } from "./logo";

type FooterLink = { label: string; href: string; note?: string };

/** One footer link list. All headings share one baseline, all lists start level. */
function Col({ title, links, label }: { title: string; links: FooterLink[]; label?: string }) {
  return (
    <nav aria-label={label ?? title}>
      <h2 className="label mb-5 font-sans text-muted">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-u text-[0.92rem] leading-snug">
              {l.label}
            </Link>
            {l.note && <span className="label ml-2 whitespace-nowrap text-[0.55rem] text-accent">Soon</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer data-tone="dark" className="grain relative overflow-hidden bg-bg pt-24 text-fg md:pt-32">
      <div className="container-x relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="label mb-6 flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="size-[5px] shrink-0 rotate-45 bg-accent" />
              Priinteve Innovations · Ahmedabad
            </p>
            <p className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]">
              We build products, websites, software and <span className="em">automation</span> that help businesses grow.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-[0.92rem] font-semibold text-on-accent transition-transform duration-300 hover:-translate-y-0.5">
              Start a project
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.92rem] font-semibold transition-colors hover:border-accent">
              Our products
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_repeat(4,minmax(0,1fr))]">
          {/* brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-6">
            <div className="mb-5 flex h-[1.15rem] items-center">
              <Logo full />
            </div>
            <p className="max-w-xs text-[0.92rem] leading-relaxed text-muted">
              {site.positioning}, founded in {site.founded}.
            </p>
            <h2 className="label mb-4 mt-8 font-sans text-muted">Contact</h2>
            <address className="space-y-3 text-[0.92rem] not-italic leading-snug">
              <p className="font-semibold">{site.name}</p>
              <p className="flex gap-2.5 text-muted">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.registeredAddress.line}
              </p>
              <a href={`mailto:${site.email}`} className="link-u flex w-fit gap-2.5 whitespace-nowrap">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.email}
              </a>
              <a href={site.phoneHref} className="link-u flex w-fit gap-2.5 whitespace-nowrap">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.phone}
              </a>
            </address>
            <a href={site.youtube} target="_blank" rel="noopener" className="link-u mt-6 inline-flex items-center gap-2 text-[0.88rem] text-muted hover:text-fg">
              Product videos on YouTube
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
          <Col title="Products" links={nav.products} />
          <Col title="Services" links={nav.footerServices} />
          <Col title="Company" links={nav.company} />
          <Col title="Legal" links={nav.footerLegal} />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center">
          <span>
            © {site.year} {site.name}. All rights reserved.
          </span>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {nav.legal.slice(0, 3).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-u hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="link-u hover:text-fg">
                Contact
              </Link>
            </li>
            <li>
              <CookieSettingsButton className="link-u hover:text-fg" />
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x relative z-10">
        <FooterWordmark />
      </div>
    </footer>
  );
}
