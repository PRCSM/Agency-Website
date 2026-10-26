/**
 * Single place to rebrand the site. Replace the name, links and copy below
 * with your own; swap the logo in src/components/Logo.tsx.
 */
export const brand = {
  name: 'NOVA',
  legalName: 'NOVA Studio',
  email: 'hello@nova.studio',
  address: ['Studio 4, Placeholder Street,', 'Your City, Country'],
  year: new Date().getFullYear(),
  rating: { score: '5.0', reviews: 30 },
  deckUrl: '#', // TODO: link to your capabilities deck (PDF)
  privacyUrl: '#', // TODO: link to your privacy policy
  links: {
    telegram: 'https://t.me/your-handle',
    whatsapp: 'https://wa.me/0000000000',
    booking: 'https://calendly.com/your-handle',
  },
  socials: [
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}

export const copy = {
  hero: {
    lines: ['Independent design studio crafting', 'thoughtful, balanced digital', 'products for ambitious brands'],
    services: ['PRODUCT DESIGN / BRANDING / UX / UI /', 'MOTION / 3D / ILLUSTRATION / STRATEGY'],
    badge: 'SCROLL DOWN · SEE OUR WORK · ',
  },
  about: {
    heading: ['Who is', `${brand.name}?`],
    cards: [
      {
        title: 'We make brands feel effortless',
        body: 'A small senior team that treats every project as its own, pairing sharp strategy with patient craft until the details disappear.',
      },
      {
        title: 'We turn insight into interfaces',
        body: 'Research, positioning, identity, product design, build and post-launch iteration, handled as one continuous process.',
      },
      {
        title: 'One studio, many time zones',
        body: 'Strategists, designers and engineers spread across continents, working in short loops so your roadmap never waits.',
      },
    ],
  },
  create: {
    word: 'WE CREATE',
    tags: ['BOLD VISUAL SYSTEMS', 'CLEAR UX FLOWS', 'CONSISTENT UI KITS', 'NATIVE APP DESIGNS'],
  },
  designers: {
    line1: 'Every designer here',
    line2: 'was selected from',
    pre: 'over',
    post: 'candidates',
    drop: '5,000',
    more: '+25',
  },
  portfolio: {
    quote: 'Anyone can sketch a layout, but only a few can make it feel inevitable',
    caption: 'We hire for craft, taste and the rare ability to actually finish.',
    followers: 'FOLLOWED BY 120K+ CREATIVES WORLDWIDE · ',
    platforms: ['ON DRIBBBLE', 'ON INSTAGRAM', 'ON TIKTOK', 'ON BEHANCE', 'ON PINTEREST', 'ON AWWWARDS'],
  },
  startups: {
    statement: ['A safe place for founders', 'to build, launch and grow'],
    cta: ['GOT A BOLD', 'IDEA?'],
    clients: ['Northwind', 'Lumen', 'Orbitly', 'Fieldnote', 'Kitebase', 'Monarch', 'Halcyon', 'Pebble', 'Quarry', 'Tandem', 'Verdant', 'Zephyr'],
  },
  form: {
    titleA: 'Got a',
    titleB: 'great idea?',
    subtitle: 'Tell us about it.',
    interests: ['Web Development', 'App from scratch', 'UX/UI Design', 'Branding', 'Site from scratch', 'App Development', 'Maintenance'],
    budgets: ['≤ $5K', '$10K–$20K', '$30K–$40K', '$50K–$60K', '>$100K'],
  },
}

/** Fictional portfolio entries rendered as original illustrated cards. */
export const projects = [
  { title: 'Arcadia landing page', tag: 'Landing', year: '2025', hue: 152, kind: 'laptop' },
  { title: 'Moonfold NFT landing', tag: 'Web3', year: '2025', hue: 262, kind: 'space' },
  { title: 'Glacier web3 landing', tag: 'Web3', year: '2024', hue: 205, kind: 'laptop' },
  { title: 'Thinktank web platform', tag: 'Platform', year: '2024', hue: 18, kind: 'dashboard' },
  { title: 'Copperleaf shop template', tag: 'E-commerce', year: '2024', hue: 35, kind: 'shop' },
  { title: 'Vaultline web3 app', tag: 'App', year: '2023', hue: 290, kind: 'phone' },
  { title: 'Parlay branding', tag: 'Branding', year: '2023', hue: 340, kind: 'brand' },
  { title: 'Voltra application', tag: 'App', year: '2023', hue: 95, kind: 'phone' },
  { title: 'Stillwater meditation app', tag: 'App', year: '2023', hue: 185, kind: 'phone' },
]

/** Section ids in order; nav targets reference these. */
export const SECTIONS = ['hero', 'about', 'create', 'designers', 'portfolio', 'startups', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]
