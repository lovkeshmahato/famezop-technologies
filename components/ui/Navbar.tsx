"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 32);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-expressive",
        scrolled || mobileOpen
          ? "bg-white/85 backdrop-blur-md shadow-soft-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-content flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-ink" data-cursor-hover>
          Famezop <span className="text-blue">Technologies</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    active ? "text-blue" : "text-ink/80 hover:text-ink"
                  )}
                  data-cursor-hover
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-blue"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex">
          <Button href="/contact" size="md" showArrow>
            Book Free Consultation
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-control lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-white lg:hidden"
          >
            <ul className="container-content flex flex-col gap-1 py-6">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-ink/80 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button href="/contact" className="w-full" showArrow>
                  Book Free Consultation
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
