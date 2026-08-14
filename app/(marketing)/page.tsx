import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Stats } from "@/components/sections/Stats";
import { AboutWhy } from "@/components/sections/AboutWhy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { IndustriesCarousel } from "@/components/sections/IndustriesCarousel";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GlobalPresenceSection } from "@/components/sections/GlobalPresenceSection";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { fetchServices } from "@/lib/content/services";
import { fetchIndustries } from "@/lib/content/industries";
import { fetchFeaturedCaseStudies } from "@/lib/content/case-studies";
import { fetchTestimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "Famezop Technologies | Custom Software, AI & Enterprise Solutions",
  description:
    "Famezop Technologies builds custom software, AI solutions, SaaS products, and enterprise systems for businesses across Nepal, India, the UAE, and worldwide.",
  path: "/",
});

export default async function HomePage() {
  const [services, industries, caseStudies, testimonials] = await Promise.all([
    fetchServices(),
    fetchIndustries(),
    fetchFeaturedCaseStudies(),
    fetchTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <AboutWhy />
      <ServicesGrid services={services} />
      <IndustriesCarousel industries={industries} />
      <TechStackSection />
      <PortfolioPreview caseStudies={caseStudies.slice(0, 3)} />
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials} />
      <GlobalPresenceSection />
      <EngagementModels />
      <CTASection />
    </>
  );
}
