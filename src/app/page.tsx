import { WorkStory } from "@/components/case-studies/work-story";
import { Manifesto } from "@/components/motion/manifesto";
import { Marquee } from "@/components/motion/marquee";
import { Magnetic } from "@/components/motion/pointer";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { ProductStory } from "@/components/products/product-story";
import { Ecosystem, type EcoNode } from "@/components/sections/ecosystem";
import { HomeHero } from "@/components/sections/home-hero";
import { IndexList } from "@/components/sections/index-list";
import { ContactCta, ProcessSection, WhyGrid } from "@/components/sections/shared";
import { ServiceCard } from "@/components/services/service-card";
import { SolutionsScroller, type Solution } from "@/components/services/solutions-scroller";
import { JsonLd } from "@/components/ui/json-ld";
import { Button, Faq, Section, SectionHead } from "@/components/ui/primitives";
import { homeFaqs } from "@/content/faq";
import { about, home } from "@/content/pages";
import { products } from "@/content/products";
import { getService, servicesIn } from "@/content/services";
import type { ServiceSlug } from "@/content/types";
import { projects } from "@/content/work";
import { buildMetadata, faqLd, organizationLd, websiteLd } from "@/lib/seo";

export const metadata = buildMetadata("/", home.seo);

const aiServices = servicesIn("ai");

const SOLUTIONS: Solution[] = [
  { slug: "website-design-development", title: "Web Development" },
  { slug: "ecommerce-websites", title: "E-commerce" },
  { slug: "crm-erp", title: "CRM / ERP" },
  { slug: "nfc-qr-solutions", title: "NFC & QR" },
  { slug: "whatsapp-bots", title: "WhatsApp Automation" },
  { slug: "telegram-bots", title: "Telegram Bots" },
  { slug: "ai-agents", title: "AI Agents" },
  { slug: "business-automation", title: "Business Automation" },
  { slug: "custom-software", title: "Custom Software" },
];

/** Row 1: our products. Row 2: what we build. */
const MARQUEE_PRODUCTS = products.map((p) => p.name);
const MARQUEE_SOLUTIONS = ["AI Agents", "WhatsApp Bots", "Telegram Bots", "Automation", "Web Development", "E-commerce", "NFC & QR", "CRM", "ERP"];

const ECO_PRODUCTS: EcoNode[] = products.map((p) => ({ key: p.slug, label: p.name, href: `/products/${p.slug}`, icon: p.icon, text: p.category }));
const ECO_SOLUTIONS: EcoNode[] = (
  [
    ["website-design-development", "Websites"],
    ["ecommerce-websites", "E-commerce"],
    ["custom-software", "Custom Software"],
    ["crm-erp", "CRM / ERP"],
    ["nfc-qr-solutions", "NFC & QR"],
    ["whatsapp-bots", "WhatsApp Bots"],
    ["telegram-bots", "Telegram Bots"],
    ["ai-agents", "AI Agents"],
    ["business-automation", "Automation"],
  ] as [ServiceSlug, string][]
).map(([slug, label]) => {
  const s = getService(slug);
  return { key: slug, label, href: `/services/${slug}`, icon: s.icon, text: s.card };
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd, websiteLd, faqLd(homeFaqs)]} />
      <HomeHero />

      <Marquee products={MARQUEE_PRODUCTS} solutions={MARQUEE_SOLUTIONS} />

      {/* 01: our products, explored by scrolling */}
      <section aria-label="Our products" data-tone="sand" className="relative bg-bg py-20 text-fg lg:motion-safe:py-0">
        <div className="container-x lg:motion-safe:max-w-none lg:motion-safe:px-0">
          <ProductStory products={products} eyebrow="Our products" title={home.productsHeading} />
        </div>
      </section>

      {/* 02: one team, many digital systems */}
      <Section tone="dark" className="overflow-hidden">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHead index="02" eyebrow="One ecosystem" title="One team. Many digital systems." em="Many digital systems." className="mb-0 md:mb-0" />
          <Reveal>
            <p className="max-w-md text-lg text-muted lg:ml-auto">
              Our own products on one side, the systems we build for clients on the other, and one team connecting them: the same people, stack and standards behind every line.
            </p>
          </Reveal>
        </div>
        <Ecosystem products={ECO_PRODUCTS} solutions={ECO_SOLUTIONS} />
      </Section>

      <Section tone="sand">
        <Timeline index="03" eyebrow="How our products work" title={home.howHeading} steps={home.how} />
      </Section>

      <section data-tone="light" className="relative bg-bg py-20 text-fg md:py-28" aria-label="Solutions">
        <SolutionsScroller
          items={SOLUTIONS}
          head={
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
              <SectionHead index="04" eyebrow="What we build for clients" title={home.solutionsHeading} em="your business" text={home.solutionsLead} className="mb-0 md:mb-0" />
              <Button href="/services" variant="ghost">
                All services
              </Button>
            </div>
          }
        />
      </section>

      {/* AI & Automation */}
      <Section tone="sand" id="ai-automation">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead index="05" eyebrow="AI & Automation" title="We build digital systems that automate repetitive business processes." em="automate repetitive business processes." className="mb-8 md:mb-8" />
            <Reveal delay={0.2}>
              <p className="max-w-md text-lg text-muted">WhatsApp and Telegram bots, AI agents, workflow and lead automation, and custom AI integrations, each scoped to a clear job and connected to the tools you already use.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button href="/services#ai-automation">AI &amp; Automation services</Button>
                </Magnetic>
                <Button href="/contact" variant="ghost">
                  Talk to us
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {aiServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} delay={(i % 2) * 0.07} className={i === aiServices.length - 1 ? "sm:col-span-2" : undefined} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead index="06" eyebrow="Who we serve" title="Who we serve" em="serve" />
        <IndexList items={home.serve} />
      </Section>

      {/* 07: our work, as a case-study journey */}
      <Section tone="dark">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHead index="07" eyebrow="Our work" title={home.webHeading} em="builds yours" className="mb-0 md:mb-0" />
          <Reveal>
            <p className="max-w-md text-lg text-muted lg:ml-auto">{home.web}</p>
          </Reveal>
        </div>
        <WorkStory projects={projects} />
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/work">All work</Button>
          <Button href="/services" variant="ghost">
            Services
          </Button>
        </div>
      </Section>

      <ProcessSection tone="sand" index="08" />

      <Section>
        <SectionHead index="09" eyebrow="Why Priinteve" title="Why businesses work with Priinteve" em="Priinteve" />
        <WhyGrid />
      </Section>

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead index="10" eyebrow="FAQ" title="Questions we hear often" em="often" className="mb-8 md:mb-8" />
            <Button href="/faq" variant="ghost">
              All questions
            </Button>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </Section>

      <Manifesto index="11" eyebrow="Our mission" text={about.mission} accents={["simple", "useful", "affordable", "same", "day"]} />

      <ContactCta />
    </>
  );
}
