export type IconName =
  | "printer" | "utensils" | "scissors" | "card" | "package" | "monitor" | "bag" | "blocks" | "scan"
  | "trending" | "layers" | "leaf" | "factory" | "puzzle" | "handshake" | "rupee" | "shield" | "sparkles"
  | "message" | "send" | "bot" | "workflow" | "plug" | "database" | "store" | "code" | "compass" | "rocket" | "search" | "palette";

export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

export type ProductSlug = "xerox-buddy" | "ventadot" | "salonly" | "nectcard" | "priinteve-printing";

export type ServiceSlug =
  | "website-design-development"
  | "custom-web-applications"
  | "ecommerce-websites"
  | "whatsapp-catalog"
  | "custom-software"
  | "crm-erp"
  | "nfc-qr-solutions"
  | "whatsapp-bots"
  | "telegram-bots"
  | "ai-agents"
  | "business-automation"
  | "ai-integrations"
  | "seo-google-business"
  | "branding";

export type ServiceCategory = "web" | "ecommerce" | "software" | "nfcqr" | "ai" | "growth";

export type WorkSlug = "royal-timber" | "premium-cashew-ecommerce" | "quantivo";

export type Seo = { title: string; description: string; keywords?: string };

/** A screenshot or photo stored under /public/media. */
export type Media = { src: string; alt: string; width: number; height: number };

export type HowBlock = {
  heading: string;
  intro?: string;
  items: (string | { title: string; text: string })[];
  /** render as numbered step cards instead of a checklist */
  steps?: boolean;
};

export type Feature = { title: string; text: string };

export type Plan = { name: string; price: string; period?: string; note?: string; items: string[]; featured?: boolean };

export type Product = {
  slug: ProductSlug;
  name: string;
  icon: IconName;
  status: "Live" | "Coming soon";
  /** the live product website; every "use it" CTA points here */
  liveUrl?: string;
  /** YouTube video id of the official product demo */
  videoId?: string;
  seo: Seo;
  /** short category line, e.g. "QR printing for print shops" */
  category: string;
  h1: string;
  hero: string;
  /** one-line card description (Home / Products) */
  card: string;
  problem?: string;
  how: HowBlock[];
  featuresHeading: string;
  features: Feature[];
  /** short capability chips */
  highlights: string[];
  pricing?: { intro: string; plans: Plan[]; note?: string };
  platforms?: string[];
  who: string;
  audiences: string[];
  comingSoon?: string;
  waitlistFields?: string[];
  faq: FaqItem[];
  cta: { heading: string; sub?: string; button: string; href?: string };
  related: ProductSlug;
  relatedServices: ServiceSlug[];
  mock: { title: string; rows: [string, string][] };
  /** Products page comparison table */
  builtFor: string;
  howCustomersUse: string;
  media?: { desktop: Media; mobile: Media; section?: Media };
};

export type Service = {
  slug: ServiceSlug;
  category: ServiceCategory;
  name: string;
  /** shorter label for menus and cards */
  short?: string;
  icon: IconName;
  seo: Seo;
  h1: string;
  body: string;
  card: string;
  includes: string[];
  useCases: Feature[];
  deliverables: string[];
  faq: FaqItem[];
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
  liveUrl?: string;
  domain?: string;
  overview: string[];
  highlights: Feature[];
  /** what the client sells / offers, shown as chips */
  scope?: { heading: string; items: string[] };
  media?: { cover: Media; desktop?: Media; mobile?: Media; gallery: Media[] };
  /** a related Priinteve product the client also uses, if any (verified on the live product) */
  alsoUses?: { product: ProductSlug; text: string; href: string };
};
