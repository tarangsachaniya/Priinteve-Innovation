import { home } from "@/content/pages";
import { products } from "@/content/products";
import { Heading } from "../motion/heading";
import { Reveal } from "../motion/reveal";
import { ClayScene } from "../three/scenes";
import { Arch } from "../ui/arch";
import { Button } from "../ui/primitives";

const TAIL = "print, serve and grow";

/** Home hero: big soft serif headline beside an arch window holding ray-marched clay forms. */
export function HomeHero() {
  const live = products.filter((p) => p.status === "Live");
  return (
    <header data-tone="light" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg pb-10 pt-28 text-fg md:pt-32">
      <div className="container-x grid flex-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal y={10}>
            <p className="label mb-8 flex items-center gap-3 text-muted">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Priinteve Innovations
            </p>
          </Reveal>
          <Heading as="h1" em={TAIL} className="text-[clamp(3.1rem,8vw,7.6rem)] leading-[0.98]">
            {home.h1}
          </Heading>
          <Reveal delay={0.35}>
            <p className="mt-9 max-w-xl text-xl text-fg/80 md:text-[1.4rem] md:leading-snug">{home.lead}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/products">Explore Products</Button>
              <Button href="/contact" variant="ghost">
                Work With Us
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Arch bg="var(--clay-bg)" className="mx-auto aspect-[3/4] w-full lg:max-w-[28rem]">
            <ClayScene />
          </Arch>
          <ul aria-label="Live products" className="label absolute -left-2 bottom-10 hidden flex-col gap-2 sm:flex lg:-left-10">
            {live.map((p) => (
              <li key={p.slug} className="w-fit rounded-full border border-fg/30 bg-bg/90 px-4 py-2 backdrop-blur">
                {p.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="container-x mt-12">
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
