import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import type { Testimonial } from "@/lib/content/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section-padding">
      <div className="container-content">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-wider text-blue">
          What clients say
        </p>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
