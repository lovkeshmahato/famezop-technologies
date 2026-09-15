import type { Job } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Kathmandu, Nepal (Hybrid)",
    employmentType: "Full-time",
    summary: "Lead feature delivery on client platforms spanning Next.js, Node.js, and PostgreSQL.",
    metaDescription:
      "Famezop Technologies is hiring a Senior Full-Stack Engineer in Kathmandu to lead feature delivery on client platforms built with Next.js, Node.js, and PostgreSQL.",
    responsibilities: [
      "Own delivery of features end-to-end, from technical design through production launch",
      "Pair with product and design to scope realistic sprint commitments",
      "Mentor mid-level engineers through code review",
    ],
    requirements: [
      "5+ years building production web applications",
      "Strong TypeScript, React/Next.js, and relational database experience",
      "Comfortable working directly with clients on technical decisions",
    ],
    datePosted: "2026-07-15",
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    department: "AI & Data",
    location: "Bengaluru, India (Hybrid)",
    employmentType: "Full-time",
    summary: "Build production AI agents and RAG systems for enterprise clients.",
    metaDescription:
      "Famezop Technologies is hiring an AI Engineer in Bengaluru to design, build, and evaluate production AI agents and RAG pipelines for enterprise clients.",
    responsibilities: [
      "Design and evaluate agent architectures for client production systems",
      "Build RAG pipelines with strong retrieval evaluation practices",
      "Work directly with client data and compliance constraints",
    ],
    requirements: [
      "Experience shipping LLM-backed features to production, not just prototypes",
      "Strong Python fundamentals and API design experience",
      "Familiarity with evaluation frameworks for non-deterministic systems",
    ],
    datePosted: "2026-07-10",
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote (Nepal / India)",
    employmentType: "Full-time",
    summary: "Own end-to-end product design across multiple client engagements.",
    metaDescription:
      "Famezop Technologies is hiring a remote Product Designer to own end-to-end design — research, prototypes, and design systems — across client engagements.",
    responsibilities: [
      "Run discovery research and translate findings into flows and prototypes",
      "Build and maintain design systems for engineering handoff",
      "Present design rationale directly to client stakeholders",
    ],
    requirements: [
      "3+ years of product design experience with a strong systems-thinking portfolio",
      "Fluency in Figma and component-based design systems",
      "Experience designing for complex, data-dense enterprise workflows",
    ],
    datePosted: "2026-06-30",
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Cloud & Infrastructure",
    location: "Dubai, UAE (Hybrid)",
    employmentType: "Full-time",
    summary: "Own cloud infrastructure and CI/CD across client and internal platforms.",
    metaDescription:
      "Famezop Technologies is hiring a DevOps Engineer in Dubai to own Terraform-managed cloud infrastructure, CI/CD pipelines, and incident response.",
    responsibilities: [
      "Design and maintain Terraform-managed infrastructure across AWS/GCP",
      "Build and improve CI/CD pipelines for multiple client codebases",
      "Own observability, alerting, and incident response",
    ],
    requirements: [
      "4+ years of production infrastructure experience",
      "Strong Terraform and container orchestration experience",
      "On-call rotation availability",
    ],
    datePosted: "2026-06-20",
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Quality",
    location: "Kathmandu, Nepal (Hybrid)",
    employmentType: "Full-time",
    summary: "Build and maintain automated test suites across client platforms.",
    metaDescription:
      "Famezop Technologies is hiring a QA Automation Engineer in Kathmandu to build automated test frameworks and run performance testing for client launches.",
    responsibilities: [
      "Design test automation frameworks integrated into CI/CD",
      "Partner with engineers to close coverage gaps before release",
      "Run performance and load testing for high-traffic launches",
    ],
    requirements: [
      "3+ years in QA automation with strong scripting fundamentals",
      "Experience with end-to-end testing frameworks (Playwright/Cypress)",
      "Comfort reading application code to design meaningful test cases",
    ],
    datePosted: "2026-06-05",
  },
  {
    slug: "technical-project-manager",
    title: "Technical Project Manager",
    department: "Delivery",
    location: "Bengaluru, India (Hybrid)",
    employmentType: "Full-time",
    summary: "Run delivery for 2-3 concurrent client engagements end-to-end.",
    metaDescription:
      "Famezop Technologies is hiring a Technical Project Manager in Bengaluru to run delivery for concurrent client engagements from scoping to launch.",
    responsibilities: [
      "Own sprint planning, client communication, and delivery risk management",
      "Translate business requirements into scoped technical backlogs",
      "Keep engineering, design, and client stakeholders aligned weekly",
    ],
    requirements: [
      "4+ years managing software delivery for external clients",
      "Comfortable reading technical specs and challenging unrealistic scope",
      "Excellent written communication across time zones",
    ],
    datePosted: "2026-05-22",
  },
];

export function getAllJobs() {
  return [...jobs].sort(
    (a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  );
}

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export function getJobDepartments() {
  return Array.from(new Set(jobs.map((job) => job.department)));
}

const JOB_PROJECTION = `{
  "slug": slug.current, title, department, location, employmentType, summary,
  responsibilities, requirements, datePosted,
  "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription
}`;

export async function fetchJobs() {
  return sanityFetch<Job[]>({
    query: `*[_type == "job" && isOpen == true] | order(datePosted desc) ${JOB_PROJECTION}`,
    fallback: getAllJobs(),
    tags: ["job"],
  });
}

export async function fetchJobBySlug(slug: string) {
  return sanityFetch<Job | null>({
    query: `*[_type == "job" && slug.current == $slug][0] ${JOB_PROJECTION}`,
    params: { slug },
    fallback: getJobBySlug(slug) || null,
    tags: [`job:${slug}`],
  });
}
