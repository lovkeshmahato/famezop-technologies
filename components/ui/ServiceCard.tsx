import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/lib/content/types";

export function ServiceCard({ service }: { service: Pick<Service, "slug" | "title" | "summary" | "icon"> }) {
  const Icon = getIcon(service.icon);

  return (
    <Link
      href={`/services/${service.slug}`}
      data-cursor-hover
      className="group relative flex flex-col justify-between overflow-hidden rounded-card border border-ink/10 bg-white p-7 transition-all duration-300 ease-expressive hover:-translate-y-1 hover:border-blue/40 hover:shadow-glow"
    >
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-control bg-blue-soft text-blue transition-transform duration-300 ease-expressive group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-body">{service.summary}</p>
      </div>
      <div className="mt-6 flex items-center gap-1 text-sm font-medium text-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Learn more <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
