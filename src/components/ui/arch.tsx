import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Standard visual frame: a dark rounded panel with a hairline border and a soft violet wash.
 * (Name kept from the earlier arch window so existing call sites keep working.) `bg` is any raw CSS background.
 */
export function Arch({ children, bg, className, style }: { children?: ReactNode; bg?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("card relative isolate overflow-hidden rounded-[1.75rem]", className)} style={{ ...(bg ? { background: bg } : {}), ...style }}>
      {children}
    </div>
  );
}
