import type { Feature, IconName } from "./types";

export const home = {
  seo: {
    title: "Priinteve Innovations | Technology & Digital Solutions Company, Ahmedabad",
    description:
      "Priinteve builds its own products (Nectcard, VentaDot, Xerox Buddy, Salonly) and digital solutions for businesses: websites, e-commerce, CRM/ERP, NFC & QR, WhatsApp bots, AI agents and automation.",
    keywords: "Priinteve Innovations, technology company Ahmedabad, digital solutions company India, website development, AI automation, NFC QR",
  },
  h1: "Products and digital solutions that help businesses operate, sell and grow",
  lead: "Priinteve Innovations is an India-based technology and digital solutions company. We build our own products for print shops, restaurants, salons and professionals, and we build websites, e-commerce, custom software, NFC and QR, bots and AI automation for businesses like yours.",
  heroLead: "We build our own products for print shops, restaurants, salons and professionals, plus websites, e-commerce, custom software, NFC and QR, and AI automation for businesses like yours.",
  productsHeading: "Five products. One problem solved well by each.",
  howHeading: "Scan or tap. Use it. Manage it from one dashboard.",
  howLead: "Every Priinteve product works the same way, so your customers need nothing new and you need nothing extra.",
  how: [
    { title: "Scan or tap", text: "A customer scans a QR code or taps an NFC card or stand. A website opens immediately, with no app to install.", examples: ["QR code", "NFC card", "Table stand"] },
    { title: "Use it", text: "Depending on the product, they print a file, order a meal, book an appointment or save a contact.", examples: ["Print a file", "Order a meal", "Book a slot", "Save a contact"] },
    { title: "Manage it", text: "You run everything from the product's dashboard and stay in control of orders, jobs and bookings.", examples: ["Live orders", "Print jobs", "Bookings"] },
  ],
  solutionsHeading: "Solutions we build for your business",
  solutionsLead: "Beyond our own products, we build digital systems for other businesses. Scroll through the main categories of work we take on.",
  serve: [
    { icon: "card", label: "Professionals and teams", href: "/products/nectcard", cta: "Explore Nectcard", text: "People and teams who want a modern, always-current business card" },
    { icon: "utensils", label: "Restaurants and cafés", href: "/products/ventadot", cta: "Explore VentaDot", text: "Restaurants that want table-side ordering, a kitchen display and GST invoices" },
    { icon: "printer", label: "Xerox and print shops", href: "/products/xerox-buddy", cta: "Explore Xerox Buddy", text: "Shops that want QR uploads, smart printer routing and clean sales records" },
    { icon: "scissors", label: "Salons, barbers and spas", href: "/products/salonly", cta: "Explore Salonly", text: "Salons that want online bookings without double-bookings" },
    { icon: "bot", label: "Businesses ready to automate", href: "/services#ai-automation", cta: "Explore AI & Automation", text: "Teams that answer the same questions and repeat the same tasks every day" },
    { icon: "factory", label: "Businesses that need to sell online", href: "/services", cta: "Explore our services", text: "Manufacturers, suppliers and brands that need a website, a store or custom software" },
  ] as { icon: IconName; label: string; href: string; cta: string; text: string }[],
  webHeading: "The team that runs our platforms builds yours",
  web: "We design and develop websites, online stores and custom software for clients. Recent work includes a scroll-driven website for a digital marketing studio, a trilingual material library for a timber and plywood supplier, and a premium D2C cashew store.",
  why: [
    { icon: "compass", title: "Business-first thinking", text: "We start with how your business makes money and where time is lost, then decide what to build." },
    { icon: "puzzle", title: "Custom-built solutions", text: "Systems shaped around your process, not a template you have to work around." },
    { icon: "code", title: "Modern technology", text: "Next.js, React, TypeScript and PostgreSQL: the stack we run our own products on." },
    { icon: "layers", title: "Product + service expertise", text: "We build and operate our own products, so we know what it takes to keep software running in real businesses." },
    { icon: "rocket", title: "Scalable architecture", text: "Built to start small and grow: more users, more locations, more modules." },
    { icon: "handshake", title: "Long-term partnership", text: "We stay after launch for fixes, improvements and the next phase." },
  ] as { icon: IconName; title: string; text: string }[],
};

