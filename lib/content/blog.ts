import type { BlogPost } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-between-custom-software-and-saas",
    title: "Custom Software vs. SaaS: How to Actually Decide",
    excerpt:
      "Off-the-shelf SaaS is faster to start with. Custom software wins when your workflow is the differentiator. Here's the framework we walk clients through.",
    content: [
      "Every scoping call eventually reaches the same question: should this be built custom, or should we buy something off the shelf?",
      "The honest answer is that most teams reach for custom software too early, and a smaller number reach for SaaS too late — after their workflow has already been bent into an unnatural shape by a tool that wasn't built for them.",
      "We use three questions to cut through it: Is this workflow your competitive advantage, or a commodity? Will you need to integrate deeply with systems a SaaS vendor doesn't support? And can you tolerate the SaaS vendor's roadmap dictating your own?",
      "If the answer to any of those is a strong yes, custom is usually the right call — not because SaaS is inferior, but because the constraints don't fit.",
    ],
    category: "Strategy",
    author: "Famezop Engineering",
    image: "/images/blog/custom-vs-saas.svg",
    publishedAt: "2026-07-20",
    readMinutes: 6,
    metaTitle: "Custom Software vs. SaaS: How to Decide | Famezop Technologies",
    metaDescription: "A practical framework for deciding between custom software development and off-the-shelf SaaS for your business.",
  },
  {
    slug: "what-good-ai-agent-architecture-looks-like",
    title: "What Good AI Agent Architecture Actually Looks Like in Production",
    excerpt:
      "Most AI agent demos fall apart in production. Here's what separates a reliable agent system from a fragile prompt chain.",
    content: [
      "The gap between an AI agent demo and a production agent system is almost entirely about failure handling — not the model.",
      "A production-grade agent needs bounded tool access, explicit evaluation against known failure modes, human-in-the-loop escalation paths, and observability into every decision it makes.",
      "We've found that teams who treat the agent as a probabilistic component inside a deterministic system — rather than the whole system — ship far more reliable products.",
    ],
    category: "AI & Engineering",
    author: "Famezop Engineering",
    image: "/images/blog/ai-agent-architecture.svg",
    publishedAt: "2026-06-28",
    readMinutes: 8,
    metaTitle: "Production-Grade AI Agent Architecture | Famezop Technologies",
    metaDescription: "What separates a reliable, production-ready AI agent system from a fragile demo — architecture patterns that actually hold up.",
  },
  {
    slug: "engaging-offshore-dev-team-without-losing-control",
    title: "How to Work with an Offshore Development Team Without Losing Control",
    excerpt:
      "The failure mode of offshore engagements isn't skill — it's process. Here's how transparent delivery models actually work.",
    content: [
      "Most bad offshore experiences trace back to opacity, not competence: clients can't see what's being built until it's too late to redirect cheaply.",
      "The fix isn't more meetings — it's structural: weekly demos of working software, shared project boards, and direct Slack access to the engineers, not just a project manager relaying messages.",
      "When the process is transparent, geography stops mattering nearly as much as people assume it will.",
    ],
    category: "Engagement Models",
    author: "Famezop Delivery Team",
    image: "/images/blog/offshore-teams.svg",
    publishedAt: "2026-05-15",
    readMinutes: 5,
    metaTitle: "Working with Offshore Development Teams | Famezop Technologies",
    metaDescription: "How transparent delivery models let you work with an offshore development team without losing visibility or control.",
  },
  {
    slug: "core-web-vitals-for-marketing-sites-that-convert",
    title: "Core Web Vitals for Marketing Sites That Actually Convert",
    excerpt:
      "A fast Lighthouse score doesn't guarantee conversions — but a slow one guarantees you're losing them. Here's what actually moves the needle.",
    content: [
      "LCP, CLS, and INP aren't vanity metrics — they're a proxy for how much friction stands between a visitor and the action you want them to take.",
      "The biggest wins we see aren't exotic: priority-loading the hero asset, reserving layout space for dynamic content, and deferring non-critical JavaScript until after first interaction.",
      "Treat performance budgets as a design constraint from day one, not a post-launch cleanup task.",
    ],
    category: "Web Development",
    author: "Famezop Engineering",
    image: "/images/blog/core-web-vitals.svg",
    publishedAt: "2026-04-02",
    readMinutes: 7,
    metaTitle: "Core Web Vitals for Converting Marketing Sites | Famezop Technologies",
    metaDescription: "Practical Core Web Vitals optimizations that improve both Lighthouse scores and real conversion rates.",
  },
  {
    slug: "planning-a-realistic-mvp-timeline",
    title: "Planning a Realistic MVP Timeline (Without Cutting the Wrong Corners)",
    excerpt:
      "Every founder wants to ship faster. The trick is knowing which corners are safe to cut and which ones will cost you six months later.",
    content: [
      "The riskiest MVP mistake isn't scope creep — it's cutting corners on the parts of the system that are expensive to redo, like data modeling and auth, to save time on the parts that are cheap to iterate, like UI polish.",
      "We scope MVPs around a single question: what's the smallest system that lets us test the core hypothesis with real users, without painting ourselves into an architectural corner?",
      "That usually means investing more upfront in data model and API design than founders expect, and less in visual polish than they fear.",
    ],
    category: "Startups",
    author: "Famezop Product Team",
    image: "/images/blog/mvp-timeline.svg",
    publishedAt: "2026-02-18",
    readMinutes: 6,
    metaTitle: "Planning a Realistic MVP Timeline | Famezop Technologies",
    metaDescription: "How to plan an MVP timeline that ships fast without cutting corners that cost you months of rework later.",
  },
  {
    slug: "security-review-checklist-before-launch",
    title: "The Security Review Checklist We Run Before Every Launch",
    excerpt:
      "A pre-launch security pass isn't optional — it's the cheapest insurance policy you'll ever buy. Here's exactly what we check.",
    content: [
      "Every production launch goes through the same review: authentication and session handling, input validation at every boundary, dependency vulnerability scanning, and access control testing on every role.",
      "We also run a data exposure audit — checking exactly what's returned by every API endpoint, not just what the UI displays — since over-fetching is one of the most common silent leaks.",
      "None of this is exotic. It's a checklist, applied consistently, every single time.",
    ],
    category: "Security",
    author: "Famezop Security Team",
    image: "/images/blog/security-checklist.svg",
    publishedAt: "2025-12-08",
    readMinutes: 9,
    metaTitle: "Pre-Launch Security Review Checklist | Famezop Technologies",
    metaDescription: "The security review checklist Famezop runs before every production launch — authentication, access control, and data exposure.",
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getLatestBlogPosts(count = 3) {
  return getAllBlogPosts().slice(0, count);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

const BLOG_PROJECTION = `{
  "slug": slug.current, title, excerpt, "content": [], body, category, author,
  "image": image.asset->url, publishedAt, updatedAt, readMinutes,
  "metaTitle": seo.metaTitle, "metaDescription": seo.metaDescription
}`;

export async function fetchBlogPosts() {
  return sanityFetch<BlogPost[]>({
    query: `*[_type == "blogPost"] | order(publishedAt desc) ${BLOG_PROJECTION}`,
    fallback: getAllBlogPosts(),
    tags: ["blogPost"],
  });
}

export async function fetchLatestBlogPosts(count = 3) {
  const posts = await fetchBlogPosts();
  return posts.slice(0, count);
}

export async function fetchBlogPostBySlug(slug: string) {
  return sanityFetch<BlogPost | null>({
    query: `*[_type == "blogPost" && slug.current == $slug][0] ${BLOG_PROJECTION}`,
    params: { slug },
    fallback: getBlogPostBySlug(slug) || null,
    tags: [`blogPost:${slug}`],
  });
}
