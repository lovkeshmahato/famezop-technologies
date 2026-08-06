"use server";

import { headers } from "next/headers";
import { submitContact, submitJobApplication } from "@/lib/contact-service";
import { getClientIp } from "@/lib/rate-limit";

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function submitContactForm(formData: FormData) {
  const ip = getClientIp(headers());
  return submitContact(formDataToObject(formData), ip);
}

export async function submitJobApplicationForm(formData: FormData) {
  const ip = getClientIp(headers());
  return submitJobApplication(formDataToObject(formData), ip);
}
