import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/json-ld";
import { Prose } from "@/components/ui/media";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/primitives";
import { formatDate } from "@/content/blocks";
import { LEGAL_UPDATED, legalBySlug, legalPages } from "@/content/legal";
import { site } from "@/content/site";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export function legalMetadata(slug: string): Metadata {
  const page = legalBySlug(slug);
  return page ? buildMetadata(`/${slug}`, { title: `${page.title} | ${site.name}`, description: page.description }) : {};
}

const BACK = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Legal page: title, last-updated date, contents, the full text, and links to every other legal page. */
export function LegalPage({ slug }: { slug: string }) {
  const page = legalBySlug(slug);
  if (!page) notFound();
  const path = `/${slug}`;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: page.title, href: path }])} />
      <PageHero trail={[{ name: "Legal" }, { name: page.title }]} h1={page.title} lead={page.intro} badge={<span className="label text-muted">Last updated {formatDate(LEGAL_UPDATED)}</span>} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <article className="min-w-0">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-h`} className="mb-5 text-2xl">
                  {s.heading}
                </h2>
                <Prose blocks={s.body} />
              </section>
            ))}
          </article>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="On this page" className="card rounded-[1.5rem] p-6">
              <p className="label mb-4 text-muted">On this page</p>
              <ol className="space-y-2 text-[0.9rem]">
                {page.sections.map((s) => (
                  <li key={s.id}>
                    <Link href={`#${s.id}`} className="link-u text-muted hover:text-fg">
                      {s.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Legal pages" className="card rounded-[1.5rem] p-6">
              <p className="label mb-4 text-muted">Legal</p>
              <ul className="space-y-2 text-[0.9rem]">
                {legalPages.map((p) => (
                  <li key={p.slug}>
                    {p.slug === slug ? (
                      <span aria-current="page" className="font-semibold text-accent">
                        {p.title}
                      </span>
                    ) : (
                      <Link href={`/${p.slug}`} className="link-u">
                        {p.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Section>
      <Section tone="sand" tight>
        <nav aria-label="More" className="flex flex-wrap items-center gap-3">
          <span className="label mr-2 text-muted">Go to</span>
          {BACK.filter((b) => b.href !== path).map((b) => (
            <Link key={b.href} href={b.href} className="rounded-full border border-line px-4 py-2 text-[0.9rem] transition-colors hover:border-accent hover:text-accent">
              {b.label}
            </Link>
          ))}
        </nav>
      </Section>
    </>
  );
}
