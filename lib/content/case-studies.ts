import type { CaseStudy } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const caseStudies: CaseStudy[] = [
  {
    slug: "meropasal-retail-pos",
    title: "Unifying 40 supermarkets on one retail platform",
    client: "MeroPasal Retail Group",
    industry: "Retail & Ecommerce",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    image: "/images/case-studies/meropasal.svg",
    summary: "A multi-branch POS, inventory, and accounting platform that replaced six disconnected legacy tools.",
    metaDescription:
      "How Famezop Technologies unified 40 supermarket branches on one POS, inventory, and accounting platform — cutting stockouts 63% and month-end close time 80%.",
    problem:
      "MeroPasal ran 40 supermarket branches on a patchwork of spreadsheets and a decade-old POS system with no central inventory visibility, causing chronic stockouts and reconciliation errors.",
    solution:
      "We built a unified multi-branch retail platform — POS, purchasing, inventory, CRM, and double-entry accounting — with real-time sync across branches and role-based dashboards for owners and managers.",
    timeline: "5 months, from discovery to nationwide rollout",
    results: [
      { label: "Stockout incidents", value: "-63%" },
      { label: "Month-end close time", value: "-80%" },
      { label: "Branches onboarded", value: "40" },
    ],
    testimonial: {
      quote: "We finally have one number for inventory across every branch. Reconciliation went from a week to an afternoon.",
      author: "Suresh Shrestha",
      role: "COO, MeroPasal Retail Group",
    },
    featured: true,
    publishedAt: "2026-02-10",
  },
  {
    slug: "carecloud-hospital-management",
    title: "Cutting patient wait times with a unified hospital OS",
    client: "CareCloud Hospitals",
    industry: "Healthcare",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    image: "/images/case-studies/carecloud.svg",
    summary: "A hospital management system spanning OPD, IPD, billing, and pharmacy across three facilities.",
    metaDescription:
      "How Famezop Technologies built a unified hospital OS spanning OPD, IPD, billing, and pharmacy across three facilities — cutting patient wait times 41%.",
    problem:
      "Patient records lived in three separate systems across CareCloud's facilities, forcing front-desk staff to re-enter data and delaying care coordination between departments.",
    solution:
      "We delivered a single hospital management platform covering OPD/IPD workflows, pharmacy, lab integration, and billing, with a unified patient record accessible across all three facilities.",
    timeline: "7 months, phased rollout by department",
    results: [
      { label: "Average patient wait time", value: "-41%" },
      { label: "Billing errors", value: "-72%" },
      { label: "Facilities unified", value: "3" },
    ],
    testimonial: {
      quote: "Our front desk isn't fighting three systems anymore. That alone changed how our staff feel about their day.",
      author: "Dr. Anjali Rao",
      role: "Medical Director, CareCloud Hospitals",
    },
    featured: true,
    publishedAt: "2025-11-18",
  },
  {
    slug: "zaptrail-logistics-platform",
    title: "Real-time fleet visibility for a 200-truck logistics fleet",
    client: "ZapTrail Logistics",
    industry: "Logistics",
    tech: ["React Native", "Go", "PostGIS", "GCP"],
    image: "/images/case-studies/zaptrail.svg",
    summary: "A route optimization and real-time tracking platform built for a fast-growing regional logistics fleet.",
    metaDescription:
      "How Famezop Technologies gave a 200-truck logistics fleet real-time GPS tracking and route optimization — lifting on-time delivery 34% and fleet use 19%.",
    problem:
      "ZapTrail's dispatchers were manually assigning routes over phone calls, with no live visibility into truck location, leading to missed delivery windows and idle capacity.",
    solution:
      "We built a dispatcher console with live GPS tracking, automated route optimization, and a driver mobile app for proof-of-delivery capture — all synced in real time.",
    timeline: "4 months to production launch",
    results: [
      { label: "On-time delivery rate", value: "+34%" },
      { label: "Dispatcher hours saved / week", value: "26" },
      { label: "Fleet utilization", value: "+19%" },
    ],
    featured: true,
    publishedAt: "2025-09-02",
  },
  {
    slug: "eduneta-school-management",
    title: "Digitizing admissions and attendance for a 12-school network",
    client: "EduNeta School Network",
    industry: "Education",
    tech: ["Next.js", "Django", "PostgreSQL"],
    image: "/images/case-studies/eduneta.svg",
    summary: "A campus management platform covering admissions, attendance, grading, and parent communication.",
    metaDescription:
      "How Famezop Technologies digitized admissions, attendance, and grading for a 12-school network — cutting admissions processing time 55% with 89% parent adoption.",
    problem:
      "Each of EduNeta's 12 schools tracked admissions and attendance on paper, with no consolidated reporting for the network's central administration.",
    solution:
      "We delivered a campus management platform with digital admissions, biometric attendance integration, gradebook tools, and a parent-facing portal — rolled out across all 12 campuses.",
    timeline: "6 months, phased by campus",
    results: [
      { label: "Admissions processing time", value: "-55%" },
      { label: "Parent portal adoption", value: "89%" },
      { label: "Campuses live", value: "12" },
    ],
    featured: false,
    publishedAt: "2025-07-22",
  },
  {
    slug: "finlynk-lending-platform",
    title: "Launching a compliant digital lending product in 90 days",
    client: "FinLynk",
    industry: "Banking & Finance",
    tech: ["Next.js", "NestJS", "PostgreSQL", "AWS"],
    image: "/images/case-studies/finlynk.svg",
    summary: "A digital lending platform with automated credit scoring and regulatory-compliant workflows.",
    metaDescription:
      "How Famezop Technologies launched a compliant digital lending platform with automated credit scoring in 90 days, from MVP to regulatory approval.",
    problem:
      "FinLynk needed to launch a digital lending product ahead of a competitive window, but lacked the in-house engineering capacity to build compliant credit workflows fast enough.",
    solution:
      "Our dedicated team built the lending platform end-to-end — application intake, automated credit scoring, document verification, and disbursement workflows — compliant with local lending regulations from day one.",
    timeline: "90 days, MVP to regulatory approval",
    results: [
      { label: "Time to launch", value: "90 days" },
      { label: "Loan approval turnaround", value: "-68%" },
      { label: "Manual review rate", value: "12%" },
    ],
    testimonial: {
      quote: "They understood regulatory constraints as well as our compliance team did. That's rare in a dev partner.",
      author: "Priya Nair",
      role: "Head of Product, FinLynk",
    },
    featured: false,
    publishedAt: "2025-05-14",
  },
  {
    slug: "haven-ngo-impact-platform",
    title: "Giving a 15-country NGO one view of program impact",
    client: "Haven Relief Network",
    industry: "NGO",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    image: "/images/case-studies/haven.svg",
    summary: "A donor and program management platform consolidating impact data across 15 country offices.",
    metaDescription:
      "How Famezop Technologies gave a 15-country NGO network one donor CRM and impact-reporting platform — cutting donor report turnaround by 75%.",
    problem:
      "Haven's country offices reported program outcomes in disconnected spreadsheets, making it nearly impossible for headquarters to produce timely donor impact reports.",
    solution:
      "We built a unified donor CRM and program management platform with standardized impact metrics, real-time dashboards, and automated donor reporting exports.",
    timeline: "5 months, rolled out region by region",
    results: [
      { label: "Donor report turnaround", value: "-75%" },
      { label: "Country offices onboarded", value: "15" },
      { label: "Data entry hours saved / month", value: "180" },
    ],
    featured: false,
    publishedAt: "2025-03-30",
  },
];

