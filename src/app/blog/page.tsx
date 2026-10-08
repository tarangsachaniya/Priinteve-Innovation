import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Button, Section } from "@/components/ui/primitives";
import { blogPage } from "@/content/pages";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("/blog", blogPage.seo);

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Blog", href: "/blog" }])} />
      <PageHero trail={[{ name: "Blog" }]} h1={blogPage.h1} lead={blogPage.intro} actions={<Button href="/products">Explore products</Button>} />
      <Section>
        <div className="grid gap-x-20 gap-y-16 md:grid-cols-2">
          {blogPage.clusters.map((c, i) => (
            <Reveal key={c.cluster} delay={(i % 2) * 0.08}>
              <article className="border-t border-line pt-8">
                <p className="flex items-baseline gap-4">
                  <span className="numeral text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label text-muted">{c.cluster}</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {c.ideas.map((idea) => (
                    <li key={idea} className="font-display text-2xl leading-snug md:text-[1.7rem]">
                      {idea}
                    </li>
                  ))}
                </ul>
                <Link href={c.href} className="group mt-8 inline-flex items-center gap-2 font-semibold">
                  <span className="link-u">{c.linkLabel}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
