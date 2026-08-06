import { Marquee } from "@/components/animations/Marquee";
import { trustedByLogos } from "@/lib/content/misc";

export function TrustedBy() {
  return (
    <section className="border-y border-ink/10 bg-offwhite py-10">
      <div className="container-content">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-gray-body">
          Trusted by companies across Nepal, India, UAE &amp; Global Markets
        </p>
        <Marquee>
          {trustedByLogos.map((logo) => (
            <span
              key={logo}
              className="shrink-0 font-heading text-xl font-semibold text-ink/25 grayscale transition-all duration-300 hover:text-ink/70 hover:grayscale-0"
            >
              {logo}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
