"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("famezop-preloaded")) return;

    setVisible(true);
    sessionStorage.setItem("famezop-preloaded", "1");
    const timeout = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(timeout);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="font-heading text-2xl font-semibold tracking-tight text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Famezop <span className="text-blue">Technologies</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
