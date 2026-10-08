import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-card";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Badge, Button, DataTable, Faq, Section, SectionHead } from "@/components/ui/primitives";
import { faqGroups } from "@/content/faq";
import { productsPage } from "@/content/pages";
import { products } from "@/content/products";
import { breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

export const metadata = buildMetadata("/products", productsPage.seo);

const productFaqs = faqGroups.find((g) => g.id === "products")!.items;

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Products", href: "/products" }]), faqLd(productFaqs)]} />
      <PageHero
        trail={[{ name: "Products" }]}
        h1={productsPage.h1}
        em="build and run"
        lead={productsPage.intro}
        actions={
          <>
            <Button href="#all-products">See all products</Button>
            <Button href="/services" variant="ghost">
              Need something custom?
            </Button>
          </>
        }
      />

      <Section id="all-products">
        <ProductGrid products={products} />
      </Section>

      <Section tone="sand">
        <SectionHead index="01" eyebrow="Compare" title="Which product is right for you?" em="right for you?" />
        <DataTable
          head={["Product", "Built for", "How customers use it", "Start", "Status"]}
          rows={products.map((p) => [
            <Link key="n" href={`/products/${p.slug}`} className="link-u">
              {p.name}
            </Link>,
            p.builtFor,
            p.howCustomersUse,
            p.liveUrl ? (
              <a key="l" href={p.liveUrl} target="_blank" rel="noopener" className="link-u inline-flex items-center gap-1 whitespace-nowrap font-semibold text-accent">
                {new URL(p.liveUrl).host}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            ) : (
              <Link key="w" href={`/products/${p.slug}#waitlist`} className="link-u font-semibold text-accent">
                Join the waitlist
              </Link>
            ),
            <Badge key="s" status={p.status} className="text-fg" />,
          ])}
        />
      </Section>

      <Section>
        <SectionHead index="02" eyebrow="Help me choose" title="Help me choose" em="choose" />
        <ul className="max-w-4xl border-t border-line">
          {productsPage.help.map((h, i) => (
            <Reveal as="li" key={h.label} delay={i * 0.04} y={12}>
                <Link href={h.href} className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:text-accent">
                  <span className="flex items-baseline gap-6">
                    <span className="numeral text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl font-semibold md:text-2xl">{h.label}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-2" />
                </Link>
              </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead index="03" eyebrow="FAQ" title="Questions about our products" em="our products" />
          <Faq items={productFaqs} />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
