import { IndustryCard } from "@/components/ui/IndustryCard";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import type { Industry } from "@/lib/content/types";

export function IndustriesCarousel({ industries }: { industries: Industry[] }) {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Industries</p>
            <AnimatedText
              as="h2"
              text="Domain depth across 16 industries"
              className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
          </div>
          <Button href="/industries" variant="secondary" showArrow>
            View all industries
          </Button>
        </div>
      </div>

      <div className="container-content mt-10 overflow-x-auto pb-4">
        <div className="flex snap-x snap-mandatory gap-5">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
