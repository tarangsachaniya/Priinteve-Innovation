import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectTiles } from "@/components/case-studies/project-list";
import { Reveal } from "@/components/motion/reveal";
import { ContactCta, ProcessSection } from "@/components/sections/shared";
import { ServiceGroups } from "@/components/services/service-groups";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Chips, Faq, Section, SectionHead } from "@/components/ui/primitives";
import { faqGroups } from "@/content/faq";
import { servicesPage } from "@/content/pages";
import { serviceCategories } from "@/content/services";
import { TECHNOLOGY } from "@/content/site";
import { projects } from "@/content/work";
import { breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

export const metadata = buildMetadata("/services", servicesPage.seo);

const serviceFaqs = ["websites", "ecommerce", "software", "nfc-qr", "ai"].map((id) => faqGroups.find((g) => g.id === id)!.items[0]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Services", href: "/services" }]), faqLd(serviceFaqs)]} />
      <PageHero
        trail={[{ name: "Services" }]}
        h1={servicesPage.h1}
        em="one product team"
        lead={servicesPage.lead}
        actions={
          <>
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="ghost">
              See our work
            </Button>
          </>
        }
      />

      {/* category index */}
      <Section tight tone="sand">
        <nav aria-label="Service categories">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {serviceCategories.map((c, i) => (
              <Reveal as="li" key={c.key} delay={i * 0.04} y={10} className="h-full">
                  <Link href={`#${c.anchor}`} className="card card-hover group flex h-full flex-col rounded-2xl p-5">
                    <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-3 font-display text-lg font-semibold leading-tight">{c.name}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.8rem] font-semibold text-muted transition-colors group-hover:text-accent">
                      {c.items.length} solutions
                      <ArrowUpRight aria-hidden="true" className="size-3.5 rotate-90" />
                    </span>
                  </Link>
                </Reveal>
            ))}
          </ul>
        </nav>
      </Section>

      <Section>
        <SectionHead index="01" eyebrow="Services" title="What we build" em="build" text="These are the main categories of solutions we provide. Each one is delivered by the same team, on the same technology we run our own products on." />
        <ServiceGroups />
        <Reveal>
          <div className="card mt-20 grid gap-6 rounded-[1.75rem] p-7 md:grid-cols-[5rem_1fr] md:p-9">
            <p className="numeral text-3xl text-accent">+</p>
            <div>
              <h3 className="text-2xl md:text-3xl">{servicesPage.included.title}</h3>
              <p className="mt-3 max-w-xl text-lg text-muted">{servicesPage.included.text}</p>
              <p className="label mt-5 inline-block rounded-full border border-line px-4 py-2">{servicesPage.included.badge}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      <ProcessSection tone="dark" index="02" />

      <Section>
        <SectionHead index="03" eyebrow="Technology" title="Technology we work with" em="Technology" text="The same stack runs our own products, so what we build for you is tested in daily use." />
        <Chips items={TECHNOLOGY} />
      </Section>

      <Section tone="sand">
        <SectionHead index="04" eyebrow="Recent work" title="Recent work" em="work" />
        <ProjectTiles projects={projects} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead index="05" eyebrow="FAQ" title="Questions about our services" em="our services" className="mb-8 md:mb-8" />
            <Button href="/faq" variant="ghost">
              All questions
            </Button>
          </div>
          <Faq items={serviceFaqs} />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
