/**
 * Company facts: the single source of truth for names, contact details and positioning.
 * Only confirmed information lives here. Anything a legal page needs but is not confirmed is written as
 * BUSINESS_TBC and rendered as a visible "to be confirmed" chip (see src/content/legal.ts).
 */
export const site = {
  name: "Priinteve Innovations LLP",
  brand: "Priinteve Innovations",
  shortName: "Priinteve",
  positioning: "India-based technology and digital solutions company",
  description:
    "Priinteve Innovations LLP is an India-based technology and digital solutions company founded in 2026 in Ahmedabad. We build our own products and digital solutions for businesses: websites, e-commerce, custom software, CRM and ERP, NFC and QR, WhatsApp and Telegram bots, AI agents and automation.",
  tagline: "Products and digital solutions that help businesses operate, sell and grow.",
  founded: 2026,
  location: { city: "Ahmedabad", region: "Gujarat", country: "India", line: "Ahmedabad, Gujarat, India" },
  /** Registered office, as confirmed by the founders (October 2026). */
  registeredAddress: { street: "417, Mukhi Ne Khadki, Near Amba Maa Temple, Paldi Gam, Paldi", city: "Ahmedabad", region: "Gujarat", postalCode: "380007", line: "417, Mukhi Ne Khadki, Near Amba Maa Temple, Paldi Gam, Paldi, Ahmedabad, Gujarat 380007" },
  founders: [
    /* `photo` is used when the file exists in /public; until then the card shows initials */
    { name: "Tarang Sachaniya", role: "Co-founder", photo: "/media/founders/tarang-sachaniya.webp" },
  ],
  url: "https://priinteve.com",
  cardsUrl: "https://cards.priinteve.com",
  youtube: "https://www.youtube.com/@PriinteveInnovations",
  phone: "+91 96620 70751",
  phoneHref: "tel:+919662070751",
  email: "contact@priinteve.com",
  locale: "en_IN",
  year: 2026,
} as const;

/** Marker for business/legal details that have not been confirmed. Rendered as a visible chip. */
export const BUSINESS_TBC = "[BUSINESS INFORMATION TO BE CONFIRMED]";

/** Splits "[...]" markers out of copy so they render as visible placeholder chips (legal pages only). */
export const PLACEHOLDER_RE = /\[([^\]]+)\]/g;

/** How every project runs, from first call to launch. */
export const PROCESS = [
  { title: "Discover", text: "We learn how your business works, who your customers are and what the system needs to achieve." },
  { title: "Plan", text: "We define the scope, the user journeys, the pages or screens, and the technical approach, and agree a timeline." },
  { title: "Design", text: "We design the interface and the visual system, and review it with you before anything is built." },
  { title: "Build", text: "We develop in stages and share working progress, so you see the product take shape rather than wait for a reveal." },
  { title: "Test", text: "We check functionality, responsiveness, content and edge cases on real devices before launch." },
  { title: "Launch", text: "We deploy, hand over access and documentation, and stay available for fixes and the next round of improvements." },
] as const;

/** Technologies we use across our own products and client builds. */
export const TECH_GROUPS = [
  { title: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"] },
  { title: "Mobile & desktop", items: ["React Native", "Kotlin", "Java", "Electron.js"] },
  { title: "Data & payments", items: ["PostgreSQL", "Razorpay payments", "Secure hosting and file storage"] },
  { title: "Automation & AI", items: ["WhatsApp Business API", "Telegram Bot API", "AI agents and LLM integrations"] },
  { title: "Growth", items: ["SEO tools", "Google Search Console", "Analytics and tracking", "Schema and structured data"] },
] as const;
export const TECHNOLOGY: readonly string[] = TECH_GROUPS.flatMap((g) => g.items);

/** Contact form: what the enquiry is about. */
export const PROJECT_TYPES = ["Website", "E-commerce", "Custom Software", "CRM / ERP", "NFC / QR", "WhatsApp Bot", "Telegram Bot", "AI Agent", "Automation", "Other"] as const;
export const PRODUCT_ENQUIRIES = ["Xerox Buddy", "VentaDot", "Salonly", "Nectcard", "Priinteve Printing"] as const;
export const ENQUIRY_INTERESTS = [...PROJECT_TYPES, ...PRODUCT_ENQUIRIES] as const;
export type EnquiryInterest = (typeof ENQUIRY_INTERESTS)[number];

export const CTA_TEXT = "Tell us what you want to print, build, automate or launch, and we'll take it from there.";
