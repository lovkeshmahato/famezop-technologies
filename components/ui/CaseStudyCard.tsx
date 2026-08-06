import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content/types";

export function CaseStudyCard({ caseStudy }: { caseStudy: Pick<CaseStudy, "slug" | "title" | "summary" | "image" | "industry" | "tech"> }) {
  return (
    <Link
      href={`/portfolio/${caseStudy.slug}`}
      data-cursor-hover
      className="group block overflow-hidden rounded-card border border-ink/10 bg-white transition-all duration-300 ease-expressive hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-offwhite">
        <Image
          src={caseStudy.image}
          alt={`${caseStudy.title} — case study cover`}
          fill
          className="object-cover transition-transform duration-500 ease-expressive group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1 text-sm font-medium text-white">
            View case study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-soft px-3 py-1 text-xs font-medium text-blue">{caseStudy.industry}</span>
          {caseStudy.tech.slice(0, 2).map((tech) => (
            <span key={tech} className="rounded-full bg-offwhite px-3 py-1 text-xs font-medium text-gray-body">
              {tech}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{caseStudy.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-body line-clamp-2">{caseStudy.summary}</p>
      </div>
    </Link>
  );
}
