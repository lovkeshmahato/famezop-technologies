"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
  defaultTab,
  className,
}: {
  tabs: { label: string; content: ReactNode }[];
  defaultTab?: string;
  className?: string;
}) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.label);

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 border-b border-ink/10">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActive(tab.label)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors",
              active === tab.label ? "text-ink" : "text-gray-body hover:text-ink"
            )}
          >
            {tab.label}
            {active === tab.label && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-blue" />}
          </button>
        ))}
      </div>
      <div className="pt-8">{tabs.find((tab) => tab.label === active)?.content}</div>
    </div>
  );
}
