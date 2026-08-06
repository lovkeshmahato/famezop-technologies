import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { engagementModels } from "@/lib/content/misc";

export function EngagementModels() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-content">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Engagement models</p>
        <AnimatedText
          as="h2"
          text="Choose the model that fits how you work"
          className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {engagementModels.map((model, i) => (
            <ScrollReveal key={model.title} delay={i * 0.05}>
              <div className="h-full rounded-card border border-ink/10 bg-white p-6">
                <p className="font-heading text-base font-semibold text-ink">{model.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-body">{model.description}</p>
                <p className="mt-4 text-xs font-medium text-blue">Best for: {model.bestFor}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
