import { home } from "@/content/pages";
import { PROCESS } from "@/content/site";
import type { Tone } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHead } from "@/components/ui/primitives";
import { ContactCtaBand } from "./contact-cta";

/** How we work: six steps, as numbered cards joined by a rule. */
export function ProcessSection({ tone = "light", heading = "How we work", eyebrow = "How we work", index, text }: { tone?: Tone; heading?: string; eyebrow?: string; index?: string; text?: string }) {
  return (
    <Section tone={tone}>
      <SectionHead eyebrow={eyebrow} index={index} title={heading} text={text ?? "Every project, from a landing page to an ERP, follows the same six steps."} />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 3) * 0.06} y={16} className="card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6 md:p-7">
              <span aria-hidden="true" className="numeral absolute -right-2 -top-4 text-[6rem] text-fg/[0.05]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="numeral text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{p.text}</p>
            </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/** Why Priinteve: exactly six cards. */
export function WhyGrid() {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {home.why.map((w, i) => (
        <Reveal as="li" key={w.title} delay={(i % 3) * 0.07} y={16} className="card card-hover group flex h-full flex-col rounded-[1.75rem] p-7">
            <span className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={w.icon} className="size-5" />
              </span>
              <span className="numeral text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <h3 className="mt-6 text-xl">{w.title}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{w.text}</p>
          </Reveal>
      ))}
    </ol>
  );
}

/** Final call to action used across the site. */
export function ContactCta({ heading = "Tell us what you want to print, build, automate or launch.", sub = "Products, websites, software, NFC and QR, bots and AI automation, built by one team in Ahmedabad.", em }: { heading?: string; sub?: string; em?: string }) {
  return <ContactCtaBand heading={heading} sub={sub} em={em} />;
}
