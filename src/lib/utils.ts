import { clsx, type ClassValue } from "clsx";

export const cn = (...v: ClassValue[]) => clsx(v);

export type Tone = "light" | "sand" | "dark" | "brand";
