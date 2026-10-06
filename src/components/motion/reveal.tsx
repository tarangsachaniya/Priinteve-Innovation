"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** blur-to-clear on entry */
  blur?: boolean;
  x?: number;
};

/** Fade-up (optionally blur-to-clear / horizontal) reveal, once, when scrolled into view. */
export function Reveal({ delay = 0, y = 28, x = 0, blur = false, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string | undefined}>{children as React.ReactNode}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
