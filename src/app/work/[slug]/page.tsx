import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectArt } from "@/components/case-studies/project-list";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { DeviceDuo, FeatureGrid } from "@/components/ui/media";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Chips, Eyebrow, LinkCard, Section, SectionHead } from "@/components/ui/primitives";
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
            name: `${project.name} — ${project.category}`,
            description: project.seo.description,
            url: abs(path),
            creator: { "@type": "Organization", name: site.name, url: site.url },
            ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
          },
          breadcrumbLd([{ name: "Our Work", href: "/work" }, { name: project.name, href: path }]),
        ]}
      />
      <PageHero
        trail={[{ name: "Our Work", href: "/work" }, { name: project.name }]}
        badge={<span className="label inline-block rounded-full border border-line px-4 py-2">{project.category}</span>}
        h1={project.name}
        lead={project.summary}
        visual={
          media?.desktop ? (
            <DeviceDuo desktop={media.desktop} mobile={media.mobile} url={project.domain} priority />
          ) : (
            <ProjectArt project={project} priority className="mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none" />
          )
        }
        actions={
          <>
            {project.liveUrl ? (
              <Button href={project.liveUrl} arrow="up-right">
                Visit live site
              </Button>
            ) : (
              <Button href="/contact">Start a project</Button>
            )}
            <Button href={`/services/${service.slug}`} variant="ghost">
              {service.name}
            </Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow index="01" className="mb-6">
              Overview
            </Eyebrow>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
              {[
                ["Client", project.client],
                ["Category", project.category],
                ["Service", service.name],
                ["Live site", project.domain ?? "Not public"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-muted">{k}</dt>
                  <dd className="mt-1.5 font-medium [overflow-wrap:anywhere]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-fg/85">
            {project.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead index="02" eyebrow="What we built" title="Highlights of the build" em="the build" text={project.liveUrl ? "Everything below can be seen on the live site." : undefined} />
        <FeatureGrid items={project.highlights} icon={project.icon} />
        {project.scope && (
          <Reveal>
            <div className="mt-12 border-t border-line pt-8">
              <p className="label mb-5 text-muted">{project.scope.heading}</p>
              <Chips items={project.scope.items} />
            </div>
          </Reveal>
        )}
      </Section>

      {media && media.gallery.length > 0 && (
        <Section>
          <SectionHead index="03" eyebrow="Gallery" title="From the live site" em="live site" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 0.06} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}>
                <figure className="group relative h-full overflow-hidden rounded-[1.5rem] border border-line">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]" />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-black/55 px-4 py-1.5 text-[0.75rem] text-white backdrop-blur">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          {project.liveUrl && (
            <p className="mt-6 text-sm text-muted">
              Images and screenshots from{" "}
              <a href={project.liveUrl} target="_blank" rel="noopener" className="link-u text-fg">
                {project.domain}
              </a>
              .
            </p>
          )}
        </Section>
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

      <Section tight>
        <div className="grid gap-x-16 md:grid-cols-3">
          <LinkCard eyebrow="Service used" title={service.name} href={`/services/${service.slug}`} />
          <LinkCard eyebrow="Next project" title={next.name} href={`/work/${next.slug}`} />
          <LinkCard eyebrow="All work" title="Our Work" href="/work" />
        </div>
      </Section>

      <ContactCta heading="Want a website or store like this?" em="like this?" sub="Tell us about your business and what it needs to do online." />
    </>
  );
}
