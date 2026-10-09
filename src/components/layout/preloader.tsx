"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

const KEY = "priinteve-intro-seen";
const WORDS = ["Print", "Build", "Automate", "Launch"];
const RING = 2 * Math.PI * 118;
const MARK: CSSProperties = {
  WebkitMaskImage: "url(/logo-mark.webp)",
  maskImage: "url(/logo-mark.webp)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

/**
 * Intro: the Priinteve bird sits inside a progress ring and fills with green from its feet up as the
 * page loads, while the four verbs cycle beneath it. At 100 the bird takes flight up and to the right,
 * and the page opens through an expanding circle where it was. Once per session; skipped for
 * reduced-motion users; hidden without JS.
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
    const dur = 2000;
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
    }, 1300);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;
  const exit = phase === "exit";
  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((pct / 100) * WORDS.length))];

  return (
    <motion.div
      id="preloader"
      data-tone="dark"
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[90] overflow-hidden bg-bg text-fg"
      initial={{ "--hole": "0vmax" } as never}
      animate={{ "--hole": exit ? "160vmax" : "0vmax" } as never}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: exit ? 0.15 : 0 }}
      style={{ WebkitMaskImage: "radial-gradient(circle at 50% 46%, transparent var(--hole), #000 calc(var(--hole) + 1px))", maskImage: "radial-gradient(circle at 50% 46%, transparent var(--hole), #000 calc(var(--hole) + 1px))" }}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="absolute left-1/2 top-[46%] size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b8e3d]/20 blur-[120px]" />

      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="flex flex-col items-center">
          {/* ring + bird */}
          <div aria-hidden="true" className="relative grid size-[15rem] place-items-center sm:size-[17rem]">
            <motion.svg viewBox="0 0 256 256" className="absolute inset-0 size-full -rotate-90" animate={{ opacity: exit ? 0 : 1, scale: exit ? 1.15 : 1 }} transition={{ duration: 0.5 }}>
              <circle cx="128" cy="128" r="118" fill="none" stroke="rgb(250 248 242 / 0.08)" strokeWidth="1.5" />
              <circle cx="128" cy="128" r="118" fill="none" stroke="#9dbd6a" strokeWidth="2" strokeLinecap="round" strokeDasharray={RING} strokeDashoffset={RING * (1 - pct / 100)} style={{ filter: "drop-shadow(0 0 6px rgb(157 189 106 / 0.7))" }} />
            </motion.svg>
            <motion.div
              className="relative aspect-[547/373] w-[58%]"
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={exit ? { x: "70vw", y: "-70vh", rotate: -14, scale: 0.35, opacity: 0 } : { opacity: 1, scale: 1, y: 0 }}
              transition={exit ? { duration: 1, ease: [0.55, 0, 0.75, 0.2] } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute inset-0" style={{ ...MARK, background: "rgb(250 248 242 / 0.1)" }} />
              <span className="absolute inset-0" style={{ ...MARK, background: "linear-gradient(150deg, #6ff08f 0%, #1dc94f 45%, #0d7a2d 100%)", clipPath: `inset(${100 - pct}% 0 0 0)` }} />
            </motion.div>
          </div>

          {/* wordmark + verb */}
          <motion.div className="mt-8 flex flex-col items-center" animate={{ opacity: exit ? 0 : 1, y: exit ? -10 : 0 }} transition={{ duration: 0.4 }}>
            <p className="font-display text-2xl font-semibold tracking-[-0.03em]">Priinteve</p>
            <div className="label mt-3 flex items-center gap-3 text-muted">
              <span className="relative inline-block h-[1.2em] w-[6.5rem] overflow-hidden text-right">
                <motion.span key={word} className="absolute inset-0 text-accent" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                  {word}
                </motion.span>
              </span>
              <span aria-hidden="true" className="size-[5px] rotate-45 bg-accent" />
              <span className="w-10 tabular-nums">{String(pct).padStart(3, "0")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
