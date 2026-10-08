import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "quantivo",
    name: "Quantivo",
    category: "Digital marketing company",
    summary: "A website built to showcase services and win new clients.",
    client: "a digital marketing company",
    service: "website-design-development",
    icon: "trending",
    colors: ["#12270a", "#6b8e3d"],
    seo: {
      title: "Quantivo Website | Digital Marketing Site Case Study",
      description: "How Priinteve built a website for digital marketing company Quantivo to showcase its services and win new clients.",
    },
  },
  {
    slug: "royal-timber",
    name: "Royal Timber",
    category: "Plywood supplier and wholesaler",
    summary: "A website built to present the product range to trade buyers.",
    client: "a plywood supplier and wholesaler",
    service: "website-design-development",
    icon: "layers",
    colors: ["#1b241f", "#a0824a"],
    seo: {
      title: "Royal Timber Website | Plywood Wholesaler Case Study",
      description: "How Priinteve built a website for plywood supplier Royal Timber to present its product range to trade buyers.",
    },
  },
  {
    slug: "cashew-ecommerce",
    name: "Premium cashew brand",
    category: "E-commerce",
    summary: "A modern online store with a mobile-first visual concept.",
    client: "a premium cashew brand",
    service: "ecommerce-websites",
    icon: "leaf",
    colors: ["#18330d", "#c29b48"],
    seo: {
      title: "Cashew E-commerce Website | Case Study | Priinteve",
      description: "A mobile-first online store for a premium cashew brand, designed and built by Priinteve Innovations.",
    },
  },
  {
    slug: "pvc-cpvc-machinery",
    name: "PVC and CPVC machinery manufacturer",
    category: "Industrial manufacturing",
    summary: "A professional website for PVC and CPVC pipe processing machines.",
    client: "an industrial machinery manufacturer",
    service: "website-design-development",
    icon: "factory",
    colors: ["#0d120d", "#4f6f2b"],
    seo: {
      title: "PVC & CPVC Machinery Website | Case Study | Priinteve",
      description: "A professional website for a manufacturer of PVC and CPVC pipe processing machines, built by Priinteve Innovations.",
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
