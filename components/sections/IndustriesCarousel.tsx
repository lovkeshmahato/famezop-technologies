"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IndustryCard } from "@/components/ui/IndustryCard";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import type { Industry } from "@/lib/content/types";

export function IndustriesCarousel({ industries }: { industries: Industry[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-industry-card]");
    const step = (card?.offsetWidth ?? 280) + 20; // card width + gap-5
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }

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
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll industries left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll industries right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Button href="/industries" variant="secondary" showArrow>
              View all industries
            </Button>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="container-content mt-10 overflow-x-auto pb-4">
        <div className="flex snap-x snap-mandatory gap-5">
          {industries.map((industry) => (
            <div key={industry.slug} data-industry-card>
              <IndustryCard industry={industry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
