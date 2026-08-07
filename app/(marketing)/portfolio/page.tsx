import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchCaseStudies } from "@/lib/content/case-studies";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Case Studies",
  description:
    "Real outcomes from Famezop Technologies client engagements — retail, healthcare, logistics, education, fintech, and NGO platforms shipped to production.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const caseStudies = await fetchCaseStudies();
  const breadcrumbs = [{ name: "Portfolio", path: "/portfolio" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Portfolio"
        title="Recent work, real outcomes"
        description="A selection of platforms we've designed, built, and shipped for clients across retail, healthcare, logistics, education, and finance."
        breadcrumbs={[{ name: "Portfolio", href: "/portfolio" }]}
      />
      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
