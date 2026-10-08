import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "@/components/motion/heading";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-card";
import { ContactCta, ProcessSection, WhyGrid } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Chips, Eyebrow, Section, SectionHead } from "@/components/ui/primitives";
import { about } from "@/content/pages";
import { products } from "@/content/products";
import { site, TECHNOLOGY } from "@/content/site";
import { breadcrumbLd, buildMetadata, organizationLd } from "@/lib/seo";

export const metadata = buildMetadata("/about", about.seo);

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationLd, breadcrumbLd([{ name: "About", href: "/about" }])]} />
      <PageHero
        trail={[{ name: "About" }]}
        h1={about.h1}
        em="Priinteve Innovations"
        lead={about.lead}
        actions={
          <>
            <Button href="/products">Our products</Button>
            <Button href="/services" variant="ghost">
              Our services
            </Button>
          </>
        }
      />

      {/* facts */}
      <Section tight tone="sand">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {about.facts.map((f) => (
            <div key={f.label} className="border-l border-accent/50 pl-5">
              <dt className="label text-muted">{f.label}</dt>
              <dd className="mt-2 font-display text-lg font-semibold leading-snug md:text-xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Eyebrow index="01" className="mb-7">
              Who we are
            </Eyebrow>
            <Heading className="text-[clamp(2rem,4.4vw,3.5rem)]">Who we are</Heading>
          </div>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-fg/85">
            {about.who.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead index="02" eyebrow="What we build" title="Two sides, one team" em="one team" />
        <div className="grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="h-full">
              <Link href={p.href} className="card card-hover group flex h-full flex-col rounded-[1.75rem] p-7">
                <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                  {p.cta}
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow index="03" className="mb-7">
              Mission
            </Eyebrow>
            <p className="font-display text-2xl font-medium leading-snug md:text-[1.75rem]">{about.mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow index="04" className="mb-7">
              Vision
            </Eyebrow>
            <p className="font-display text-2xl font-medium leading-snug md:text-[1.75rem]">{about.vision}</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead index="05" eyebrow="Founders" title="The people behind Priinteve" em="behind Priinteve" text={`Priinteve Innovations was founded in ${site.founded} in ${site.location.city} by its two co-founders.`} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:max-w-4xl">
          {site.founders.map((f, i) => (
            <li key={f.name}>
              <Reveal delay={i * 0.08}>
                <div className="card flex items-center gap-5 rounded-[1.75rem] p-6 md:p-7">
                  <span aria-hidden="true" className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent-strong font-display text-xl font-semibold text-on-accent shadow-[0_16px_36px_-14px_rgb(107_142_61/0.8)]">
                    {initials(f.name)}
                  </span>
                  <span>
                    <span className="block font-display text-xl font-semibold">{f.name}</span>
                    <span className="mt-1 block text-muted">{f.role}, {site.name}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <SectionHead index="06" eyebrow="What we believe" title="What we believe" em="believe" />
        <div className="grid gap-5 md:grid-cols-3">
          {about.beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07} className="h-full">
              <div className="card h-full rounded-[1.75rem] p-7">
                <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl">{b.title}</h3>
                <p className="mt-2 text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ProcessSection tone="light" index="07" />

      <Section tone="dark">
        <SectionHead index="08" eyebrow="Technology" title="Technology we build with" em="build with" text="The stack behind our own products and our client work." />
        <Chips items={TECHNOLOGY} />
      </Section>

      <Section>
        <SectionHead index="09" eyebrow="Why Priinteve" title="Why businesses work with us" em="work with us" />
        <WhyGrid />
      </Section>

      <Section tone="sand">
        <SectionHead index="10" eyebrow="Our products" title="Products we build and run" em="build and run" />
        <ProductGrid products={products} />
      </Section>

      <ContactCta />
    </>
  );
}
