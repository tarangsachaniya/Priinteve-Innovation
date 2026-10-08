import type { FaqItem } from "./types";

export const faqSeo = {
  title: "FAQ | Priinteve Innovations: Products, Services, AI & Automation",
  description:
    "Answers about Priinteve's products (Nectcard, VentaDot, Xerox Buddy, Salonly), websites, e-commerce, custom software, CRM/ERP, NFC & QR, WhatsApp and Telegram bots, AI agents and how we work.",
  keywords: "Priinteve FAQ, website development FAQ, WhatsApp bot FAQ, AI agent FAQ, NFC business card FAQ",
};

export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "general",
    title: "About Priinteve",
    items: [
      { q: "What does Priinteve Innovations do?", a: "Priinteve Innovations LLP is an India-based technology and digital solutions company. We build our own products (Nectcard, VentaDot, Xerox Buddy, Salonly and the upcoming Priinteve Printing) and we build digital solutions for businesses: websites, e-commerce, custom software, CRM and ERP, NFC and QR, bots, AI agents and automation.", link: { label: "About us", href: "/about" } },
      { q: "Where are you based?", a: "We are based in Ahmedabad, Gujarat, India, and work with businesses remotely as well as in person." },
      { q: "Who founded Priinteve?", a: "Priinteve Innovations was founded in 2026 by co-founders Tarang Sachaniya and Keyush Prajapati." },
      { q: "Do you only work with businesses in India?", a: "Our products are built for Indian businesses first, with rupee payments and GST-ready features. Our development and automation services are available to businesses outside India too." },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      { q: "Which product is right for me?", a: "Digital business card: Nectcard. Restaurant or café: VentaDot. Xerox or print shop: Xerox Buddy. Salon, barbershop or spa: Salonly. Bulk custom printing: Priinteve Printing (coming soon).", link: { label: "Compare products", href: "/products" } },
      { q: "Do my customers need to download an app?", a: "No. Nectcard, VentaDot, Xerox Buddy and Salonly all open in the customer's phone browser after a scan, a tap or a link." },
      { q: "Where do I sign up for a product?", a: "Each product has its own live website: cards.priinteve.com for Nectcard, menu.priinteve.com for VentaDot, zerox.priinteve.com for Xerox Buddy, and the Salonly website for salons." },
      { q: "Is there a free plan or trial?", a: "Xerox Buddy has a 7-day free trial and VentaDot has a free Starter plan. Plans and prices are listed on each product's website." },
      { q: "When will Priinteve Printing launch?", a: "We are preparing the launch. Join the waitlist and we'll tell you first.", link: { label: "Join the waitlist", href: "/products/priinteve-printing#waitlist" } },
    ],
  },
  {
    id: "websites",
    title: "Website development",
    items: [
      { q: "What kinds of websites do you build?", a: "Business and corporate websites, landing pages, redesigns, multilingual sites, Next.js websites, React applications and CMS-managed sites.", link: { label: "Website development", href: "/services/website-design-development" } },
      { q: "How long does a website take?", a: "It depends on the number of pages, the content and review speed. We agree a timeline during planning, before the build begins." },
      { q: "Will I be able to edit the website?", a: "Yes. Where it makes sense we set up a CMS or admin panel so your team can update content without a developer." },
      { q: "Do you help with SEO?", a: "We build every site with a clean structure, metadata and fast loading, which are the technical foundations of SEO. Ongoing content and ranking work is discussed separately." },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    items: [
      { q: "Do you build on Shopify, WooCommerce or custom?", a: "All three. We recommend a platform after understanding your catalogue, operations and budget." },
      { q: "Can you integrate payments and shipping?", a: "Yes. We integrate the payment gateway and shipping setup your business uses, where the platform supports it." },
      { q: "Can you help with a WhatsApp catalogue?", a: "Yes. We set up and organise WhatsApp Business catalogues and connect them to your website and QR codes.", link: { label: "WhatsApp Catalog", href: "/services/whatsapp-catalog" } },
    ],
  },
  {
    id: "software",
    title: "Custom software, CRM & ERP",
    items: [
      { q: "When does a business need custom software?", a: "When your process doesn't fit off-the-shelf tools, when you pay for several tools that don't talk to each other, or when manual work is holding the team back." },
      { q: "What is the difference between a CRM and an ERP?", a: "A CRM manages leads, customers and sales activity. An ERP connects operations such as inventory, purchasing, orders, billing and reports.", link: { label: "CRM & ERP Systems", href: "/services/crm-erp" } },
      { q: "Can we start with a small version?", a: "Yes. We usually recommend starting with the modules that remove the most manual work, then adding more in phases." },
      { q: "Can you migrate our existing data?", a: "Yes. Migration from spreadsheets or exports is planned as part of the project." },
    ],
  },
  {
    id: "nfc-qr",
    title: "NFC & QR",
    items: [
      { q: "What is an NFC business card?", a: "A card with a small NFC chip that opens your digital profile when someone taps it with their phone. Nectcard cards also carry a QR code for phones that don't tap." },
      { q: "Do NFC and QR need an app?", a: "No. Our NFC and QR experiences open in the phone browser." },
      { q: "Can you build QR menus and QR ordering?", a: "Yes. VentaDot is our own QR and NFC ordering product, and we build custom QR experiences for other uses.", link: { label: "NFC & QR Solutions", href: "/services/nfc-qr-solutions" } },
    ],
  },
  {
    id: "ai",
    title: "AI & automation",
    items: [
      { q: "What can a WhatsApp bot do for my business?", a: "Answer common enquiries, capture and qualify leads, send order or booking updates and hand over to your team when needed.", link: { label: "WhatsApp Bots", href: "/services/whatsapp-bots" } },
      { q: "Do you build Telegram bots?", a: "Yes: community bots, alert bots for internal teams and command-based workflows.", link: { label: "Telegram Bots", href: "/services/telegram-bots" } },
      { q: "What is an AI agent?", a: "Software that uses an AI model to understand a request and then take defined steps, such as looking something up or updating a record, within limits you set." },
      { q: "Can AI make mistakes?", a: "Yes. That's why we scope every AI feature carefully, test it on real examples and add human review for sensitive actions." },
      { q: "Which process should we automate first?", a: "The one that repeats most often, follows clear rules and causes the most delays or errors today.", link: { label: "Business Automation", href: "/services/business-automation" } },
    ],
  },
  {
    id: "working",
    title: "Working with us",
    items: [
      { q: "How does a project start?", a: "With a conversation about your business and what you need. We then plan the scope and timeline, design, build, test and launch.", link: { label: "Contact us", href: "/contact" } },
      { q: "How is pricing decided?", a: "Project pricing depends on scope. We share a proposal after understanding your requirements. Product plans are listed on each product's website." },
      { q: "Do you provide support after launch?", a: "Yes. Support and improvement arrangements are agreed for each project." },
      { q: "How do I get in touch?", a: "Call +91 96620 70751, write to contact@priinteve.com, or use the contact form.", link: { label: "Contact", href: "/contact" } },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
/** A short selection for the home page. */
export const homeFaqs: FaqItem[] = [faqGroups[0].items[0], faqGroups[1].items[1], faqGroups[3].items[0], faqGroups[5].items[0], faqGroups[6].items[0], faqGroups[7].items[1]];
