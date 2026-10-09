"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow, Text } from "../ui/primitives";
import { Heading } from "./heading";

type Step = { title: string; text: string };

/**
 * Vertical scroll timeline: a sticky title on the left, steps on the right joined by a line that
 * draws as you scroll. The step nearest the middle of the screen lights up.
 */
export function Timeline({ eyebrow, title, steps, index }: { eyebrow: string; title: string; steps: Step[]; index?: string }) {
  const wrap = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = wrap.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <div className="lg:sticky lg:top-36 lg:self-start">
        <Eyebrow index={index} className="mb-7">
          {eyebrow}
        </Eyebrow>
        <Heading className="text-[clamp(2rem,4.4vw,3.5rem)]">{title}</Heading>
        <p className="numeral mt-10 hidden text-6xl text-accent lg:block" aria-hidden="true">
          {String(active + 1).padStart(2, "0")}
          <span className="text-3xl text-muted"> / {String(steps.length).padStart(2, "0")}</span>
        </p>
      </div>

      <ol ref={wrap} className="relative">
        {steps.map((s, i) => (
          <li key={s.title} data-step={i} className="relative pb-24 pl-16 last:pb-0 md:pb-32">
            {/* connector to the next node only, so nothing runs past the last step */}
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-2 left-[1.1rem] top-11 w-px bg-line">
                <span className={`absolute inset-0 origin-top bg-accent transition-transform duration-700 ease-out-expo ${i < active ? "scale-y-100" : "scale-y-0"}`} />
              </span>
            )}
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 grid size-9 place-items-center rounded-full border border-current bg-bg text-xs font-semibold transition-colors duration-500"
              style={{ background: i <= active ? "var(--accent)" : "var(--bg)", color: i <= active ? "var(--on-accent)" : "var(--fg)", borderColor: i <= active ? "var(--accent)" : "var(--line)" }}
            >
              {i + 1}
            </span>
            <div className={`transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-40"}`}>
              <h3 className="text-[clamp(1.8rem,3.4vw,2.8rem)]">{s.title}</h3>
              <p className="mt-4 max-w-lg text-lg text-muted">
                <Text>{s.text}</Text>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
