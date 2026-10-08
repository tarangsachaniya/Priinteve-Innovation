"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Priinteve motion vocabulary for entrances. Each variant has one job:
 * - fade  (default): content that should simply appear; no movement, so long pages don't feel repetitive
 * - mask : images and visuals, revealed by a clip that opens from the bottom edge
 * - scale: cards in a set, settling from 96% with a soft blur
 * - rise : the old fade-up, kept for the few places that need direction
 */
type Variant = "fade" | "mask" | "scale" | "rise";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  /** only used by the "rise" variant */
  y?: number;
  x?: number;
  blur?: boolean;
  variant?: Variant;
  /** render as a list item, so it can sit directly inside <ul>/<ol> */
  as?: "div" | "li";
};

const EASE = [0.16, 1, 0.3, 1] as const;

function states(variant: Variant, y: number, x: number, blur: boolean) {
  switch (variant) {
    case "mask":
      return { initial: { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 }, animate: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }, duration: 1.1 };
    case "scale":
      return { initial: { opacity: 0, scale: 0.96, filter: "blur(6px)" }, animate: { opacity: 1, scale: 1, filter: "blur(0px)" }, duration: 0.8 };
    case "rise":
      return { initial: { opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }, animate: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }, duration: 0.8 };
    default:
      return { initial: { opacity: 0 }, animate: { opacity: 1 }, duration: 0.9 };
  }
}

export function Reveal({ delay = 0, y = 24, x = 0, blur = false, variant = "fade", as = "div", children, className, ...rest }: Props) {
  const reduce = useReducedMotion();
  // min-w-0: as a grid/flex item, never let long content stretch the track past the viewport
  const cls = cn("min-w-0", className as string | undefined);
  if (reduce) {
    const Tag = as;
    return <Tag className={cls}>{children as React.ReactNode}</Tag>;
  }
  const s = states(variant, y, x, blur);
  const motionProps = {
    initial: s.initial,
    whileInView: s.animate,
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: s.duration, delay, ease: EASE },
  };
  if (as === "li")
    return (
      <motion.li {...motionProps} {...(rest as HTMLMotionProps<"li">)} className={cls}>
        {children}
      </motion.li>
    );
  return (
    <motion.div {...motionProps} {...rest} className={cls}>
      {children}
    </motion.div>
  );
}
