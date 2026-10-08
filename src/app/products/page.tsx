import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-card";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Badge, Button, DataTable, Section, SectionHead } from "@/components/ui/primitives";
import { productsPage } from "@/content/pages";
import { products } from "@/content/products";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/products", productsPage.seo);

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Products", href: "/products" }])} />
      <PageHero trail={[{ name: "Products" }]} h1={productsPage.h1} em="Indian businesses" lead={productsPage.intro} actions={<Button href="/contact">Get in touch</Button>} />

      <Section>
        <ProductGrid products={products} />
      </Section>

      <Section tone="sand">
        <SectionHead index="01" eyebrow="Compare" title="Which product is right for you?" em="right for you?" />
        <DataTable
          head={["Product", "Built for", "How customers use it", "Status"]}
          rows={products.map((p) => [
            <Link key="n" href={`/products/${p.slug}`} className="link-u">
              {p.name}
            </Link>,
            p.builtFor,
            p.howCustomersUse,
            <Badge key="s" status={p.status} className="text-fg" />,
          ])}
        />
      </Section>

      <Section>
        <SectionHead index="02" eyebrow="Help me choose" title="Help me choose" em="choose" />
        <ul className="max-w-4xl border-t border-line">
          {productsPage.help.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.04} y={12}>
              <li>
                <Link href={h.href} className="group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors hover:text-accent">
                  <span className="flex items-baseline gap-6">
                    <span className="numeral text-xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-2xl font-semibold md:text-3xl">{h.label}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-6 transition-transform duration-500 group-hover:translate-x-2" />
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
