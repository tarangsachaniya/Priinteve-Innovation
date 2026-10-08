import { serviceCategories, services } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import { Reveal } from "../motion/reveal";
import { ServiceCard } from "./service-card";

const ANCHOR: Record<ServiceCategory, string> = { web: "web", digital: "digital", ai: "ai-automation" };
const POSITIONING: Partial<Record<ServiceCategory, string>> = {
  ai: "We build digital systems that automate repetitive business processes.",
};

/** Services grouped as Web Development, Digital Solutions and AI & Automation. One flat numbering runs through all of them. */
export function ServiceGroups() {
  let n = 0;
  return (
    <div className="space-y-16 md:space-y-20">
      {serviceCategories.map((cat) => {
        const items = services.filter((s) => s.category === cat.key);
        return (
          <div key={cat.key} id={ANCHOR[cat.key]} className="scroll-mt-28">
            <Reveal y={12}>
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
                <div>
                  <p className="label text-accent">{cat.name}</p>
                  <p className="mt-2 max-w-xl text-lg text-fg">{POSITIONING[cat.key] ?? cat.blurb}</p>
                </div>
                <span className="label text-muted">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={n++} delay={(i % 3) * 0.07} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
