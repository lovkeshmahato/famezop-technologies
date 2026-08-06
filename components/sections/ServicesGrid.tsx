"use client";

import { useState, useMemo } from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content/types";

export function ServicesGrid({ services }: { services: Service[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(services.map((s) => s.category)))], [services]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

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
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === category
                    ? "border-blue bg-blue text-white"
                    : "border-ink/15 text-ink/70 hover:border-ink/30"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
