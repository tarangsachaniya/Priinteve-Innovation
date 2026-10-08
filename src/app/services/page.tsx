import { ProjectTiles } from "@/components/case-studies/project-list";
import { ContactCta, ProcessSection } from "@/components/sections/shared";
import { ServiceGroups } from "@/components/services/service-groups";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Chips, Section, SectionHead } from "@/components/ui/primitives";
import { servicesPage } from "@/content/pages";
import { TECHNOLOGY } from "@/content/site";
import { projects } from "@/content/work";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/services", servicesPage.seo);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Services", href: "/services" }])} />
      <PageHero
        trail={[{ name: "Services" }]}
        h1={servicesPage.h1}
        em="one product team"
        lead={servicesPage.lead}
        actions={
          <>
            <Button href="/contact">Get in touch</Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </>
        }
      />

      <Section>
        <SectionHead index="01" eyebrow="Services" title="What we build" em="build" text="One technology company, three areas: web development, digital solutions, and AI and automation." />
        <ServiceGroups />
        <div className="card mt-16 grid gap-6 rounded-[1.75rem] p-7 md:grid-cols-[5rem_1fr] md:p-9">
          <p className="numeral text-3xl text-accent">+</p>
          <div>
            <h3 className="text-2xl md:text-3xl">{servicesPage.included.title}</h3>
            <p className="mt-3 max-w-xl text-xl text-muted">{servicesPage.included.text}</p>
            <p className="label mt-5 inline-block rounded-full border border-line px-4 py-2">{servicesPage.included.badge}</p>
          </div>
        </div>
      </Section>

      <ProcessSection tone="dark" index="02" />

      <Section>
        <SectionHead index="03" eyebrow="Technology" title="Technology" em="Technology" />
        <Chips items={TECHNOLOGY} />
      </Section>

      <Section tone="sand">
        <SectionHead index="04" eyebrow="Recent work" title="Recent work" em="work" />
        <ProjectTiles projects={projects} />
      </Section>

      <ContactCta />
    </>
  );
}
