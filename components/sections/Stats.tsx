import { StatCard } from "@/components/ui/StatCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { stats } from "@/lib/content/misc";

export function Stats() {
  return (
    <section className="section-padding">
      <div className="container-content">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.06}>
              <StatCard label={stat.label} value={stat.value} suffix={stat.suffix} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
