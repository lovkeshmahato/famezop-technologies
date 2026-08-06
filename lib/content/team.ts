import type { TeamMember } from "./types";
import { sanityFetch } from "@/lib/sanity-client";

export const team: TeamMember[] = [
  { name: "Anish Bhattarai", role: "Founder & CEO", location: "Kathmandu, Nepal", bio: "15 years building software teams across South Asia and the Gulf." },
  { name: "Kritika Sharma", role: "VP of Engineering", location: "Bengaluru, India", bio: "Leads architecture standards across every client engagement." },
  { name: "Omar Al Suwaidi", role: "Head of Delivery, MENA", location: "Dubai, UAE", bio: "Runs client delivery for enterprise engagements across the Gulf." },
  { name: "Nisha Gurung", role: "Head of Design", location: "Kathmandu, Nepal", bio: "Built design systems for products used by millions across South Asia." },
  { name: "Rohan Mehta", role: "Head of AI", location: "Bengaluru, India", bio: "Leads AI agent and RAG system architecture for enterprise clients." },
  { name: "Fatima Al Zaabi", role: "Head of Client Success", location: "Dubai, UAE", bio: "Owns long-term relationship health across every dedicated team engagement." },
];

export async function fetchTeam() {
  return sanityFetch<TeamMember[]>({
    query: `*[_type == "teamMember"] | order(order asc) { name, role, location, bio }`,
    fallback: team,
    tags: ["teamMember"],
  });
}
