import Link from "next/link";
import { ProjectShowcase } from "@/components/case-studies/project-showcase";
import { Manifesto } from "@/components/motion/manifesto";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { WordBand } from "@/components/motion/word-band";
import { ProductAccordion } from "@/components/products/product-accordion";
import { HomeHero } from "@/components/sections/home-hero";
import { IndexList } from "@/components/sections/index-list";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHead } from "@/components/ui/primitives";
import { about, home } from "@/content/pages";
import { products } from "@/content/products";
import { projects } from "@/content/work";
import { buildMetadata, organizationLd, websiteLd } from "@/lib/seo";
import { NEUTRAL_TINT, PRODUCT_ID } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const metadata = buildMetadata("/", home.seo);

const [webLead, ...webRest] = home.web.split(". ");
const webWork = webRest.join(". ");

const tintFor = (href: string) => PRODUCT_ID[href.split("/").pop() ?? ""]?.tint ?? NEUTRAL_TINT;

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd, websiteLd]} />
      <HomeHero />

      <WordBand top={products.map((p) => p.name)} bottom={["print, serve and grow", "print, serve and grow"]} />

      <Section>
        <SectionHead index="01" eyebrow="What we make" title={home.productsHeading} em="One problem solved well by each." />
        <Reveal>
          <ProductAccordion products={products} />
        </Reveal>
      </Section>

      <Section tone="dark">
        <Timeline index="02" eyebrow="How it works" title={home.howHeading} steps={home.how} />
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Who we serve" title="Who we serve" em="serve" />
        <IndexList items={home.serve.map((s) => ({ ...s, tint: tintFor(s.href) }))} />
      </Section>

      <Section tone="sand">
        <SectionHead index="04" eyebrow="Websites and software for clients" title={home.webHeading} em="builds yours" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          {[
            { href: "/services", word: "Services", text: `${webLead}.` },
            { href: "/work", word: "Our Work", text: webWork },
          ].map((d, i) => (
            <Reveal key={d.href} delay={i * 0.1}>
              <Link href={d.href} className="group block border-t border-fg/60 pt-8">
                <span className="flex items-baseline justify-between gap-6">
                  <span className="font-serif text-[clamp(3rem,6vw,5.4rem)] leading-none transition-transform duration-700 ease-out-expo group-hover:translate-x-3">{d.word}</span>
                  <ArrowUpRight aria-hidden="true" className="size-10 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
                <span className="mt-6 block max-w-md text-xl text-muted">{d.text}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-24">
          <p className="label mb-8 text-muted">Recent work</p>
          <ProjectShowcase projects={projects} />
        </div>
      </Section>

      <Section>
        <SectionHead index="05" eyebrow="Why Priinteve" title="Why Priinteve" em="Priinteve" />
        <ol className="grid border-t border-line md:grid-cols-2 md:gap-x-20">
          {home.why.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08} y={16}>
              <li className="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-line py-9">
                <span className="numeral text-4xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-3xl">{w.title}</h3>
                  <p className="mt-3 text-lg text-muted">{w.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Manifesto index="06" eyebrow="Our mission" text={about.mission} accents={["printing", "digital", "identity", "simple", "affordable"]} />

      <ContactCta />
    </>
  );
}
