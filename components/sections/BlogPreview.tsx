import { AnimatedText } from "@/components/animations/AnimatedText";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/lib/content/types";

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">From the blog</p>
            <AnimatedText
              as="h2"
              text="Engineering notes worth reading"
              className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
          </div>
          <Button href="/blog" variant="secondary" showArrow>
            Visit the blog
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
