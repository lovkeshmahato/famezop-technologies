import { prisma } from "@/lib/prisma";
import { sendContactEmails } from "@/lib/resend";
import { contactSchema, jobApplicationSchema, type ContactInput } from "@/lib/validations";
import { isRateLimited } from "@/lib/rate-limit";

export type ServiceResult = { success: true } | { success: false; error: string };

export async function submitContact(input: unknown, ip: string): Promise<ServiceResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  if (parsed.data.companyWebsite) {
    // Honeypot tripped — pretend success so bots don't learn anything.
    return { success: true };
  }

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again in a minute." };
  }

  const data: ContactInput = parsed.data;

  await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      serviceInterest: data.serviceInterest || null,
      message: data.message,
      source: "CONTACT_FORM",
    },
  });

  await sendContactEmails({
    name: data.name,
    email: data.email,
    company: data.company,
    phone: data.phone,
    serviceInterest: data.serviceInterest,
    message: data.message,
  });

  return { success: true };
}

export async function submitJobApplication(input: unknown, ip: string): Promise<ServiceResult> {
  const parsed = jobApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  if (parsed.data.companyWebsite) {
    return { success: true };
  }

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again in a minute." };
  }

  const data = parsed.data;

  await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      serviceInterest: data.jobTitle,
      message: data.message,
      source: "CAREERS_APPLICATION",
    },
  });

  await sendContactEmails({
    name: data.name,
    email: data.email,
    serviceInterest: `Application: ${data.jobTitle}`,
    message: data.message,
  });

  return { success: true };
}
