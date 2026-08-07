import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchServices } from "@/lib/content/services";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Software Development Services",
  description:
    "Custom software, AI development, SaaS, mobile, web, cloud, and enterprise engineering services from Famezop Technologies — delivered by dedicated teams across Nepal, India, and the UAE.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await fetchServices();
  const breadcrumbs = [{ name: "Services", path: "/services" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Services"
        title="Full-stack engineering for every stage of growth"
        description="From MVP to enterprise-scale platforms, our services span custom software, AI, cloud, and design — delivered by dedicated teams, not rotating contractors."
        breadcrumbs={[{ name: "Services", href: "/services" }]}
      />
      <ServicesGrid services={services} />
      <CTASection />
    </>
  );
}
