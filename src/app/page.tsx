import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/case-studies/project-showcase";
import { Manifesto } from "@/components/motion/manifesto";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { WordBand } from "@/components/motion/word-band";
import { ProductShowcase } from "@/components/products/product-showcase";
import { HomeHero } from "@/components/sections/home-hero";
import { IndexList } from "@/components/sections/index-list";
import { ContactCta } from "@/components/sections/shared";
import { ServiceCard } from "@/components/services/service-card";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Button, Section, SectionHead } from "@/components/ui/primitives";
import { about, home } from "@/content/pages";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { projects } from "@/content/work";
import { buildMetadata, organizationLd, websiteLd } from "@/lib/seo";

export const metadata = buildMetadata("/", home.seo);

const webServices = services.filter((s) => s.category !== "ai");
const aiServices = services.filter((s) => s.category === "ai");

const SOLUTIONS = ["Websites", "E-commerce", "Custom Web Applications", "NFC & QR", "WhatsApp Bots", "Telegram Bots", "AI Agents", "Automation"];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationLd, websiteLd]} />
      <HomeHero />

      <WordBand top={products.map((p) => p.name)} bottom={["WhatsApp bots", "AI agents", "automation", "websites", "NFC & QR"]} />

      {/* the two sides of Priinteve */}
      <Section tight>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { k: "Products", sub: "Our own digital products", href: "/products", items: products.map((p) => p.name), cta: "Explore products" },
            { k: "Solutions", sub: "What we build for your business", href: "/services", items: SOLUTIONS, cta: "Explore services" },
          ].map((side, i) => (
            <Reveal key={side.k} delay={i * 0.08}>
              <Link href={side.href} className="card card-hover group flex h-full flex-col rounded-[1.75rem] p-7 sm:p-9">
                <p className="label text-accent">{side.sub}</p>
                <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.5rem)]">{side.k}</h2>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {side.items.map((it) => (
                    <li key={it} className="rounded-full border border-line bg-fg/[0.03] px-3.5 py-1.5 text-[0.88rem] text-muted transition-colors group-hover:text-fg">
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent">
                  {side.cta}
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <ProductShowcase
          products={products}
          head={<SectionHead index="01" eyebrow="Our products" title={home.productsHeading} em="One problem solved well by each." className="mb-8 md:mb-10" />}
        />
      </Section>

      <Section tone="dark">
        <Timeline index="02" eyebrow="How it works" title={home.howHeading} steps={home.how} />
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Solutions" title={home.solutionsHeading} em="your business" text={home.solutionsLead} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {webServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} delay={i * 0.07} />
          ))}
        </div>
      </Section>

      {/* AI & Automation */}
      <Section tone="sand" id="ai-automation">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead index="04" eyebrow="AI & Automation" title="We build digital systems that automate repetitive business processes." em="automate repetitive business processes." className="mb-8 md:mb-8" />
            <Reveal delay={0.2}>
              <p className="max-w-md text-lg text-muted">WhatsApp and Telegram bots, AI agents, workflow and lead automation, and custom AI integrations, scoped to a clear job and connected to the tools you already use.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/services#ai-automation">AI &amp; Automation services</Button>
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
        <SectionHead index="05" eyebrow="Who we serve" title="Who we serve" em="serve" />
        <IndexList items={home.serve} />
      </Section>

      <Section tone="dark">
        <ProjectShowcase
          projects={projects}
          head={<SectionHead index="06" eyebrow="Our work" title={home.webHeading} em="builds yours" text={home.web} className="mb-8 md:mb-8" />}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/work">Our Work</Button>
          <Button href="/services" variant="ghost">
            Services
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHead index="07" eyebrow="Why Priinteve" title="Why Priinteve" em="Priinteve" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {home.why.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.07} y={16} className="h-full">
              <li className="card card-hover flex h-full flex-col rounded-[1.75rem] p-7">
                <span className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon name={w.icon} className="size-5" />
                  </span>
                  <span className="numeral text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="mt-6 text-xl">{w.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{w.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Manifesto index="08" eyebrow="Our mission" text={about.mission} accents={["printing", "digital", "identity", "simple", "affordable"]} />

      <ContactCta />
    </>
  );
}
