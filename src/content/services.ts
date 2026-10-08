import type { Service, ServiceCategory, ServiceSlug } from "./types";

/**
 * Service categories, in the order they appear on the Services page and in the menu.
 * `items` is the full list of solutions offered in that category (shown as chips).
 */
export const serviceCategories: { key: ServiceCategory; name: string; blurb: string; anchor: string; items: string[] }[] = [
  {
    key: "web",
    name: "Website & Web Development",
    anchor: "web",
    blurb: "Fast, modern websites and web applications that present your business clearly and bring in enquiries.",
    items: ["Business websites", "Corporate websites", "Landing pages", "Website redesign", "Next.js websites", "React applications", "Custom web applications", "CMS development"],
  },
  {
    key: "ecommerce",
    name: "E-commerce",
    anchor: "ecommerce",
    blurb: "Online stores and catalogues that make products look their best and keep orders moving.",
    items: ["Shopify", "WooCommerce", "Custom e-commerce", "Product catalogues", "Payment integration", "Order management", "Inventory integration", "Customer accounts", "Admin dashboards", "WhatsApp catalogues"],
  },
  {
    key: "software",
    name: "Business Software",
    anchor: "software",
    blurb: "Custom software, CRM and ERP built around how your business actually works.",
    items: ["Custom software", "CRM", "ERP", "Admin dashboards", "Business management systems", "Booking systems", "Inventory systems", "Customer management", "Workflow systems", "Internal business tools"],
  },
  {
    key: "nfcqr",
    name: "NFC & QR Solutions",
    anchor: "nfc-qr",
    blurb: "Printed cards, standees and codes that connect the physical world to your digital presence.",
    items: ["NFC business cards", "QR business solutions", "Digital profiles", "QR menus", "QR ordering", "NFC product experiences", "QR campaigns"],
  },
  {
    key: "ai",
    name: "AI & Automation",
    anchor: "ai-automation",
    blurb: "We build digital systems that automate repetitive business processes.",
    items: ["WhatsApp bots", "Telegram bots", "AI agents", "AI-powered customer support", "Lead automation", "Workflow automation", "Business process automation", "AI integrations", "Custom AI solutions"],
  },
];

