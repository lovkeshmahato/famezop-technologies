import type { Faq } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const faqs: Faq[] = [
  // General
  { category: "General", question: "What does Famezop Technologies do?", answer: "We design and build custom software, AI solutions, SaaS products, mobile apps, and enterprise systems for businesses across Nepal, India, the UAE, and worldwide." },
  { category: "General", question: "What industries do you work with?", answer: "We work across healthcare, education, banking & finance, retail, manufacturing, logistics, government, NGOs, hospitality, real estate, and more — see our Industries page for the full list." },
  { category: "General", question: "Where are you located?", answer: "We have offices in Kathmandu (Nepal), Bengaluru (India), and Dubai (UAE), and deliver to clients globally." },
  { category: "General", question: "Do you work with startups or only enterprises?", answer: "Both. We have dedicated engagement models for early-stage MVPs as well as long-term enterprise partnerships." },
  { category: "General", question: "How do I get started?", answer: "Book a free consultation through our Contact page. We'll scope your requirements and follow up with a proposal within a few business days." },
  { category: "General", question: "Can you sign an NDA before we share details?", answer: "Yes — we routinely sign NDAs before discovery calls. Just let us know when you reach out." },
  { category: "General", question: "Do you provide ongoing support after launch?", answer: "Yes, every engagement includes an option for SLA-backed long-term support and iteration after launch." },

  // Process
  { category: "Process", question: "What does your development process look like?", answer: "Discovery, planning, design, development, testing, deployment, and support — with weekly demos and transparent reporting at every stage." },
  { category: "Process", question: "How involved will I need to be during the project?", answer: "We recommend a weekly sync and async access to a shared project board. Beyond that, involvement scales with how hands-on you want to be." },
  { category: "Process", question: "How do you handle changing requirements mid-project?", answer: "We use agile sprints specifically so scope can adapt. Material changes go through a lightweight re-scoping conversation before we replan the backlog." },
  { category: "Process", question: "What tools do you use for project management?", answer: "Typically Linear or Jira for the backlog, Slack for daily communication, and Figma for design collaboration — we're flexible if you have existing tools." },
  { category: "Process", question: "How often will I see progress?", answer: "Weekly demos of working software, not just status updates — you'll always be able to click through what's been built." },
  { category: "Process", question: "What happens if a sprint is delayed?", answer: "We flag risk as early as possible, not at the deadline, and walk through tradeoffs — descope, extend, or add resourcing — together." },
  { category: "Process", question: "Do you provide documentation?", answer: "Yes — technical documentation, API references, and a handover runbook are standard deliverables at project close." },

  // Technology
  { category: "Technology", question: "What tech stack do you use?", answer: "Primarily TypeScript, React/Next.js, Node.js/NestJS, PostgreSQL, and cloud infrastructure on AWS/GCP/Azure — see our Technology page for the full stack." },
  { category: "Technology", question: "Can you work with our existing codebase?", answer: "Yes, we regularly take over and extend existing codebases — we'll run a technical audit before committing to a timeline." },
  { category: "Technology", question: "Do you build mobile apps natively or cross-platform?", answer: "Both — we recommend based on your performance requirements and team's long-term maintenance capacity." },
  { category: "Technology", question: "Can you integrate AI into our existing product?", answer: "Yes, integrating Claude, GPT, or Gemini into existing products is one of our most common engagement types." },
  { category: "Technology", question: "Do you use open-source or proprietary frameworks?", answer: "We default to mature open-source frameworks to avoid vendor lock-in, unless a proprietary tool is clearly the better fit for your requirements." },
  { category: "Technology", question: "How do you ensure code quality?", answer: "Automated testing, CI/CD-integrated quality gates, mandatory code review, and static analysis are standard on every project." },
  { category: "Technology", question: "Can you help us modernize a legacy system?", answer: "Yes — legacy modernization and phased migration planning is a core part of our Digital Transformation and Enterprise Solutions services." },

  // Security & NDA
  { category: "Security & NDA", question: "How do you handle data security?", answer: "We follow secure-by-design practices — encryption in transit and at rest, least-privilege access control, and regular dependency vulnerability scanning." },
  { category: "Security & NDA", question: "Are your engineers under confidentiality agreements?", answer: "Yes, every team member signs a confidentiality agreement as a condition of employment, in addition to any project-specific NDA." },
  { category: "Security & NDA", question: "Can you support compliance requirements like HIPAA or SOC 2?", answer: "Yes, we design architecture with compliance frameworks in mind and can support audit readiness for HIPAA, SOC 2, ISO 27001, and GDPR." },
  { category: "Security & NDA", question: "Who owns the code and IP after the project?", answer: "You do. IP ownership transfers to you per the terms of our standard agreement, unless otherwise negotiated." },
  { category: "Security & NDA", question: "Do you perform security testing before launch?", answer: "Yes, every production launch goes through a pre-launch security review covering authentication, access control, and data exposure." },
  { category: "Security & NDA", question: "Where is our data hosted?", answer: "You choose — we deploy to your preferred cloud provider and region, and can accommodate data residency requirements." },
  { category: "Security & NDA", question: "How do you manage access to production systems?", answer: "Role-based access control, audit logging, and least-privilege principles apply to every engineer with production access." },
];

export function getAllFaqs() {
  return faqs;
}

export function getFaqsByCategory() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return categories.map((category) => ({
    category,
    items: faqs.filter((f) => f.category === category),
  }));
}

export async function fetchFaqs() {
  return sanityFetch<Faq[]>({
    query: `*[_type == "faq"]{ question, answer, category }`,
    fallback: getAllFaqs(),
    tags: ["faq"],
  });
}

export async function fetchFaqsByCategory() {
  const items = await fetchFaqs();
  const categories = Array.from(new Set(items.map((f) => f.category)));
  return categories.map((category) => ({
    category,
    items: items.filter((f) => f.category === category),
  }));
}
