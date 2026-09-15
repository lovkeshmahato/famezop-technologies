"use client";

import { useState, useMemo, useEffect } from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content/types";

const INITIAL_VISIBLE = 6;

export function ServicesGrid({ services }: { services: Service[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(services.map((s) => s.category)))], [services]);
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(false);

  // Collapse back to the short list whenever the filter changes, so
  // switching categories doesn't leave a stale "show all" state.
  useEffect(() => {
    setExpanded(false);
  }, [active]);

  const filtered = active === "All" ? services : services.filter((s) => s.category === active);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section className="section-padding">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">What we do</p>
            <AnimatedText
              as="h2"
              text="Full-stack engineering, end to end"
              className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={cn(
                  "rounded-full border px-4 py-3 text-sm font-medium transition-colors",
                  active === category
                    ? "border-blue bg-blue text-white font-semibold shadow-[0_0_0_3px_rgba(0,82,255,0.18)]"
                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button variant="secondary" onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show fewer services" : `Show all ${filtered.length} services`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
