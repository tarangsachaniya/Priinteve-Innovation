// Static site generator for Priinteve Innovations. Run: node build.mjs  -> writes ./site
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'site';
const PHONE = '+91 96620 70751', EMAIL = 'contact@priinteve.com';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Text in [square brackets] in the plan = needs client input -> styled chip
const t = s => esc(s).replace(/\[([^\]]+)\]/g, '<span class="tbc">$1</span>');

// ---------------------------------------------------------------- content
const PRODUCTS = {
  'xerox-buddy': {
    name: 'Xerox Buddy', ico: '🖨️', status: 'Live', rel: 'vantadot',
    title: 'Xerox Buddy | QR Self-Service Printing for Print Shops',
    desc: 'Xerox Buddy lets customers scan a QR or tap an NFC standee, upload a PDF, image or Word file and print at your shop. No pen drives, no counter rush.',
    h1: 'Xerox Buddy: let customers send files straight to your printer',
    kw: 'self-service printing software, xerox shop software, print from QR code, stationery shop printing',
    hero: 'At rush hour, you have no time to download PDFs from your computer and press print. With Xerox Buddy, customers scan or tap a standee, upload their file and the print job reaches your printer. You collect the pages and the payment.',
    card: 'Customers scan a standee, upload a file and print at your shop, so the counter never jams at rush hour.',
    problem: 'Most print jobs at a stationery shop are simple: A4 pages, black and white or color. Yet each one still means asking for a file, finding it, downloading it and printing it. When the queue grows, the counter slows down and customers wait.',
    how: [
      { h: 'How it works for your customer', list: ['Scan the QR code or tap the NFC standee at your counter. The Xerox Buddy website opens.', 'Upload a PDF, image or Word document.', 'Choose the print options. [Confirm options shown: black and white or color, copies, page range.]', 'The file goes to your printer. Your customer collects the pages and pays you at the counter.'], steps: true },
      { h: 'How it works for you', intro: 'Your shop gets a dashboard on your desktop. Every upload appears as an entry, and you decide who presses print.', list: ["Customer prints: the customer's upload prints automatically on your connected printer.", 'You print: each entry shows a print button beside it, and the job prints only when you press it.', 'Change the setting any time as your shop gets busy or quiet.', 'Our desktop app connects your printing device to the website for automatic printing.', 'Track every print job from your dashboard.'] },
    ],
    featH: 'Features',
    features: ['Scan or tap standee for your counter', 'Upload PDF, images and Word documents', 'Automatic printing through a connected printer', 'Shop dashboard on desktop with settings and a live list of entries', 'Choose who prints: the customer or you', 'No app download for customers', 'Print job tracking'],
    who: 'Stationery shops, xerox and photocopy shops, cyber cafes and campus print counters. [Confirm the list.]',
    faq: [['Do my customers need to install an app?', 'No. They scan or tap, and the website opens in their phone browser.'], ['Which files can customers upload?', 'PDF, images and Word documents.'], ['Can I stop customers from printing on their own?', 'Yes. Switch to the mode where you press the print button beside each entry.'], ['Who collects payment?', 'You do. The customer pays you at the counter when collecting the pages.'], ['Will it work with my printer?', 'It connects to your printing device through our desktop app. [Confirm supported printers and operating systems.]']],
    cta: 'Bring Xerox Buddy to your shop.', ctaSub: 'Request a demo or write to contact@priinteve.com.', btn: 'Request a demo',
    mock: [['📄', 'Assignment.pdf', 'Printing'], ['🖼️', 'ID-photo.jpg', 'Queued'], ['📝', 'Notes.docx', 'Ready']], mockT: 'Shop dashboard',
  },
  vantadot: {
    name: 'Vantadot', ico: '🍽️', status: 'Live', rel: 'salony',
    title: 'Vantadot | QR Table Ordering & Restaurant Order System',
    desc: 'Vantadot is a restaurant ordering system with QR and NFC table standees, takeaway ordering, kitchen display screens and one dashboard to run it all.',
    h1: 'Vantadot: restaurant order management with ordering at the table',
    kw: 'QR code restaurant ordering system, table ordering system, restaurant order management software, kitchen display',
    hero: 'Put a small standee on every table. Guests scan or tap, browse your menu and order. Every order lands in one dashboard, your chefs see it on a TV, and your guests see when it is ready.',
    card: 'Customers order from the table by scan or tap. Your kitchen and your dashboard see it instantly.',
    how: [{ h: 'How it works', list: ['Every table has its own standee. Guests scan the QR code or tap the NFC tag to open your branded menu and place an order from their seat.', 'One standee at the reception counter handles takeaway orders.', 'All orders from all tables and takeaway arrive in a single dashboard.', 'A kitchen TV shows chefs what to cook. A customer-facing TV shows which orders are ready.', 'Track orders and payments from the dashboard.'], steps: true }],
    featH: 'What you get',
    features: ['Table-wise QR and NFC standees', 'Takeaway ordering from the reception standee', 'One dashboard for orders and payments', 'TV screens for the kitchen and for customers', 'Website, desktop apps and Android TV app', 'Your own branded menu', 'Pickup screen with Indian regional settings', 'A digital business card for your restaurant', 'Built for many restaurants and branches on one platform'],
    soon: 'Delivery-app integration, WhatsApp billing, and loyalty and inventory management across branches.',
    who: 'Restaurants, cafes, food courts and food businesses with several tables or branches.',
    faq: [['Do guests need to download an app?', 'No. They scan or tap the standee and order in the browser.'], ['Can I manage takeaway orders too?', 'Yes. A standee at the reception counter takes takeaway orders into the same dashboard.'], ['How do chefs see orders?', 'On a kitchen TV that shows incoming orders. A separate screen shows customers when their order is ready.'], ['What devices does it run on?', 'Website, desktop apps and an Android TV app.'], ['Can I run more than one restaurant?', 'Yes. Vantadot is built as one platform for many restaurants, each with its own menu.']],
    cta: 'See Vantadot in your restaurant.', ctaSub: '', btn: 'Request a demo',
    mock: [['🪑', 'Table 4 · 2 items', 'New'], ['🥡', 'Takeaway #18', 'Cooking'], ['✅', 'Table 7', 'Ready']], mockT: 'Live orders',
  },
  salony: {
    name: 'Salony', ico: '💈', status: 'Live', rel: 'nectcard',
    title: 'Salony | Salon, Barber & Spa Appointment Booking Software',
    desc: 'Salony lets customers book salon, barbershop and spa appointments online, while you manage every booking from one simple dashboard.',
    h1: 'Salony: appointment booking for salons, barbershops and spas',
    kw: 'salon appointment booking software, barber shop booking app, spa booking system, salon management software',
    hero: 'Let customers book their slot online, and keep your day organised from one dashboard. Salony is made for professional salons, barbershops and spas that want a smooth front desk.',
    card: 'Let customers book salon, barbershop and spa appointments online and manage every booking in one place.',
    how: [{ h: 'How it works', list: ['Your customer opens your booking page from a link, QR code or NFC tap and chooses a service and a time.', 'The appointment appears in your salon dashboard.', 'You manage entries from one place.'], steps: true }],
    featH: 'Features',
    features: ['Online appointment booking for customers', 'Dashboard to manage all appointments', 'Built for salons, barbershops and spas', 'No app download for customers'],
    featNote: '[Confirm and add: staff and service setup, reminders, payments, customer history, multi-branch support. List only what is live today.]',
    who: 'Hair salons, unisex salons, barbershops, beauty parlours and spas.',
    faq: [['Do customers need an app to book?', 'No. They book from your booking page in their phone browser.'], ['Where do I see my appointments?', 'In the Salony dashboard.'], ['Is it only for large salons?', 'No. It suits any salon, barbershop or spa that takes appointments.']],
    cta: 'Fill your appointment book.', ctaSub: '', btn: 'Request a demo',
    mock: [['✂️', 'Haircut · 11:00', 'Booked'], ['💆', 'Spa · 12:30', 'Booked'], ['🧔', 'Beard trim · 2:00', 'New']], mockT: "Today's appointments",
  },
  nectcard: {
    name: 'Nectcard', ico: '📇', status: 'Live', rel: 'xerox-buddy',
    title: 'Nectcard | NFC Digital Business Card for India',
    desc: 'Create a digital business card shared by NFC tap or QR scan. Add contacts, social links, a gallery and brochure, and see how many people view it.',
    h1: 'Nectcard: your business card, one tap away',
    kw: 'NFC digital business card, digital visiting card India, QR business card, NFC visiting card',
    hero: 'A digital business card that opens a full profile when someone taps your NFC card or scans your QR code. Save details to their contacts, see your work, reach you on WhatsApp.',
    card: 'One digital business card that opens a full profile with a tap or a scan.',
    heroBtn: ['Create your card', 'https://cards.priinteve.com'], heroBtn2: 'Talk to us',
    how: [{ h: 'How it works', list: ['Build your card in a guided setup and add your brand colors.', 'Pick the fields you want: phone, email, website, social links, WhatsApp, address and a PDF brochure.', 'Show your work in a gallery of images and YouTube videos.', 'Share through an NFC card or a printable QR code.', 'Watch views on your dashboard.'], steps: true }],
    featH: 'Features',
    features: ['Guided card builder with your brand colors', 'Field library: phone, email, website, social links, WhatsApp, address, PDF brochure', 'Gallery with images and YouTube videos', 'Save to contacts in one tap', 'NFC card and printable QR code', 'View counts on your dashboard', 'Referral program: earn wallet credit when someone you refer buys'],
    who: 'Shops, studios, professionals and teams that want a modern digital identity.',
    faq: [['Does the person receiving my card need an app?', 'No. The card opens as a web page after a tap or scan.'], ['Can people save my number?', 'Yes. Visitors can save your details straight to their contacts.'], ['Can I see who views my card?', 'You can see how many people view it from your dashboard.'], ['How does the referral program work?', 'You earn wallet credit when someone you refer buys.'], ['Can I get a physical NFC card?', 'Yes. [Confirm physical card options and plan details before publishing.]']],
    cta: 'Create your Nectcard today.', ctaSub: '', btn: 'Create your card', ctaHref: 'https://cards.priinteve.com',
    mock: [['👤', 'Your name · Role', 'NFC'], ['📞', 'Save to contacts', 'Tap'], ['👁️', 'Card views', '128']], mockT: 'Your Nectcard',
  },
  'priinteve-printing': {
    name: 'Priinteve Printing', ico: '📦', status: 'Coming soon', rel: 'xerox-buddy',
    title: 'Priinteve Printing | Custom On-Demand Printing in India',
    desc: 'Upload your design, order custom print online and get it delivered. Priinteve Printing is coming soon with vetted local printers and order tracking.',
    h1: 'Priinteve Printing: print any thing, anywhere, on demand',
    kw: 'custom printing online India, on-demand printing, bulk printing, business printing delivered',
    hero: 'Choose what you want to print, upload your design and place your order on web or mobile. Vetted local printers produce it and we deliver it to you.',
    card: 'Custom print, produced by vetted local printers and delivered to you.',
    heroBtn: ['Join the waitlist', '#waitlist'], noDemo: true,
    how: [{ h: 'How it will work', list: ['Choose what you want to print.', 'Upload your design.', 'Place your order on web or mobile.', 'A vetted local printer produces your order.', 'Track the order until it is delivered.'], steps: true }],
    featH: 'Why it is different',
    features: ['One brand, one experience, whichever printer makes your order.', 'Vetted local printers, so quality stays consistent.', 'Made for businesses that need real quantities: 25 to 1,000 pieces per order.', 'Order tracking from placement to delivery.'],
    waitlist: ['Name', 'Phone', 'Email', 'What you want to print', 'Usual quantity'],
    faq: [['When does it launch?', 'We are preparing the launch. Join the waitlist and we will tell you first. [Add date if known.]'], ['What quantities can I order?', 'From 25 to 1,000 pieces per order.'], ['Who prints my order?', 'A vetted local printer, under one consistent Priinteve experience.'], ['Can I print one piece today?', 'Not yet. For single-page printing at a shop, see Xerox Buddy.']],
    cta: 'Be first in line.', ctaSub: 'Join the waitlist and we will tell you first.', btn: 'Join the waitlist', ctaHref: '#waitlist',
    mock: [['🎨', 'Upload your design', 'Step 1'], ['🏭', 'Local printer produces', 'Step 2'], ['🚚', 'Delivered to you', 'Step 3']], mockT: 'Order tracking',
  },
};
const PKEYS = Object.keys(PRODUCTS);

