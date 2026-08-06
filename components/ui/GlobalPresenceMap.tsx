"use client";

import { motion } from "framer-motion";
import { offices } from "@/lib/site";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Coordinates expressed as percentages within the panel for a stylized,
// non-literal world outline — intentionally abstract rather than cartographic.
const points = offices.map((office) => ({
  ...office,
  x: parseFloat(office.coords.left),
  y: parseFloat(office.coords.top),
}));

function pathBetween(a: { x: number; y: number }, b: { x: number; y: number }) {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 10;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

export function GlobalPresenceMap() {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-white/10 bg-[#0D0F1A]">
      <div className="noise-grid absolute inset-0" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(0,82,255,0.25), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0,82,255,0.15), transparent 45%)",
        }}
      />

      <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {points.map((a, i) =>
          points.slice(i + 1).map((b) => (
            <motion.path
              key={`${a.country}-${b.country}`}
              d={pathBetween(
                { x: a.x, y: (a.y / 100) * 62.5 },
                { x: b.x, y: (b.y / 100) * 62.5 }
              )}
              fill="none"
              stroke="#0052FF"
              strokeWidth="0.25"
              strokeOpacity="0.5"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          ))
        )}
      </svg>

      {points.map((office) => (
        <div
          key={office.country}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${office.x}%`, top: `${office.y}%` }}
        >
          <div className="relative flex flex-col items-center">
            <span className="absolute h-3 w-3 rounded-full bg-blue animate-pulse-marker" aria-hidden />
            <span className="relative h-2.5 w-2.5 rounded-full bg-blue shadow-[0_0_12px_2px_rgba(0,82,255,0.7)]" />
            <div className="absolute top-5 whitespace-nowrap rounded-control border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {office.city}, {office.country}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
