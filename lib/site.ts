export const siteConfig = {
  name: "Famezop Technologies",
  shortName: "Famezop",
  description:
    "Famezop Technologies is a global software development company building custom software, AI solutions, SaaS products, and enterprise systems for businesses across Nepal, India, the UAE, and worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://famezoptechnologies.com",
  ogImage: "/og",
  links: {
    linkedin: "https://www.linkedin.com/company/famezop-technologies",
    twitter: "https://twitter.com/famezoptech",
    github: "https://github.com/famezop",
    instagram: "https://www.instagram.com/famezoptechnologies",
  },
  email: "hello@famezoptechnologies.com",
  phone: "+977-9701420345",
  whatsapp: "https://wa.me/9779701420345",
};

export const offices = [
  {
    country: "Nepal",
    countryCode: "NP",
    city: "Kathmandu",
    address: "Durbar Marg, Kathmandu 44600, Nepal",
    streetAddress: "Durbar Marg",
    postalCode: "44600",
    phone: "+977-9701420345",
    isHQ: true,
    coords: { top: "38%", left: "72%" },
  },
  {
    country: "India",
    countryCode: "IN",
    city: "Bengaluru",
    address: "Koramangala, Bengaluru 560034, Karnataka, India",
    streetAddress: "Koramangala",
    postalCode: "560034",
    addressRegion: "Karnataka",
    phone: "+91-9871020532",
    isHQ: false,
    coords: { top: "44%", left: "66%" },
  },
  {
    country: "UAE",
    countryCode: "AE",
    city: "Dubai",
    address: "Business Bay, Dubai, United Arab Emirates",
    streetAddress: "Business Bay",
    phone: "+971-547508409",
    isHQ: false,
    coords: { top: "40%", left: "58%" },
  },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technology" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  services: [
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "AI Development", href: "/services/ai-development" },
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
  ],
  industries: [
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Banking & Finance", href: "/industries/banking-finance" },
    { label: "Retail & Ecommerce", href: "/industries/retail-ecommerce" },
    { label: "Education", href: "/industries/education" },
    { label: "Logistics", href: "/industries/logistics" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Case Studies", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};