const SERVICES = {
  'website-design-development': { name: 'Website Design and Development', ico: '🖥️', title: 'Website Design & Development Company in India', desc: 'Fast, modern business websites for manufacturers, suppliers, service companies and brands. Priinteve designs and builds sites that win customers.', h1: 'Website design and development for Indian businesses', kw: 'website design company India, business website development, manufacturer website, company website', body: 'We build websites that present your business clearly and bring in enquiries. Manufacturers and wholesalers get product catalogues that trade buyers trust. Service companies get sharp sites that showcase their work. Every site is fast, mobile-ready and built to be found on Google.', work: ['royal-timber', 'pvc-cpvc-machinery', 'quantivo'], card: 'Fast, modern sites for businesses, from manufacturers to e-commerce brands.' },
  'ecommerce-websites': { name: 'E-commerce Websites', ico: '🛍️', title: 'E-commerce Website Development India | Priinteve', desc: 'Online stores with custom visuals, smooth mobile design and secure payments. Priinteve builds e-commerce experiences that make products look their best.', h1: 'E-commerce websites that sell as well as they look', kw: 'ecommerce website development India, online store design, mobile-first ecommerce, Razorpay store', body: 'We build storefronts with custom visuals and smooth mobile design, including creative concepts such as animated packaging reveals. Secure online payments, transactional email and push notifications are built in.', work: ['cashew-ecommerce'], card: 'E-commerce experiences: storefronts with custom visuals and smooth mobile design, including creative concepts such as animated packaging reveals.' },
  'custom-web-applications': { name: 'Custom Web Applications', ico: '⚙️', title: 'Custom Web Application Development | Priinteve', desc: 'Dashboards, portals and multi-user platforms built to fit how your business works. Priinteve builds on Next.js, React, TypeScript and PostgreSQL.', h1: 'Custom web applications built around how you work', kw: 'custom web application development, business dashboard, client portal, multi-user platform', body: 'If off-the-shelf tools do not fit, we build your own: dashboards, portals and multi-user platforms. We know what this takes because we run Vantadot, Xerox Buddy, Salony and Nectcard on the same technology.', work: [], card: 'Dashboards, portals and multi-user platforms built around how your business works.' },
  'nfc-qr-solutions': { name: 'NFC and QR Solutions', ico: '📲', title: 'NFC & QR Solutions for Business | Priinteve', desc: 'Printed NFC cards and QR codes that open your menu, profile, booking page or website with a tap or scan. Made by Priinteve Innovations.', h1: 'NFC and QR solutions that connect print to digital', kw: 'NFC QR solutions for business, NFC card, QR standee, tap and scan solutions', body: 'Printed cards, standees and codes that connect the physical world to your digital presence. Tap or scan to open a menu, profile, booking page or file upload. See it in action in Nectcard, Vantadot, Salony and Xerox Buddy.', work: [], seeProducts: ['nectcard', 'vantadot', 'salony', 'xerox-buddy'], card: 'NFC and QR solutions: printed cards and codes that connect the physical world to your digital presence.' },
};
const SKEYS = Object.keys(SERVICES);

