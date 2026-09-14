import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIcon } from "@/lib/icons";
import { getAllServices, fetchServiceBySlug, fetchServices } from "@/lib/content/services";
import { fetchCaseStudies } from "@/lib/content/case-studies";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd, jsonLdScript } from "@/lib/seo";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { getAllFaqs } from "@/lib/content/faqs";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await fetchServiceBySlug(params.slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await fetchServiceBySlug(params.slug);
  if (!service) notFound();

  const [allServices, allCaseStudies] = await Promise.all([fetchServices(), fetchCaseStudies()]);
  const related = allServices.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const relatedCaseStudies = allCaseStudies.slice(0, 3);
  const generalFaqs = getAllFaqs().filter((f) => f.category === "General").slice(0, 4);

  const Icon = getIcon(service.icon);
  const breadcrumbs = [
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          serviceJsonLd({ title: service.title, description: service.summary, slug: service.slug })
        )}
      />

      <PageHeroBanner
        eyebrow={service.category}
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-control bg-blue-soft text-blue">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-semibold text-ink">The problem it solves</h2>
            <p className="mt-3 text-base leading-relaxed text-gray-body">{service.problem}</p>

            <h2 className="mt-12 font-heading text-2xl font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-card border border-ink/10 bg-offwhite p-7">
              <p className="font-heading text-lg font-semibold text-ink">Not sure where to start?</p>
              <p className="mt-2 text-sm text-gray-body">
                Book a free consultation and we&apos;ll scope {service.title.toLowerCase()} for your specific requirements.
              </p>
              <Button href="/contact" className="mt-5 w-full">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
            Our process for {service.title.toLowerCase()}
          </h2>
          <div className="mt-10">
            <ProcessTimeline steps={service.process} />
          </div>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <section className="section-padding">
          <div className="container-content">
            <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Related case studies</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-padding bg-offwhite">
          <div className="container-content">
            <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Related services</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-content max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8">
            <ScrollReveal>
              <Accordion items={generalFaqs} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
