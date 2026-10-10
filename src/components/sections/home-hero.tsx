import { Bot, Nfc, UtensilsCrossed } from "lucide-react";
import { Magnetic, PointerParallax } from "../motion/pointer";
import { home } from "@/content/pages";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";
import { Spotlight } from "../motion/spotlight";
import { LogoStage } from "./logo-stage";
import { Button } from "../ui/primitives";

const TAIL = "operate, sell and grow";

// deterministic specks so the server and client render the same markup
const SPECKS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 7) % 91}%`,
  size: 2 + (i % 3),
}));

/** A small glass card beside the 3D object. Moves with the pointer at its own depth (layered parallax). */
function Float({ icon, title, line, className, depth }: { icon: React.ReactNode; title: string; line: string; className: string; depth: number }) {
  return (
    <div aria-hidden="true" className={`absolute hidden transition-transform duration-700 ease-out-expo sm:block ${className}`} style={{ transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)` }}>
      <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-[#131c17]/80 px-4 py-3 text-[#faf8f2] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.9)] backdrop-blur-md">
        <span className="grid size-9 place-items-center rounded-xl bg-[#6b8e3d]/90 text-white">{icon}</span>
        <span className="leading-tight">
          <span className="block text-[0.82rem] font-semibold">{title}</span>
          <span className="block text-[0.7rem] text-white/55">{line}</span>
        </span>
      </div>
    </div>
  );
}

/** Home hero: headline on a faint grid, beside the Priinteve mark as a 3D object with floating product cards. */
export function HomeHero() {
  return (
    <header data-tone="light" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg pb-14 pt-28 text-fg md:pb-20 md:pt-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <Spotlight />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 size-[38rem] rounded-full bg-accent-strong/20 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[#18330d]/30 blur-[120px]" />
      {SPECKS.map((s, i) => (
        <i key={i} aria-hidden="true" className="pointer-events-none absolute rounded-full bg-accent/60" style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: 0.5 }} />
      ))}

      {/* the copy column stretches to the visual's height and pushes its CTAs to the visual's lower edge */}
      <div className="container-x relative grid flex-1 content-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-7 lg:justify-end lg:pb-6">
          <Heading as="h1" em={TAIL} className="text-[clamp(2.6rem,min(6vw,8.4svh),5.2rem)] leading-[1.0] tracking-[-0.045em]">
            {home.h1}
          </Heading>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-muted xl:text-xl xl:leading-relaxed">{home.heroLead}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3 lg:mt-10">
              <Magnetic>
                <Button href="/products">Explore Products</Button>
              </Magnetic>
              <Magnetic strength={5}>
                <Button href="/services" variant="secondary">
                  Our Services
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <PointerParallax className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-[min(100%,calc(100svh-12rem))] lg:self-end">
          <Reveal delay={0.2} variant="scale" className="relative">
            <LogoStage />
            <Float icon={<Nfc className="size-4" />} title="Tap to connect" line="Nectcard" className="-left-4 top-8 lg:-left-12" depth={-18} />
            <Float icon={<UtensilsCrossed className="size-4" />} title="Table 14 · New order" line="VentaDot" className="-right-2 top-1/2 lg:-right-8" depth={26} />
            <Float icon={<Bot className="size-4" />} title="Bots and AI agents" line="AI & Automation" className="-bottom-3 left-6 lg:left-2" depth={-12} />
          </Reveal>
        </PointerParallax>
      </div>
    </header>
  );
}
