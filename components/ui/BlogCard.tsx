import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content/types";

export function BlogCard({ post }: { post: Pick<BlogPost, "slug" | "title" | "excerpt" | "image" | "category" | "publishedAt" | "readMinutes"> }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor-hover
      className="group block overflow-hidden rounded-card border border-ink/10 bg-white transition-all duration-300 ease-expressive hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Image
          src={post.image}
          alt={`${post.title} — cover illustration`}
          fill
          className="object-cover transition-transform duration-500 ease-expressive group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs font-medium text-gray-body">
          <span className="text-blue">{post.category}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
        <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-body line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
