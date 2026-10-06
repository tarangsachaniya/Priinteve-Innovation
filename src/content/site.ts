export const site = {
  name: "Priinteve Innovations",
  shortName: "Priinteve",
  tagline: "Print any thing, anywhere, on demand.",
  url: "https://priinteve.com",
  cardsUrl: "https://cards.priinteve.com",
  phone: "+91 96620 70751",
  phoneHref: "tel:+919662070751",
  email: "contact@priinteve.com",
  locale: "en_IN",
  year: 2026,
} as const;

/** Splits "[to confirm]" markers out of plan copy so they render as placeholders. */
export const PLACEHOLDER_RE = /\[([^\]]+)\]/g;

export const PROCESS = [
  { title: "Discover", text: "We learn your business, customers and goals." },
  { title: "Plan", text: "We agree on pages, features and timeline." },
  { title: "Build", text: "We design and develop, and share progress." },
  { title: "Launch", text: "We go live, test and support you." },
] as const;

export const TECHNOLOGY = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Secure hosting and file storage",
  "Rupee payments through Razorpay",
] as const;

export const ENQUIRY_INTERESTS = [
  "Xerox Buddy",
  "Vantadot",
  "Salony",
  "Nectcard",
  "Priinteve Printing",
  "A website",
  "A custom web application",
  "Something else",
] as const;

export const CTA_TEXT = "Tell us what you want to print, build or launch, and we'll take it from there.";
