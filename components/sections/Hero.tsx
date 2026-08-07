"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const pills = ["Custom Software", "AI Solutions", "SaaS Products", "Mobile Apps", "Enterprise Systems"];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(0,82,255,0.08) 0%, rgba(0,82,255,0) 60%)",
        }}
        aria-hidden
      />
      <div className="container-content grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <AnimatedText
            as="h1"
            text="Building Future-Ready Software That Powers Businesses Worldwide"
            highlight="Future-Ready Software"
            className="text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-hero-lg"
            splitBy="word"
          />

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {pills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={reduced ? undefined : { opacity: 0, y: 10 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink/80"
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-gray-body sm:text-lg"
          >
            Famezop Technologies designs and ships custom software, AI systems, and enterprise
            platforms for businesses across Nepal, India, the UAE, and worldwide.
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="/contact" size="lg" showArrow>
              Book Free Consultation
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              View Our Work
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 hidden justify-center sm:flex"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-gray-body"
          >
            <span className="text-[11px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
