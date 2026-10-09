"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onConsentOpen, openConsent, saveConsent, useConsent, type ConsentChoice } from "@/lib/consent";
import { cn } from "@/lib/utils";

const CATEGORIES: { key: keyof ConsentChoice | "necessary"; title: string; text: string }[] = [
  { key: "necessary", title: "Necessary", text: "Remembers your light or dark theme and skips the intro after your first visit. Always on." },
  { key: "media", title: "Media", text: "Lets embedded YouTube product videos load. YouTube may set its own cookies once a video plays." },
  { key: "analytics", title: "Analytics", text: "Helps us understand how the site is used. We run no analytics today; this stays off until we do and you agree." },
];

function Switch({ on, disabled, onChange, label }: { on: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!on)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300",
        on ? "border-accent-strong bg-accent-strong" : "border-line bg-fg/10",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span className={cn("ml-0.5 size-[1.15rem] rounded-full bg-white shadow transition-transform duration-300 ease-out-expo", on && "translate-x-5")} />
    </button>
  );
}

/**
 * Cookie consent: a floating card on first visit with Accept all, Reject non-essential (same weight)
 * and Customise. The footer's "Cookie settings" reopens it at any time.
 */
export function CookieConsent() {
  const consent = useConsent();
  const reduce = useReducedMotion();
  const [forced, setForced] = useState(false);
  const [custom, setCustom] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ media: false, analytics: false });

  useEffect(
    () =>
      onConsentOpen(() => {
        setDraft({ media: consent?.media ?? false, analytics: consent?.analytics ?? false });
        setCustom(true);
        setForced(true);
      }),
    [consent],
  );

  const open = consent === null || forced;
  const choose = (c: ConsentChoice) => {
    saveConsent(c);
    setForced(false);
    setCustom(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          data-tone="dark"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grain fixed inset-x-3 bottom-3 z-[80] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[1.5rem] border border-line bg-bg/95 p-5 text-fg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[26rem] sm:p-6"
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <p id="consent-title" className="flex items-center gap-3 font-display text-lg font-semibold">
                <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent">
                  <Cookie aria-hidden="true" className="size-4" />
                </span>
                <span>Your privacy, your <span className="em">choice</span></span>
              </p>
              {forced && (
                <button type="button" onClick={() => setForced(false)} aria-label="Close cookie settings" className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-accent">
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </div>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              We use only what the site needs to work. Pick what else you allow. Read the{" "}
              <Link href="/cookie-policy" className="link-u text-fg">
                Cookie Policy
              </Link>
              .
            </p>

            {custom && (
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {CATEGORIES.map((c) => {
                  const fixed = c.key === "necessary";
                  const on = fixed ? true : draft[c.key as keyof ConsentChoice];
                  return (
                    <li key={c.key} className="flex items-start justify-between gap-5 py-4">
                      <span>
                        <span className="block text-[0.95rem] font-semibold">{c.title}</span>
                        <span className="mt-1 block text-[0.82rem] leading-relaxed text-muted">{c.text}</span>
                      </span>
                      <Switch label={c.title} on={on} disabled={fixed} onChange={(v) => setDraft((d) => ({ ...d, [c.key]: v }))} />
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => choose({ media: false, analytics: false })} className="rounded-full border border-line px-4 py-2.5 text-[0.86rem] font-semibold transition-colors hover:border-accent">
                Reject non-essential
              </button>
              <button type="button" onClick={() => choose({ media: true, analytics: true })} className="rounded-full border border-accent-strong bg-accent-strong px-4 py-2.5 text-[0.86rem] font-semibold text-on-accent transition-shadow hover:shadow-[0_0_30px_-6px_rgb(157_189_106/0.9)]">
                Accept all
              </button>
              {custom ? (
                <button type="button" onClick={() => choose(draft)} className="col-span-2 rounded-full bg-fg px-4 py-2.5 text-[0.86rem] font-semibold text-bg transition-opacity hover:opacity-90">
                  Save my choices
                </button>
              ) : (
                <button type="button" onClick={() => setCustom(true)} className="link-u col-span-2 mx-auto mt-1 w-fit text-[0.84rem] font-semibold text-muted hover:text-fg">
                  Customise
                </button>
              )}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

/** Footer link that reopens the consent panel. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Cookie settings
    </button>
  );
}
