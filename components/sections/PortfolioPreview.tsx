import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import type { CaseStudy } from "@/lib/content/types";

export function PortfolioPreview({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Portfolio</p>
            <AnimatedText
              as="h2"
              text="Recent work, real outcomes"
              className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
          </div>
          <Button href="/portfolio" variant="secondary" showArrow>
            View all case studies
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
