import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Faq, Section, SectionHead } from "@/components/ui/primitives";
import { faqGroups } from "@/content/faq";
import { contactPage } from "@/content/pages";
import { products } from "@/content/products";
import { CTA_TEXT, PROJECT_TYPES, site } from "@/content/site";
import { breadcrumbLd, buildMetadata, faqLd, organizationLd } from "@/lib/seo";

export const metadata = buildMetadata("/contact", contactPage.seo);

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone },
  { label: "Company", value: site.name, icon: Building2 },
  { label: "Location", value: site.location.line, icon: MapPin },
];

const contactFaqs = faqGroups.find((g) => g.id === "working")!.items;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[organizationLd, breadcrumbLd([{ name: "Contact", href: "/contact" }]), faqLd(contactFaqs)]} />
      <PageHero trail={[{ name: "Contact" }]} h1={contactPage.h1} em="what you want to build" lead={CTA_TEXT} />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {details.map((d) => {
                const Ico = d.icon;
                const inner = (
                  <>
                    <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Ico aria-hidden="true" className="size-5" />
                    </span>
                    <span className="label mt-4 block text-muted">{d.label}</span>
                    <span className="mt-1 block break-words font-display text-lg font-semibold leading-snug">{d.value}</span>
                  </>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a href={d.href} className="card card-hover block h-full rounded-[1.5rem] p-5">
                        {inner}
                      </a>
                    ) : (
                      <div className="card h-full rounded-[1.5rem] p-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-muted">{contactPage.next}</p>
              <div className="mt-8 border-t border-line pt-8">
                <p className="label mb-4 text-muted">We can help with</p>
                <ul className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.filter((t) => t !== "Other").map((t) => (
                    <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-[0.85rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-line pt-8">
                <p className="label mb-4 text-muted">Using one of our products?</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <Link href={p.liveUrl ?? `/products/${p.slug}`} {...(p.liveUrl ? { target: "_blank", rel: "noopener" } : {})} className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-[0.92rem] transition-colors hover:border-accent">
                        {p.name}
                        <ArrowUpRight aria-hidden="true" className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="card rounded-[2rem] p-8 md:p-12 lg:sticky lg:top-28">
              <h2 className="mb-2 text-2xl">Send an enquiry</h2>
              <p className="mb-8 text-muted">Tell us about your business and what you need.</p>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="01" eyebrow="FAQ" title="Before you get in touch" em="get in touch" />
          <Faq items={contactFaqs} />
        </div>
      </Section>
    </>
  );
}
