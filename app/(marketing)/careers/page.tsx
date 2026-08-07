import type { Metadata } from "next";
import Link from "next/link";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchJobs } from "@/lib/content/jobs";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Famezop Technologies — open engineering, design, and delivery roles across Nepal, India, and the UAE.",
  path: "/careers",
});

const benefits = [
  { title: "Remote-friendly", description: "Hybrid by default, remote where the role allows." },
  { title: "Learning budget", description: "Annual budget for courses, books, and conferences." },
  { title: "Health coverage", description: "Comprehensive health insurance for you and dependents." },
  { title: "Flexible time off", description: "Take the time you need — we trust you to manage it." },
  { title: "Real ownership", description: "Ship features that reach production, not just tickets." },
  { title: "Cross-border teams", description: "Work alongside engineers across three countries." },
];

export default async function CareersPage() {
  const jobs = await fetchJobs();
  const breadcrumbs = [{ name: "Careers", path: "/careers" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="Careers"
        title="Build software that ships, with people who care how"
        description="We're a team of engineers, designers, and delivery leads across Nepal, India, and the UAE building real software for real clients."
        breadcrumbs={[{ name: "Careers", href: "/careers" }]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.05}>
              <div className="h-full rounded-card border border-ink/10 bg-white p-6">
                <p className="font-heading text-base font-semibold text-ink">{benefit.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-body">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Open roles</h2>
          <div className="mt-8 divide-y divide-ink/10 rounded-card border border-ink/10 bg-white">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="group flex flex-col justify-between gap-3 p-6 transition-colors hover:bg-offwhite sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-heading text-base font-semibold text-ink">{job.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-gray-body">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" /> {job.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-blue opacity-0 transition-opacity group-hover:opacity-100">
                  View role <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see the right role?"
        description="We're always open to hearing from strong engineers, designers, and delivery leads."
        ctaLabel="Get in touch"
      />
    </>
  );
}
