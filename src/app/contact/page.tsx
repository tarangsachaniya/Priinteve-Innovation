import { ArrowUpRight } from "lucide-react";
import { EnquiryForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Section, Text } from "@/components/ui/primitives";
import { contactPage } from "@/content/pages";
import { CTA_TEXT, site } from "@/content/site";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/contact", contactPage.seo);

const details = [
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Website", value: "priinteve.com", href: site.url },
  { label: "Digital cards", value: "cards.priinteve.com", href: site.cardsUrl },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", href: "/contact" }])} />
      <PageHero tint="#f8dbe6" trail={[{ name: "Contact" }]} h1={contactPage.h1} em="Priinteve" lead={CTA_TEXT} />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <ul className="border-t border-line">
              {details.map((d, i) => (
                <Reveal key={d.label} delay={i * 0.05} y={12}>
                  <li>
                    <a href={d.href} {...(d.href.startsWith("http") ? { rel: "noopener" } : {})} className="group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors hover:text-accent">
                      <span>
                        <span className="label block text-muted">{d.label}</span>
                        <span className="mt-1 block font-serif text-3xl">{d.value}</span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="size-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <p className="mt-10 text-lg text-muted">
                <Text>{contactPage.next}</Text>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-surface p-8 shadow-[0_40px_80px_-50px_rgb(29_26_23/0.4)] md:p-12">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
