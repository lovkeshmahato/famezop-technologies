import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { BlogCard } from "@/components/ui/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchBlogPosts } from "@/lib/content/blog";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Engineering notes on software architecture, AI systems, and building reliable products from the Famezop Technologies team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const breadcrumbs = [{ name: "Blog", path: "/blog" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Blog"
        title="Engineering notes worth reading"
        description="Practical writing on software architecture, AI systems, and shipping reliable products — from the people building them."
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
      />
      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
