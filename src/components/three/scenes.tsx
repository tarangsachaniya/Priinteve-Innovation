"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useCssVars } from "@/lib/use-css-vars";
import { cn } from "@/lib/utils";
import type { ObjectVariant } from "./object-canvas";
import { useSceneGate } from "./use-scene-gate";

// Three.js is only fetched when a scene first approaches the viewport.
const ClayCanvas = dynamic(() => import("./clay-canvas"), { ssr: false });
const ObjectCanvas = dynamic(() => import("./object-canvas"), { ssr: false });

const CLAY_VARS = ["--clay-bg", "--clay-a", "--clay-b"] as const;
const OBJ_VARS = ["--obj-line"] as const;

/** Ray-marched clay forms. Colours follow the theme (`--clay-*`) so the edges melt into the arch behind. */
export function ClayScene({ className }: { className?: string }) {
  const [ref, g] = useSceneGate();
  const v = useCssVars(CLAY_VARS);
  const colors = useMemo(() => ({ bg: v["--clay-bg"], a: v["--clay-a"], b: v["--clay-b"] }), [v]);
  return (
    <div ref={ref} aria-hidden="true" className={cn("absolute inset-0", className)}>
      {g.webgl && g.mounted && colors.bg && <ClayCanvas colors={colors} lite={g.lite} still={g.still} active={g.active} />}
    </div>
  );
}

/** Product / service object, drawn in the theme's line colour. `variant` picks the procedural geometry. */
export function Product3D({ variant, className }: { variant: ObjectVariant; className?: string }) {
  const [ref, g] = useSceneGate();
  const v = useCssVars(OBJ_VARS);
  return (
    <div ref={ref} className={cn(!className?.includes("absolute") && "relative", className)}>
      {g.webgl && g.mounted && v["--obj-line"] && <ObjectCanvas variant={variant} color={v["--obj-line"]} lite={g.lite} still={g.still} active={g.active} />}
    </div>
  );
}
