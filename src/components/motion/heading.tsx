"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRevealed } from "@/lib/use-revealed";

type Props = {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  /** phrase inside `children` set in italic clay */
  em?: string;
  delay?: number;
};

/**
 * Masked word-by-word headline reveal: each word rises out of its own clipping box.
 * Plain text for reduced-motion users and for strings that contain "[to confirm]" markers.
 */
export function Heading({ as: Tag = "h2", children, className, em, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const [ref, shown] = useRevealed<HTMLHeadingElement>(0.06);
  if (reduce || children.includes("[")) {
    return <Tag className={className}>{children.replace(/\[([^\]]+)\]/g, "$1")}</Tag>;
  }

  // split into [text, isEm] runs, then to words
  const runs: [string, boolean][] = [];
  const at = em ? children.indexOf(em) : -1;
  if (em && at >= 0) {
    if (at > 0) runs.push([children.slice(0, at), false]);
    runs.push([em, true]);
    if (at + em.length < children.length) runs.push([children.slice(at + em.length), false]);
  } else runs.push([children, false]);

  let i = 0;
  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {runs.flatMap(([text, isEm]) =>
        text
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => {
            const n = i++;
            return (
              <span key={n} data-line aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
                <motion.span
                  className={cn("inline-block", isEm && "em")}
                  initial={{ y: "112%" }}
                  animate={{ y: shown ? "0%" : "112%" }}
                  transition={{ duration: 0.9, delay: delay + n * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                  {" "}
                </motion.span>
              </span>
            );
          }),
      )}
    </Tag>
  );
}
