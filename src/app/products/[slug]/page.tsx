import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WaitlistForm } from "@/components/forms/forms";
import { Heading } from "@/components/motion/heading";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";
import { ProductVisual } from "@/components/products/product-visual";
import { Arch } from "@/components/ui/arch";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Badge, Button, Checklist, CtaBand, Eyebrow, Faq, Section, SectionHead, Steps, Text } from "@/components/ui/primitives";
import { getProduct, productBySlug, products } from "@/content/products";
import { site } from "@/content/site";
import { abs, breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";
import { PRODUCT_ID } from "@/lib/utils";

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
  const path = `/products/${product.slug}`;
  const id = PRODUCT_ID[product.slug];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            applicationCategory: "BusinessApplication",
            description: product.seo.description,
            url: abs(path),
            publisher: { "@type": "Organization", name: site.name },
          },
          faqLd(product.faq),
          breadcrumbLd([{ name: "Products", href: "/products" }, { name: product.name, href: path }]),
        ]}
      />

      <PageHero
        tint={id.tint}
        trail={[{ name: "Products", href: "/products" }, { name: product.name }]}
        badge={<Badge status={product.status} />}
        h1={product.h1}
        em={`${product.name}:`}
        lead={product.hero}
        visual={<ProductVisual product={product} />}
        actions={
          product.heroButton ? (
            <>
              <Button href={product.heroButton.href} variant="solid" arrow={product.heroButton.href.startsWith("http") ? "up-right" : "right"}>
                {product.heroButton.label}
              </Button>
              {product.heroButton.secondary && (
                <Button href="/contact" variant="ghost">
                  {product.heroButton.secondary}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button href="/contact" variant="solid">
                {product.cta.button}
              </Button>
              <Button href={site.phoneHref} variant="ghost" arrow={false}>
                Call us
              </Button>
            </>
          )
        }
      />

      {product.problem && (
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow index="01" className="mb-7">
                The problem
              </Eyebrow>
              <Heading className="text-[clamp(2.5rem,5.4vw,4.6rem)]">The problem</Heading>
            </div>
            <Reveal delay={0.1}>
              <p className="font-serif text-3xl leading-snug md:text-4xl">{product.problem}</p>
            </Reveal>
          </div>
        </Section>
      )}

      {product.how.map((block, i) => (
        <Section key={block.heading} tone={(i + (product.problem ? 1 : 0)) % 2 === 0 ? "light" : "sand"}>
          <SectionHead index={`0${i + 2}`} eyebrow="How it works" title={block.heading} text={block.intro} />
          {block.steps ? <Steps items={block.items} /> : <Checklist items={block.items} />}
        </Section>
      ))}

      <Section tone="dark">
        <SectionHead index="04" eyebrow="Features" title={product.featuresHeading} />
        <Checklist items={product.features} columns />
        {product.featuresNote && (
          <p className="mt-8 max-w-3xl rounded-2xl border border-dashed border-fg/40 px-6 py-5">
            <Text>{product.featuresNote}</Text>
          </p>
        )}
        {product.comingSoon && (
          <Reveal>
            <div className="mt-12 rounded-[2rem] bg-surface p-8 md:p-10">
              <Badge status="Coming soon" />
              <p className="mt-5 font-serif text-3xl leading-snug">{product.comingSoon}</p>
            </div>
          </Reveal>
        )}
      </Section>

      {product.who && (
        <Section>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <Eyebrow index="05" className="mb-7">
                Who it is for
              </Eyebrow>
              <Heading className="text-[clamp(2.5rem,5.4vw,4.6rem)]">Who it is for</Heading>
              <Reveal delay={0.2}>
                <p className="mt-8 font-serif text-3xl leading-snug">
                  <Text>{product.who}</Text>
                </p>
              </Reveal>
            </div>
            <ScreensPlaceholder name={product.name} tint={id.tint} />
          </div>
        </Section>
      )}

      {product.waitlistFields && (
        <Section tone="sand" id="waitlist">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHead index="05" eyebrow="Waitlist" title="Join the waitlist" em="waitlist" text="Be the first to know when Priinteve Printing launches." />
              <ScreensPlaceholder name={product.name} tint={id.tint} />
            </div>
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-surface p-8 md:p-12">
                <WaitlistForm fields={product.waitlistFields} />
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      <Section tone="light">
        <SectionHead index="06" eyebrow="FAQ" title="Frequently asked questions" em="questions" />
        <Faq items={product.faq} />
      </Section>

      <CtaBand heading={product.cta.heading} sub={product.cta.sub} em={product.name}>
        <Button href={product.cta.href ?? "/contact"} variant="solid" arrow={product.cta.href?.startsWith("http") ? "up-right" : "right"}>
          {product.cta.button}
        </Button>
      </CtaBand>

      <Section>
        <SectionHead index="07" eyebrow="Related products" title={related.name} text={related.card} />
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <ProductCard product={related} />
          <Reveal delay={0.1} className="flex flex-col justify-center gap-8">
            <p className="font-serif text-4xl leading-snug">Every Priinteve product solves one problem well.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/products" variant="ghost">
                All products
              </Button>
              <Button href="/contact" variant="ghost">
                Contact us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ScreensPlaceholder({ name, tint }: { name: string; tint: string }) {
  return (
    <Reveal delay={0.1}>
      <Arch tint={tint} className="mx-auto mt-0 grid aspect-[4/5] w-full max-w-sm place-items-center p-8 text-center text-fg">
        <div role="img" aria-label={`${name} product screens, to be added`}>
          <p className="font-serif text-3xl leading-snug">Screens or photos of the product</p>
          <p className="mt-4">
            <span className="placeholder-chip">Details coming soon</span>
          </p>
        </div>
      </Arch>
    </Reveal>
  );
}
