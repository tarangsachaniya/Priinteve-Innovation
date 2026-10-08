import { Bot, Nfc, UtensilsCrossed } from "lucide-react";
import { Magnetic, PointerParallax } from "../motion/pointer";
import { home } from "@/content/pages";
import { products } from "@/content/products";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";
import { ClayScene } from "../three/scenes";
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

/** Home hero: sans headline on a dark violet-lit grid, beside a glossy 3D form with floating product cards. */
export function HomeHero() {
  const live = products.filter((p) => p.status === "Live");
  return (
    <header data-tone="light" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg pb-10 pt-28 text-fg md:pt-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 size-[38rem] rounded-full bg-accent-strong/20 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[#18330d]/30 blur-[120px]" />
      {SPECKS.map((s, i) => (
        <i key={i} aria-hidden="true" className="pointer-events-none absolute rounded-full bg-accent/60" style={{ left: s.left, top: s.top, width: s.size, height: s.size, opacity: 0.5 }} />
      ))}

      <div className="container-x relative grid flex-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-fg/[0.04] py-2 pl-3 pr-4 text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(157_189_106/0.8)]" />
              Products · Solutions · AI &amp; Automation
            </p>
          </Reveal>
          <Heading as="h1" em={TAIL} className="text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.04]">
            {home.h1}
          </Heading>
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-xl text-lg text-muted md:text-xl md:leading-relaxed">{home.lead}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Button href="/products">Explore Products</Button>
              </Magnetic>
              <Magnetic strength={5}>
                <Button href="/services" variant="ghost">
                  Our Services
                </Button>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.55}>
            <ul aria-label="Live products" className="mt-10 flex flex-wrap gap-2">
              {live.map((p) => (
                <li key={p.slug} className="label rounded-full border border-line bg-fg/[0.04] px-3.5 py-1.5 text-muted">
                  {p.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <PointerParallax className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
        <Reveal delay={0.2} variant="scale" className="relative">
          <div className="card relative isolate mx-auto aspect-square w-full overflow-hidden rounded-[2rem] lg:max-w-[30rem]" style={{ background: "var(--clay-bg)" }}>
            <ClayScene />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </div>
          <Float icon={<Nfc className="size-4" />} title="Tap to connect" line="Nectcard" className="-left-4 top-8 lg:-left-12" depth={-18} />
          <Float icon={<UtensilsCrossed className="size-4" />} title="Table 14 · New order" line="VentaDot" className="-right-2 top-1/2 lg:-right-8" depth={26} />
          <Float icon={<Bot className="size-4" />} title="Bots and AI agents" line="AI & Automation" className="-bottom-3 left-6 lg:left-2" depth={-12} />
        </Reveal>
        </PointerParallax>
      </div>

      <div className="container-x relative mt-12">
        <div className="label flex items-center justify-between gap-6 border-t border-line pt-5 text-muted">
          <span>Technology & digital solutions · Ahmedabad, India</span>
          <span aria-hidden="true" className="hidden items-center gap-3 sm:flex">
            Scroll
            <span className="relative block h-9 w-px overflow-hidden bg-fg/20">
              <span className="absolute inset-0 bg-fg [animation:scroll-cue_2.2s_ease-in-out_infinite]" />
            </span>
          </span>
          <span className="hidden md:inline">Products · Websites · Software · AI & Automation</span>
        </div>
      </div>
    </header>
  );
}
