"use client";

import { useEffect } from "react";
import { eventForLink, track } from "@/lib/track";

/** One delegated click listener that turns tel:, mailto:, CTA and outbound-product clicks into data-layer events. */
export function LinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const hit = eventForLink(a);
      if (hit) track(hit.event, hit.params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
