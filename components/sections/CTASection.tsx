import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function CTASection({
  title = "Let's Build Something Future-Ready",
  description = "Tell us about your project and we'll follow up within one business day with next steps.",
  ctaLabel = "Book Free Consultation",
  ctaHref = "/contact",
  variant = "ink",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "ink" | "blue";
}) {
  return (
    <section className={`relative overflow-hidden ${variant === "ink" ? "bg-ink" : "bg-blue"}`}>
      <div className="noise-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            variant === "ink"
              ? "radial-gradient(circle at 20% 30%, rgba(0,82,255,0.25), transparent 45%)"
              : "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="container-content relative section-padding !py-24 text-center">
        <AnimatedText
          as="h2"
          text={title}
          className="mx-auto max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-lg text-base text-white/70">{description}</p>
        <div className="mt-8 flex justify-center">
          <Button href={ctaHref} variant="dark" size="lg" showArrow>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
