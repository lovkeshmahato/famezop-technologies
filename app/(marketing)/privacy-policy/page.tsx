import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Famezop Technologies collects, uses, and protects your data.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeroBanner title="Privacy Policy" breadcrumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="section-padding">
        <div className="container-content prose prose-lg max-w-3xl prose-headings:font-heading prose-a:text-blue">
          <p className="text-sm text-gray-body">Last updated: August 2026</p>

          <h2>Overview</h2>
          <p>
            This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and
            protects information when you visit our website or engage our services.
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect information you provide directly — such as your name, email, company, and
            project details submitted through our contact form or newsletter signup — and basic
            analytics data about how visitors use our site.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use the information you provide to respond to inquiries, deliver services you&apos;ve
            requested, and, if you opt in, send occasional product and engineering updates. We do
            not sell your personal information to third parties.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain contact and lead information for as long as necessary to fulfill the
            purposes described in this policy, or as required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data at any
            time by contacting us at {siteConfig.email}.
          </p>

          <h2>Contact</h2>
          <p>Questions about this policy can be directed to {siteConfig.email}.</p>
        </div>
      </section>
    </>
  );
}
