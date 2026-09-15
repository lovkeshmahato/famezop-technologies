"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const RING_SIZE = 20;
const DOT_SIZE = 6;

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Ring position (spring-follows for a trailing effect)
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });
  // Dot position (tracks the raw pointer instantly, smaller box so it stays centered)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsFinePointer && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    function handleMove(event: MouseEvent) {
      x.set(event.clientX - RING_SIZE / 2);
      y.set(event.clientY - RING_SIZE / 2);
      dotX.set(event.clientX - DOT_SIZE / 2);
      dotY.set(event.clientY - DOT_SIZE / 2);
    }

    function handleOver(event: MouseEvent) {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, x, y, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring — spring-follows with a slight delay for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border-2 border-blue"
        style={{ x: springX, y: springY, width: RING_SIZE, height: RING_SIZE }}
        animate={{
          scale: hovering ? 2.4 : 1,
          opacity: hovering ? 0.9 : 0.55,
          backgroundColor: hovering ? "rgba(0,82,255,0.12)" : "rgba(0,82,255,0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Solid center dot — tracks the raw pointer position instantly */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-blue shadow-[0_0_12px_rgba(0,82,255,0.6)]"
        style={{ x: dotX, y: dotY, width: DOT_SIZE, height: DOT_SIZE }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
