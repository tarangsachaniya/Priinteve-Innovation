import { legalPages } from "./legal";
import { products } from "./products";
import { serviceCategories, services } from "./services";
import { projects } from "./work";

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
  /** Footer: every service page, so each one has a sitewide internal link. */
  footerServices: services.map<NavLink>((s) => ({ label: s.name, href: svc(s.slug) })),
  /** Services that the Services mega-menu only reaches through its category pages; the mobile sheet lists them directly. */
  moreServices: ["custom-web-applications", "whatsapp-catalog", "crm-erp"].map<NavLink>((slug) => ({
    label: services.find((s) => s.slug === slug)!.name,
    href: svc(slug),
  })),
  main: [
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  cta: { label: "Start a project", href: "/contact" },
  company: [
    { label: "Our Work", href: "/work" },
    ...projects.map<NavLink>((p) => ({ label: `${p.name} case study`, href: `/work/${p.slug}` })),
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  legal: legalPages.map<NavLink>((p) => ({ label: p.title, href: `/${p.slug}` })),
  /** Footer legal column: every legal page, including Grievance Redressal. */
  footerLegal: legalPages.map<NavLink>((p) => ({ label: p.title.replace(" Statement", "").replace("Refund & Cancellation Policy", "Refund Policy").replace("Terms & Conditions", "Terms"), href: `/${p.slug}` })),
};
