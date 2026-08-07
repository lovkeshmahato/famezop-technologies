"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  splitBy?: "word" | "line";
  delay?: number;
  once?: boolean;
  /** Consecutive substring of `text` (word-boundary aligned) to render in blue. */
  highlight?: string;
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

function findHighlightRange(parts: string[], highlight?: string) {
  if (!highlight) return null;
  const highlightWords = highlight.split(" ");
  for (let start = 0; start <= parts.length - highlightWords.length; start++) {
    const matches = highlightWords.every((word, offset) => parts[start + offset] === word);
    if (matches) return { start, end: start + highlightWords.length - 1 };
  }
  return null;
}

export function AnimatedText({
  text,
  as = "h2",
  className,
  splitBy = "word",
  delay = 0,
  once = true,
  highlight,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  const parts = splitBy === "word" ? text.split(" ") : text.split("\n");
  const range = findHighlightRange(parts, highlight);

  if (reduced) {
    if (!range) return <Tag className={className}>{text}</Tag>;
    return (
      <Tag className={className}>
        {parts.map((part, index) => (
          <span key={index} className={index >= range.start && index <= range.end ? "text-blue" : undefined}>
            {part}
            {index < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

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
        {parts.map((part, index) => {
          const isHighlighted = range && index >= range.start && index <= range.end;
          return (
            <span key={index}>
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  variants={item}
                  className={cn("inline-block will-change-transform", isHighlighted && "text-blue")}
                >
                  {part}
                </motion.span>
              </span>
              {splitBy === "word" && index < parts.length - 1 ? " " : ""}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
