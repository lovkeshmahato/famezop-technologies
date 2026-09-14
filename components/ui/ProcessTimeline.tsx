"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function ProcessTimeline({ steps }: { steps: { step: string; description: string }[] }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-ink/10 sm:left-1/2 sm:-translate-x-1/2" aria-hidden />
      {!reduced && (
        <motion.div
          className="absolute left-[15px] top-2 w-px origin-top bg-blue sm:left-1/2 sm:-translate-x-1/2"
          initial={{ height: 0 }}
          whileInView={{ height: "calc(100% - 16px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      )}

      <ol className="space-y-6">
        {steps.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <li
              key={item.step}
              className={`relative flex flex-col gap-2 pl-10 sm:w-1/2 sm:pl-0 ${
                isEven ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
              }`}
            >
              <span
                className={`absolute left-[1px] top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-blue bg-white text-[10px] font-bold text-blue ${
                  isEven ? "sm:left-auto sm:-right-[14px]" : "sm:-left-[14px]"
                }`}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading text-lg font-semibold text-ink">{item.step}</p>
              <p className="text-sm leading-relaxed text-gray-body">{item.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
