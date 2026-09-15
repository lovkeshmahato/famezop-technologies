import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { fetchServices } from "@/lib/content/services";
import { fetchIndustries } from "@/lib/content/industries";
import { fetchCaseStudies } from "@/lib/content/case-studies";
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
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
  "/sitemap",
];

// Anchor for routes with no real per-content update timestamp (i.e. not
// sourced from Sanity's _updatedAt), so the sitemap doesn't claim every
// static marketing page changed on every deploy. Bump this when those pages
// actually change, or when a service/industry entry's own _updatedAt is
// unavailable (e.g. running on fallback content with no Sanity connected).
const STATIC_LAST_MODIFIED = new Date("2026-09-15");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, caseStudies, jobs] = await Promise.all([
    fetchServices(),
    fetchIndustries(),
    fetchCaseStudies(),
    fetchJobs(),
  ]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  for (const service of services) {
    entries.push({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: service.lastModified ? new Date(service.lastModified) : STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const industry of industries) {
    entries.push({
      url: `${siteConfig.url}/industries/${industry.slug}`,
      lastModified: industry.lastModified ? new Date(industry.lastModified) : STATIC_LAST_MODIFIED,
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
