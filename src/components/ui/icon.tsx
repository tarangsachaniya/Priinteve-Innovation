import {
  Blocks,
  CreditCard,
  Factory,
  Handshake,
  IndianRupee,
  Layers,
  Leaf,
  type LucideProps,
  Monitor,
  Package,
  Printer,
  Puzzle,
  ScanLine,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/content/types";

const ICONS: Record<IconName, ComponentType<LucideProps>> = {
  printer: Printer,
  utensils: UtensilsCrossed,
  scissors: Scissors,
  card: CreditCard,
  package: Package,
  monitor: Monitor,
  bag: ShoppingBag,
  blocks: Blocks,
  scan: ScanLine,
  trending: TrendingUp,
  layers: Layers,
  leaf: Leaf,
  factory: Factory,
  puzzle: Puzzle,
  handshake: Handshake,
  rupee: IndianRupee,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden="true" strokeWidth={1.6} {...props} />;
}
