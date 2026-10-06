import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Note, Section } from "@/components/ui/primitives";
import { breadcrumbLd } from "@/lib/seo";

/** Privacy Policy / Terms: the plan lists these pages but supplies no copy, so the body is a placeholder. */
export function LegalPage({ title, path }: { title: string; path: string }) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: title, href: path }])} />
      <PageHero trail={[{ name: title }]} h1={title} lead="Priinteve Innovations (India)" />
      <Section>
        <Note>{`[${title} text to be supplied. The plan lists this page for trust and payment-gateway requirements but gives no copy.]`}</Note>
      </Section>
    </>
  );
}
