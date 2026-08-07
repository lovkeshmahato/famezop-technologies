import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { techStack } from "@/lib/content/misc";

export const metadata: Metadata = buildMetadata({
  title: "Technology Stack",
  description:
    "The frontend, backend, mobile, database, cloud, and AI technologies Famezop Technologies uses to build reliable, scalable software.",
  path: "/technology",
});

export default function TechnologyPage() {
  const breadcrumbs = [{ name: "Technology", path: "/technology" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Technology"
        title="A modern, battle-tested stack"
        description="We choose technology for long-term maintainability, not resume-driven development. Here's what powers the software we ship."
        breadcrumbs={[{ name: "Technology", href: "/technology" }]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(techStack).map(([category, items], i) => (
            <ScrollReveal key={category} delay={i * 0.06}>
              <div className="h-full rounded-card border border-ink/10 bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue">{category}</p>
                <ul className="mt-5 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Have a specific stack in mind?"
        description="We're comfortable working within your existing technology choices, or recommending the right stack for your requirements."
      />
    </>
  );
}
