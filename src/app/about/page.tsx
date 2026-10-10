import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/motion/heading";
import { MissionStatement } from "@/components/motion/mission-statement";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-card";
import { ContactCta, TechStack, WhyGrid } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Eyebrow, Section, SectionHead } from "@/components/ui/primitives";
import { about } from "@/content/pages";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { breadcrumbLd, buildMetadata, organizationLd } from "@/lib/seo";

export const metadata = buildMetadata("/about", about.seo);

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");
/** Founder photos are optional: a card shows initials until its file is added to /public. */
const hasPublicFile = (src?: string) => !!src && existsSync(join(process.cwd(), "public", src));

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
        <div className="grid gap-4 md:grid-cols-3">
          {about.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="h-full">
              <Link href={p.href} className="card card-hover group flex h-full flex-col rounded-2xl p-5">
                <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl">{p.title}</h3>
                <p className="mt-2 text-[0.92rem] text-muted">{p.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                  {p.cta}
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <MissionStatement index="03" mission={about.mission} vision={about.vision} accents={["simple", "useful", "affordable", "same", "day"]} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-16">
        <div>
          <SectionHead index="04" eyebrow="Founder" title="The person behind Priinteve" em="behind Priinteve" text={`Priinteve Innovations was founded in ${site.founded} in ${site.location.city} by Tarang Sachaniya, who builds and runs every product and client project.`} className="mb-0 md:mb-0" />
        </div>
        <ul className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:justify-self-end">
          {site.founders.map((f, i) => {
            const photo = hasPublicFile(f.photo) ? f.photo : null;
            return (
              <li key={f.name}>
                <Reveal delay={i * 0.08}>
                  <figure className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-line bg-[radial-gradient(80%_70%_at_50%_30%,#2b4f1c,#131c17_70%)]">
                    {photo ? (
                      <Image src={photo} alt={`${f.name}, ${f.role} of ${site.name}`} fill sizes="(min-width: 640px) 40vw, 90vw" className="object-cover object-center transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]" />
                    ) : (
                      <span aria-hidden="true" className="absolute inset-0 grid place-items-center font-serif text-[clamp(6rem,14vw,10rem)] italic text-[#9dbd6a]/80">
                        {initials(f.name)}
                      </span>
                    )}
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white md:p-7">
                      <span>
                        <span className="block font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{f.name}</span>
                        <span className="mt-1.5 block text-white/80">{f.role}</span>
                        <span className="block text-[0.85rem] text-white/60">{site.name}</span>
                      </span>
                      <span className="font-serif text-3xl italic leading-none text-[#9dbd6a]">{String(i + 1).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead index="05" eyebrow="What we believe" title="What we believe" em="believe" />
        <div className="grid gap-4 md:grid-cols-3">
          {about.beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07} className="h-full">
              <div className="card h-full rounded-2xl p-5">
                <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl">{b.title}</h3>
                <p className="mt-2 text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead index="06" eyebrow="Technology" title="Technology we build with" em="build with" text="The stack behind our own products and our client work." />
        <TechStack />
      </Section>

      <Section>
        <SectionHead index="07" eyebrow="Why Priinteve" title="Why businesses work with us" em="work with us" />
        <WhyGrid />
      </Section>

      <Section tone="sand">
        <SectionHead index="08" eyebrow="Our products" title="Products we build and run" em="build and run" />
        <ProductGrid products={products} />
      </Section>

      <ContactCta />
    </>
  );
}