export const services: Service[] = [
  /* ------------------------------------------------------------------ Website & Web Development */
  {
    slug: "website-design-development",
    category: "web",
    name: "Website Design & Development",
    short: "Web Development",
    icon: "monitor",
    seo: {
      title: "Website Design & Development Company in Ahmedabad | Priinteve",
      description:
        "Business websites, corporate sites, landing pages and redesigns built on Next.js and React: fast, mobile-ready and built to be found on Google.",
      keywords: "website development company Ahmedabad, business website design, Next.js website, website redesign India",
    },
    h1: "Website design and development that wins enquiries",
    body: "We design and build websites that present your business clearly and turn visitors into enquiries. Manufacturers and suppliers get catalogues trade buyers trust; service businesses get sharp sites that show their work. Every site is fast, mobile-ready and structured for search.",
    card: "Business websites, landing pages and redesigns: fast, mobile-ready and built to be found.",
    includes: ["Business websites", "Corporate websites", "Landing pages", "Website redesign", "Next.js websites", "React applications", "CMS development", "Multilingual sites", "SEO-ready structure", "Enquiry forms and WhatsApp links"],
    useCases: [
      { title: "Manufacturers and suppliers", text: "A product and material library that trade buyers can browse, with an enquiry on every item." },
      { title: "Service businesses", text: "A clear site that explains what you do, shows your work and makes it easy to get in touch." },
      { title: "Launches and campaigns", text: "Focused landing pages for a product, an event or an ad campaign." },
      { title: "Redesigns", text: "Rebuild an outdated or slow site on a modern stack without losing what already works." },
    ],
    deliverables: ["Sitemap and page plan", "UI design for desktop and mobile", "Responsive build", "Content structure and on-page SEO", "Forms, maps and contact links", "Deployment and handover"],
    faq: [
      { q: "How long does a business website take?", a: "It depends on the number of pages, the content and how quickly reviews happen. We agree a timeline in the planning stage, before the build starts." },
      { q: "Do you write the content?", a: "We structure the pages and can draft or edit copy with you. Product details, prices and claims always come from you." },
      { q: "Can I update the website myself?", a: "Yes, where it makes sense we set up a CMS or an admin panel so your team can edit content without a developer." },
      { q: "Will the website work on mobile?", a: "Yes. Every site is designed and tested for phones, tablets and desktops." },
      { q: "Do you redesign existing websites?", a: "Yes. We review what works on your current site, then rebuild it on a modern stack." },
    ],
    relatedWork: ["quantivo", "royal-timber"],
    relatedProducts: ["nectcard"],
  },
  {
    slug: "custom-web-applications",
    category: "web",
    name: "Custom Web Applications",
    icon: "blocks",
    seo: {
      title: "Custom Web Application Development | Priinteve",
      description:
        "Portals, dashboards and multi-user platforms built in Next.js, React and TypeScript, by the team that runs Xerox Buddy, VentaDot and Salonly.",
      keywords: "custom web application development, React application, client portal, multi-user platform India",
    },
    h1: "Custom web applications built around how you work",
    body: "When off-the-shelf tools don't fit, we build your own: customer portals, dashboards and multi-user platforms that run in the browser. We run our own products on the same technology, so we know what it takes to keep an application fast and reliable in daily use.",
    card: "Portals, dashboards and multi-user platforms that run in the browser.",
    includes: ["Customer portals", "Admin dashboards", "Multi-user platforms", "Role-based access", "Payments and subscriptions", "File uploads and storage", "Notifications", "API integrations"],
    useCases: [
      { title: "Customer portals", text: "Let customers place orders, track status, download invoices or upload files." },
      { title: "Operations dashboards", text: "One screen for orders, tasks, staff and numbers that today live in spreadsheets." },
      { title: "Marketplaces and platforms", text: "Multi-tenant platforms where many businesses or users each get their own space." },
      { title: "Product MVPs", text: "A first working version of a new digital product, built to grow." },
    ],
    deliverables: ["Requirements and user roles", "Data model and architecture", "UI design", "Application build with authentication", "Admin tools", "Deployment, monitoring and handover"],
    faq: [
      { q: "What is the difference between a website and a web application?", a: "A website mainly presents information. A web application lets users log in and do work: place orders, manage records, upload files or run a process." },
      { q: "Which technology do you use?", a: "Usually Next.js, React and TypeScript with a PostgreSQL database, the same stack we use for our own products." },
      { q: "Can you connect it to our existing tools?", a: "Yes, where those tools provide an API or export. We check this during planning." },
      { q: "Do you build mobile apps too?", a: "Our applications are responsive and work in mobile browsers. Native app needs are discussed project by project." },
    ],
    relatedWork: [],
    relatedProducts: ["ventadot", "xerox-buddy", "salonly"],
  },

  /* ------------------------------------------------------------------ E-commerce */
  {
    slug: "ecommerce-websites",
    category: "ecommerce",
    name: "E-commerce Development",
    short: "E-commerce",
    icon: "bag",
    seo: {
      title: "E-commerce Website Development: Shopify, WooCommerce & Custom | Priinteve",
      description:
        "Online stores on Shopify, WooCommerce or a custom build: product catalogues, payments, order management, inventory and customer accounts, designed mobile-first.",
      keywords: "ecommerce website development India, Shopify store setup, WooCommerce development, custom ecommerce, D2C website",
    },
    h1: "E-commerce stores that sell as well as they look",
    body: "We build online stores with strong product presentation and a smooth mobile checkout, on Shopify, WooCommerce or a custom stack depending on what your business needs. Payments, order management, inventory and customer accounts are part of the plan from day one.",
    card: "Shopify, WooCommerce and custom stores with payments, orders and inventory.",
    includes: ["Shopify", "WooCommerce", "Custom e-commerce", "Product catalogues", "Payment integration", "Order management", "Inventory integration", "Customer accounts", "Admin dashboards", "Product storytelling pages"],
    useCases: [
      { title: "D2C brands", text: "A brand-led store with product storytelling, variants and a fast mobile checkout." },
      { title: "Catalogue to commerce", text: "Turn a product catalogue into a store with prices, stock and online payments." },
      { title: "Custom requirements", text: "Bulk pricing, custom configurators or B2B ordering that platform themes can't handle." },
      { title: "Store redesigns", text: "Refresh an existing store's design and product pages." },
    ],
    deliverables: ["Platform recommendation", "Store design and product page templates", "Catalogue setup", "Payment and shipping configuration", "Order and inventory workflows", "Launch and handover"],
    faq: [
      { q: "Shopify, WooCommerce or custom: which should I choose?", a: "Shopify suits most brands that want to launch quickly with low maintenance. WooCommerce suits businesses already on WordPress. Custom suits unusual workflows. We recommend after understanding your catalogue and operations." },
      { q: "Which payment gateways can you integrate?", a: "We integrate the gateway your business uses, such as Razorpay, where the platform supports it." },
      { q: "Can you migrate my existing store?", a: "Yes. We plan the migration of products, customers and orders depending on what your current platform can export." },
      { q: "Do you handle product photography?", a: "No. We design the store around your product images and can advise on what the pages need." },
    ],
    relatedWork: ["premium-cashew-ecommerce"],
  },
  {
    slug: "whatsapp-catalog",
    category: "ecommerce",
    name: "WhatsApp Catalog & Commerce",
    short: "WhatsApp Catalog",
    icon: "store",
    seo: {
      title: "WhatsApp Catalog & WhatsApp Business Setup for Businesses | Priinteve",
      description:
        "Set up and improve your WhatsApp Business catalogue and customer journey, and connect it to your website, store and QR codes.",
      keywords: "WhatsApp catalog setup, WhatsApp Business catalogue, WhatsApp commerce India, WhatsApp shop",
    },
    h1: "WhatsApp catalogues and customer journeys that sell",
    body: "Many customers in India would rather message than browse a website. We help businesses create and improve WhatsApp-based product catalogues and customer journeys: a well-organised catalogue, clear product details, and links from your website, store and QR codes that bring customers straight into the right conversation.",
    card: "Organise your WhatsApp product catalogue and connect it to your website, store and QR codes.",
    includes: ["WhatsApp Business catalogue setup", "Product and collection organisation", "Catalogue content and images", "Click-to-chat links", "QR codes that open your chat", "Website and store integration", "Quick replies and greeting messages"],
    useCases: [
      { title: "Shops and showrooms", text: "Share a tidy catalogue with customers who ask 'what do you have?' on WhatsApp." },
      { title: "Brands selling on chat", text: "Move customers from Instagram or your website into a WhatsApp conversation with the right products in view." },
      { title: "Print and packaging", text: "QR codes on packaging and standees that open your WhatsApp chat or catalogue." },
    ],
    deliverables: ["Catalogue structure", "Product listing content", "Click-to-chat and QR links", "Website integration", "Message templates for common questions"],
    faq: [
      { q: "Is this the official WhatsApp Business API?", a: "Catalogue setup uses the standard WhatsApp Business features. API-based automation is a separate project and depends on Meta's approval and pricing.", link: { label: "WhatsApp Bots", href: "/services/whatsapp-bots" } },
      { q: "Can customers pay inside WhatsApp?", a: "Payment options inside WhatsApp depend on what WhatsApp offers for your business and region. We can link customers to your website or store checkout." },
      { q: "Can you connect the catalogue to my website?", a: "Yes. We add click-to-chat buttons, product links and QR codes that bring customers into the right conversation." },
    ],
    relatedWork: ["premium-cashew-ecommerce"],
    relatedProducts: ["nectcard"],
  },

  /* ------------------------------------------------------------------ Business Software */
  {
    slug: "custom-software",
    category: "software",
    name: "Custom Business Software",
    short: "Custom Software",
    icon: "code",
    seo: {
      title: "Custom Business Software Development | Priinteve",
      description:
        "Booking systems, inventory systems, workflow tools and internal business software built around how your team works, by the team behind VentaDot and Xerox Buddy.",
      keywords: "custom software development India, business management software, booking system development, inventory system, internal tools",
    },
    h1: "Custom software for the way your business runs",
    body: "Spreadsheets, paper registers and five disconnected apps slow a growing business down. We build business management systems, booking and inventory systems, workflow tools and internal dashboards that fit your process, rather than forcing your process to fit a template.",
    card: "Booking, inventory, workflow and internal tools built around your process.",
    includes: ["Business management systems", "Booking systems", "Inventory systems", "Customer management", "Workflow systems", "Internal business tools", "Admin dashboards", "Reports and exports"],
    useCases: [
      { title: "Booking and scheduling", text: "Appointments, slots and staff schedules, like we built for Salonly." },
      { title: "Orders and operations", text: "Order intake, routing and status tracking, like we built for VentaDot and Xerox Buddy." },
      { title: "Inventory and stock", text: "Track stock across locations, with alerts and simple reports." },
      { title: "Internal tools", text: "Approval flows, task tracking and dashboards that replace spreadsheets." },
    ],
    deliverables: ["Process mapping", "Requirements and user roles", "UI design", "Build and data migration", "Training and documentation", "Ongoing support options"],
    faq: [
      { q: "When should we build custom software instead of buying a tool?", a: "When your process is a competitive advantage, when you are paying for several tools that don't talk to each other, or when no product fits without heavy workarounds." },
      { q: "Can you move our data from spreadsheets?", a: "Yes. Data migration from spreadsheets or exports is planned as part of the project." },
      { q: "Who owns the software?", a: "Ownership and licensing are agreed in the project contract before work begins." },
      { q: "Do you provide support after launch?", a: "Yes. Support and improvement arrangements are agreed for each project." },
    ],
    relatedWork: [],
    relatedProducts: ["ventadot", "xerox-buddy", "salonly"],
  },
  {
    slug: "crm-erp",
    category: "software",
    name: "CRM & ERP Systems",
    short: "CRM / ERP",
    icon: "database",
    seo: {
      title: "CRM & ERP Development for Growing Businesses | Priinteve",
      description:
        "Custom CRM and ERP systems: leads, customers, quotes, orders, inventory and reports in one place, with integrations to WhatsApp, payments and your existing tools.",
      keywords: "custom CRM development, ERP software development India, lead management system, small business ERP",
    },
    h1: "CRM and ERP systems that match your business",
    body: "A CRM keeps every lead and customer conversation in one place. An ERP connects the rest of the business: purchasing, inventory, orders, billing and reporting. We build focused CRM and ERP systems for growing businesses, starting with the modules you need now and adding more as you grow.",
    card: "Leads, customers, orders, inventory and reports, connected in one system.",
    includes: ["Lead and pipeline management", "Customer records", "Quotes and invoices", "Order management", "Inventory and purchasing", "Staff roles and permissions", "Reports and dashboards", "WhatsApp and email integration"],
    useCases: [
      { title: "Sales teams", text: "Capture leads from your website and WhatsApp, assign them and track every follow-up." },
      { title: "Traders and distributors", text: "Quotes, orders, stock and dues in one place instead of registers." },
      { title: "Service businesses", text: "Customers, jobs, schedules and invoices connected end to end." },
      { title: "Multi-branch operations", text: "One view of sales and stock across locations." },
    ],
    deliverables: ["Module plan", "Data model", "UI design", "Build in phases", "Data migration", "Training"],
    faq: [
      { q: "What is the difference between a CRM and an ERP?", a: "A CRM manages leads, customers and sales activity. An ERP connects operations such as inventory, purchasing, orders, billing and reporting. Many businesses start with a CRM and add ERP modules later." },
      { q: "Can you customise an existing CRM instead?", a: "Sometimes that is the better option. We'll tell you if an existing product fits your needs before proposing a custom build." },
      { q: "Can the CRM capture leads from WhatsApp and our website?", a: "Yes, website forms can feed the CRM directly, and WhatsApp can be connected through an automation or API project." },
      { q: "Can we start small?", a: "Yes. We recommend starting with the modules that remove the most manual work, then adding more." },
    ],
    relatedWork: [],
    relatedProducts: ["ventadot"],
  },

  /* ------------------------------------------------------------------ NFC & QR */
  {
    slug: "nfc-qr-solutions",
    category: "nfcqr",
    name: "NFC & QR Solutions",
    short: "NFC & QR",
    icon: "scan",
    seo: {
      title: "NFC & QR Solutions for Business: Cards, Menus, Ordering | Priinteve",
      description:
        "NFC business cards, digital profiles, QR menus, QR ordering, NFC product experiences and QR campaigns, from the team behind Nectcard, VentaDot and Xerox Buddy.",
      keywords: "NFC solutions for business, QR code solutions, NFC business card, QR menu, QR ordering, QR campaign",
    },
    h1: "NFC and QR solutions that connect print to digital",
    body: "A tap or a scan is the shortest path from the physical world to your business online. We build NFC and QR experiences that open the right page at the right moment: a digital profile, a menu, an order screen, a file upload or a campaign. It's the same approach behind our own products, Nectcard, VentaDot and Xerox Buddy.",
    card: "NFC cards, digital profiles, QR menus, QR ordering and QR campaigns.",
    includes: ["NFC business cards", "QR business solutions", "Digital profiles", "QR menus", "QR ordering", "NFC product experiences", "QR campaigns", "Printed standees and tags"],
    useCases: [
      { title: "Networking", text: "NFC business cards that open a live profile, like Nectcard." },
      { title: "Restaurants", text: "Table QR and NFC that open the menu and take orders, like VentaDot." },
      { title: "Print shops", text: "A counter QR that accepts documents for printing, like Xerox Buddy." },
      { title: "Products and packaging", text: "NFC tags or QR codes on products that open instructions, warranty registration or brand stories." },
      { title: "Campaigns", text: "QR codes on posters, packaging and events that track where scans come from." },
    ],
    deliverables: ["Experience design", "Landing pages or app screens", "QR and NFC encoding", "Print-ready artwork", "Scan analytics where needed"],
    faq: [
      { q: "NFC or QR: which should I use?", a: "NFC is faster for phones that support it; QR works on almost every phone with a camera. Most of our solutions use both, with the QR code as a backup." },
      { q: "Do customers need an app?", a: "No. Our NFC and QR experiences open in the phone browser." },
      { q: "Can the destination change after printing?", a: "Yes, when the code points to a link we manage, the page behind it can be updated without reprinting." },
      { q: "Do you supply printed cards and standees?", a: "Yes. Nectcard offers plastic, wooden and metal NFC cards, and standees and tags are planned per project.", link: { label: "Nectcard", href: "/products/nectcard" } },
    ],
    relatedWork: [],
    relatedProducts: ["nectcard", "ventadot", "xerox-buddy"],
  },

  /* ------------------------------------------------------------------ AI & Automation */
  {
    slug: "whatsapp-bots",
    category: "ai",
    name: "WhatsApp Bots",
    short: "WhatsApp Automation",
    icon: "message",
    seo: {
      title: "WhatsApp Bot Development & WhatsApp Automation | Priinteve",
      description:
        "WhatsApp bots that answer common enquiries, capture leads, send notifications and move requests into your business workflow.",
      keywords: "WhatsApp bot development, WhatsApp automation for business, WhatsApp chatbot India, customer enquiry automation",
    },
    h1: "WhatsApp bots that handle the conversations you repeat every day",
    body: "We build WhatsApp bots that answer common enquiries, collect details, send notifications and move routine requests into your business workflow, so your team spends its time on the conversations that need a person. Each bot is scoped to clear jobs and hands over to a human when it should.",
    card: "Automate enquiries, notifications, lead capture and routine customer conversations.",
    includes: ["Enquiry and FAQ automation", "Lead capture and qualification", "Order and booking updates", "Notifications and reminders", "Human handover", "CRM and sheet integration", "Broadcast workflows"],
    useCases: [
      { title: "Enquiry handling", text: "Answer prices, timings, location and product questions instantly, at any hour." },
      { title: "Lead capture", text: "Collect name, requirement and budget, then pass qualified leads to your team or CRM." },
      { title: "Status updates", text: "Order, booking and delivery updates sent automatically." },
      { title: "Receipts and documents", text: "Send invoices, receipts or documents after a transaction." },
    ],
    deliverables: ["Conversation design", "Bot build and testing", "Integration with your systems", "Human handover rules", "Launch and monitoring"],
    faq: [
      { q: "Do I need the WhatsApp Business API?", a: "Automated bots at scale use the WhatsApp Business Platform, which requires Meta's approval and has its own conversation pricing. We guide you through the setup." },
      { q: "Can the bot hand over to a person?", a: "Yes. We design clear handover points so a team member can take over the conversation." },
      { q: "Can it use AI to understand questions?", a: "Yes, where it helps. We can combine fixed flows with AI understanding, and we agree what the bot may and may not answer.", link: { label: "AI Agents", href: "/services/ai-agents" } },
      { q: "Is WhatsApp automation better than a support team?", a: "It works alongside one. Bots handle repeated questions instantly; people handle the conversations that need judgement." },
    ],
    relatedWork: [],
    relatedProducts: ["ventadot", "salonly"],
  },
  {
    slug: "telegram-bots",
    category: "ai",
    name: "Telegram Bots",
    icon: "send",
    seo: {
      title: "Telegram Bot Development for Businesses & Communities | Priinteve",
      description:
        "Custom Telegram bots for communities, businesses and internal teams: bots that respond to messages, send updates and run workflows on request.",
      keywords: "Telegram bot development, custom Telegram bot, Telegram automation, community bot",
    },
    h1: "Custom Telegram bots for communities and businesses",
    body: "Telegram's bot platform is flexible and open, which makes it a strong choice for communities, internal teams and businesses whose customers already use it. We build bots that respond to messages, send updates, manage members and run a workflow on request.",
    card: "Bots for communities, alerts, internal teams and automated workflows.",
    includes: ["Community management bots", "Alerts and notifications", "Command-based workflows", "Payments and subscriptions where supported", "Admin dashboards", "Integration with your systems"],
    useCases: [
      { title: "Communities", text: "Welcome members, share resources, moderate and answer common questions." },
      { title: "Internal alerts", text: "Send new orders, leads or system alerts to your team's Telegram group." },
      { title: "Workflows on request", text: "Let users request a report, a status or a document with a command." },
    ],
    deliverables: ["Bot design", "Build and testing", "Integrations", "Admin controls", "Launch"],
    faq: [
      { q: "Why Telegram instead of WhatsApp?", a: "Telegram's bot platform is open and flexible, with no approval process for basic bots, which suits communities and internal tools. WhatsApp reaches more customers in India. We'll help you choose." },
      { q: "Can a Telegram bot send alerts from our systems?", a: "Yes. Your website, store or software can send events to a bot that posts them to a chat or group." },
      { q: "Can we manage the bot ourselves?", a: "Yes, we can add admin commands or a small dashboard for your team." },
    ],
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
        "AI-powered agents that understand requests, respond and carry out defined business tasks within the systems you connect, with clear scope and human oversight.",
      keywords: "AI agent development, business AI agents, AI customer support, custom AI assistant, AI task automation",
    },
    h1: "AI agents that understand requests and get defined tasks done",
    body: "An AI agent can read a request in plain language, decide which step comes next and carry it out using the tools you connect: look up an order, draft a reply, update a record or route a ticket. We build agents for specific jobs, agree their scope and limits with you before we build, and keep a person in the loop where it matters.",
    card: "AI that understands, responds and executes defined business tasks.",
    includes: ["AI-powered customer support", "Knowledge-base assistants", "Task agents with tool access", "Document and data extraction", "Lead qualification", "Human review steps", "Usage and quality monitoring"],
    useCases: [
      { title: "Customer support", text: "Answer questions from your own documents and hand over complex cases to your team." },
      { title: "Back-office tasks", text: "Read emails or forms, extract details and update your systems." },
      { title: "Sales assistance", text: "Qualify enquiries and prepare a summary for your sales team." },
    ],
    deliverables: ["Use-case and scope definition", "Data and tool access plan", "Agent build and evaluation", "Guardrails and handover rules", "Deployment and monitoring"],
    faq: [
      { q: "What exactly is an AI agent?", a: "Software that uses an AI model to understand a request and then take steps, such as looking something up or updating a record, within limits you define." },
      { q: "Can an AI agent make mistakes?", a: "Yes. AI models can be wrong, so we limit what an agent can do, test it on real examples and add human review for sensitive actions." },
      { q: "Where does the agent get its information?", a: "From the sources you approve, such as your documents, FAQs or systems. We agree the data access before building." },
      { q: "Which AI models do you use?", a: "We choose a model per project based on the task, data sensitivity and cost." },
    ],
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
        "Connect your systems and automate repetitive business processes: lead routing, follow-ups, approvals, reports and data entry.",
      keywords: "business process automation, workflow automation, lead automation, automate data entry, small business automation",
    },
    h1: "Automate the repetitive work in your business",
    body: "Copying details between apps, chasing follow-ups, compiling the same report every week: repetitive work slows teams down and introduces mistakes. We connect your systems and automate those processes, starting with one workflow, making it reliable, and building from there.",
    card: "Connect your systems and automate repetitive processes.",
    includes: ["Lead automation", "Workflow automation", "Business process automation", "Follow-up and reminder sequences", "Approval flows", "Scheduled reports", "Data sync between apps"],
    useCases: [
      { title: "Lead routing", text: "New enquiries from your website, ads or WhatsApp go to the right person with all the details." },
      { title: "Follow-ups", text: "Reminders and messages sent automatically at the right time." },
      { title: "Reporting", text: "Daily or weekly numbers compiled and delivered without manual work." },
      { title: "Data entry", text: "Information from forms and documents moved into your systems automatically." },
    ],
    deliverables: ["Process audit", "Automation design", "Build and testing", "Error handling and alerts", "Documentation"],
    faq: [
      { q: "Which process should we automate first?", a: "The one that is repeated most often, follows clear rules and causes the most delays or errors today." },
      { q: "What happens if an automation fails?", a: "We add error handling and alerts, so failures are noticed and can be retried instead of silently lost." },
      { q: "Do we need to replace our existing software?", a: "Usually not. Automation connects the tools you already use, where they allow it." },
    ],
    relatedWork: [],
  },
  {
    slug: "ai-integrations",
    category: "ai",
    name: "AI Integrations",
    icon: "plug",
    seo: {
      title: "Custom AI Integrations for Business Software | Priinteve",
      description:
        "Add AI features to the website, application or workflow you already run: smart search, summaries, classification, drafting and more, scoped to a clear job.",
      keywords: "custom AI integration, add AI to website, AI API integration, AI for business software",
    },
    h1: "Custom AI integrations for the tools you already use",
    body: "You don't always need a new system to benefit from AI. We add AI features to the website, application or workflow you already run, such as smart search, summaries, classification or drafting, and connect them to the data they need. Each integration is scoped to a clear job, so you know what it does and what it doesn't.",
    card: "Add AI features to your existing website, app or workflow.",
    includes: ["AI-powered search", "Summaries and drafting", "Classification and tagging", "Data extraction", "Chat on your own content", "Custom AI solutions"],
    useCases: [
      { title: "Smarter search", text: "Help visitors find the right product or answer in plain language." },
      { title: "Faster admin", text: "Summarise long documents or draft replies inside your existing tools." },
      { title: "Organised data", text: "Classify incoming requests, tickets or documents automatically." },
    ],
    deliverables: ["Use-case selection", "Integration design", "Build and evaluation", "Cost and usage controls", "Handover"],
    faq: [
      { q: "Will AI see our private data?", a: "Only the data needed for the feature, and only through the access we agree. We choose providers and settings with data sensitivity in mind." },
      { q: "How do you control AI costs?", a: "We estimate usage during planning and add limits and monitoring so costs stay predictable." },
      { q: "Can AI be added to an existing website?", a: "Yes, in most cases, depending on how the site is built." },
    ],
    relatedWork: [],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
export const servicesIn = (cat: ServiceCategory) => services.filter((s) => s.category === cat);
export const categoryOf = (cat: ServiceCategory) => serviceCategories.find((c) => c.key === cat)!;
