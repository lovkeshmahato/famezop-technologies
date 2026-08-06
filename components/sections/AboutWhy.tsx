import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { processSteps } from "@/lib/content/misc";

export function AboutWhy() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Who we are</p>
            <AnimatedText
              as="h2"
              text="A global engineering partner built for long-term outcomes"
              className="text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            />
            <ScrollReveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-gray-body">
                Famezop Technologies is a software development company with teams across Nepal,
                India, and the UAE, delivering custom software, AI systems, and enterprise
                platforms to clients worldwide.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <p className="mt-4 text-base leading-relaxed text-gray-body">
                We exist to build software that survives contact with real usage — architected by
                senior engineers, delivered transparently, and supported long after launch.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.26} className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-heading text-2xl font-semibold text-ink">3</p>
                <p className="text-sm text-gray-body">Global offices</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-semibold text-ink">14+</p>
                <p className="text-sm text-gray-body">Countries served</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}
