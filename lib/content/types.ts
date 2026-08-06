export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export type Service = SeoFields & {
  slug: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  problem: string;
  included: string[];
  process: { step: string; description: string }[];
  order: number;
};

export type Industry = SeoFields & {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  challenges: string[];
  solutions: string[];
};

export type CaseStudy = SeoFields & {
  slug: string;
  title: string;
  client: string;
  industry: string;
  tech: string[];
  image: string;
  summary: string;
  problem: string;
  solution: string;
  timeline: string;
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  featured: boolean;
  publishedAt: string;
};

export type BlogPost = SeoFields & {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  /** Portable Text blocks, present only when sourced live from Sanity. */
  body?: unknown[];
  category: string;
  author: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
};

export type Job = SeoFields & {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  datePosted: string;
};

export type Faq = {
  question: string;
  answer: string;
  category: "General" | "Process" | "Pricing" | "Technology" | "Security & NDA";
};

export type TeamMember = {
  name: string;
  role: string;
  location: string;
  bio: string;
};
