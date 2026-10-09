"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie and storage consent. Necessary storage (theme, intro skip) is always on; everything else waits
 * for a choice. The choice lives in localStorage and every change is broadcast as a window event, so any
 * component can react without a provider.
 */
export type Consent = { v: 1; media: boolean; analytics: boolean; ts: number };
export type ConsentChoice = Pick<Consent, "media" | "analytics">;

const KEY = "priinteve-consent";
const CHANGE = "priinteve:consent-change";
const OPEN = "priinteve:consent-open";

let cache: Consent | null | undefined;

function read(): Consent | null {
  if (cache !== undefined) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Consent) : null;
    cache = parsed && parsed.v === 1 ? parsed : null;
  } catch {
    cache = null;
  }
  return cache;
}

export function saveConsent(choice: ConsentChoice) {
  const next: Consent = { v: 1, media: choice.media, analytics: choice.analytics, ts: Date.now() };
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: the choice still holds for this page view */
  }
  window.dispatchEvent(new Event(CHANGE));
}

/** Reopens the consent panel (footer "Cookie settings"). */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN));
}

export function onConsentOpen(fn: () => void) {
  window.addEventListener(OPEN, fn);
  return () => window.removeEventListener(OPEN, fn);
}

function subscribe(fn: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = undefined;
    fn();
  };
  window.addEventListener(CHANGE, fn);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE, fn);
    window.removeEventListener("storage", onStorage);
  };
}

/** The saved choice, `null` when the visitor hasn't chosen yet, `undefined` during server render. */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, read, () => undefined);
}
