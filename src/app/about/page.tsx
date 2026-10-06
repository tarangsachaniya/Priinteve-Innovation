import { Heading } from "@/components/motion/heading";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-card";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, CtaBand, Eyebrow, Note, Section, SectionHead, Steps } from "@/components/ui/primitives";
import { about } from "@/content/pages";
import { products } from "@/content/products";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/about", about.seo);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", href: "/about" }])} />
      <PageHero trail={[{ name: "About" }]} h1={about.h1} em="Priinteve Innovations" lead={about.story[0]} actions={<Button href="/products">Our products</Button>} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow index="01" className="mb-7">
              Our story
            </Eyebrow>
            <Heading className="text-[clamp(2.5rem,5.4vw,4.6rem)]">Our story</Heading>
          </div>
          <Reveal delay={0.1}>
            <p className="font-serif text-3xl leading-snug md:text-4xl">{about.story[1]}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <Reveal>
            <Eyebrow index="02" className="mb-7">
              Our mission
            </Eyebrow>
            <p className="font-serif text-3xl leading-snug md:text-[2.5rem]">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="03" className="mb-7">
              How we work
            </Eyebrow>
            <p className="text-xl text-muted">{about.howWeWork}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow="What we believe" title="What we believe" em="believe" />
        <Steps items={about.beliefs} />
      </Section>

      <Section tone="sand">
        <SectionHead index="05" eyebrow="Products and services at a glance" title="Products and services at a glance" />
        <ProductGrid products={products} />
        <div className="mt-14">
          <Button href="/services" variant="ghost">
            Web and software development
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHead index="06" eyebrow="Team" title="Team" />
        <Note>{about.team}</Note>
      </Section>

      <CtaBand heading={about.cta.heading} sub={about.cta.sub} em="more?">
        <Button href="/contact" variant="solid">
          Get in touch
        </Button>
      </CtaBand>
    </>
  );
}
