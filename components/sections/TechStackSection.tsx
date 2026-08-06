import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { techStack } from "@/lib/content/misc";

export function TechStackSection() {
  return (
    <section className="section-padding">
      <div className="container-content">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Technology</p>
        <AnimatedText
          as="h2"
          text="A modern, battle-tested stack"
          className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(techStack).map(([category, items], i) => (
            <ScrollReveal key={category} delay={i * 0.06}>
              <div className="h-full rounded-card border border-ink/10 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-body">{category}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink/10 bg-offwhite px-3 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:border-blue/40 hover:text-blue"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
