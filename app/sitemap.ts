import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { fetchServices } from "@/lib/content/services";
import { fetchIndustries } from "@/lib/content/industries";
import { fetchCaseStudies } from "@/lib/content/case-studies";
import { fetchBlogPosts } from "@/lib/content/blog";
import { fetchJobs } from "@/lib/content/jobs";

export const revalidate = 3600;

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/industries",
  "/technology",
  "/portfolio",
  "/careers",
  "/blog",
  "/pricing",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/sitemap",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, caseStudies, posts, jobs] = await Promise.all([
    fetchServices(),
    fetchIndustries(),
    fetchCaseStudies(),
    fetchBlogPosts(),
    fetchJobs(),
  ]);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const service of services) {
    entries.push({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const industry of industries) {
    entries.push({
      url: `${siteConfig.url}/industries/${industry.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const caseStudy of caseStudies) {
    entries.push({
      url: `${siteConfig.url}/portfolio/${caseStudy.slug}`,
      lastModified: new Date(caseStudy.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of posts) {
    entries.push({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const job of jobs) {
    entries.push({
      url: `${siteConfig.url}/careers/${job.slug}`,
      lastModified: new Date(job.datePosted),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  return entries;
}