const WORK = {
  quantivo: { name: 'Quantivo', cat: 'Digital marketing company', sum: 'A website built to showcase services and win new clients.', svc: 'website-design-development', c: ['#1257a6', '#5b8cff'], ico: '📈', title: 'Quantivo Website | Digital Marketing Site Case Study', desc: 'How Priinteve built a website for digital marketing company Quantivo to showcase its services and win new clients.', client: 'a digital marketing company' },
  'royal-timber': { name: 'Royal Timber', cat: 'Plywood supplier and wholesaler', sum: 'A website built to present the product range to trade buyers.', svc: 'website-design-development', c: ['#8a5a2b', '#d9a066'], ico: '🪵', title: 'Royal Timber Website | Plywood Wholesaler Case Study', desc: 'How Priinteve built a website for plywood supplier Royal Timber to present its product range to trade buyers.', client: 'a plywood supplier and wholesaler' },
  'cashew-ecommerce': { name: 'Premium cashew brand', cat: 'E-commerce', sum: 'A modern online store with a mobile-first visual concept.', svc: 'ecommerce-websites', c: ['#b4541e', '#f2b155'], ico: '🥜', title: 'Cashew E-commerce Website | Case Study | Priinteve', desc: 'A mobile-first online store for a premium cashew brand, designed and built by Priinteve Innovations.', client: 'a premium cashew brand' },
  'pvc-cpvc-machinery': { name: 'PVC and CPVC machinery manufacturer', cat: 'Industrial manufacturing', sum: 'A professional website for PVC and CPVC pipe processing machines.', svc: 'website-design-development', c: ['#0b3d7a', '#14b8a6'], ico: '🏭', title: 'PVC & CPVC Machinery Website | Case Study | Priinteve', desc: 'A professional website for a manufacturer of PVC and CPVC pipe processing machines, built by Priinteve Innovations.', client: 'an industrial machinery manufacturer' },
};
const WKEYS = Object.keys(WORK);

// ---------------------------------------------------------------- layout
let depth = 0, cur = '/';
const R = () => '../'.repeat(depth);
const L = p => (p.startsWith('http') || p.startsWith('#')) ? p : R() + p + (p && !p.endsWith('/') ? '' : '') + (p.endsWith('/') || p === '' ? 'index.html' : '');
const crumbHtml = trail => `<nav class="crumbs" aria-label="Breadcrumb"><a href="${L('')}">Home</a>${trail.map(([n, u]) => u ? `<span><a href="${L(u)}">${n}</a></span>` : `<span>${n}</span>`).join('')}</nav>`;

const header = () => {
  const act = s => cur.startsWith(s) ? ' class="active"' : '';
  const ddAct = s => cur.startsWith(s) ? ' class="active"' : '';
  return `<header class="hdr"><div class="wrap">
<a class="logo" href="${L('')}" aria-label="Priinteve Innovations home"><i>P</i>Priinteve</a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
<nav class="nav" aria-label="Main">
<div class="dd"><button${ddAct('/products')} aria-expanded="false">Products</button><div class="menu">${PKEYS.map(k => `<a href="${L('products/' + k + '/')}">${PRODUCTS[k].name}${PRODUCTS[k].status !== 'Live' ? '<small>Coming soon</small>' : ''}</a>`).join('')}</div></div>
<div class="dd"><button${ddAct('/services')} aria-expanded="false">Services</button><div class="menu">${SKEYS.map(k => `<a href="${L('services/' + k + '/')}">${SERVICES[k].name}</a>`).join('')}</div></div>
<a href="${L('work/')}"${act('/work')}>Our Work</a><a href="${L('about/')}"${act('/about')}>About</a>
<a class="btn btn-primary" href="${L('contact/')}">Get in touch</a></nav></div></header>`;
};

