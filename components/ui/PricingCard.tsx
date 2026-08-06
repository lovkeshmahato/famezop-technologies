import { Check } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

export function PricingCard({
  name,
  description,
  features,
  featured = false,
}: {
  name: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-card border p-8 transition-all duration-300 ease-expressive hover:-translate-y-1",
        featured ? "border-blue bg-ink text-white shadow-glow" : "border-ink/10 bg-white"
      )}
    >
      <p className={cn("font-heading text-xl font-semibold", featured ? "text-white" : "text-ink")}>{name}</p>
      <p className={cn("mt-2 text-sm leading-relaxed", featured ? "text-white/70" : "text-gray-body")}>
        {description}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-blue" : "text-blue")} />
            <span className={featured ? "text-white/85" : "text-ink/80"}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href="/contact"
        variant={featured ? "dark" : "secondary"}
        className="mt-8 w-full"
        showArrow
      >
        Contact for Quote
      </Button>
    </div>
  );
}
