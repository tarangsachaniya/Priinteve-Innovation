import { Bot, Printer, UtensilsCrossed } from "lucide-react";
import { home } from "@/content/pages";
import { products } from "@/content/products";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";
import { ClayScene } from "../three/scenes";
import { Button } from "../ui/primitives";

const TAIL = "print, serve and grow";

// deterministic specks so the server and client render the same markup
const SPECKS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 7) % 91}%`,
  size: 2 + (i % 3),
  delay: `${(i % 6) * 0.8}s`,
  dur: `${5 + (i % 5)}s`,
}));

/** A small glass card floating beside the 3D object. Decorative; copy mirrors the real products. */
function Float({ icon, title, line, className, delay }: { icon: React.ReactNode; title: string; line: string; className: string; delay: string }) {
  return (
    <div aria-hidden="true" className={`absolute hidden sm:block ${className}`} style={{ animation: `float-y 6s ease-in-out ${delay} infinite` }}>
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
        <i key={i} aria-hidden="true" className="pointer-events-none absolute rounded-full bg-accent/60" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animation: `float-y ${s.dur} ease-in-out ${s.delay} infinite`, opacity: 0.5 }} />
      ))}

      <div className="container-x relative grid flex-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal y={10}>
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
              <Button href="/products">Explore Products</Button>
              <Button href="/services" variant="ghost">
                Our Services
              </Button>
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

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="card relative isolate mx-auto aspect-square w-full overflow-hidden rounded-[2rem] lg:max-w-[30rem]" style={{ background: "var(--clay-bg)" }}>
            <ClayScene />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </div>
          <Float icon={<Printer className="size-4" />} title="Scan or tap. Print." line="Xerox Buddy" className="-left-4 top-8 lg:-left-12" delay="0s" />
          <Float icon={<UtensilsCrossed className="size-4" />} title="Table 4 · New" line="Vantadot" className="-right-2 top-1/2 lg:-right-8" delay="1.2s" />
          <Float icon={<Bot className="size-4" />} title="Bots and AI agents" line="AI & Automation" className="-bottom-3 left-6 lg:left-2" delay="2.4s" />
        </Reveal>
      </div>

      <div className="container-x relative mt-12">
        <div className="label flex items-center justify-between gap-6 border-t border-line pt-5 text-muted">
          <span>India-based product company</span>
          <span aria-hidden="true" className="hidden items-center gap-3 sm:flex">
            Scroll
            <span className="relative block h-9 w-px overflow-hidden bg-fg/20">
              <span className="absolute inset-0 bg-fg [animation:scroll-cue_2.2s_ease-in-out_infinite]" />
            </span>
          </span>
          <span className="hidden md:inline">Print any thing, anywhere, on demand.</span>
        </div>
      </div>
    </header>
  );
}