export function getAllCaseStudies() {
  return [...caseStudies].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((c) => c.featured);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

const CASE_STUDY_PROJECTION = `{
  "slug": slug.current, title, client, "industry": industry->title, tech, "image": image.asset->url,
  summary, problem, solution, timeline, results, testimonial, featured, publishedAt,
  "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription
}`;

export async function fetchCaseStudies() {
  return sanityFetch<CaseStudy[]>({
    query: `*[_type == "caseStudy"] | order(publishedAt desc) ${CASE_STUDY_PROJECTION}`,
    fallback: getAllCaseStudies(),
    tags: ["caseStudy"],
  });
}

export async function fetchFeaturedCaseStudies() {
  return sanityFetch<CaseStudy[]>({
    query: `*[_type == "caseStudy" && featured == true] | order(publishedAt desc) ${CASE_STUDY_PROJECTION}`,
    fallback: getFeaturedCaseStudies(),
    tags: ["caseStudy"],
  });
}

export async function fetchCaseStudyBySlug(slug: string) {
  return sanityFetch<CaseStudy | null>({
    query: `*[_type == "caseStudy" && slug.current == $slug][0] ${CASE_STUDY_PROJECTION}`,
    params: { slug },
    fallback: getCaseStudyBySlug(slug) || null,
    tags: [`caseStudy:${slug}`],
  });
}
