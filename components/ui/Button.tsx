import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  showArrow?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue/90 shadow-soft-sm",
  secondary: "border border-ink/15 text-ink hover:border-ink/40 bg-white",
  ghost: "text-ink hover:text-blue",
  dark: "bg-white text-ink hover:bg-white/90",
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control font-medium transition-all duration-300 ease-expressive whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  showArrow = false,
  href,
  ...props
}: BaseProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expressive group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} data-cursor-hover>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} data-cursor-hover {...props}>
      {content}
    </button>
  );
}
