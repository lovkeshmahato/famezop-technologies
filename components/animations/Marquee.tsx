"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";

export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("flex flex-wrap items-center gap-10", className)}>{children}</div>;
  }

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-16 pr-16 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-16 pr-16 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
