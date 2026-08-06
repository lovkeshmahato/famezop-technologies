import { prisma } from "@/lib/prisma";
import { sendNewsletterConfirmation } from "@/lib/resend";
import { newsletterSchema } from "@/lib/validations";
import { isRateLimited } from "@/lib/rate-limit";
import type { ServiceResult } from "@/lib/contact-service";

export async function subscribeEmail(input: unknown, ip: string): Promise<ServiceResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  if (parsed.data.companyWebsite) {
    return { success: true };
  }

  if (isRateLimited(ip)) {
    return { success: false, error: "Too many requests. Please try again in a minute." };
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: {},
    create: { email: parsed.data.email },
  });

  await sendNewsletterConfirmation(parsed.data.email);

  return { success: true };
}
