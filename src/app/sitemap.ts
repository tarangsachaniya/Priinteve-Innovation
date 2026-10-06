import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projects } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["", "/about", "/products", "/services", "/work", "/blog", "/faq", "/contact"];
  // Legal pages are noindex while they hold placeholder copy, so they stay out of the sitemap.
  const paths = [
    ...top,
    ...products.map((p) => `/products/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    priority: p === "" ? 1 : p.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
