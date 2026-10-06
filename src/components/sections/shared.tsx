import { PROCESS, CTA_TEXT, site } from "@/content/site";
import type { Tone } from "@/lib/utils";
import { Button, CtaBand, Section, SectionHead, Steps } from "@/components/ui/primitives";

export function ProcessSection({ tone = "light", heading = "Our process", eyebrow = "Our process", index }: { tone?: Tone; heading?: string; eyebrow?: string; index?: string }) {
  return (
    <Section tone={tone}>
      <SectionHead eyebrow={eyebrow} index={index} title={heading} />
      <Steps items={PROCESS.map((p) => ({ title: p.title, text: p.text }))} />
    </Section>
  );
}

/** Final call to action used across the site: contact + phone. */
export function ContactCta({ heading = CTA_TEXT, sub, em = "build or launch" }: { heading?: string; sub?: string; em?: string }) {
  return (
    <CtaBand heading={heading} sub={sub} em={em}>
      <Button href="/contact" variant="solid">
        Get in touch
      </Button>
      <Button href={site.phoneHref} variant="ghost" arrow={false}>
        Call {site.phone}
      </Button>
    </CtaBand>
  );
}