const footer = () => `<footer class="ftr"><div class="wrap"><div class="ftr-grid">
<div><a class="logo" href="${L('')}"><i>P</i>Priinteve Innovations</a><p>Print any thing, anywhere, on demand.</p><p><a href="tel:+919662070751">${PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a><a href="https://cards.priinteve.com">Nectcard sign-in · cards.priinteve.com</a></p></div>
<div><h4>Products</h4>${PKEYS.map(k => `<a href="${L('products/' + k + '/')}">${PRODUCTS[k].name}</a>`).join('')}</div>
<div><h4>Services and Our Work</h4>${SKEYS.map(k => `<a href="${L('services/' + k + '/')}">${SERVICES[k].name}</a>`).join('')}<a href="${L('work/')}">Our Work</a></div>
<div><h4>Company</h4><a href="${L('about/')}">About</a><a href="${L('blog/')}">Blog</a><a href="${L('faq/')}">FAQ</a><a href="${L('contact/')}">Contact</a><a href="${L('privacy-policy/')}">Privacy Policy</a><a href="${L('terms/')}">Terms</a></div>
</div><div class="ftr-bot"><span>© 2026 Priinteve Innovations (India)</span><span>priinteve.com</span></div></div></footer>`;

const jsonld = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

function shell(p) {
  return `<!doctype html><html lang="en-IN" class="no-js"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.desc).replace(/"/g, '&quot;')}">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc).replace(/"/g, '&quot;')}"><meta property="og:type" content="website"><meta name="theme-color" content="#0a1730">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R()}assets/style.css"><script>document.documentElement.classList.remove('no-js')</script>
${p.ld.map(jsonld).join('')}</head><body><a class="skip" href="#main">Skip to content</a>${header()}<main id="main">${p.body}</main>${footer()}<script src="${R()}assets/app.js"></script></body></html>`;
}

// ---------------------------------------------------------------- components
const btn = (label, href, kind = 'primary') => `<a class="btn btn-${kind}" href="${L(href)}">${label}</a>`;
const heroBlock = ({ trail, h1, lead, btns, badge, mock, kicker }) => `<section class="hero page-hero dark"><div class="wrap"><div class="hero-grid"><div>
${trail ? crumbHtml(trail) : ''}${badge ? `<span class="badge ${badge === 'Coming soon' ? 'soon' : ''}">${badge}</span><br><br>` : kicker ? `<span class="badge">${kicker}</span><br><br>` : ''}
<h1>${t(h1)}</h1><p class="lead">${t(lead)}</p><div class="btns">${btns}</div></div>${mock ? mockBlock(mock) : ''}</div></div></section>`;
const mockBlock = m => `<div class="mock" aria-hidden="true"><div class="bar"><b></b><b></b><b></b></div><div style="color:#fff;font-weight:600;font-family:'Space Grotesk'">${m.t}</div>${m.rows.map(r => `<div class="row"><span class="ic">${r[0]}</span>${r[1]}<em>${r[2]}</em></div>`).join('')}</div>`;
const head = (eyebrow, h, p) => `<div class="sec-head rv"><span class="eyebrow">${eyebrow}</span><h2>${t(h)}</h2>${p ? `<p>${t(p)}</p>` : ''}</div>`;
const checks = (arr, cols) => `<ul class="checks${cols ? ' cols' : ''}">${arr.map(i => `<li class="rv">${t(i)}</li>`).join('')}</ul>`;
const faqBlock = faq => `<div class="faq">${faq.map(([q, a]) => `<details class="rv"><summary>${t(q)}</summary><div>${t(a)}</div></details>`).join('')}</div>`;
const faqLd = faq => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/\[[^\]]+\]/g, '').trim() } })) });
const crumbLd = trail => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', ''], ...trail].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: 'https://priinteve.com/' + (u || '') })) });
const cta = (h, sub, buttons) => `<section class="sec tight"><div class="wrap"><div class="cta dark rv"><h2>${t(h)}</h2>${sub ? `<p>${t(sub)}</p>` : ''}<div class="btns">${buttons}</div></div></div></section>`;
const ctaContact = (h = "Tell us what you want to print, build or launch, and we'll take it from there.") => cta(h, '', btn('Get in touch', 'contact/') + `<a class="btn btn-ghost" href="tel:+919662070751">Call ${PHONE}</a>`);
const productCard = k => { const p = PRODUCTS[k]; return `<a class="card p-card rv" href="${L('products/' + k + '/')}"><div class="ico">${p.ico}</div><span class="badge ${p.status === 'Live' ? '' : 'soon'}">${p.status}</span><h3>${p.name}</h3><p>${p.card}</p><span class="more">Learn more</span></a>`; };
const projectCard = k => { const w = WORK[k]; return `<a class="card rv" href="${L('work/' + k + '/')}" style="--c1:${w.c[0]};--c2:${w.c[1]}"><div class="proj-art" aria-hidden="true">${w.ico}</div><span class="tag">${w.cat}</span><h3>${w.name}</h3><p>${w.sum}</p><span class="more">View case study</span></a>`; };
const enquiryForm = (opts = ['Xerox Buddy', 'Vantadot', 'Salony', 'Nectcard', 'Priinteve Printing', 'A website', 'A custom web application', 'Something else'], pre = '') => `<form data-form>
<div class="frow"><label>Name<input required name="name" autocomplete="name"></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label></div>
<label>Email<input required type="email" name="email" autocomplete="email"></label>
<label>I am interested in<select name="interest">${opts.map(o => `<option${o === pre ? ' selected' : ''}>${o}</option>`).join('')}</select></label>
<label>Business name and type<input name="business"></label><label>Message<textarea name="message"></textarea></label>
<button class="btn btn-primary" type="submit">Send enquiry</button><div class="ok" role="status">Thank you. We have your enquiry and will be in touch.</div></form>`;

// ---------------------------------------------------------------- pages
const pages = [];
const add = (url, title, desc, bodyFn, ld = () => []) => pages.push({ url, title, desc, bodyFn, ld });

