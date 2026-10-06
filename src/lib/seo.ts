import type { Metadata } from "next";
import { site } from "@/content/site";

type PageSeo = { title: string; description: string; keywords?: string };

/** Builds per-page metadata: canonical, Open Graph and Twitter tags. `path` starts with "/" ("/" for home). */
export function buildMetadata(path: string, seo: PageSeo): Metadata {
  return {
    // `absolute` because the plan's title tags already carry the brand; no template suffix.
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords?.split(",").map((k) => k.trim()),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: seo.title,
      description: seo.description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export type Crumb = { name: string; href?: string };

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export function breadcrumbLd(trail: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      // placeholders are not published answers
      acceptedAnswer: { "@type": "Answer", text: a.replace(/\s*\[[^\]]+\]/g, "").trim() },
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  slogan: site.tagline,
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "en-IN",
};
