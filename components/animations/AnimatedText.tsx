"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  splitBy?: "word" | "line";
  delay?: number;
  once?: boolean;
};

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const item: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedText({
  text,
  as = "h2",
  className,
  splitBy = "word",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const parts = splitBy === "word" ? text.split(" ") : text.split("\n");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.6 }}
        variants={container}
        custom={delay}
      >
        {parts.map((part, index) => (
          <span key={index} className="inline-block overflow-hidden align-top">
            <motion.span variants={item} className="inline-block will-change-transform">
              {part}
              {splitBy === "word" && index < parts.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
