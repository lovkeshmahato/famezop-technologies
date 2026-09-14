import { Resend } from "resend";
import { siteConfig } from "./site";
import {
  contactConfirmationEmail,
  contactNotificationEmail,
  newsletterConfirmationEmail,
} from "@/emails/templates";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Famezop Technologies <notifications@famezoptechnologies.com>";
const NOTIFY_TO = process.env.RESEND_NOTIFY_EMAIL || siteConfig.email;

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set — skipping send to ${to}: "${subject}"`);
    return { skipped: true };
  }
  return resend.emails.send({ from: FROM, to, subject, html });
}

export async function sendContactEmails(input: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}) {
  await Promise.all([
    send(NOTIFY_TO, `New lead: ${input.name}`, contactNotificationEmail(input)),
    send(input.email, "We received your message — Famezop Technologies", contactConfirmationEmail(input.name)),
  ]);
}

export async function sendNewsletterConfirmation(email: string) {
  await send(email, "You're subscribed — Famezop Technologies", newsletterConfirmationEmail());
}
