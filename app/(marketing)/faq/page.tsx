import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchFaqsByCategory, fetchFaqs } from "@/lib/content/faqs";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about working with Famezop Technologies — process, technology, security, and NDAs.",
  path: "/faq",
});

export default async function FaqPage() {
  const [grouped, allFaqs] = await Promise.all([fetchFaqsByCategory(), fetchFaqs()]);
  const breadcrumbs = [{ name: "FAQ", path: "/faq" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(allFaqs))} />

      <PageHeroBanner
        eyebrow="FAQ"
        title="Questions we hear often"
        description="Everything you need to know about how we work and protect your project."
        breadcrumbs={[{ name: "FAQ", href: "/faq" }]}
      />

      <section className="section-padding">
        <div className="container-content max-w-3xl space-y-14">
          {grouped.map((group) => (
            <div key={group.category}>
              <h2 className="font-heading text-2xl font-semibold text-ink">{group.category}</h2>
              <div className="mt-6">
                <Accordion items={group.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Still have questions?" description="Reach out and we'll get back to you within one business day." ctaLabel="Contact us" />
    </>
  );
}
