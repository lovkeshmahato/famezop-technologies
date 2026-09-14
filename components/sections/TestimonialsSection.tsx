import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import type { Testimonial } from "@/lib/content/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section-padding">
      <div className="container-content">
        <h2 className="mb-10 text-center text-xs font-semibold tracking-wide text-blue">
          What clients say
        </h2>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
