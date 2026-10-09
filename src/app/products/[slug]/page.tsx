import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WaitlistForm } from "@/components/forms/forms";
import { Heading } from "@/components/motion/heading";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ProductMockup } from "@/components/products/product-mockups";
import { ProductVisual, hostOf } from "@/components/products/product-visual";
import { ServiceCard } from "@/components/services/service-card";
import { JsonLd } from "@/components/ui/json-ld";
import { BrowserFrame, FeatureGrid, PricingCards } from "@/components/ui/media";
import { PageHero } from "@/components/ui/page-hero";
import { Badge, Button, Checklist, CtaBand, Eyebrow, Faq, LinkCard, Section, SectionHead, Steps } from "@/components/ui/primitives";
import { VideoEmbed } from "@/components/ui/video";
import { getProduct, productBySlug, products } from "@/content/products";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { abs, breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = productBySlug((await params).slug);
  return product ? buildMetadata(`/products/${product.slug}`, product.seo) : {};
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const related = getProduct(product.related);
  const relatedServices = product.relatedServices.map(getService);
  const path = `/products/${product.slug}`;
  const live = product.liveUrl;
  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web browser",
            description: product.seo.description,
            url: live ?? abs(path),
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          },
          faqLd(product.faq),
          breadcrumbLd([{ name: "Products", href: "/products" }, { name: product.name, href: path }]),
        ]}
      />

      <PageHero
        trail={[{ name: "Products", href: "/products" }, { name: product.name }]}
        badge={
          <span className="flex flex-wrap items-center gap-3">
            <Badge status={product.status} />
            <span className="label text-muted">{product.category}</span>
          </span>
        }
        h1={product.h1}
        em={`${product.name}:`}
        lead={product.hero}
        visual={<ProductVisual product={product} />}
        actions={
          live ? (
            <>
              <Button href={live} arrow="up-right">
                Visit {product.name}
              </Button>
              <Button href="/contact" variant="ghost">
                Talk to us
              </Button>
            </>
          ) : (
            <>
              <Button href="#waitlist">Join the waitlist</Button>
              <Button href="/products" variant="ghost">
                See live products
              </Button>
            </>
          )
        }
      />

      {/* at a glance */}
      <Section tight tone="sand">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            {[
              ["Built for", product.builtFor],
              ["How customers use it", product.howCustomersUse],
              ["Status", product.status],
              ["Website", live ? hostOf(live)! : "Coming soon"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-muted">{k}</dt>
                <dd className="mt-1.5 font-medium [overflow-wrap:anywhere]">{v}</dd>
              </div>
            ))}
          </dl>
          <ul aria-label={`${product.name} highlights`} className="flex flex-wrap gap-2 lg:justify-end">
            {product.highlights.map((h) => (
              <li key={h} className="rounded-full border border-line bg-surface px-4 py-2 text-[0.88rem] font-medium">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {product.problem && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow index={idx()} className="mb-7">
                The problem
              </Eyebrow>
              <Heading className="text-[clamp(2rem,4.4vw,3.5rem)]">The problem it solves</Heading>
            </div>
            <Reveal delay={0.1}>
              <p className="font-display text-2xl font-medium leading-snug md:text-[1.75rem]">{product.problem}</p>
            </Reveal>
          </div>
        </Section>
      )}

      {product.how.map((block, i) => (
        <Section key={block.heading} tone={i % 2 === 0 ? "sand" : "light"}>
          <SectionHead index={idx()} eyebrow="How it works" title={block.heading} text={block.intro} />
          {block.steps ? <Steps items={block.items} /> : <Checklist items={block.items.map((it) => (typeof it === "string" ? it : `${it.title}: ${it.text}`))} columns />}
        </Section>
      ))}

      <Section tone="dark">
        <SectionHead index={idx()} eyebrow="Features" title={product.featuresHeading} />
        <FeatureGrid items={product.features} icon={product.icon} />
        {product.platforms && (
          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
              <span className="label mr-2 text-muted">Runs on</span>
              {product.platforms.map((pl) => (
                <span key={pl} className="rounded-full border border-line px-3.5 py-1.5 text-[0.85rem]">
                  {pl}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      {/* see it in action: real screens and the official demo video */}
      {(product.media || product.videoId) && (
        <Section>
          <SectionHead index={idx()} eyebrow="See it in action" title={`${product.name}, live`} em="live" text={`Screens from the live ${product.name} website${product.videoId ? ", and the official product walkthrough" : ""}.`} />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {product.videoId && (
              <Reveal>
                <VideoEmbed id={product.videoId} title={`${product.name} product walkthrough`} />
              </Reveal>
            )}
            {product.media?.section && (
              <Reveal delay={0.1}>
                <BrowserFrame media={product.media.section} url={hostOf(live)} />
              </Reveal>
            )}
          </div>
          {live && (
            <div className="mt-10">
              <Button href={live} arrow="up-right">
                Open {hostOf(live)}
              </Button>
            </div>
          )}
        </Section>
      )}

      {product.pricing && (
        <Section tone="sand">
          <SectionHead index={idx()} eyebrow="Pricing" title="Plans" text={product.pricing.intro} />
          {product.pricing.plans.length > 0 && <PricingCards plans={product.pricing.plans} />}
          {product.pricing.note && <p className="mt-8 text-sm text-muted">{product.pricing.note}</p>}
          {live && (
            <div className="mt-8">
              <Button href={live} variant="ghost" arrow="up-right">
                See plans on {hostOf(live)}
              </Button>
            </div>
          )}
        </Section>
      )}

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow index={idx()} className="mb-7">
              Who it is for
            </Eyebrow>
            <Heading className="text-[clamp(2rem,4.4vw,3.5rem)]">Who it is for</Heading>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-muted">{product.who}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.audiences.map((a) => (
                  <li key={a} className="rounded-full border border-line px-3.5 py-1.5 text-[0.88rem]">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ProductMockup product={product} />
          </Reveal>
        </div>
      </Section>

      {product.waitlistFields && (
        <Section tone="sand" id="waitlist">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHead index={idx()} eyebrow="Waitlist" title="Join the waitlist" em="waitlist" text={product.comingSoon} />
              <ProductMockup product={product} />
            </div>
            <Reveal delay={0.1}>
              <div className="card rounded-[2rem] p-8 md:p-12">
                <WaitlistForm fields={product.waitlistFields} />
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index={idx()} eyebrow="FAQ" title={`${product.name} questions`} em="questions" />
          <Faq items={product.faq} />
        </div>
      </Section>

      <CtaBand
        heading={product.cta.heading}
        sub={product.cta.sub}
        eyebrow={product.name}
        actions={[
          { href: product.cta.href ?? "/contact", label: product.cta.href?.startsWith("http") ? "Visit the product" : "Next step", value: product.cta.button, primary: true },
          { href: "/contact", label: "Questions first?", value: "Contact Priinteve", icon: "mail" },
        ]}
      />

      <Section tone="sand">
        <SectionHead index={idx()} eyebrow="Related services" title="Need something built around it?" text="The same team builds custom solutions for businesses." />
        <div className="grid gap-5 sm:grid-cols-2">
          {relatedServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} delay={i * 0.06} />
          ))}
        </div>
      </Section>


      <Section tone="light">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <div className="min-w-0">
            <Eyebrow className="mb-6">Related product</Eyebrow>
            <ProductCard product={related} />
          </div>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <LinkCard eyebrow="All products" title="Compare our products" href="/products" />
            <LinkCard eyebrow="Services" title="Solutions for your business" href="/services" />
            <LinkCard eyebrow="Get in touch" title="Talk to Priinteve" href="/contact" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
