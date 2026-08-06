"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsFinePointer && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    function handleMove(event: MouseEvent) {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
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
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-blue bg-blue/10 mix-blend-difference"
      style={{ x: springX, y: springY, width: 20, height: 20 }}
      animate={{ scale: hovering ? 2 : 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}
