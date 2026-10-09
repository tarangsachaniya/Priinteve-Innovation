import { legalPages } from "./legal";
import { products } from "./products";
import { serviceCategories, services } from "./services";

export type NavLink = { label: string; href: string; note?: string };

const svc = (slug: string) => `/services/${slug}`;

export const nav = {
  products: products.map<NavLink>((p) => ({
    label: p.name,
    href: `/products/${p.slug}`,
    note: p.status === "Live" ? undefined : p.status,
  })),
  services: services.map<NavLink>((s) => ({ label: s.name, href: svc(s.slug) })),
  /** Services menu: the five categories; AI & Automation lists its services beneath it. */
  serviceMenu: [
    { label: "Website & Web Development", href: svc("website-design-development"), text: "Business websites, landing pages and web apps." },
    { label: "E-commerce", href: svc("ecommerce-websites"), text: "Shopify, WooCommerce, custom stores and WhatsApp catalogues." },
    { label: "Business Software", href: svc("custom-software"), text: "Custom software, CRM and ERP systems." },
    { label: "NFC & QR", href: svc("nfc-qr-solutions"), text: "Cards, profiles, QR menus, ordering and campaigns." },
    { label: "SEO & Google Business", href: svc("seo-google-business"), text: "Local and technical SEO, and your Google Business Profile." },
    { label: "Branding", href: svc("branding"), text: "Logos, brand identity, packaging and social kits." },
    {
      label: "AI & Automation",
      href: "/services#ai-automation",
      text: "Bots, AI agents and automation for repetitive work.",
      children: services.filter((s) => s.category === "ai").map<NavLink>((s) => ({ label: s.name, href: svc(s.slug) })),
    },
  ] satisfies (NavLink & { text: string; children?: NavLink[] })[],
  serviceCategories,
  /** Footer: the main service entry points. */
  footerServices: [
    { label: "Website Development", href: svc("website-design-development") },
    { label: "E-commerce", href: svc("ecommerce-websites") },
    { label: "Custom Software", href: svc("custom-software") },
    { label: "CRM / ERP", href: svc("crm-erp") },
    { label: "NFC & QR", href: svc("nfc-qr-solutions") },
    { label: "SEO & Google Business", href: svc("seo-google-business") },
    { label: "Branding", href: svc("branding") },
    { label: "AI & Automation", href: "/services#ai-automation" },
  ] satisfies NavLink[],
  main: [
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  cta: { label: "Start a project", href: "/contact" },
  company: [
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  legal: legalPages.map<NavLink>((p) => ({ label: p.title, href: `/${p.slug}` })),
  /** Footer legal column (Grievance Redressal is linked from every legal page and the privacy policy). */
  footerLegal: legalPages.filter((p) => p.slug !== "grievance-redressal").map<NavLink>((p) => ({ label: p.title.replace(" Statement", "").replace("Refund & Cancellation Policy", "Refund Policy").replace("Terms & Conditions", "Terms"), href: `/${p.slug}` })),
};
