import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Faq, Note, Section } from "@/components/ui/primitives";
import { faqPage } from "@/content/pages";
import { breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

export const metadata = buildMetadata("/faq", faqPage.seo);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqLd(faqPage.items), breadcrumbLd([{ name: "FAQ", href: "/faq" }])]} />
      <PageHero
        tint="#e5dcf6"
        trail={[{ name: "FAQ" }]}
        h1={faqPage.h1}
        em="questions"
        lead="Answers about our products, how scan and tap works, and our website development services."
        actions={<Button href="/contact" variant="solid">Get in touch</Button>}
      />
      <Section>
        <Faq items={faqPage.items} />
        <Note>{faqPage.note}</Note>
      </Section>
      <ContactCta />
    </>
  );
}
