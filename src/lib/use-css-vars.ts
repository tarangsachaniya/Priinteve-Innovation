"use client";

import { useMemo, useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/**
 * Reads CSS custom properties from <html> and re-reads them when the theme flips. Used by scroll and
 * WebGL scenes that need real colour values rather than `var()` references. Empty strings until mounted.
 */
export function useCssVars<const T extends readonly string[]>(names: T): Record<T[number], string> {
  const key = names.join("|");
  const snap = useSyncExternalStore(
    subscribe,
    () => {
      const cs = getComputedStyle(document.documentElement);
      return names.map((n) => cs.getPropertyValue(n).trim()).join("|");
    },
    () => "",
  );
  return useMemo(() => {
    const vals = snap.split("|");
    return Object.fromEntries(names.map((n, i) => [n, vals[i] ?? ""])) as Record<T[number], string>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snap, key]);
}
