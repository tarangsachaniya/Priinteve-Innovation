import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The signature arch window: a tall frame with a fully round top.
 * `tint` is a pastel hex (sinks into the background in dark mode); `bg` is any raw CSS background.
 */
export function Arch({ children, tint, bg, className, style }: { children?: ReactNode; tint?: string; bg?: string; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-t-[999px] rounded-b-[2rem]", tint && "tint", className)}
      style={{ ...(tint ? ({ "--tint": tint } as CSSProperties) : {}), ...(bg ? { background: bg } : {}), ...style }}
    >
      {children}
    </div>
  );
}
