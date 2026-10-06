import { products } from "./products";
import { services } from "./services";

export type NavLink = { label: string; href: string; note?: string };

export const nav = {
  products: products.map<NavLink>((p) => ({
    label: p.name,
    href: `/products/${p.slug}`,
    note: p.status === "Live" ? undefined : p.status,
  })),
  services: services.map<NavLink>((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  main: [
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
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
