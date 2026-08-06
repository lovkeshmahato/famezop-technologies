"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const float = (delay: number, distance = 12) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function HeroVisual() {
  const reduced = useReducedMotion();
  const M = reduced ? "div" : motion.div;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]" aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,82,255,0.14) 0%, rgba(0,82,255,0) 70%)",
        }}
      />

      {/* Orbit ring */}
      <div className="absolute inset-10 rounded-full border border-blue/15" />
      <div className="absolute inset-24 rounded-full border border-blue/10" />

      {/* Main dashboard card */}
      <M
        className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-card border border-ink/10 bg-white p-5 shadow-soft"
        {...(reduced ? {} : float(0, 10))}
      >
        <div className="flex items-center justify-between">
          <span className="h-2 w-2 rounded-full bg-blue" />
          <span className="text-[10px] font-medium text-gray-body">Live delivery</span>
        </div>
        <div className="mt-4 flex items-end gap-1.5">
          {[40, 65, 45, 80, 60, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-blue-soft" style={{ height: 48 }}>
              <div
                className="w-full rounded-sm bg-blue"
                style={{ height: `${h}%`, marginTop: `${100 - h}%` }}
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-ink">Sprint velocity +18%</p>
      </M>

      {/* Floating stat chip */}
      <M
        className="absolute -right-2 top-8 rounded-control border border-ink/10 bg-white px-4 py-3 shadow-soft-sm"
        {...(reduced ? {} : float(0.6, 14))}
      >
        <p className="text-[10px] text-gray-body">Uptime</p>
        <p className="font-heading text-lg font-semibold text-ink">99.98%</p>
      </M>

      {/* Floating AI chip */}
      <M
        className="absolute -left-4 bottom-12 rounded-control border border-ink/10 bg-ink px-4 py-3 shadow-soft-sm"
        {...(reduced ? {} : float(1.1, 10))}
      >
        <p className="text-[10px] text-white/50">AI Agent</p>
        <p className="text-sm font-medium text-white">Automating 40 tasks/day</p>
      </M>

      {/* Small floating dot */}
      <M
        className="absolute bottom-4 right-16 h-3 w-3 rounded-full bg-blue"
        {...(reduced ? {} : float(0.3, 8))}
      />
    </div>
  );
}
