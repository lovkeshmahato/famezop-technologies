import { AnimatedText } from "@/components/animations/AnimatedText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { differentiators } from "@/lib/content/misc";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="noise-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(50% 40% at 15% 10%, rgba(0,82,255,0.18) 0%, rgba(0,82,255,0) 60%)",
        }}
        aria-hidden
      />
      <div className="container-content section-padding relative">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Why Famezop</p>
        <AnimatedText
          as="h2"
          text="Built for partners who need it done right, not just done fast"
          className="max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.05} className="bg-ink p-7">
              <div className="mb-4 h-8 w-8 rounded-full border border-blue/40 bg-blue/10" />
              <p className="font-heading text-base font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
