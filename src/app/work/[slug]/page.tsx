import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectArt } from "@/components/case-studies/project-list";
import { Reveal } from "@/components/motion/reveal";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Chips, Eyebrow, LinkCard, Section, SectionHead, Text } from "@/components/ui/primitives";
import { caseStudyTemplate as tpl } from "@/content/pages";
import { serviceBySlug } from "@/content/services";
import { projectBySlug, projects } from "@/content/work";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = projectBySlug((await params).slug);
  return project ? buildMetadata(`/work/${project.slug}`, project.seo) : {};
}

function Block({ label, index, children }: { label: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal className="border-t border-line pt-8">
      <Eyebrow index={index} className="mb-6">
        {label}
      </Eyebrow>
      {children}
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();
  const service = serviceBySlug(project.service)!;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const path = `/work/${project.slug}`;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Work", href: "/work" }, { name: project.name, href: path }])} />
      <PageHero
        trail={[{ name: "Our Work", href: "/work" }, { name: project.name }]}
        badge={<span className="label inline-block rounded-full border border-fg/40 px-4 py-2">{project.category}</span>}
        h1={`${project.name}: website for ${project.client}`}
        em={`${project.name}:`}
        lead={project.summary}
        visual={<ProjectArt project={project} arch className="mx-auto aspect-[3/4] w-full max-w-sm lg:max-w-[26rem]" />}
        actions={
          <>
            <Button href="/contact" variant="solid">
              Start a project
            </Button>
            <Button href={`/services/${service.slug}`} variant="ghost">
              {service.name}
            </Button>
          </>
        }
      />

      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:gap-24">
          <Block index="01" label="The goal">
            <p className="font-serif text-3xl leading-snug">{project.summary}</p>
          </Block>
          <Block index="02" label="What we built">
            <p className="text-xl text-muted">
              <Text>{tpl.built}</Text>
            </p>
          </Block>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead index="03" eyebrow="Features and technology" title="Technology" em="Technology" />
        <Chips items={tpl.technology} />
        <p className="mt-6 text-base text-muted">
          <Text>{tpl.technologyNote}</Text>
        </p>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:gap-24">
          <Block index="04" label="Outcome">
            <p className="text-xl text-muted">
              <Text>{tpl.outcome}</Text>
            </p>
          </Block>
          <Block index="05" label="Live link">
            <p className="text-xl text-muted">
              <Text>{tpl.liveSite}</Text>
            </p>
          </Block>
        </div>
      </Section>

      <Section tone="sand" tight>
        <div className="grid gap-x-16 md:grid-cols-2">
          <LinkCard eyebrow="Matching service" title={service.name} href={`/services/${service.slug}`} />
          <LinkCard eyebrow="Next project" title={next.name} href={`/work/${next.slug}`} />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
