import { serviceCategories, servicesIn } from "@/content/services";
import { Reveal } from "../motion/reveal";
import { ServiceCard } from "./service-card";

/** Services grouped by category. Each group lists everything it covers, then a card per service page. */
export function ServiceGroups() {
  let n = 0;
  return (
    <div className="space-y-20 md:space-y-24">
      {serviceCategories.map((cat, ci) => {
        const items = servicesIn(cat.key);
        return (
          <div key={cat.key} id={cat.anchor} className="scroll-mt-28">
            <Reveal y={12}>
              <div className="mb-8 grid gap-6 border-b border-line pb-7 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-12">
                <div>
                  <p className="label flex items-center gap-3 text-accent">
                    <span className="numeral text-sm">{String(ci + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
                    Category
                  </p>
                  <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)]">{cat.name}</h3>
                  <p className="mt-3 max-w-xl text-muted">{cat.blurb}</p>
                </div>
                <ul aria-label={`${cat.name}: what we build`} className="flex flex-wrap gap-2 lg:justify-end">
                  {cat.items.map((it) => (
                    <li key={it} className="rounded-full border border-line bg-fg/[0.03] px-3.5 py-1.5 text-[0.82rem] text-muted">
                      {it}
                    </li>
                  ))}
                </ul>
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
