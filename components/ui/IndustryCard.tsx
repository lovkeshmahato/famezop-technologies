import Link from "next/link";
import { getIcon } from "@/lib/icons";
import type { Industry } from "@/lib/content/types";

export function IndustryCard({ industry }: { industry: Pick<Industry, "slug" | "title" | "summary" | "icon"> }) {
  const Icon = getIcon(industry.icon);

  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-cursor-hover
      className="group flex min-w-[260px] shrink-0 flex-col gap-4 rounded-card border border-ink/10 bg-white p-6 transition-all duration-300 ease-expressive hover:-translate-y-1 hover:border-blue/40 hover:shadow-glow snap-start"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-control bg-blue-soft text-blue">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="font-heading text-base font-semibold text-ink">{industry.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-body">{industry.summary}</p>
      </div>
    </Link>
  );
}
