import type { Industry } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: "heart-pulse",
    summary: "HIPAA-aware platforms for hospitals, clinics, and telehealth providers.",
    challenges: ["Fragmented patient records", "Compliance overhead", "Scheduling and staffing inefficiency"],
    solutions: ["Hospital & clinic management systems", "Telehealth platforms", "EHR integration"],
    metaTitle: "Healthcare Software Development | Famezop Technologies",
    metaDescription: "Custom healthcare software — hospital management, telehealth, and EHR-integrated platforms built for compliance and scale.",
  },
  {
    slug: "education",
    title: "Education",
    icon: "graduation-cap",
    summary: "School and campus management systems that reduce administrative load.",
    challenges: ["Manual attendance and grading", "Disconnected parent communication", "Fee and admissions tracking"],
    solutions: ["School/campus management platforms", "Learning management systems", "Parent-teacher portals"],
    metaTitle: "Education Software Development | Famezop Technologies",
    metaDescription: "School and campus management software — admissions, attendance, grading, and parent communication in one platform.",
  },
  {
    slug: "banking-finance",
    title: "Banking & Finance",
    icon: "landmark",
    summary: "Secure, compliant fintech platforms for banks, NBFCs, and lending products.",
    challenges: ["Regulatory compliance", "Legacy core banking systems", "Fraud and risk management"],
    solutions: ["Core banking integrations", "Lending & credit scoring platforms", "Fraud detection systems"],
    metaTitle: "Fintech & Banking Software Development | Famezop Technologies",
    metaDescription: "Secure, compliant banking and fintech software — core banking integration, lending platforms, and fraud detection.",
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & Ecommerce",
    icon: "shopping-bag",
    summary: "POS, inventory, and storefront systems built for peak-season reliability.",
    challenges: ["Multi-channel inventory sync", "Checkout drop-off", "Peak traffic reliability"],
    solutions: ["POS & inventory platforms", "Headless commerce storefronts", "Loyalty & CRM systems"],
    metaTitle: "Retail & Ecommerce Software Development | Famezop Technologies",
    metaDescription: "POS, inventory, and ecommerce platforms built for multi-channel retail and peak-traffic reliability.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: "factory",
    summary: "Production, inventory, and supply chain visibility for manufacturers.",
    challenges: ["Production floor visibility", "Supply chain disruption", "Quality control tracking"],
    solutions: ["MES & production tracking", "Supply chain platforms", "IoT-connected quality systems"],
    metaTitle: "Manufacturing Software Solutions | Famezop Technologies",
    metaDescription: "Production tracking, supply chain, and quality control software for manufacturers.",
  },
  {
    slug: "construction",
    title: "Construction",
    icon: "hard-hat",
    summary: "Project, resource, and site management platforms for construction firms.",
    challenges: ["Multi-site coordination", "Budget overruns", "Compliance documentation"],
    solutions: ["Project management platforms", "Resource & equipment tracking", "Site inspection apps"],
    metaTitle: "Construction Management Software | Famezop Technologies",
    metaDescription: "Project, resource, and site management software built for construction firms.",
  },
  {
    slug: "logistics",
    title: "Logistics",
    icon: "truck",
    summary: "Fleet, route, and warehouse management systems for logistics operators.",
    challenges: ["Route inefficiency", "Real-time shipment visibility", "Warehouse coordination"],
    solutions: ["Fleet & route optimization", "Warehouse management systems", "Real-time tracking platforms"],
    metaTitle: "Logistics Software Development | Famezop Technologies",
    metaDescription: "Fleet, route, and warehouse management software for logistics and supply chain operators.",
  },
  {
    slug: "government",
    title: "Government",
    icon: "landmark",
    summary: "Citizen service and internal governance platforms built for public accountability.",
    challenges: ["Legacy public systems", "Citizen service delays", "Data transparency requirements"],
    solutions: ["Citizen service portals", "Internal governance systems", "Public data platforms"],
    metaTitle: "Government Software Solutions | Famezop Technologies",
    metaDescription: "Citizen service and governance platforms built for accountability and public sector requirements.",
  },
  {
    slug: "ngo",
    title: "NGO",
    icon: "hand-heart",
    summary: "Donor, program, and impact management systems for nonprofits.",
    challenges: ["Donor and grant tracking", "Program impact reporting", "Limited technical budget"],
    solutions: ["Donor & CRM platforms", "Program management systems", "Impact reporting dashboards"],
    metaTitle: "NGO & Nonprofit Software Development | Famezop Technologies",
    metaDescription: "Donor management, program tracking, and impact reporting software built for nonprofit budgets and needs.",
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality & Tourism",
    icon: "hotel",
    summary: "Booking, property, and guest experience platforms for hotels and tour operators.",
    challenges: ["Booking channel fragmentation", "Guest experience consistency", "Seasonal demand planning"],
    solutions: ["Property management systems", "Booking & channel manager integration", "Guest experience apps"],
    metaTitle: "Hospitality & Tourism Software | Famezop Technologies",
    metaDescription: "Booking, property management, and guest experience software for hotels and tour operators.",
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: "building",
    summary: "Listing, CRM, and transaction management platforms for real estate firms.",
    challenges: ["Listing data fragmentation", "Lead-to-close tracking", "Document-heavy transactions"],
    solutions: ["Listing & CRM platforms", "Transaction management systems", "Virtual tour integrations"],
    metaTitle: "Real Estate Software Development | Famezop Technologies",
    metaDescription: "Listing, CRM, and transaction management software for real estate firms and property managers.",
  },
  {
    slug: "automotive",
    title: "Automotive",
    icon: "car",
    summary: "Dealership, service, and fleet platforms for automotive businesses.",
    challenges: ["Service scheduling inefficiency", "Parts inventory tracking", "Dealer-fleet coordination"],
    solutions: ["Dealer management systems", "Service scheduling platforms", "Fleet tracking software"],
    metaTitle: "Automotive Software Solutions | Famezop Technologies",
    metaDescription: "Dealership, service scheduling, and fleet management software for automotive businesses.",
  },
  {
    slug: "telecom",
    title: "Telecom",
    icon: "radio-tower",
    summary: "Billing, provisioning, and customer platforms for telecom operators.",
    challenges: ["Complex billing structures", "Network provisioning speed", "Customer churn"],
    solutions: ["Billing & OSS/BSS platforms", "Self-service customer portals", "Provisioning automation"],
    metaTitle: "Telecom Software Development | Famezop Technologies",
    metaDescription: "Billing, provisioning, and customer platforms built for telecom operators.",
  },
  {
    slug: "insurance",
    title: "Insurance",
    icon: "shield-check",
    summary: "Policy, claims, and underwriting platforms for insurers and brokers.",
    challenges: ["Manual claims processing", "Underwriting turnaround time", "Legacy policy systems"],
    solutions: ["Claims management platforms", "Underwriting automation", "Policy administration systems"],
    metaTitle: "Insurance Software Development | Famezop Technologies",
    metaDescription: "Policy administration, claims, and underwriting automation software for insurers and brokers.",
  },
  {
    slug: "entertainment",
    title: "Entertainment",
    icon: "clapperboard",
    summary: "Streaming, ticketing, and content management platforms for media companies.",
    challenges: ["Content delivery at scale", "Ticketing and access management", "Rights and royalty tracking"],
    solutions: ["Streaming & content platforms", "Ticketing systems", "Rights management tools"],
    metaTitle: "Entertainment & Media Software | Famezop Technologies",
    metaDescription: "Streaming, ticketing, and content management platforms for entertainment and media companies.",
  },
  {
    slug: "agriculture",
    title: "Agriculture",
    icon: "sprout",
    summary: "Farm management and supply chain platforms for agribusiness.",
    challenges: ["Yield and resource tracking", "Supply chain traceability", "Market access for smallholders"],
    solutions: ["Farm management platforms", "Supply chain traceability systems", "Marketplace platforms"],
    metaTitle: "Agriculture Software Development | Famezop Technologies",
    metaDescription: "Farm management, supply chain traceability, and marketplace software for agribusiness.",
  },
];

export function getAllIndustries() {
  return industries;
}

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

const INDUSTRY_PROJECTION = `{
  "slug": slug.current, title, icon, summary, challenges, solutions,
  "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription, "lastModified": _updatedAt
}`;

export async function fetchIndustries() {
  return sanityFetch<Industry[]>({
    query: `*[_type == "industry"] | order(title asc) ${INDUSTRY_PROJECTION}`,
    fallback: getAllIndustries(),
    tags: ["industry"],
  });
}

export async function fetchIndustryBySlug(slug: string) {
  return sanityFetch<Industry | null>({
    query: `*[_type == "industry" && slug.current == $slug][0] ${INDUSTRY_PROJECTION}`,
    params: { slug },
    fallback: getIndustryBySlug(slug) || null,
    tags: [`industry:${slug}`],
  });
}
