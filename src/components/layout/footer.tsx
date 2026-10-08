import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { nav } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "./logo";

type FooterLink = { label: string; href: string };

/** One footer link list. `title` is a small-caps heading; all headings share one baseline across columns. */
function Col({ title, label, links, className }: { title: string; label?: string; links: FooterLink[]; className?: string }) {
  return (
    <nav aria-label={label ?? title} className={className}>
      <h2 className="label mb-5 font-sans text-muted">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-u text-[0.95rem] leading-snug">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const SERVICE_LINKS: FooterLink[] = nav.serviceMenu.filter((m) => !m.children).map(({ label, href }) => ({ label, href }));
const AI_LINKS: FooterLink[] = nav.serviceMenu.find((m) => m.children)?.children ?? [];
const COMPANY_LINKS: FooterLink[] = [{ label: "Our Work", href: "/work" }, ...nav.company];

export function Footer() {
  return (
    <footer data-tone="dark" className="relative overflow-hidden bg-bg pt-24 text-fg">
      <div className="container-x">
        <p className="max-w-4xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.05]">
          Print any thing, <span className="em">anywhere,</span> on demand.
        </p>

        <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            {/* logo sits on the same line as the column headings; the lists below start level across all columns */}
            <div className="mb-5 flex h-[1.15rem] items-center">
              <Logo full />
            </div>
            <ul className="space-y-3 text-[0.95rem] leading-snug">
              <li>
                <a href={site.phoneHref} className="link-u inline-flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-u inline-flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.cardsUrl} rel="noopener" className="link-u inline-flex items-center gap-3 text-muted hover:text-fg">
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  Nectcard sign-in
                </a>
              </li>
            </ul>
          </div>

          <Col title="Products" links={nav.products} />
          <Col title="Web & Digital" label="Services: Web and Digital" links={SERVICE_LINKS} />
          <Col title="AI & Automation" label="Services: AI and Automation" links={AI_LINKS} />
          <Col title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center">
          <span>
            © {site.year} {site.name} (India)
          </span>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {nav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-u hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>priinteve.com</li>
          </ul>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-display text-[clamp(4rem,19vw,17rem)] font-bold leading-[0.8] text-fg/[0.04]">
        Priinteve
      </p>
    </footer>
  );
}
