"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "priinteve-intro-seen";
const WORD = "Priinteve";

/**
 * Quiet intro: the wordmark rises letter by letter over a hairline progress rule, then the espresso
 * curtain splits and parts. Once per session; skipped for reduced-motion users; hidden without JS.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked: just run the intro */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const t = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(t);
    }
    const root = document.documentElement;
    root.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const dur = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setPct(100);
        setPhase("exit");
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }, 1200);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;
  const exit = phase === "exit";

  return (
    <div id="preloader" data-tone="dark" role="status" aria-label="Loading" className="fixed inset-0 z-[90] text-fg">
      {/* two halves that part */}
      {(["top", "bottom"] as const).map((half) => (
        <motion.div
          key={half}
          className={`absolute inset-x-0 bg-bg ${half === "top" ? "top-0 h-1/2" : "bottom-0 h-1/2"}`}
          animate={{ y: exit ? (half === "top" ? "-100%" : "100%") : 0 }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        />
      ))}

      <motion.div className="absolute inset-0 grid place-items-center px-6" animate={{ opacity: exit ? 0 : 1 }} transition={{ duration: 0.35 }}>
        <div className="w-full max-w-xl text-center">
          <p aria-hidden="true" className="font-display text-[clamp(2.8rem,10vw,5.5rem)] font-semibold leading-none tracking-tight">
            {WORD.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  {ch}
                </motion.span>
              </span>
            ))}
          </p>
          <div className="mt-10 flex items-center gap-5" aria-hidden="true">
            <span className="relative h-px flex-1 bg-fg/20">
              <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%`, height: 2, top: -0.5 }} />
            </span>
            <span className="numeral w-16 text-right text-2xl text-muted tabular-nums">{pct}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
