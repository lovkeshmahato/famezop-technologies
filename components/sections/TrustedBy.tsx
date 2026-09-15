import Image from "next/image";
import { Marquee } from "@/components/animations/Marquee";
import { trustedByLogos } from "@/lib/content/misc";

export function TrustedBy() {
  return (
    <section className="border-y border-ink/10 bg-offwhite py-10">
      <div className="container-content">
        <p className="mb-6 text-center text-xs font-medium tracking-wide text-gray-body">
          Trusted by companies across Nepal, India, UAE &amp; Global Markets
        </p>
        <Marquee>
          {trustedByLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-control-sm border border-ink/5 bg-white px-4 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
