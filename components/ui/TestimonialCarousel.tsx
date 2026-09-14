"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, reduced]);

  const current = testimonials[index];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Quote className="mx-auto h-8 w-8 text-blue" strokeWidth={1.5} />
      <div className="relative mt-6 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-balance font-heading text-xl font-medium leading-snug text-ink sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-ink">{current.author}</p>
            <p className="text-sm text-gray-body">
              {current.role}, {current.company}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.author}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-blue" : "w-2.5 bg-ink/25 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
