import { ProjectCollage } from "@/components/case-studies/project-collage";
import { WorkStory } from "@/components/case-studies/work-story";
import { ContactCta, ProcessSection } from "@/components/sections/shared";
import { ServiceCard } from "@/components/services/service-card";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Section, SectionHead } from "@/components/ui/primitives";
import { workPage } from "@/content/pages";
import { getService } from "@/content/services";
import { projects } from "@/content/work";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/work", workPage.seo);

const usedServices = Array.from(new Set(projects.map((p) => p.service))).map(getService);

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
      <Section tone="dark">
        <WorkStory projects={projects} />
      </Section>
      <Section tone="sand">
        <SectionHead index="01" eyebrow="Services behind this work" title="The services we used" em="we used" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {usedServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} delay={i * 0.06} />
          ))}
        </div>
      </Section>
      <ProcessSection tone="dark" index="02" />
      <ContactCta />
    </>
  );
}
