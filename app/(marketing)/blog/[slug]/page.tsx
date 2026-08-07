import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getAllBlogPosts, fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/content/blog";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, jsonLdScript } from "@/lib/seo";
import { BlogCard } from "@/components/ui/BlogCard";
import { CTASection } from "@/components/sections/CTASection";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await fetchBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const breadcrumbs = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            image: post.image,
          })
        )}
      />

      <article>
        <section className="pb-12 pt-40 sm:pb-16 sm:pt-48">
          <div className="container-content max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-body">
              <Link href="/blog" className="hover:text-blue">
                Blog
              </Link>
              <span className="mx-1.5">/</span>
              <span>{post.title}</span>
            </nav>
            <div className="flex items-center gap-3 text-xs font-medium text-gray-body">
              <span className="text-blue">{post.category}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
            </div>
            <h1 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-gray-body">By {post.author}</p>
          </div>
        </section>

        <div className="container-content max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-ink">
            <Image src={post.image} alt={`${post.title} — cover illustration`} fill className="object-cover" priority />
          </div>
        </div>

        <section className="section-padding !pb-0">
          <div className="container-content max-w-3xl prose-content">
            {post.body ? (
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-blue">
                <PortableText value={post.body as never} />
              </div>
            ) : (
              <div className="space-y-5">
                {post.content.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding">
          <div className="container-content max-w-3xl rounded-card border border-ink/10 bg-offwhite p-8">
            <p className="font-heading text-lg font-semibold text-ink">Enjoyed this?</p>
            <p className="mt-1 text-sm text-gray-body">Get occasional product & engineering updates from our team.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="section-padding bg-offwhite">
          <div className="container-content">
            <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">More from the blog</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
