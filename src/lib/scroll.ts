import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/** Smooth-scroll to a page offset through Lenis when it is running (native smooth scroll fights it). */
export function scrollToY(y: number) {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
