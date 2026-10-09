import { home } from "@/content/pages";
import { PROCESS, TECH_GROUPS } from "@/content/site";
import type { Tone } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/primitives";
import { Heading } from "@/components/motion/heading";
import { ProcessWave } from "@/components/motion/process-wave";
import { ContactCtaBand } from "./contact-cta";

/** How we work: the six steps travelling along a pinned wave (see ProcessWave). */
export function ProcessSection({ tone = "light", heading = "How we work", eyebrow = "How we work", index, text }: { tone?: Tone; heading?: string; eyebrow?: string; index?: string; text?: string }) {
  return (
    <section data-tone={tone} aria-label={heading} className="relative overflow-x-clip bg-bg py-24 text-fg md:py-32 lg:motion-safe:py-0">
      <ProcessWave
        steps={PROCESS}
        head={
          <div className="max-w-2xl">
            <Eyebrow index={index} className="mb-6">
              {eyebrow}
            </Eyebrow>
            <Heading em="work" className="text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.98]">
              {heading}
            </Heading>
            <p className="mt-4 max-w-lg text-muted">{text ?? "Every project, from a landing page to an ERP, follows the same six steps."}</p>
          </div>
        }
      />
    </section>
  );
}

/** Why Priinteve: an editorial ledger of six reasons, two columns of hairline rows with serif numerals. */
export function WhyGrid() {
  return (
    <ol className="grid border-t border-line md:grid-cols-2">
      {home.why.map((w, i) => (
        <Reveal
          as="li"
          key={w.title}
          delay={(i % 2) * 0.08}
          className="group relative isolate flex gap-6 overflow-hidden border-b border-line py-9 md:gap-8 md:py-11 md:odd:pr-12 md:even:border-l md:even:pl-12"
        >
          <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent-soft transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
          <span aria-hidden="true" className="w-12 shrink-0 font-serif text-[2.6rem] italic leading-[0.9] text-accent md:w-14 md:text-[3.2rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-start justify-between gap-4">
              <h3 className="text-[clamp(1.35rem,2.2vw,1.8rem)] leading-tight tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{w.title}</h3>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-accent transition-all duration-500 ease-out-expo group-hover:rotate-[-10deg] group-hover:border-accent group-hover:bg-accent-strong group-hover:text-on-accent">
                <Icon name={w.icon} className="size-4" />
              </span>
            </span>
            <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-muted">{w.text}</p>
          </span>
        </Reveal>
      ))}
    </ol>
  );
}

/** Final call to action used across the site. */
export function ContactCta({ heading = "Tell us what you want to print, build, automate or launch.", sub = "Products, websites, software, NFC and QR, bots and AI automation, built by one team in Ahmedabad.", em }: { heading?: string; sub?: string; em?: string }) {
  return <ContactCtaBand heading={heading} sub={sub} em={em} />;
}

/** Technology we build with, grouped: one hairline row per group, a serif label and the tools as chips. */
export function TechStack() {
  return (
    <div className="border-t border-line">
      {TECH_GROUPS.map((g, i) => (
        <Reveal key={g.title} delay={i * 0.05} className="grid gap-4 border-b border-line py-7 md:grid-cols-[16rem_1fr] md:items-center md:gap-10">
          <p className="flex items-baseline gap-4">
            <span className="font-serif text-2xl italic leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-xl font-semibold tracking-[-0.02em]">{g.title}</span>
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {g.items.map((t) => (
              <li key={t} className="rounded-full border border-line bg-fg/[0.03] px-4 py-2 text-[0.92rem] transition-colors duration-300 hover:border-accent hover:bg-accent-soft">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
