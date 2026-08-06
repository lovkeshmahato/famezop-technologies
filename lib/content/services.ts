import type { Service } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

const process5 = [
  { step: "Discovery", description: "We map your workflows, constraints, and success metrics before writing a line of code." },
  { step: "Architecture", description: "System design, data modeling, and technology selection reviewed with your stakeholders." },
  { step: "Build", description: "Agile sprints with weekly demos, a dedicated architect, and continuous integration from day one." },
  { step: "Quality & Launch", description: "Automated + manual QA, security review, staged rollout, and production launch support." },
  { step: "Support", description: "SLA-backed monitoring, iteration, and a direct line to the team that built it." },
];

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Software Engineering",
    icon: "code",
    summary:
      "Purpose-built ERP, CRM, HRMS, POS, and vertical systems for hospitals, hotels, restaurants, schools, NGOs, and government — designed around how your teams actually work.",
    problem:
      "Off-the-shelf software forces your operations to bend around someone else's workflow, creating manual workarounds and data silos that compound as you scale.",
    included: [
      "ERP, CRM, and HRMS platforms tailored to your org structure",
      "POS and inventory systems for retail, hospitality, and F&B",
      "Vertical solutions for hospitals, hotels, restaurants, schools, NGOs, and government",
      "Legacy system modernization and data migration",
      "Role-based access, audit trails, and compliance-ready reporting",
    ],
    process: process5,
    metaTitle: "Custom Software Development Services | Famezop Technologies",
    metaDescription:
      "We build bespoke ERP, CRM, HRMS, POS, and industry-specific software for hospitals, hotels, restaurants, schools, NGOs, and government agencies across Nepal, India, and the UAE.",
    order: 1,
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    category: "Software Engineering",
    icon: "layers",
    summary:
      "Multi-tenant SaaS products engineered for scale from the first customer — subscription billing, usage metering, and infrastructure that grows with you.",
    problem:
      "Most SaaS MVPs are rebuilt within 18 months because early architecture choices around tenancy, billing, and scaling weren't made with growth in mind.",
    included: [
      "Multi-tenant architecture with data isolation strategy",
      "Subscription billing, metering, and plan management",
      "Onboarding flows, admin consoles, and usage analytics",
      "Horizontal scaling and multi-region deployment readiness",
      "API-first design for partner and integration ecosystems",
    ],
    process: process5,
    metaTitle: "SaaS Product Development Company | Famezop Technologies",
    metaDescription:
      "End-to-end SaaS development — multi-tenant architecture, subscription billing, and scalable infrastructure built to support your product from launch to Series B.",
    order: 2,
  },
  {
    slug: "ai-development",
    title: "AI Development",
    category: "AI & Data",
    icon: "sparkles",
    summary:
      "AI agents, chatbots, and copilots built on Claude, GPT, and Gemini — plus automation pipelines that remove manual work from your operations.",
    problem:
      "Generic AI tools don't understand your data, workflows, or edge cases — teams end up with demos that never make it past a pilot.",
    included: [
      "Custom AI agents and copilots grounded in your data",
      "Chatbot and support automation with human handoff",
      "GPT / Claude / Gemini integration into existing products",
      "Workflow automation and document/data extraction pipelines",
      "RAG systems, vector search, and evaluation frameworks",
    ],
    process: process5,
    metaTitle: "AI Development & Integration Services | Famezop Technologies",
    metaDescription:
      "We design and ship AI agents, chatbots, and Claude/GPT/Gemini-powered copilots that automate real workflows — not just demos.",
    order: 3,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Software Engineering",
    icon: "smartphone",
    summary:
      "Native iOS/Android and cross-platform apps with the performance and polish users expect, backed by production-grade CI/CD.",
    problem:
      "Cross-platform apps often ship with jank, delayed releases, and inconsistent UX across devices when the underlying architecture is an afterthought.",
    included: [
      "Native iOS (Swift) and Android (Kotlin) development",
      "Cross-platform delivery with React Native / Flutter",
      "Offline-first sync and push notification infrastructure",
      "App Store / Play Store release management",
      "Performance profiling and crash-free-session targets",
    ],
    process: process5,
    metaTitle: "Mobile App Development Company | Famezop Technologies",
    metaDescription:
      "Native and cross-platform mobile app development with production-grade CI/CD, offline sync, and App Store / Play Store release management.",
    order: 4,
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "Software Engineering",
    icon: "globe",
    summary:
      "Fast, accessible, SEO-strong web applications and marketing sites built on modern frameworks with Core Web Vitals baked in.",
    problem:
      "Slow, poorly structured web apps lose customers and search ranking before a single feature gets evaluated.",
    included: [
      "Marketing sites, web apps, and internal tools",
      "Next.js / React architecture with server-side rendering",
      "Core Web Vitals optimization and technical SEO",
      "Design system implementation and component libraries",
      "Headless CMS integration for editorial teams",
    ],
    process: process5,
    metaTitle: "Web Development Services | Famezop Technologies",
    metaDescription:
      "Modern, high-performance web development — Next.js architecture, technical SEO, and design systems built for speed and scale.",
    order: 5,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Design",
    icon: "pen-tool",
    summary:
      "Research-driven product design that turns complex workflows into interfaces people actually enjoy using.",
    problem:
      "Feature-complete products still fail in the market when the interface doesn't match how users think and work.",
    included: [
      "User research, journey mapping, and usability testing",
      "Wireframing, prototyping, and interaction design",
      "Design systems built for engineering handoff",
      "Accessibility audits (WCAG 2.1 AA)",
      "Brand-aligned visual design for web and mobile",
    ],
    process: process5,
    metaTitle: "UI/UX Design Services | Famezop Technologies",
    metaDescription:
      "Research-driven UI/UX design — from user research and prototyping to accessible, engineering-ready design systems.",
    order: 6,
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    category: "Software Engineering",
    icon: "shopping-cart",
    summary:
      "Headless and platform-based storefronts engineered for conversion, built to handle peak traffic without breaking checkout.",
    problem:
      "Generic storefront templates cap how fast you can iterate on merchandising, promotions, and checkout experience.",
    included: [
      "Headless commerce (Shopify Plus, Medusa, custom)",
      "Payment gateway and logistics integration",
      "Inventory, catalog, and promotions engines",
      "Checkout optimization and conversion rate testing",
      "Marketplace and multi-vendor architecture",
    ],
    process: process5,
    metaTitle: "Ecommerce Development Company | Famezop Technologies",
    metaDescription:
      "Headless and platform ecommerce development built for conversion — payments, catalog, checkout, and peak-traffic reliability.",
    order: 7,
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    category: "Enterprise",
    icon: "building-2",
    summary:
      "Large-scale systems integration and platform modernization for organizations where reliability and compliance aren't optional.",
    problem:
      "Enterprise environments carry decades of legacy systems, compliance requirements, and integration debt that most vendors aren't equipped to navigate.",
    included: [
      "Systems integration across legacy and modern platforms",
      "Enterprise architecture and technical due diligence",
      "Compliance-aware engineering (SOC 2, ISO 27001 alignment)",
      "Change management and phased migration planning",
      "Long-term managed engineering teams",
    ],
    process: process5,
    metaTitle: "Enterprise Software Solutions | Famezop Technologies",
    metaDescription:
      "Enterprise-grade systems integration, platform modernization, and compliance-aware engineering for complex organizations.",
    order: 8,
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    category: "Cloud & Infrastructure",
    icon: "cloud",
    summary:
      "Cloud architecture, migration, and cost optimization across AWS, Azure, and GCP — built for reliability, not just uptime dashboards.",
    problem:
      "Unmanaged cloud spend and ad-hoc infrastructure decisions quietly erode margins while reliability stays fragile.",
    included: [
      "Cloud architecture and migration (AWS / Azure / GCP)",
      "Infrastructure as Code (Terraform)",
      "Cost optimization and FinOps practices",
      "Observability, alerting, and incident response setup",
      "Disaster recovery and multi-region resilience",
    ],
    process: process5,
    metaTitle: "Cloud Architecture & Migration Services | Famezop Technologies",
    metaDescription:
      "Cloud architecture, migration, and cost optimization across AWS, Azure, and GCP with infrastructure-as-code and disaster recovery built in.",
    order: 9,
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "Security",
    icon: "shield",
    summary:
      "Security built into the development lifecycle — threat modeling, penetration testing, and compliance readiness, not a bolt-on audit.",
    problem:
      "Security treated as a final checklist item leaves vulnerabilities baked into architecture that's expensive to fix post-launch.",
    included: [
      "Threat modeling and secure architecture review",
      "Application penetration testing",
      "Compliance readiness (SOC 2, ISO 27001, GDPR)",
      "Identity, access management, and encryption strategy",
      "Incident response planning",
    ],
    process: process5,
    metaTitle: "Cybersecurity & Application Security Services | Famezop Technologies",
    metaDescription:
      "Threat modeling, penetration testing, and compliance-ready security engineering built into your development lifecycle.",
    order: 10,
  },
  {
    slug: "qa-testing",
    title: "QA & Testing",
    category: "Quality",
    icon: "check-circle",
    summary:
      "Automated and manual QA that catches regressions before your customers do — integrated into every sprint, not bolted on at the end.",
    problem:
      "Testing squeezed into the final week of a release cycle produces shallow coverage and late-stage surprises.",
    included: [
      "Test strategy and automation framework setup",
      "Unit, integration, and end-to-end test suites",
      "Performance and load testing",
      "Manual exploratory and regression testing",
      "CI/CD-integrated quality gates",
    ],
    process: process5,
    metaTitle: "QA & Software Testing Services | Famezop Technologies",
    metaDescription:
      "Automated and manual QA integrated into every sprint — test strategy, automation frameworks, and CI/CD-integrated quality gates.",
    order: 11,
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    category: "Enterprise",
    icon: "refresh-cw",
    summary:
      "Process digitization and change management that moves organizations off spreadsheets and paper without disrupting operations.",
    problem:
      "Digital transformation initiatives stall when technology rollouts outpace the change management needed to adopt them.",
    included: [
      "Process audit and digitization roadmap",
      "Legacy-to-modern platform migration",
      "Workforce enablement and training programs",
      "Data consolidation and reporting infrastructure",
      "Phased rollout with measurable adoption metrics",
    ],
    process: process5,
    metaTitle: "Digital Transformation Consulting | Famezop Technologies",
    metaDescription:
      "Process digitization, legacy modernization, and change management that drives real technology adoption, not just deployment.",
    order: 12,
  },
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    category: "AI & Data",
    icon: "link-2",
    summary:
      "Smart contracts, tokenization, and distributed ledger systems engineered with the same rigor as mission-critical financial software.",
    problem:
      "Blockchain projects often skip the security review depth that traditional fintech requires, leading to exploitable smart contracts.",
    included: [
      "Smart contract development and audits",
      "Tokenization and digital asset infrastructure",
      "Private/permissioned ledger systems for enterprise",
      "Wallet and custody integrations",
      "Regulatory-aware architecture",
    ],
    process: process5,
    metaTitle: "Blockchain Development Services | Famezop Technologies",
    metaDescription:
      "Smart contract development, tokenization, and distributed ledger systems engineered with fintech-grade security review.",
    order: 13,
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    category: "AI & Data",
    icon: "database",
    summary:
      "Pipelines, warehouses, and analytics infrastructure that turn scattered data into decisions your teams can act on.",
    problem:
      "Data scattered across disconnected tools makes reporting a manual, error-prone monthly ritual instead of a real-time capability.",
    included: [
      "ETL/ELT pipeline design and orchestration",
      "Data warehouse and lakehouse architecture",
      "Real-time analytics and dashboarding",
      "Data quality, governance, and lineage tooling",
      "ML-ready feature pipelines",
    ],
    process: process5,
    metaTitle: "Data Engineering Services | Famezop Technologies",
    metaDescription:
      "ETL pipelines, data warehousing, and analytics infrastructure that turn scattered data into real-time decisions.",
    order: 14,
  },
  {
    slug: "dedicated-development-teams",
    title: "Dedicated Development Teams",
    category: "Engagement Models",
    icon: "users",
    summary:
      "Vetted engineers embedded in your workflow, working your hours, reporting to your priorities — without the hiring overhead.",
    problem:
      "Scaling an in-house team is slow and expensive; contract-to-contract freelancers don't carry institutional context forward.",
    included: [
      "Full-time dedicated engineers, designers, and QA",
      "Direct integration with your tools and standups",
      "Flexible scaling up or down month to month",
      "Transparent time tracking and reporting",
      "Long-term team continuity, not rotating contractors",
    ],
    process: process5,
    metaTitle: "Dedicated Development Teams | Famezop Technologies",
    metaDescription:
      "Vetted, dedicated engineers embedded in your workflow — flexible scaling, transparent reporting, long-term team continuity.",
    order: 15,
  },
  {
    slug: "startup-mvp-development",
    title: "Startup MVP Development",
    category: "Engagement Models",
    icon: "rocket",
    summary:
      "Scoped, fast MVP builds that validate your core hypothesis without over-engineering for scale you don't have yet.",
    problem:
      "Early-stage teams either over-build for imaginary scale or under-invest in architecture that can't survive first traction.",
    included: [
      "Rapid scoping and technical feasibility review",
      "Lean, production-grade MVP architecture",
      "Investor-ready product demos",
      "Post-launch iteration support",
      "Clear path from MVP to scaled product",
    ],
    process: process5,
    metaTitle: "Startup MVP Development | Famezop Technologies",
    metaDescription:
      "Fast, production-grade MVP development for startups — scoped to validate your hypothesis without over-engineering.",
    order: 16,
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    category: "Engagement Models",
    icon: "puzzle",
    summary:
      "Full-lifecycle product partnership — from roadmap and architecture through ongoing iteration, as an extension of your team.",
    problem:
      "Growing products need continuous engineering investment, not a one-off project delivered and handed over.",
    included: [
      "Product roadmap and technical strategy partnership",
      "Continuous delivery and iteration cycles",
      "Architecture evolution as scale demands change",
      "Embedded product, design, and engineering pods",
      "Metrics-driven prioritization",
    ],
    process: process5,
    metaTitle: "Product Engineering Partnership | Famezop Technologies",
    metaDescription:
      "Full-lifecycle product engineering partnership — roadmap, architecture, and continuous iteration as an extension of your team.",
    order: 17,
  },
];

export function getAllServices() {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceCategories() {
  return Array.from(new Set(services.map((service) => service.category)));
}

const SERVICE_PROJECTION = `{
  "slug": slug.current, title, category, icon, summary, problem, included, process, order,
  "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription
}`;

export async function fetchServices() {
  return sanityFetch<Service[]>({
    query: `*[_type == "service"] | order(order asc) ${SERVICE_PROJECTION}`,
    fallback: getAllServices(),
    tags: ["service"],
  });
}

export async function fetchServiceBySlug(slug: string) {
  return sanityFetch<Service | null>({
    query: `*[_type == "service" && slug.current == $slug][0] ${SERVICE_PROJECTION}`,
    params: { slug },
    fallback: getServiceBySlug(slug) || null,
    tags: [`service:${slug}`],
  });
}
