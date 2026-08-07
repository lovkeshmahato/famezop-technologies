import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIcon } from "@/lib/icons";
import { getAllIndustries, fetchIndustryBySlug } from "@/lib/content/industries";
import { fetchCaseStudies } from "@/lib/content/case-studies";
import { fetchServices } from "@/lib/content/services";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "lucide-react";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllIndustries().map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = await fetchIndustryBySlug(params.slug);
  if (!industry) return {};

  return buildMetadata({
    title: industry.metaTitle || `${industry.title} Software Development`,
    description: industry.metaDescription || industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const industry = await fetchIndustryBySlug(params.slug);
  if (!industry) notFound();

  const [caseStudies, services] = await Promise.all([fetchCaseStudies(), fetchServices()]);
  const relatedCaseStudies = caseStudies.filter((cs) => cs.industry === industry.title).slice(0, 3);
  const relatedServices = services.slice(0, 3);
  const Icon = getIcon(industry.icon);

  const breadcrumbs = [
    { name: "Industries", path: "/industries" },
    { name: industry.title, path: `/industries/${industry.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Industry"
        title={`${industry.title} Software Development`}
        description={industry.summary}
        breadcrumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.title, href: `/industries/${industry.slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-card border border-ink/10 bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-control bg-blue-soft text-blue">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h2 className="mt-5 font-heading text-xl font-semibold text-ink">Common challenges</h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-gray-body">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-blue/20 bg-blue-soft p-8">
            <h2 className="font-heading text-xl font-semibold text-ink">How we help</h2>
            <ul className="mt-4 space-y-3">
              {industry.solutions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="section-padding bg-offwhite">
          <div className="container-content">
            <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
              {industry.title} case studies
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Relevant services</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
