import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "website-design-development",
    name: "Website Design and Development",
    icon: "monitor",
    seo: {
      title: "Website Design & Development Company in India",
      description:
        "Fast, modern business websites for manufacturers, suppliers, service companies and brands. Priinteve designs and builds sites that win customers.",
      keywords: "website design company India, business website development, manufacturer website, company website",
    },
    h1: "Website design and development for Indian businesses",
    body: "We build websites that present your business clearly and bring in enquiries. Manufacturers and wholesalers get product catalogues that trade buyers trust. Service companies get sharp sites that showcase their work. Every site is fast, mobile-ready and built to be found on Google.",
    card: "Fast, modern sites for businesses, from manufacturers to e-commerce brands.",
    relatedWork: ["royal-timber", "pvc-cpvc-machinery", "quantivo"],
  },
  {
    slug: "ecommerce-websites",
    name: "E-commerce Websites",
    icon: "bag",
    seo: {
      title: "E-commerce Website Development India | Priinteve",
      description:
        "Online stores with custom visuals, smooth mobile design and secure payments. Priinteve builds e-commerce experiences that make products look their best.",
      keywords: "ecommerce website development India, online store design, mobile-first ecommerce, Razorpay store",
    },
    h1: "E-commerce websites that sell as well as they look",
    body: "We build storefronts with custom visuals and smooth mobile design, including creative concepts such as animated packaging reveals. Secure online payments, transactional email and push notifications are built in.",
    card: "E-commerce experiences: storefronts with custom visuals and smooth mobile design, including creative concepts such as animated packaging reveals.",
    relatedWork: ["cashew-ecommerce"],
  },
  {
    slug: "custom-web-applications",
    name: "Custom Web Applications",
    icon: "blocks",
    seo: {
      title: "Custom Web Application Development | Priinteve",
      description:
        "Dashboards, portals and multi-user platforms built to fit how your business works. Priinteve builds on Next.js, React, TypeScript and PostgreSQL.",
      keywords: "custom web application development, business dashboard, client portal, multi-user platform",
    },
    h1: "Custom web applications built around how you work",
    body: "If off-the-shelf tools do not fit, we build your own: dashboards, portals and multi-user platforms. We know what this takes because we run Vantadot, Xerox Buddy, Salony and Nectcard on the same technology.",
    card: "Dashboards, portals and multi-user platforms built around how your business works.",
    relatedWork: [],
    relatedProducts: ["vantadot", "xerox-buddy", "salony", "nectcard"],
  },
  {
    slug: "nfc-qr-solutions",
    name: "NFC and QR Solutions",
    icon: "scan",
    seo: {
      title: "NFC & QR Solutions for Business | Priinteve",
      description:
        "Printed NFC cards and QR codes that open your menu, profile, booking page or website with a tap or scan. Made by Priinteve Innovations.",
      keywords: "NFC QR solutions for business, NFC card, QR standee, tap and scan solutions",
    },
    h1: "NFC and QR solutions that connect print to digital",
    body: "Printed cards, standees and codes that connect the physical world to your digital presence. Tap or scan to open a menu, profile, booking page or file upload. See it in action in Nectcard, Vantadot, Salony and Xerox Buddy.",
    card: "NFC and QR solutions: printed cards and codes that connect the physical world to your digital presence.",
    relatedWork: [],
    relatedProducts: ["nectcard", "vantadot", "salony", "xerox-buddy"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
