export type IconName =
  | "printer" | "utensils" | "scissors" | "card" | "package" | "monitor" | "bag" | "blocks" | "scan"
  | "trending" | "layers" | "leaf" | "factory" | "puzzle" | "handshake" | "rupee" | "shield" | "sparkles"
  | "message" | "send" | "bot" | "workflow" | "plug";

export type FaqItem = { q: string; a: string };

export type ProductSlug =
  | "xerox-buddy"
  | "vantadot"
  | "salony"
  | "nectcard"
  | "priinteve-printing";

export type ServiceSlug =
  | "website-design-development"
  | "ecommerce-websites"
  | "custom-web-applications"
  | "nfc-qr-solutions"
  | "whatsapp-bots"
  | "telegram-bots"
  | "ai-agents"
  | "business-automation"
  | "ai-integrations";

export type ServiceCategory = "web" | "digital" | "ai";

export type WorkSlug =
  | "quantivo"
  | "royal-timber"
  | "cashew-ecommerce"
  | "pvc-cpvc-machinery";

export type Seo = { title: string; description: string; keywords: string };

export type HowBlock = {
  heading: string;
  intro?: string;
  items: string[];
  /** render as numbered step cards instead of a checklist */
  steps?: boolean;
};

export type Product = {
  slug: ProductSlug;
  name: string;
  icon: IconName;
  status: "Live" | "Coming soon";
  seo: Seo;
  h1: string;
  hero: string;
  /** one-line card description (Home / Products) */
  card: string;
  problem?: string;
  how: HowBlock[];
  featuresHeading: string;
  features: string[];
  featuresNote?: string;
  comingSoon?: string;
  who?: string;
  waitlistFields?: string[];
  faq: FaqItem[];
  cta: { heading: string; sub?: string; button: string; href?: string };
  /** primary hero button override (external / anchor) */
  heroButton?: { label: string; href: string; secondary?: string };
  related: ProductSlug;
  mock: { title: string; rows: [string, string][] };
  /** Products page comparison table */
  builtFor: string;
  howCustomersUse: string;
};

export type Service = {
  slug: ServiceSlug;
  category: ServiceCategory;
  name: string;
  icon: IconName;
  seo: Seo;
  h1: string;
  body: string;
  card: string;
  relatedWork: WorkSlug[];
  relatedProducts?: ProductSlug[];
};

export type Project = {
  slug: WorkSlug;
  name: string;
  category: string;
  summary: string;
  client: string;
  service: ServiceSlug;
  icon: IconName;
  colors: [string, string];
  seo: { title: string; description: string };
};
