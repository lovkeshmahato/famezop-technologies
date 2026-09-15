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

      {/* Main code editor card */}
      <M
        className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-card border border-ink/10 bg-ink shadow-soft"
        {...(reduced ? {} : float(0, 10))}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 font-mono text-[10px] text-white/40">deploy.ts</span>
        </div>
        <div className="space-y-1.5 p-4 font-mono text-[11px] leading-relaxed">
          <p>
            <span className="text-blue">async function</span>{" "}
            <span className="text-white/90">deploy</span>
            <span className="text-white/40">() {"{"}</span>
          </p>
          <p className="pl-4">
            <span className="text-blue">await</span> <span className="text-white/90">build</span>
            <span className="text-white/40">.run();</span>
          </p>
          <p className="pl-4">
            <span className="text-white/90">tests</span>
            <span className="text-white/40">.</span>
            <span className="text-white/90">pass</span>
            <span className="text-white/40">(</span>
            <span className="text-emerald-400">247</span>
            <span className="text-white/40">);</span>
          </p>
          <p className="pl-4 text-white/40">
            <span className="text-emerald-400">{"// ✓ shipped to production"}</span>
          </p>
          <p>
            <span className="text-white/40">{"}"}</span>
          </p>
        </div>
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

      {/* Deploy success badge */}
      <M
        className="absolute bottom-2 right-6 flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-white px-3 py-1.5 shadow-soft-sm"
        {...(reduced ? {} : float(0.3, 8))}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-medium text-ink">Build passing</span>
      </M>
    </div>
  );
}