export const about = {
  seo: {
    title: "About Priinteve Innovations LLP | Technology Company in Ahmedabad",
    description:
      "Priinteve Innovations LLP is an India-based technology and digital solutions company founded in 2026 in Ahmedabad by Tarang Sachaniya.",
    keywords: "about Priinteve, Priinteve Innovations LLP, technology company Ahmedabad, Tarang Sachaniya",
  },
  h1: "About Priinteve Innovations",
  lead: "An India-based technology and digital solutions company, founded in 2026 in Ahmedabad. We build our own products, and we build digital solutions for businesses.",
  who: [
    "Priinteve Innovations LLP builds software that businesses use every day. Some of it is our own: Nectcard for digital business cards, VentaDot for restaurants, Xerox Buddy for print shops and Salonly for salons, with Priinteve Printing on the way.",
    "The rest we build for clients: websites and e-commerce stores, custom business software, CRM and ERP systems, NFC and QR experiences, WhatsApp and Telegram bots, AI agents and automation.",
    "Running our own products shapes how we work for clients. We see the same problems our customers see: slow counters, lost orders, double-bookings, outdated contact details. We build systems that fix them and keep running.",
  ],
  facts: [
    { label: "Company", value: "Priinteve Innovations LLP" },
    { label: "Founded", value: "2026" },
    { label: "Based in", value: "Ahmedabad, Gujarat, India" },
    { label: "What we do", value: "Products and digital solutions" },
  ],
  pillars: [
    { title: "Our products", text: "Ready-to-use tools for print shops, restaurants, salons and professionals, built and operated by us.", href: "/products", cta: "See our products" },
    { title: "Digital solutions", text: "Websites, e-commerce, custom software, CRM and ERP, and NFC and QR solutions built for your business.", href: "/services", cta: "See our services" },
    { title: "AI and automation", text: "WhatsApp and Telegram bots, AI agents and workflow automation that take over repetitive work.", href: "/services#ai-automation", cta: "See AI & Automation" },
  ] as { title: string; text: string; href: string; cta: string }[],
  mission: "To make professional technology simple, useful and affordable for small and growing businesses, through products they can start using the same day and systems built around how they work.",
  vision: "A business of any size should be able to run on software that fits it: connected, automated where it helps, and easy for customers to use with a tap or a scan.",
  beliefs: [
    { title: "Simple enough to start the same day", text: "Tools for small businesses should not need a training course." },
    { title: "No app for the customer", text: "Customers should be able to order, print, book or connect from their phone browser." },
    { title: "Honest about what we build", text: "We say what a system does, what it doesn't, and what it will cost, before we start." },
  ] as Feature[],
};

export const productsPage = {
  seo: {
    title: "Products | Nectcard, VentaDot, Xerox Buddy, Salonly | Priinteve",
    description:
      "Priinteve's own products: Nectcard NFC business cards, VentaDot for restaurants, Xerox Buddy for print shops, Salonly for salons, and Priinteve Printing (coming soon).",
    keywords: "Priinteve products, QR printing software, QR ordering, salon booking, NFC business card",
  },
  h1: "Products we build and run",
  intro: "Every Priinteve product solves one problem well, and most of them work with a simple scan or tap. Each one is live on its own website, where you can start using it.",
  help: [
    { label: "I need a digital business card", href: "/products/nectcard" },
    { label: "I run a restaurant or café", href: "/products/ventadot" },
    { label: "I run a xerox or print shop", href: "/products/xerox-buddy" },
    { label: "I run a salon, barbershop or spa", href: "/products/salonly" },
    { label: "I need custom printing in bulk", href: "/products/priinteve-printing" },
    { label: "I need something built for my business", href: "/services" },
  ],
};

export const servicesPage = {
  seo: {
    title: "Services | Web, E-commerce, CRM/ERP, NFC & QR, AI & Automation | Priinteve",
    description:
      "Website and web development, e-commerce, custom software, CRM and ERP, NFC and QR solutions, WhatsApp and Telegram bots, AI agents and business automation.",
    keywords: "web development company India, ecommerce development, CRM ERP development, NFC QR solutions, WhatsApp bot, AI agents, business automation",
  },
  h1: "Digital solutions from one product team",
  lead: "We build digital systems that help businesses operate, sell and grow, and that automate the repetitive work in between. These are the main categories of solutions we provide, built on the same technology we run our own products on.",
  included: {
    title: "Payments, email and notifications",
    text: "Online payments, transactional email and notifications can be built into any project that needs them.",
    badge: "Available on every project",
  },
};

export const workPage = {
  seo: {
    title: "Our Work | Websites & E-commerce by Priinteve Innovations",
    description: "Client work by Priinteve: Royal Timber's trilingual material library, EarthOra's premium cashew D2C store, and Quantivo's digital marketing website.",
    keywords: "Priinteve portfolio, website portfolio India, ecommerce case study, Royal Timber website, EarthOra",
  },
  h1: "Work we have built for clients",
  intro: "A look at websites and stores we designed and developed. Each project starts with a business goal and ends with a site that does a job. Visit the live sites to see them in action.",
};

export const contactPage = {
  seo: {
    title: "Contact Priinteve Innovations | Start a Project or Ask a Question",
    description: "Tell us what you want to print, build, automate or launch. Call +91 96620 70751 or write to contact@priinteve.com. Based in Ahmedabad, Gujarat, India.",
    keywords: "contact Priinteve, Priinteve phone, Priinteve email, software company Ahmedabad contact",
  },
  h1: "Let's talk about what you want to build",
  next: "Tell us a little about your business and what you need. We read every enquiry and reply with the right next step: a call, a demo of one of our products, or a proposal.",
};
