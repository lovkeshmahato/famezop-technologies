import type { Metadata } from "next";
import Link from "next/link";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { buildMetadata } from "@/lib/seo";
import { getAllServices } from "@/lib/content/services";
import { getAllIndustries } from "@/lib/content/industries";
import { getAllCaseStudies } from "@/lib/content/case-studies";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllJobs } from "@/lib/content/jobs";

export const metadata: Metadata = buildMetadata({
  title: "Sitemap",
  description: "Browse every page on the Famezop Technologies website.",
  path: "/sitemap",
});

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-body">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink/75 hover:text-blue">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  const columns = [
    {
      title: "Main pages",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Technology", href: "/technology" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Portfolio", href: "/portfolio" },
      ],
    },
    {
      title: "Services",
      links: getAllServices().map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      title: "Industries",
      links: getAllIndustries().map((i) => ({ label: i.title, href: `/industries/${i.slug}` })),
    },
    {
      title: "Case studies",
      links: getAllCaseStudies().map((c) => ({ label: c.title, href: `/portfolio/${c.slug}` })),
    },
    {
      title: "Blog posts",
      links: getAllBlogPosts().map((b) => ({ label: b.title, href: `/blog/${b.slug}` })),
    },
    {
      title: "Open roles",
      links: getAllJobs().map((j) => ({ label: j.title, href: `/careers/${j.slug}` })),
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <>
      <PageHeroBanner title="Sitemap" breadcrumbs={[{ name: "Sitemap", href: "/sitemap" }]} />
      <section className="section-padding">
        <div className="container-content grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
          {columns.map((column) => (
            <LinkColumn key={column.title} {...column} />
          ))}
        </div>
      </section>
    </>
  );
}
