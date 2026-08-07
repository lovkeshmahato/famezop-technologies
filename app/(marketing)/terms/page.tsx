import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the Famezop Technologies website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeroBanner title="Terms of Service" breadcrumbs={[{ name: "Terms of Service", href: "/terms" }]} />
      <section className="section-padding">
        <div className="container-content prose prose-lg max-w-3xl prose-headings:font-heading prose-a:text-blue">
          <p className="text-sm text-gray-body">Last updated: August 2026</p>

          <h2>Acceptance of terms</h2>
          <p>
            By accessing this website or engaging {siteConfig.name} for services, you agree to
            these Terms of Service.
          </p>

          <h2>Services</h2>
          <p>
            Specific project scope, deliverables, timelines, and fees are governed by a separate
            written agreement or statement of work between {siteConfig.name} and the client.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless otherwise agreed in writing, ownership of custom deliverables transfers to the
            client upon full payment. {siteConfig.name} retains ownership of pre-existing tools,
            frameworks, and internal libraries used in delivery.
          </p>

          <h2>Confidentiality</h2>
          <p>
            We treat client information as confidential and routinely sign NDAs prior to
            discovery. Team members are bound by confidentiality obligations as a condition of
            employment.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            {siteConfig.name} is not liable for indirect, incidental, or consequential damages
            arising from use of our website or services, to the extent permitted by law.
          </p>

          <h2>Changes to these terms</h2>
          <p>We may update these terms from time to time. Continued use of our website constitutes acceptance of the updated terms.</p>

          <h2>Contact</h2>
          <p>Questions about these terms can be directed to {siteConfig.email}.</p>
        </div>
      </section>
    </>
  );
}
