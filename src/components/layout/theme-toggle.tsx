"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const KEY = "priinteve-theme";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** Light / dark switch. The initial theme comes from the saved choice or the OS (see the layout head script). */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const dark = theme === "dark";

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked: the choice lasts for this visit only */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      className={cn("relative grid size-11 place-items-center rounded-full border border-fg/40 text-fg transition-colors duration-300 hover:bg-fg hover:text-bg", className)}
    >
      <Sun aria-hidden="true" className={cn("absolute size-[1.15rem] transition-all duration-500", dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      <Moon aria-hidden="true" className={cn("absolute size-[1.15rem] transition-all duration-500", dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0")} />
    </button>
  );
}
