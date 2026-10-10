import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCollage } from "@/components/case-studies/project-collage";
import { WorkFacts, WorkIndex } from "@/components/case-studies/work-index";
import { ContactCta } from "@/components/sections/shared";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Section, SectionHead } from "@/components/ui/primitives";
import { workPage } from "@/content/pages";
import { getService } from "@/content/services";
import { projects } from "@/content/work";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/work", workPage.seo);

/** Services behind the client work: the builds (with their own pages) plus search and brand work. */
const USED = [
  ...Array.from(new Set(projects.map((p) => p.service)))
    .map(getService)
    .map((s) => ({ title: s.name, text: s.card, href: `/services/${s.slug}` })),
  ...(["seo-google-business", "branding"] as const).map(getService).map((s) => ({ title: s.name, text: s.card, href: `/services/${s.slug}` })),
];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Work", href: "/work" }])} />
      <PageHero
        trail={[{ name: "Our Work" }]}
        h1={workPage.h1}
        em="for clients"
        lead={workPage.intro}
        actions={
          <>
            <Button href="/contact">Start a project</Button>
            <Button href="/products" variant="ghost">
              Our own products
            </Button>
          </>
        }
        visual={<ProjectCollage projects={projects} />}
      />
      <Section tight tone="sand">
        <WorkFacts projects={projects} />
      </Section>
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <SectionHead index="01" eyebrow="Project index" title="Selected client work" em="client work" className="mb-0 md:mb-0" />
          <p className="label max-w-xs text-muted">Open any project to see the live site and its gallery.</p>
        </div>
        <WorkIndex projects={projects} />
      </Section>
      <Section tone="sand">
        <SectionHead index="02" eyebrow="Services behind this work" title="The services we used" em="we used" text="What went into these projects, from the build itself to being found on Google." />
        <ol className="grid border-t border-line md:grid-cols-2">
          {USED.map((u, i) => (
            <Reveal as="li" key={u.title} delay={(i % 2) * 0.08} className="border-b border-line md:odd:pr-12 md:even:border-l md:even:pl-12">
              <Link href={u.href} className="group relative isolate flex gap-6 overflow-hidden py-9">
                <span aria-hidden="true" className="absolute -inset-x-12 inset-y-0 -z-10 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                <span aria-hidden="true" className="w-12 shrink-0 font-serif text-[2.6rem] italic leading-[0.9] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-[clamp(1.35rem,2.2vw,1.8rem)] font-semibold leading-tight tracking-[-0.03em]">{u.title}</span>
                    <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-3 block max-w-md text-[0.98rem] leading-relaxed text-muted">{u.text}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Section>
      <ContactCta />
    </>
  );
}
