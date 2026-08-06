import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedText } from "@/components/animations/AnimatedText";

export function PageHeroBanner({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
}) {
  return (
    <section className="border-b border-ink/10 bg-offwhite pb-16 pt-40 sm:pb-20 sm:pt-48">
      <div className="container-content">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-gray-body">
            <Link href="/" className="hover:text-blue">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                <Link href={crumb.href} className="hover:text-blue">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue">{eyebrow}</p>}
        <AnimatedText
          as="h1"
          text={title}
          className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        />
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-body sm:text-lg">{description}</p>}
      </div>
    </section>
  );
}
