import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "../ui/primitives";

const VERBS = /(print|build|automate|launch)/gi;

/** Headline with the accent phrase (`em`) highlighted, or, by default, the four verbs. */
function Headline({ text, em }: { text: string; em?: string }) {
  const at = em ? text.indexOf(em) : -1;
  if (em && at >= 0)
    return (
      <>
        {text.slice(0, at)}
        <span className="em">{em}</span>
        {text.slice(at + em.length)}
      </>
    );
  return (
    <>
      {text.split(VERBS).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="em">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * Closing call to action, kept to the essentials: one short line, the primary action, and the two
 * direct ways to reach us as quiet pills. No supporting copy; the footer carries the rest.
 */
export function ContactCtaBand({ heading, em }: { heading: string; em?: string }) {
  return (
    <section data-tone="brand" data-dock-stop aria-label="Contact" className="relative isolate overflow-hidden bg-bg py-20 text-fg md:py-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(238_216_158/0.14),transparent)]" />

      <div className="container-x flex flex-col items-center text-center">
        <h2 className="max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] tracking-[-0.04em]">
          <Headline text={heading} em={em} />
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact" className="w-full max-w-xs sm:w-auto sm:max-w-none">Start a project</Button>
          <Button href={site.phoneHref} variant="secondary" arrow={false} className="w-full max-w-xs sm:w-auto sm:max-w-none">
            <Phone aria-hidden="true" className="size-4 text-accent" />
            {site.phone}
          </Button>
          <Button href={`mailto:${site.email}`} variant="secondary" arrow={false} className="w-full max-w-xs sm:w-auto sm:max-w-none">
            <Mail aria-hidden="true" className="size-4 text-accent" />
            {site.email}
          </Button>
        </div>
      </div>
    </section>
  );
}
