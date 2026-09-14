import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Quote } from "lucide-react";
import { getAllCaseStudies, fetchCaseStudyBySlug, fetchCaseStudies } from "@/lib/content/case-studies";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { CTASection } from "@/components/sections/CTASection";
import { Counter } from "@/components/animations/Counter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await fetchCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};

  return buildMetadata({
    title: caseStudy.metaTitle || caseStudy.title,
    description: caseStudy.metaDescription || caseStudy.summary,
    path: `/portfolio/${caseStudy.slug}`,
  });
}

function ResultStat({ label, value }: { label: string; value: string }) {
  const match = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return (
    <div className="rounded-card border border-ink/10 bg-white p-6">
      <p className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
        {match ? <Counter value={parseFloat(match[1])} suffix={match[2]} /> : value}
      </p>
      <p className="mt-2 text-sm text-gray-body">{label}</p>
    </div>
  );
}

export default async function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const caseStudy = await fetchCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();

  const all = await fetchCaseStudies();
  const currentIndex = all.findIndex((cs) => cs.slug === caseStudy.slug);
  const next = all[(currentIndex + 1) % all.length];

  const breadcrumbs = [
    { name: "Portfolio", path: "/portfolio" },
    { name: caseStudy.title, path: `/portfolio/${caseStudy.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />

      <section className="pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div className="container-content">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-body">
            <Link href="/portfolio" className="hover:text-blue">
              Portfolio
            </Link>
            <span className="mx-1.5">/</span>
            <span>{caseStudy.title}</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-soft px-3 py-1 text-xs font-medium text-blue">
              {caseStudy.industry}
            </span>
            {caseStudy.tech.map((tech) => (
              <span key={tech} className="rounded-full bg-offwhite px-3 py-1 text-xs font-medium text-gray-body">
                {tech}
              </span>
            ))}
          </div>
          <h1 className="mt-5 max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {caseStudy.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-gray-body">
            {caseStudy.client} · {caseStudy.timeline}
          </p>
        </div>

        <div className="container-content mt-10">
          <div className="relative aspect-[16/8] overflow-hidden rounded-card bg-offwhite">
            <Image src={caseStudy.image} alt={`${caseStudy.title} cover`} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="section-padding !pt-0">
        <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-semibold text-ink">Problem</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-body">{caseStudy.problem}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-ink">Solution</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-body">{caseStudy.solution}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-content">
          <h2 className="font-heading text-xl font-semibold text-ink">Results</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {caseStudy.results.map((result) => (
              <ScrollReveal key={result.label}>
                <ResultStat label={result.label} value={result.value} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {caseStudy.testimonial && (
        <section className="section-padding">
          <div className="container-content max-w-2xl text-center">
            <Quote className="mx-auto h-8 w-8 text-blue" strokeWidth={1.5} />
            <p className="mt-6 text-balance font-heading text-xl font-medium leading-snug text-ink sm:text-2xl">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-ink">{caseStudy.testimonial.author}</p>
            <p className="text-sm text-gray-body">{caseStudy.testimonial.role}</p>
          </div>
        </section>
      )}

      <section className="border-t border-ink/10 bg-offwhite py-16">
        <div className="container-content flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-body">Next case study</p>
            <p className="mt-2 font-heading text-xl font-semibold text-ink">{next.title}</p>
          </div>
          <Link
            href={`/portfolio/${next.slug}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
            aria-label={`View case study: ${next.title}`}
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
