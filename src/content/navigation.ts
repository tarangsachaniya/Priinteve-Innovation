import { products } from "./products";
import { serviceCategories, services } from "./services";

export type NavLink = { label: string; href: string; note?: string };

export const nav = {
  products: products.map<NavLink>((p) => ({
    label: p.name,
    href: `/products/${p.slug}`,
    note: p.status === "Live" ? undefined : p.status,
  })),
  services: services.map<NavLink>((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  /** Services menu: the five solution areas; AI & Automation lists its services beneath it. */
  serviceMenu: [
    { label: "Web Development", href: "/services/website-design-development", text: "Business websites that win enquiries." },
    { label: "E-commerce", href: "/services/ecommerce-websites", text: "Online stores with smooth mobile design." },
    { label: "Custom Applications", href: "/services/custom-web-applications", text: "Dashboards, portals and multi-user platforms." },
    { label: "NFC & QR", href: "/services/nfc-qr-solutions", text: "Print that opens your digital presence." },
    {
      label: "AI & Automation",
      href: "/services#ai-automation",
      text: "Bots, agents and automation for repetitive work.",
      children: services.filter((s) => s.category === "ai").map<NavLink>((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    },
  ] satisfies (NavLink & { text: string; children?: NavLink[] })[],
  serviceCategories,
  main: [
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ] satisfies NavLink[],
  cta: { label: "Get in touch", href: "/contact" },
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavLink[],
};
