import { ProjectCollage } from "@/components/case-studies/project-collage";
import { ProjectList } from "@/components/case-studies/project-list";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Note, Section } from "@/components/ui/primitives";
import { workPage } from "@/content/pages";
import { projects } from "@/content/work";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/work", workPage.seo);

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Work", href: "/work" }])} />
      <PageHero
        trail={[{ name: "Our Work" }]}
        h1={workPage.h1}
        em="for clients"
        lead={workPage.intro}
        actions={<Button href="/contact">Start a project</Button>}
        visual={<ProjectCollage projects={projects} />}
      />
      <Section>
        <ProjectList projects={projects} />
        <Note>{`[${workPage.namingNote}]`}</Note>
      </Section>
      <ContactCta />
    </>
  );
}
