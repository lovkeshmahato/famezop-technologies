import { AnimatedText } from "@/components/animations/AnimatedText";
import { GlobalPresenceMap } from "@/components/ui/GlobalPresenceMap";
import { offices } from "@/lib/site";

export function GlobalPresenceSection() {
  return (
    <section className="section-padding bg-ink">
      <div className="container-content">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">Global presence</p>
        <AnimatedText
          as="h2"
          text="Delivery teams across three time zones, one standard"
          className="max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />

        <div className="mt-8">
          <GlobalPresenceMap />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {offices.map((office) => (
            <div key={office.country} className="rounded-card border border-white/10 bg-white/5 p-5">
              <p className="font-heading text-base font-semibold text-white">
                {office.city}, {office.country}
              </p>
              <p className="mt-1 text-sm text-white/50">{office.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
