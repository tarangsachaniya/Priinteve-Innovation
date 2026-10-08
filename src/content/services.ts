import type { Service, ServiceCategory } from "./types";

export const serviceCategories: { key: ServiceCategory; name: string; blurb: string; href: string }[] = [
  { key: "web", name: "Web Development", blurb: "Websites, online stores and custom web applications.", href: "/services#web" },
  { key: "digital", name: "Digital Solutions", blurb: "NFC and QR that connect print to digital.", href: "/services#digital" },
  { key: "ai", name: "AI & Automation", blurb: "Bots, AI agents and automation for repetitive business work.", href: "/services#ai-automation" },
];

export const services: Service[] = [
  {
    slug: "website-design-development",
    category: "web",
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
    category: "web",
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
    category: "web",
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
    category: "digital",
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
  {
    slug: "whatsapp-bots",
    category: "ai",
    name: "WhatsApp Bots",
    icon: "message",
    seo: {
      title: "WhatsApp Bots & Automation for Business | Priinteve",
      description:
        "Custom WhatsApp bots that handle customer enquiries, notifications and business workflows. Built by Priinteve Innovations.",
      keywords: "WhatsApp bot development, WhatsApp automation for business, WhatsApp chatbot India, customer enquiry automation",
    },
    h1: "WhatsApp bots that handle customer conversations",
    body: "We build WhatsApp bots that answer common enquiries, send notifications and move routine requests into your business workflow, so your team spends its time on the conversations that need a person.",
    card: "Automate customer conversations, enquiries, notifications and business workflows.",
    relatedWork: [],
    relatedProducts: ["vantadot", "salony"],
  },
  {
    slug: "telegram-bots",
    category: "ai",
    name: "Telegram Bots",
    icon: "send",
    seo: {
      title: "Telegram Bot Development for Business | Priinteve",
      description:
        "Custom Telegram bots for communities, businesses and automated workflows. Built by Priinteve Innovations.",
      keywords: "Telegram bot development, custom Telegram bot, Telegram automation, community bot",
    },
    h1: "Custom Telegram bots for communities and businesses",
    body: "We build Telegram bots for communities, businesses and internal teams: bots that respond to messages, send updates and run a workflow on request.",
    card: "Build custom Telegram bots for communities, businesses and automated workflows.",
    relatedWork: [],
  },
  {
    slug: "ai-agents",
    category: "ai",
    name: "AI Agents",
    icon: "bot",
    seo: {
      title: "AI Agent Development for Business | Priinteve",
      description:
        "AI-powered agents that understand requests, respond and carry out defined business tasks. Built by Priinteve Innovations.",
      keywords: "AI agent development, business AI agents, custom AI assistant, AI task automation",
    },
    h1: "AI agents that understand requests and get defined tasks done",
    body: "We build AI-powered agents for a specific job: understanding a request, responding in your voice and carrying out the task within the systems you connect. We agree the scope of each agent with you before we build it.",
    card: "Build AI-powered agents that understand, respond and execute business tasks.",
    relatedWork: [],
  },
  {
    slug: "business-automation",
    category: "ai",
    name: "Business Automation",
    icon: "workflow",
    seo: {
      title: "Business Process & Workflow Automation | Priinteve",
      description:
        "Connect your systems and automate repetitive business processes: workflows, lead handling and customer support. Built by Priinteve Innovations.",
      keywords: "business process automation, workflow automation, lead automation, customer support automation",
    },
    h1: "Automate the repetitive work in your business",
    body: "We connect your systems and automate repetitive business processes: workflow automation, lead handling and customer support routines. We start with one process, make it reliable and build from there.",
    card: "Connect systems and automate repetitive business processes.",
    relatedWork: [],
    relatedProducts: ["xerox-buddy", "vantadot", "salony"],
  },
  {
    slug: "ai-integrations",
    category: "ai",
    name: "AI Integrations",
    icon: "plug",
    seo: {
      title: "Custom AI Integrations for Business Software | Priinteve",
      description:
        "Add AI to the website, app or workflow you already run with custom AI integrations from Priinteve Innovations.",
      keywords: "custom AI integration, add AI to website, AI API integration, AI for business software",
    },
    h1: "Custom AI integrations for the tools you already use",
    body: "We add AI features to the website, application or workflow you already run, and connect it to the data and tools it needs. Each integration is scoped to a clear job, so you know what it does and what it does not.",
    card: "Add AI to your existing website, app or workflow with custom integrations.",
    relatedWork: [],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
