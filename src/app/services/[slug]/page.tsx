import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectTiles } from "@/components/case-studies/project-list";
import { EnquiryForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ServiceVisual } from "@/components/products/product-visual";
import { ProcessSection } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Note, Section, SectionHead } from "@/components/ui/primitives";
import { products } from "@/content/products";
import { serviceBySlug, services } from "@/content/services";
import { ENQUIRY_INTERESTS, site } from "@/content/site";
import { projects } from "@/content/work";
import { abs, breadcrumbLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  return service ? buildMetadata(`/services/${service.slug}`, service.seo) : {};
}

const DEFAULT_INTEREST = {
  "website-design-development": "A website",
  "ecommerce-websites": "A website",
  "custom-web-applications": "A custom web application",
  "nfc-qr-solutions": "Something else",
  "whatsapp-bots": "WhatsApp or Telegram bots",
  "telegram-bots": "WhatsApp or Telegram bots",
  "ai-agents": "AI agents or business automation",
  "business-automation": "AI agents or business automation",
  "ai-integrations": "AI agents or business automation",
} as const satisfies Record<string, (typeof ENQUIRY_INTERESTS)[number]>;

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const relatedProducts = service.relatedProducts ? products.filter((p) => service.relatedProducts!.includes(p.slug)) : [];
  const relatedWork = projects.filter((p) => service.relatedWork.includes(p.slug));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.seo.description,
            url: abs(path),
            areaServed: "IN",
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
          breadcrumbLd([{ name: "Services", href: "/services" }, { name: service.name, href: path }]),
        ]}
      />

      <PageHero
        trail={[{ name: "Services", href: "/services" }, { name: service.name }]}
        h1={service.h1}
        lead={service.body}
        visual={<ServiceVisual service={service} />}
        actions={
          <>
            <Button href="#enquiry" variant="solid">
              Start a project
            </Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </>
        }
      />

      <Section>
        <SectionHead index="01" eyebrow="What you get" title="What you get" em="get" text={service.body} />
      </Section>

      <ProcessSection tone="dark" index="02" heading="How we work" eyebrow="How we work" />

      <Section>
        <SectionHead index="03" eyebrow="Related projects" title={relatedWork.length ? "Related projects" : "See it in action"} />
        {relatedWork.length > 0 && <ProjectTiles projects={relatedWork} />}
        {relatedProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 0.06} />
            ))}
          </div>
        )}
      </Section>

      <Section tone="sand">
        <SectionHead index="04" eyebrow="FAQ" title="Frequently asked questions" em="questions" />
        <Note>[Service FAQ to be added. The plan lists an FAQ for this page but gives no questions yet.]</Note>
      </Section>

      <Section id="enquiry">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHead index="05" eyebrow="Enquiry" title="Tell us about your project" em="your project" />
          <Reveal delay={0.1}>
            <div className="card rounded-[1.75rem] p-8 md:p-12">
              <EnquiryForm defaultInterest={DEFAULT_INTEREST[service.slug]} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
