import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { IndustryCard } from "@/components/ui/IndustryCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchIndustries } from "@/lib/content/industries";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Famezop Technologies builds software for healthcare, education, banking, retail, logistics, government, NGOs, and 8 more industries across Nepal, India, and the UAE.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await fetchIndustries();
  const breadcrumbs = [{ name: "Industries", path: "/industries" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Industries"
        title="Domain expertise across 16 industries"
        description="We don't parachute into your industry cold — our teams bring pattern-matched experience from healthcare to logistics to government."
        breadcrumbs={[{ name: "Industries", href: "/industries" }]}
      />
      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
