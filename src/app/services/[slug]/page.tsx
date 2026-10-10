import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectTiles } from "@/components/case-studies/project-list";
import { ProductCard } from "@/components/products/product-card";
import { ServiceVisual } from "@/components/products/product-visual";
import { ContactCta } from "@/components/sections/shared";
import { BrandWork } from "@/components/services/brand-work";
import { ServiceCard } from "@/components/services/service-card";
import { JsonLd } from "@/components/ui/json-ld";
import { FeatureGrid } from "@/components/ui/media";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Checklist, Faq, Section, SectionHead } from "@/components/ui/primitives";
import { brandWork } from "@/content/brand-work";
import { products } from "@/content/products";
import { categoryOf, serviceBySlug, services, servicesIn } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/work";
import { abs, breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = serviceBySlug((await params).slug);
  return service ? buildMetadata(`/services/${service.slug}`, service.seo) : {};
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = serviceBySlug((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const category = categoryOf(service.category);
  const relatedProducts = service.relatedProducts ? products.filter((p) => service.relatedProducts!.includes(p.slug)) : [];
  const relatedWork = projects.filter((p) => service.relatedWork.includes(p.slug));
  const siblings = servicesIn(service.category).filter((s) => s.slug !== service.slug);
  const others = siblings.length ? siblings : services.filter((s) => s.slug !== service.slug).slice(0, 3);
  // the Branding page shows its own brand portfolio in place of related web projects
  const portfolio = service.slug === "branding" ? brandWork : [];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: category.name,
            description: service.seo.description,
            url: abs(path),
            areaServed: "IN",
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
          faqLd(service.faq),
          breadcrumbLd([{ name: "Services", href: "/services" }, { name: service.name, href: path }]),
        ]}
      />

      <PageHero
        trail={[{ name: "Services", href: "/services" }, { name: service.name }]}
        badge={<span className="label inline-block rounded-full border border-line px-4 py-2">{category.name}</span>}
        h1={service.h1}
        lead={service.body}
        visual={<ServiceVisual service={service} />}
        actions={
          <>
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="01" eyebrow="What's included" title="What we build" em="build" text={service.card} />
          <Checklist items={service.includes} columns />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead index="02" eyebrow="Use cases" title="Where it helps" />
        <FeatureGrid items={service.useCases} icon={service.icon} columns={service.useCases.length === 4 ? 2 : 3} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="03" eyebrow="Deliverables" title="What you get" em="get" text="Every project is scoped in writing before work begins. Typical deliverables:" />
          <Checklist items={service.deliverables} />
        </div>
      </Section>

      {portfolio.length > 0 ? (
        <Section tone="dark" id="brand-work">
          <SectionHead index="04" eyebrow="Brand work" title="Identities, packaging and posts we have designed" em="we have designed" text="A selection of recent branding, packaging and social design projects." />
          <BrandWork projects={portfolio} />
        </Section>
      ) : (
        (relatedWork.length > 0 || relatedProducts.length > 0) && (
          <Section tone="dark">
            <SectionHead index="04" eyebrow={relatedWork.length ? "Related work" : "See it in action"} title={relatedWork.length ? "Related projects" : "Built on the same approach"} text={relatedWork.length ? undefined : "Our own products use the same approach we bring to client work."} />
            {relatedWork.length > 0 && <ProjectTiles projects={relatedWork} />}
            {relatedProducts.length > 0 && (
              <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${relatedWork.length ? "mt-14" : ""}`}>
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.slug} product={p} delay={i * 0.06} />
                ))}
              </div>
            )}
          </Section>
        )
      )}

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead index="05" eyebrow="FAQ" title={`${service.short ?? service.name} questions`} em="questions" className="mb-8 md:mb-8" />
            <Button href="/faq" variant="ghost">
              All questions
            </Button>
          </div>
          <Faq items={service.faq} />
        </div>
      </Section>

      <ContactCta />

      <Section tone="dark">
        <SectionHead index="06" eyebrow="More services" title={siblings.length ? `More in ${category.name}` : "Other services"} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} delay={i * 0.06} />
          ))}
        </div>
      </Section>
    </>
  );
}
