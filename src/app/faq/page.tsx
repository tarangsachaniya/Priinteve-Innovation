import Link from "next/link";
import { ContactCta } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Faq, Section } from "@/components/ui/primitives";
import { allFaqs, faqGroups, faqSeo } from "@/content/faq";
import { breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";

export const metadata = buildMetadata("/faq", faqSeo);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqLd(allFaqs), breadcrumbLd([{ name: "FAQ", href: "/faq" }])]} />
      <PageHero
        trail={[{ name: "FAQ" }]}
        h1="Frequently asked questions"
        em="questions"
        lead="Answers about Priinteve, our products, and the solutions we build: websites, e-commerce, custom software, CRM and ERP, NFC and QR, bots, AI agents and automation."
        actions={
          <>
            <Button href="/contact">Ask us a question</Button>
            <Button href="/services" variant="ghost">
              Our services
            </Button>
          </>
        }
      />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="label mb-4 text-muted">Topics</p>
            <ul className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
              {faqGroups.map((g) => (
                <li key={g.id} className="shrink-0">
                  <Link href={`#${g.id}`} className="block rounded-full border border-line px-4 py-2 text-[0.9rem] transition-colors hover:border-accent hover:text-accent lg:rounded-xl lg:border-transparent lg:px-3">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-16">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-28">
                <h2 id={`${g.id}-h`} className="mb-6 text-2xl md:text-3xl">
                  {g.title}
                </h2>
                <Faq items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </Section>
      <ContactCta heading="Didn't find your answer? Ask us directly." em="Ask us directly." />
    </>
  );
}
