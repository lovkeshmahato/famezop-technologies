import { AnimatedText } from "@/components/animations/AnimatedText";
import { PricingCard } from "@/components/ui/PricingCard";
import { pricingTiers } from "@/lib/content/misc";

export function PricingPreview() {
  return (
    <section className="section-padding">
      <div className="container-content">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Pricing</p>
        <AnimatedText
          as="h2"
          text="Transparent tiers, custom quotes"
          className="max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
