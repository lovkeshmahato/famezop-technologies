import type { Metadata } from "next";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { GlobalPresenceMap } from "@/components/ui/GlobalPresenceMap";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { fetchTeam } from "@/lib/content/team";
import { processSteps, differentiators } from "@/lib/content/misc";
import { offices } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Famezop Technologies is a global software company with teams in Kathmandu, Bengaluru, and Dubai, building custom software and AI systems for clients worldwide.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await fetchTeam();
  const breadcrumbs = [{ name: "About", path: "/about" }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(breadcrumbs))} />
      <PageHeroBanner
        eyebrow="About us"
        title="A global team building software that lasts"
        description="Famezop Technologies is a software development company with teams across Nepal, India, and the UAE, working with clients worldwide."
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />

      <section className="section-padding">
        <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="rounded-card border border-ink/10 bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue">Mission</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                Build software that survives contact with real usage — architected by senior
                engineers, delivered transparently, and supported long after launch.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-card border border-ink/10 bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue">Vision</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                Become the technology partner businesses across South Asia and the Gulf trust with
                their most important systems.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">How we work</h2>
          <div className="mt-10">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-ink">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">Global presence</h2>
          <div className="mt-10">
            <GlobalPresenceMap />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {offices.map((office) => (
              <div key={office.country} className="rounded-card border border-white/10 bg-white/5 p-5">
                <p className="font-heading text-base font-semibold text-white">
                  {office.city}, {office.country}
                </p>
                <p className="mt-1 text-sm text-white/50">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Leadership</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.05}>
                <div className="rounded-card border border-ink/10 bg-white p-6">
                  <div className="h-12 w-12 rounded-full bg-blue-soft" aria-hidden />
                  <p className="mt-4 font-heading text-base font-semibold text-ink">{member.name}</p>
                  <p className="text-sm text-blue">{member.role}</p>
                  <p className="mt-1 text-xs text-gray-body">{member.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-body">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-offwhite">
        <div className="container-content">
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">Why clients choose us</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.slice(0, 6).map((item) => (
              <div key={item.title} className="rounded-card border border-ink/10 bg-white p-6">
                <p className="font-heading text-base font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
