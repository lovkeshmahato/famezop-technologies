import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { getAllJobs, fetchJobBySlug } from "@/lib/content/jobs";
import { buildMetadata, breadcrumbJsonLd, jobPostingJsonLd, jsonLdScript } from "@/lib/seo";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { JobApplicationForm } from "@/components/ui/JobApplicationForm";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return {};

  return buildMetadata({
    title: job.metaTitle || `${job.title} — Careers`,
    description: job.metaDescription || job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) notFound();

  const breadcrumbs = [
    { name: "Careers", path: "/careers" },
    { name: job.title, path: `/careers/${job.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          jobPostingJsonLd({
            title: job.title,
            description: job.summary,
            department: job.department,
            location: job.location,
            employmentType: job.employmentType.toUpperCase().replace(/[^A-Z_]/g, "_"),
            datePosted: job.datePosted,
          })
        )}
      />

      <PageHeroBanner
        eyebrow={job.department}
        title={job.title}
        description={job.summary}
        breadcrumbs={[
          { name: "Careers", href: "/careers" },
          { name: job.title, href: `/careers/${job.slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-5 text-sm text-gray-body">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-blue" /> {job.department}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-blue" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue" /> {job.employmentType}
              </span>
            </div>

            <h2 className="mt-10 font-heading text-xl font-semibold text-ink">Responsibilities</h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-semibold text-ink">Requirements</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-card border border-ink/10 bg-offwhite p-7">
              <p className="font-heading text-lg font-semibold text-ink">Apply for this role</p>
              <p className="mt-2 text-sm text-gray-body">
                We review every application — expect to hear back within a week.
              </p>
              <div className="mt-6">
                <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
