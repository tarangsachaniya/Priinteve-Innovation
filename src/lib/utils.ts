import { clsx, type ClassValue } from "clsx";

export const cn = (...v: ClassValue[]) => clsx(v);

export type Tone = "light" | "sand" | "dark" | "brand";

/**
 * Per-product identity: the soft tint its cards, panels and hero take. In dark mode the `.tint` class
 * sinks the same hue into the background. Presentation only; business content lives in src/content.
 */
export const PRODUCT_ID: Record<string, { tint: string }> = {
  "xerox-buddy": { tint: "#e5dcf6" },
  vantadot: { tint: "#f8dbe6" },
  salony: { tint: "#d9e7f6" },
  nectcard: { tint: "#d9efe6" },
  "priinteve-printing": { tint: "#f4e9d2" },
};

export const SERVICE_TINT: Record<string, string> = {
  "website-design-development": "#e5dcf6",
  "ecommerce-websites": "#f8dbe6",
  "custom-web-applications": "#f4e9d2",
  "nfc-qr-solutions": "#d9efe6",
};

/** Neutral tint for things without a product (services link, FAQ, contact). */
export const NEUTRAL_TINT = "#e5dcf6";