// Home
add('', 'Priinteve Innovations | Print, Restaurant & Salon Software', 'Priinteve builds Xerox Buddy, Vantadot, Salony and Nectcard, plus websites and custom software for Indian businesses. See what we make and get started.', () => `
${heroBlock({ h1: 'Software that helps Indian businesses print, serve and grow', lead: 'Priinteve Innovations is an India-based product company. We build ready-to-use tools for print shops, restaurants, salons and professionals, and we design and develop websites and software for businesses like yours.', btns: btn('Explore our products', 'products/') + btn('Talk to us', 'contact/', 'ghost'), kicker: 'Print any thing, anywhere, on demand.', mock: { t: 'One platform, many businesses', rows: [['🖨️', 'Xerox Buddy', 'Live'], ['🍽️', 'Vantadot', 'Live'], ['💈', 'Salony', 'Live'], ['📇', 'Nectcard', 'Live']] } })}
<section class="sec"><div class="wrap">${head('What we make', 'Five products. One problem solved well by each.')}<div class="grid g3">${PKEYS.map(productCard).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('How it works', 'Scan or tap. Use it. Manage it from one dashboard.')}<div class="steps">
<div class="step rv"><h3>Scan or tap</h3><p>Your customer scans a QR code or taps an NFC standee or card. A website opens right away. No app to install.</p></div>
<div class="step rv"><h3>Use it</h3><p>They upload a file to print, order a meal, book a slot or save a contact.</p></div>
<div class="step rv"><h3>Manage it</h3><p>You see everything in your dashboard and stay in control.</p></div></div></div></section>
<section class="sec"><div class="wrap">${head('Who we serve', 'Built for the businesses that keep India running')}<div class="grid g3">${[['🖨️', 'Stationery, xerox and print shops that are busy at the counter'], ['🍽️', 'Restaurants and food businesses that want faster table service and takeaway'], ['💈', 'Salons, barbershops and spas that want a simple way to take appointments'], ['📇', 'Shops, studios and professionals who want a modern digital identity'], ['🏭', 'Manufacturers, wholesalers, marketing companies and e-commerce brands that need a strong website']].map(([i, s]) => `<div class="card hov rv"><div class="ico">${i}</div><p style="color:var(--ink);font-weight:500">${s}</p></div>`).join('')}</div></div></section>
<section class="sec soft"><div class="wrap"><div class="split"><div class="rv"><span class="eyebrow">Websites and software for clients</span><h2>The team that runs our platforms builds yours</h2><p style="margin-top:16px">We design and develop fast, modern websites, online stores and custom web applications. Recent projects include a digital marketing company website, a plywood wholesaler's trade catalogue, a premium cashew online store and an industrial machinery manufacturer's website.</p><div class="btns">${btn('Our services', 'services/')}${btn('Our work', 'work/', 'ghost')}</div></div>
<div class="grid g2">${WKEYS.map(projectCard).join('')}</div></div></div></section>
<section class="sec"><div class="wrap">${head('Why Priinteve', 'Why Priinteve')}<div class="grid g3">${[['🧩', 'Built by product people', 'we run our own platforms, so we know what works in real businesses.'], ['🤝', 'One partner, many solutions', 'print, digital identity, restaurant tools, salon booking and web development under one roof.'], ['🇮🇳', 'Made for India', 'rupee payments through Razorpay, regional settings and pricing that suits small businesses.'], ['🛡️', 'Modern, reliable technology', 'Next.js, React, TypeScript and PostgreSQL with secure hosting and file storage.'], ['✨', 'Clear and simple', 'guided setup, honest pricing and support when you need it.']].map(([i, h, p]) => `<div class="card hov rv"><div class="ico">${i}</div><h3>${h}</h3><p>${p[0].toUpperCase() + p.slice(1)}</p></div>`).join('')}</div></div></section>
${ctaContact()}`,
  () => [{ '@context': 'https://schema.org', '@type': 'Organization', name: 'Priinteve Innovations', url: 'https://priinteve.com', telephone: PHONE, email: EMAIL, slogan: 'Print any thing, anywhere, on demand.' }, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Priinteve Innovations', url: 'https://priinteve.com' }]);

// About
add('about/', 'About Priinteve Innovations | Indian Product Company', 'Priinteve Innovations is an India-based product and software company making print, digital identity and business tools simple and affordable.', () => `
${heroBlock({ trail: [['About']], h1: 'About Priinteve Innovations', lead: 'We started with one idea: ordering custom print should be as easy as ordering anything else online. That idea grew into a platform, and then into a small family of products and services.', btns: btn('Our products', 'products/') })}
<section class="sec"><div class="wrap"><div class="split"><div class="rv"><span class="eyebrow">Our story</span><h2>From one idea to a family of products</h2></div><div class="rv"><p>Today Priinteve Innovations builds Xerox Buddy for stationery and xerox shops, Vantadot for restaurants, Salony for salons and spas, Nectcard for digital business cards, and Priinteve Printing, our on-demand printing service. We also build websites and custom software for clients.</p></div></div></div></section>
<section class="sec soft"><div class="wrap"><div class="grid g2"><div class="card rv"><span class="eyebrow">Our mission</span><h3 style="font-size:1.5rem">To make professional printing, digital identity and day-to-day business tools simple and affordable for small and growing businesses.</h3></div><div class="card rv"><span class="eyebrow">How we work</span><p style="font-size:1.05rem">We are a product company first. What we build for ourselves shapes what we deliver for clients. We run our own platforms, we see the same problems our customers see, and we fix them.</p></div></div></div></section>
<section class="sec"><div class="wrap">${head('What we believe', 'What we believe')}<div class="grid g3">${['Tools for small businesses should be simple enough to start using the same day.', 'Customers should never have to install an app to order, print or book.', 'Pricing should be honest and easy to understand.'].map((s, i) => `<div class="step rv"><p style="color:var(--ink);font-weight:500">${s}</p></div>`).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Products and services at a glance', 'Products and services at a glance')}<div class="grid g3">${PKEYS.map(productCard).join('')}</div></div></section>
<section class="sec"><div class="wrap">${head('Team', 'Team')}<p class="note">[Add founder or team names, photos, year founded and city if you want them shown. Not available in the current profile.]</p></div></section>
${cta('Want to know more?', 'Talk to us at contact@priinteve.com or call +91 96620 70751.', btn('Get in touch', 'contact/'))}`);

// Products index
add('products/', 'Products | Xerox Buddy, Vantadot, Salony, Nectcard', 'Explore Priinteve products: Xerox Buddy for print shops, Vantadot for restaurants, Salony for salons, Nectcard digital cards and Priinteve Printing.', () => `
${heroBlock({ trail: [['Products']], h1: 'Products built for Indian businesses', lead: 'Every Priinteve product solves one problem well, and most work by a simple scan or tap. Pick the one that fits your business.', btns: btn('Get in touch', 'contact/') })}
<section class="sec"><div class="wrap"><div class="grid g3">${PKEYS.map(productCard).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Compare', 'Which product is right for you?')}<div class="tbl rv"><table><thead><tr><th>Product</th><th>Built for</th><th>How customers use it</th><th>Status</th></tr></thead><tbody>
${[['xerox-buddy', 'Stationery, xerox and print shops', 'Scan or tap a standee, upload a file, collect the printout'], ['vantadot', 'Restaurants and food businesses', 'Scan or tap the table standee and order'], ['salony', 'Salons, barbershops and spas', 'Book an appointment online'], ['nectcard', 'Professionals, shops and teams', 'Tap or scan to open a full digital profile'], ['priinteve-printing', 'Businesses and individuals needing print', 'Upload a design, order, get it delivered']].map(([k, a, b]) => `<tr><td><a href="${L('products/' + k + '/')}" style="color:var(--brand)">${PRODUCTS[k].name}</a></td><td>${a}</td><td>${b}</td><td><span class="badge ${PRODUCTS[k].status === 'Live' ? '' : 'soon'}">${PRODUCTS[k].status}</span></td></tr>`).join('')}</tbody></table></div></div></section>
<section class="sec"><div class="wrap">${head('Help me choose', 'Help me choose')}<div class="help rv" style="max-width:640px">${[['I run a print shop', 'products/xerox-buddy/'], ['I run a restaurant', 'products/vantadot/'], ['I run a salon', 'products/salony/'], ['I need a business card', 'products/nectcard/'], ['I need to print in bulk', 'products/priinteve-printing/'], ['I need a website', 'services/']].map(([a, u]) => `<a href="${L(u)}">${a}</a>`).join('')}</div></div></section>
${ctaContact()}`, () => [crumbLd([['Products', 'products/']])]);

// Product pages
for (const k of PKEYS) {
  const p = PRODUCTS[k];
  const trail = [['Products', 'products/'], [p.name]];
  const rel = PRODUCTS[p.rel];
  add(`products/${k}/`, p.title, p.desc, () => `
${heroBlock({ trail, badge: p.status, h1: p.h1, lead: p.hero, btns: p.heroBtn ? `<a class="btn btn-primary" href="${p.heroBtn[1].startsWith('#') ? p.heroBtn[1] : p.heroBtn[1]}">${p.heroBtn[0]}</a>${p.heroBtn2 ? btn(p.heroBtn2, 'contact/', 'ghost') : ''}` : btn(p.btn, 'contact/') + `<a class="btn btn-ghost" href="tel:+919662070751">Call us</a>`, mock: { t: p.mockT, rows: p.mock } })}
${p.problem ? `<section class="sec"><div class="wrap"><div class="split"><div class="rv"><span class="eyebrow">The problem</span><h2>Busy counters slow everyone down</h2></div><p class="rv" style="font-size:1.1rem">${t(p.problem)}</p></div></div></section>` : ''}
${p.how.map((b, i) => `<section class="sec ${i % 2 === (p.problem ? 0 : 1) ? 'soft' : ''}"><div class="wrap">${head('How it works', b.h, b.intro)}${b.steps ? `<div class="steps ${b.list.length === 4 ? 'four' : ''}" style="${b.list.length === 5 || b.list.length === 3 && false ? '' : ''}">${b.list.map(s => `<div class="step rv"><p style="color:var(--ink)">${t(s)}</p></div>`).join('')}</div>` : checks(b.list)}</div></section>`).join('')}
<section class="sec"><div class="wrap">${head('Features', p.featH)}${checks(p.features, true)}${p.featNote ? `<p class="note">${t(p.featNote)}</p>` : ''}${p.soon ? `<div class="card rv" style="margin-top:28px"><span class="badge soon">Coming soon</span><p style="color:var(--ink)">${p.soon}</p></div>` : ''}</div></section>
${p.who ? `<section class="sec soft"><div class="wrap"><div class="split"><div class="rv"><span class="eyebrow">Who it is for</span><h2>Who it is for</h2><p style="margin-top:14px;font-size:1.1rem">${t(p.who)}</p></div><div class="shot rv" role="img" aria-label="${p.name} product screens">Product screens and photos<br>[add: ${k}-screens]</div></div></div></section>` : ''}
${p.waitlist ? `<section class="sec soft" id="waitlist"><div class="wrap"><div class="split"><div class="rv">${head('Waitlist', 'Join the waitlist', 'Be the first to know when Priinteve Printing launches.')}</div><div class="formcard rv"><form data-form>${p.waitlist.map(f => `<label>${f}<input name="${f}" ${f === 'Email' ? 'type="email"' : f === 'Phone' ? 'type="tel"' : ''}></label>`).join('')}<button class="btn btn-primary" type="submit">Join the waitlist</button><div class="ok" role="status">Thank you. You are on the list and we will tell you first.</div></form></div></div></div></section>` : ''}
<section class="sec"><div class="wrap">${head('FAQ', 'Frequently asked questions')}${faqBlock(p.faq)}</div></section>
${cta(p.cta, p.ctaSub, `<a class="btn btn-light" href="${p.ctaHref || L('contact/')}">${p.btn}</a>`)}
<section class="sec tight"><div class="wrap"><div class="pager"><a class="card hov" style="flex:1;min-width:240px" href="${L('products/')}"><span class="tag">All products</span><h3>Back to Products</h3></a><a class="card hov" style="flex:1;min-width:240px" href="${L('products/' + p.rel + '/')}"><span class="tag">Related product</span><h3>${rel.name}</h3></a><a class="card hov" style="flex:1;min-width:240px" href="${L('contact/')}"><span class="tag">Questions?</span><h3>Contact us</h3></a></div></div></section>`,
    () => [{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication', description: p.desc, publisher: { '@type': 'Organization', name: 'Priinteve Innovations' } }, faqLd(p.faq), crumbLd([['Products', 'products/'], [p.name, `products/${k}/`]])]);
}

// Services index
add('services/', 'Web Design & Development Services | Priinteve Innovations', 'Priinteve designs and builds fast websites, e-commerce stores and custom web apps for Indian businesses. See our services and recent client work.', () => `
${heroBlock({ trail: [['Services']], h1: 'Websites and software built by the team behind our own products', lead: 'We run our own platforms, so we build with real business in mind. From a one-page site to a multi-user platform, we design and develop it for you.', btns: btn('Get in touch', 'contact/') + btn('See our work', 'work/', 'ghost') })}
<section class="sec"><div class="wrap">${head('Services', 'What we build')}<div class="grid g3">${SKEYS.map(k => `<a class="card rv" href="${L('services/' + k + '/')}"><div class="ico">${SERVICES[k].ico}</div><h3>${SERVICES[k].name}</h3><p>${SERVICES[k].card}</p><span class="more">Learn more</span></a>`).join('')}
<div class="card rv"><div class="ico">💳</div><h3>Payments, email and notifications</h3><p>Secure online payments, transactional email and push notifications built in.</p><span class="badge">Included in every project</span></div></div></div></section>
<section class="sec soft"><div class="wrap">${head('Our process', 'Our process')}<div class="steps four">${[['Discover', 'we learn your business, customers and goals.'], ['Plan', 'we agree on pages, features and timeline.'], ['Build', 'we design and develop, and share progress.'], ['Launch', 'we go live, test and support you.']].map(([a, b]) => `<div class="step rv"><h3>${a}</h3><p>${b[0].toUpperCase() + b.slice(1)}</p></div>`).join('')}</div></div></section>
<section class="sec"><div class="wrap">${head('Technology', 'Technology')}<div class="chips rv">${['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Secure hosting and file storage', 'Rupee payments through Razorpay'].map(c => `<span class="chip">${c}</span>`).join('')}</div></div></section>
<section class="sec soft"><div class="wrap">${head('Recent work', 'Recent work')}<div class="grid g4">${WKEYS.map(projectCard).join('')}</div></div></section>
${ctaContact()}`, () => [crumbLd([['Services', 'services/']])]);

// Service sub-pages
for (const k of SKEYS) {
  const s = SERVICES[k], trail = [['Services', 'services/'], [s.name]];
  add(`services/${k}/`, s.title, s.desc, () => `
${heroBlock({ trail, h1: s.h1, lead: s.body, btns: btn('Start a project', 'contact/') + btn('See our work', 'work/', 'ghost') })}
<section class="sec"><div class="wrap">${head('What you get', 'What you get', s.body)}</div></section>
<section class="sec soft"><div class="wrap">${head('How we work', 'How we work')}<div class="steps four">${[['Discover', 'we learn your business, customers and goals.'], ['Plan', 'we agree on pages, features and timeline.'], ['Build', 'we design and develop, and share progress.'], ['Launch', 'we go live, test and support you.']].map(([a, b]) => `<div class="step rv"><h3>${a}</h3><p>${b[0].toUpperCase() + b.slice(1)}</p></div>`).join('')}</div></div></section>
<section class="sec"><div class="wrap">${head('Related projects', s.seeProducts ? 'See it in action' : 'Related work')}${s.work.length ? `<div class="grid g3">${s.work.map(projectCard).join('')}</div>` : s.seeProducts ? `<div class="grid g4">${s.seeProducts.map(productCard).join('')}</div>` : `<div class="grid g4">${PKEYS.filter(x => x !== 'priinteve-printing').map(productCard).join('')}</div><p style="margin-top:16px">We run Vantadot, Xerox Buddy, Salony and Nectcard on the same technology.</p>`}</div></section>
<section class="sec soft"><div class="wrap">${head('FAQ', 'Frequently asked questions')}<p class="note">[Service FAQ to be added.]</p></div></section>
<section class="sec" id="enquiry"><div class="wrap"><div class="split"><div class="rv">${head('Enquiry', 'Tell us about your project')}</div><div class="formcard rv">${enquiryForm(undefined, k === 'custom-web-applications' ? 'A custom web application' : k === 'nfc-qr-solutions' ? 'Something else' : 'A website')}</div></div></div></section>`,
    () => [{ '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.desc, provider: { '@type': 'Organization', name: 'Priinteve Innovations' }, areaServed: 'IN' }, crumbLd([['Services', 'services/'], [s.name, `services/${k}/`]])]);
}

// Work
add('work/', 'Our Work | Website Projects by Priinteve Innovations', 'See websites we built for a digital marketing company, a plywood wholesaler, a premium cashew brand and an industrial machinery manufacturer.', () => `
${heroBlock({ trail: [['Our Work']], h1: 'Websites we have built for clients', lead: 'A look at recent websites we designed and developed. Each project starts with a business goal and ends with a site that does a job.', btns: btn('Start a project', 'contact/') })}
<section class="sec"><div class="wrap"><div class="grid g2">${WKEYS.map(projectCard).join('')}</div><p class="note">Add the client name and live link for the cashew brand and the machinery manufacturer only if the clients agree to be named.</p></div></section>
${ctaContact()}`, () => [crumbLd([['Our Work', 'work/']])]);

WKEYS.forEach((k, i) => {
  const w = WORK[k], nxt = WORK[WKEYS[(i + 1) % WKEYS.length]], nk = WKEYS[(i + 1) % WKEYS.length], svc = SERVICES[w.svc];
  add(`work/${k}/`, w.title, w.desc, () => `
${heroBlock({ trail: [['Our Work', 'work/'], [w.name]], kicker: w.cat, h1: `${w.name}: website for ${w.client}`, lead: w.sum, btns: btn('Start a project', 'contact/') + btn(svc.name, 'services/' + w.svc + '/', 'ghost') })}
<section class="sec"><div class="wrap"><div class="grid g2"><div class="card rv"><span class="eyebrow">The goal</span><p style="color:var(--ink);font-size:1.1rem">${w.sum}</p></div><div class="card rv"><span class="eyebrow">What we built</span><p>[Pages, features, and the visual or mobile approach.]</p></div></div></div></section>
<section class="sec soft"><div class="wrap">${head('Technology', 'Technology')}<div class="chips rv">${['Next.js', 'React', 'TypeScript', 'PostgreSQL'].map(c => `<span class="chip">${c}</span>`).join('')}</div><p class="note">[As applicable to this project.]</p></div></section>
<section class="sec"><div class="wrap"><div class="grid g2"><div class="card rv"><span class="eyebrow">Outcome</span><p>[Add real results, such as enquiries or launch date, only if known.]</p></div><div class="shot rv">Live site link and screenshots<br>[add]</div></div></div></section>
<section class="sec tight soft"><div class="wrap"><div class="pager"><a class="card hov" style="flex:1;min-width:240px" href="${L('services/' + w.svc + '/')}"><span class="tag">Matching service</span><h3>${svc.name}</h3></a><a class="card hov" style="flex:1;min-width:240px" href="${L('work/' + nk + '/')}"><span class="tag">Next project</span><h3>${nxt.name}</h3></a></div></div></section>
${ctaContact()}`, () => [crumbLd([['Our Work', 'work/'], [w.name, `work/${k}/`]])]);
});

// Blog
const BLOG = [['Print shops', 'Xerox Buddy', 'products/xerox-buddy/', ['How stationery shops can handle rush hour without hiring more staff', 'How to let customers print from a QR code', 'Self-service printing for xerox shops: a simple guide']], ['Restaurants', 'Vantadot', 'products/vantadot/', ['How QR code table ordering works', 'Takeaway ordering without a separate app', 'What a kitchen display screen does for your chefs']], ['Salons', 'Salony', 'products/salony/', ['How online booking helps salons and barbershops', 'Running a salon appointment book without phone calls']], ['Digital cards', 'Nectcard', 'products/nectcard/', ['NFC business card vs paper visiting card', 'How to share your digital visiting card on WhatsApp', 'NFC vs QR for business cards']], ['Print', 'Priinteve Printing', 'products/priinteve-printing/', ['How to prepare a design for printing', 'Ordering printed material in bulk for a small business']], ['Web', 'Services and Our Work', 'services/', ["What a manufacturer's website needs to win trade buyers", 'Mobile-first e-commerce basics for Indian brands', 'Why your business needs a fast website']]];
add('blog/', 'Blog | Priinteve Innovations', 'Guides on self-service printing, QR ordering, salon booking, digital business cards and websites for Indian businesses.', () => `
${heroBlock({ trail: [['Blog']], h1: 'Blog', lead: 'Each article is 800 to 1,200 words, answers one question, and links to the matching product or service page.', btns: btn('Explore products', 'products/') })}
<section class="sec"><div class="wrap"><div class="grid g3">${BLOG.map(([c, l, u, a]) => `<div class="card rv"><span class="tag">${c}</span><ul class="checks">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul><a class="more" href="${L(u)}">${l}</a></div>`).join('')}</div></div></section>`, () => [crumbLd([['Blog', 'blog/']])]);

// FAQ
const GFAQ = [['What does Priinteve Innovations do?', 'We are an India-based product company. We make Xerox Buddy, Vantadot, Salony, Nectcard and Priinteve Printing, and we build websites and software for clients.'], ['Do my customers need to download an app?', 'No. Xerox Buddy, Vantadot, Salony and Nectcard all open in the phone browser after a scan or tap.'], ['Which product is right for me?', 'Print or stationery shop: Xerox Buddy. Restaurant: Vantadot. Salon, barbershop or spa: Salony. Business card: Nectcard. Bulk branded print: Priinteve Printing.'], ['Do you build websites for other businesses?', 'Yes. We design and develop websites, e-commerce stores and custom web applications.'], ['Can I pay in rupees?', 'Yes. Payments run through Razorpay.'], ['How do I get started?', 'Call +91 96620 70751 or write to contact@priinteve.com.']];
add('faq/', 'FAQ | Priinteve Innovations Products and Services', 'Answers about Priinteve Innovations: our products, how scan and tap works, pricing, support and website development services.', () => `
${heroBlock({ trail: [['FAQ']], h1: 'Frequently asked questions', lead: 'Answers about our products, how scan and tap works, and our website development services.', btns: btn('Get in touch', 'contact/') })}
<section class="sec"><div class="wrap">${faqBlock(GFAQ)}<p class="note">[Add pricing and support-hours answers once confirmed.]</p></div></section>${ctaContact()}`, () => [faqLd(GFAQ), crumbLd([['FAQ', 'faq/']])]);

// Contact
add('contact/', 'Contact Priinteve Innovations | Call or Send an Enquiry', 'Tell us what you want to print, build or launch. Call +91 96620 70751 or write to contact@priinteve.com and we will take it from there.', () => `
${heroBlock({ trail: [['Contact']], h1: 'Contact Priinteve Innovations', lead: "Tell us what you want to print, build or launch, and we'll take it from there.", btns: '' })}
<section class="sec"><div class="wrap"><div class="split"><div class="contact-list rv">
<a href="tel:+919662070751"><span class="ico">📞</span><span><small>Phone</small><b>${PHONE}</b></span></a>
<a href="mailto:${EMAIL}"><span class="ico">✉️</span><span><small>Email</small><b>${EMAIL}</b></span></a>
<a href="https://priinteve.com"><span class="ico">🌐</span><span><small>Website</small><b>priinteve.com</b></span></a>
<a href="https://cards.priinteve.com"><span class="ico">📇</span><span><small>Digital cards</small><b>cards.priinteve.com</b></span></a>
<p style="margin-top:10px">${t('We read every enquiry, reply within [add your promised time], and suggest the right next step, whether that is a demo, a quote or a call.')}</p></div>
<div class="formcard rv">${enquiryForm()}</div></div></div></section>`, () => [crumbLd([['Contact', 'contact/']])]);

// Legal
for (const [u, n] of [['privacy-policy/', 'Privacy Policy'], ['terms/', 'Terms']]) add(u, `${n} | Priinteve Innovations`, `${n} for Priinteve Innovations.`, () => `
${heroBlock({ trail: [[n]], h1: n, lead: 'Priinteve Innovations (India)', btns: '' })}<section class="sec"><div class="wrap legal"><p class="note">[${n} text to be supplied. The plan lists this page for trust and payment-gateway requirements but gives no copy.]</p></div></section>`, () => [crumbLd([[n, u]])]);

// ---------------------------------------------------------------- build
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });
for (const p of pages) {
  depth = p.url ? p.url.split('/').filter(Boolean).length : 0;
  cur = '/' + p.url;
  const html = shell({ title: p.title, desc: p.desc, body: p.bodyFn(), ld: p.ld() });
  const f = path.join(OUT, p.url, 'index.html');
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}
fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://priinteve.com/sitemap.xml\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p => `<url><loc>https://priinteve.com/${p.url}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${pages.length} pages -> ${OUT}/`);
