"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "@/lib/scroll";

const ENTRY_ID = "__priinteveScrollEntry";
const POSITION_PREFIX = "priinteve:scroll:";

/** Buttery smooth scrolling (as on the Quantivo site). Disabled for reduced-motion users. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const previousPathname = useRef(pathname);
  const activeEntry = useRef<string | null>(null);
  const positions = useRef(new Map<string, number>());
  const pendingPop = useRef<string | null>(null);
  const mounted = useRef(false);
  const [historyNavigation, setHistoryNavigation] = useState(0);

  useLayoutEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useLayoutEffect(() => {
    const onPop = (event: PopStateEvent) => {
      const state = event.state;
      pendingPop.current =
        state && typeof state === "object" && typeof state[ENTRY_ID] === "string"
          ? state[ENTRY_ID]
          : "";
      if (window.location.pathname === pathnameRef.current) {
        setHistoryNavigation((revision) => revision + 1);
      }
    };
    window.addEventListener("popstate", onPop, true);
    return () => window.removeEventListener("popstate", onPop, true);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: true });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    let saveFrame = 0;
    let pendingY = window.scrollY;
    const savePosition = () => {
      const entry = activeEntry.current;
      if (!entry) return;
      positions.current.set(entry, pendingY);
      try {
        sessionStorage.setItem(`${POSITION_PREFIX}${entry}`, String(pendingY));
      } catch {
        // Scroll restoration still works for the lifetime of this page without session storage.
      }
    };
    const onScroll = () => {
      if (window.location.pathname !== pathname) return;
      pendingY = window.scrollY;
      if (!saveFrame) {
        saveFrame = requestAnimationFrame(() => {
          saveFrame = 0;
          savePosition();
        });
      }
    };
    const onClick = (event: MouseEvent) => {
      pendingY = window.scrollY;
      if (saveFrame) cancelAnimationFrame(saveFrame);
      saveFrame = 0;
      savePosition();

      const target = event.target;
      const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (
        !anchor ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }
      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search ||
        !destination.hash ||
        destination.hash === window.location.hash
      ) {
        return;
      }
      const entry = crypto.randomUUID();
      const previousEntry = activeEntry.current;
      activeEntry.current = entry;
      let attempts = 0;
      const tagEntry = () => {
        if (
          window.location.pathname === destination.pathname &&
          window.location.search === destination.search &&
          window.location.hash === destination.hash
        ) {
          const state = window.history.state;
          if (state && typeof state === "object" && state.__NA === true) {
            window.history.replaceState({ ...state, [ENTRY_ID]: entry }, "");
            return;
          }
        }
        if (attempts++ < 120) {
          requestAnimationFrame(tagEntry);
        } else if (activeEntry.current === entry) {
          activeEntry.current = previousEntry;
        }
      };
      requestAnimationFrame(tagEntry);
    };
    const onPageHide = () => {
      pendingY = window.scrollY;
      if (saveFrame) cancelAnimationFrame(saveFrame);
      saveFrame = 0;
      savePosition();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("click", onClick, true);
    return () => {
      if (saveFrame) cancelAnimationFrame(saveFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const goTo = (y: number) => {
      lenisRef.current?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo(0, y);
    };

    const writeEntryId = (id: string) => {
      const state = window.history.state;
      if (!state || typeof state !== "object" || state.__NA !== true) return;
      window.history.replaceState({ ...state, [ENTRY_ID]: id }, "");
    };
    const readPosition = (id: string) => {
      const inMemory = positions.current.get(id);
      if (inMemory !== undefined) return inMemory;
      try {
        const stored = sessionStorage.getItem(`${POSITION_PREFIX}${id}`);
        if (stored === null) return null;
        const saved = Number(stored);
        return Number.isFinite(saved) && saved >= 0 ? saved : null;
      } catch {
        return null;
      }
    };
    const restorePosition = (y: number) => {
      let frame = 0;
      let cancelled = false;
      let observer: ResizeObserver | null = null;

      const stop = () => {
        cancelled = true;
        if (frame) cancelAnimationFrame(frame);
        observer?.disconnect();
        window.removeEventListener("resize", schedule);
        window.removeEventListener("wheel", cancel, true);
        window.removeEventListener("touchstart", cancel, true);
        window.removeEventListener("pointerdown", cancel, true);
        window.removeEventListener("keydown", onKeyDown, true);
      };
      const attempt = () => {
        frame = 0;
        if (cancelled) return;
        const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        goTo(Math.min(y, maxY));
        window.dispatchEvent(new Event("scroll"));
        if (window.scrollY >= y - 2) stop();
      };
      function schedule() {
        if (!frame && !cancelled) frame = requestAnimationFrame(attempt);
      }
      function cancel() {
        stop();
      }
      function onKeyDown(event: KeyboardEvent) {
        if (["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "].includes(event.key)) cancel();
      }

      observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
      observer?.observe(document.documentElement);
      if (document.body) observer?.observe(document.body);
      if (!observer) window.addEventListener("resize", schedule);
      window.addEventListener("wheel", cancel, { capture: true, passive: true });
      window.addEventListener("touchstart", cancel, { capture: true, passive: true });
      window.addEventListener("pointerdown", cancel, true);
      window.addEventListener("keydown", onKeyDown, true);
      schedule();
      return stop;
    };

    if (pendingPop.current !== null && pathname !== window.location.pathname) return;
    const isPop = pendingPop.current !== null;
    if (!mounted.current) {
      mounted.current = true;
      previousPathname.current = pathname;
      const state = window.history.state;
      const existingId =
        state && typeof state === "object" && typeof state[ENTRY_ID] === "string"
          ? state[ENTRY_ID]
          : null;
      const id = existingId ?? crypto.randomUUID();
      activeEntry.current = id;
      writeEntryId(id);
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const navigationType = navigationEntry?.type;
      const saved = readPosition(id);
      if (saved !== null && (navigationType === "reload" || navigationType === "back_forward")) {
        return restorePosition(saved);
      }
      return;
    }

    if (!isPop && previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const id = isPop && pendingPop.current ? pendingPop.current : crypto.randomUUID();
    pendingPop.current = null;
    activeEntry.current = id;
    writeEntryId(id);

    if (window.location.hash) return;
    if (isPop) {
      const saved = readPosition(id);
      return restorePosition(saved ?? 0);
    }

    goTo(0);
  }, [pathname, historyNavigation]);

  return null;
}
