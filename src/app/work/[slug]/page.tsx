import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/case-studies/case-gallery";
import { CaseHero } from "@/components/case-studies/case-hero";
import { NextProject } from "@/components/case-studies/next-project";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { Chips, Eyebrow, Section, SectionHead } from "@/components/ui/primitives";
import { getProduct } from "@/content/products";
import { serviceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { projectBySlug, projects } from "@/content/work";
import { abs, breadcrumbLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = projectBySlug((await params).slug);
  return project ? buildMetadata(`/work/${project.slug}`, project.seo) : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();
  const service = serviceBySlug(project.service)!;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const path = `/work/${project.slug}`;
  const media = project.media;
  const also = project.alsoUses ? getProduct(project.alsoUses.product) : null;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: `${project.name}: ${project.category}`,
            description: project.seo.description,
            url: abs(path),
            creator: { "@type": "Organization", name: site.name, url: site.url },
            ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
          },
          breadcrumbLd([{ name: "Our Work", href: "/work" }, { name: project.name, href: path }]),
        ]}
      />
      <CaseHero project={project} service={service} index={projects.indexOf(project)} total={projects.length} />

      {/* overview: editorial, with a drop cap */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <Eyebrow index="01" className="mb-6">
              The brief
            </Eyebrow>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] tracking-[-0.04em]">
              What {project.name} <span className="em">needed</span>
            </h2>
          </div>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-fg/85 md:text-xl md:leading-relaxed [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:mt-1 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-[4.6rem] [&>p:first-child]:first-letter:italic [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-accent">
            {project.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* build notes: a numbered ledger */}
      <Section tone="sand">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <SectionHead index="02" eyebrow="What we built" title="Build notes" em="notes" className="mb-0 md:mb-0" />
          {project.liveUrl && <p className="label max-w-xs text-muted">Everything below can be seen on the live site.</p>}
        </div>
        <ol className="grid border-t border-line md:grid-cols-2">
          {project.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={(i % 2) * 0.08} className="group relative isolate flex gap-6 overflow-hidden border-b border-line py-9 md:odd:pr-12 md:even:border-l md:even:pl-12">
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
              <span aria-hidden="true" className="w-12 shrink-0 font-serif text-[2.6rem] italic leading-[0.9] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] leading-tight tracking-[-0.03em]">{h.title}</h3>
                <p className="mt-3 max-w-md text-muted">{h.text}</p>
              </span>
            </Reveal>
          ))}
        </ol>
        {project.scope && (
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <p className="label text-muted">{project.scope.heading}</p>
              <Chips items={project.scope.items} />
            </div>
          </Reveal>
        )}
      </Section>

      {media && media.gallery.length > 0 && (
        <section data-tone="dark" aria-label="Gallery" className="relative overflow-x-clip bg-bg text-fg">
          <CaseGallery
            items={[...(media.cover.src !== media.desktop?.src ? [media.cover] : []), ...media.gallery]}
            head={<SectionHead index="03" eyebrow="Gallery" title="From the live site" em="live site" className="mb-0 md:mb-0" />}
          />
        </section>
      )}

      {also && project.alsoUses && (
        <Section tone="sand" tight>
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <Reveal>
              <Eyebrow className="mb-5">Also uses a Priinteve product</Eyebrow>
              <p className="font-display text-2xl font-medium leading-snug">{project.alsoUses.text}</p>
              <a href={project.alsoUses.href} target="_blank" rel="noopener" className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                <span className="link-u">See the live card</span>
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
            <ProductCard product={also} />
          </div>
        </Section>
      )}

      <NextProject project={next} />

      <ContactCta heading="Want a website or store like this?" em="like this?" sub="Tell us about your business and what it needs to do online." />
    </>
  );
}
