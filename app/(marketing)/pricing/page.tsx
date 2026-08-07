import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { PricingCard } from "@/components/ui/PricingCard";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { pricingTiers } from "@/lib/content/misc";

export const metadata: Metadata = buildMetadata({
  title: "Pricing & Engagement Models",
  description:
    "Transparent engagement models and pricing tiers from Famezop Technologies — Fixed Price, Dedicated Team, Time & Material, Staff Augmentation, and Offshore Development Center.",
  path: "/pricing",
});

export default function PricingPage() {
  const breadcrumbs = [{ name: "Pricing", path: "/pricing" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Pricing"
        title="Transparent tiers, no hidden fees"
        description="Every engagement is scoped in writing before we start. Here's how our tiers work — reach out for a quote tailored to your project."
        breadcrumbs={[{ name: "Pricing", href: "/pricing" }]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>

      <EngagementModels />
      <CTASection />
    </>
  );
}
