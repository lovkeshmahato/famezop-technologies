import type { Testimonial } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const testimonials: Testimonial[] = [
  {
    quote: "We finally have one number for inventory across every branch. Reconciliation went from a week to an afternoon.",
    author: "Suresh Shrestha",
    role: "COO",
    company: "MeroPasal Retail Group",
    industry: "Retail",
  },
  {
    quote: "Our front desk isn't fighting three systems anymore. That alone changed how our staff feel about their day.",
    author: "Dr. Anjali Rao",
    role: "Medical Director",
    company: "CareCloud Hospitals",
    industry: "Healthcare",
  },
  {
    quote: "They understood regulatory constraints as well as our compliance team did. That's rare in a dev partner.",
    author: "Priya Nair",
    role: "Head of Product",
    company: "FinLynk",
    industry: "Fintech",
  },
  {
    quote: "Famezop's team felt like an extension of ours from week one — same standups, same Slack channel, zero handoff friction.",
    author: "Marcus Yeo",
    role: "VP Engineering",
    company: "Orbit Logistics",
    industry: "Logistics",
  },
  {
    quote: "We shipped our MVP in ten weeks and closed our seed round two months later. The architecture didn't need a rewrite to scale.",
    author: "Sara Al Mansoori",
    role: "Founder & CEO",
    company: "Nomad Health",
    industry: "Startups",
  },
  {
    quote: "Transparent reporting every week meant we never had a single surprise over an eight-month engagement.",
    author: "Rajiv Malhotra",
    role: "Director of IT",
    company: "Haven Relief Network",
    industry: "NGO",
  },
];

export function getAllTestimonials() {
  return testimonials;
}

export async function fetchTestimonials() {
  return sanityFetch<Testimonial[]>({
    query: `*[_type == "testimonial"]{ quote, author, role, company, industry }`,
    fallback: getAllTestimonials(),
    tags: ["testimonial"],
  });
}
