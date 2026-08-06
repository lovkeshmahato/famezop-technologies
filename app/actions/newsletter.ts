"use server";

import { headers } from "next/headers";
import { subscribeEmail } from "@/lib/newsletter-service";
import { getClientIp } from "@/lib/rate-limit";

export async function subscribeToNewsletter(formData: FormData) {
  const ip = getClientIp(headers());
  return subscribeEmail(Object.fromEntries(formData.entries()), ip);
}
