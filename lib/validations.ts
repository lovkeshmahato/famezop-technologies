import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  serviceInterest: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more — at least 10 characters").max(4000),
  companyWebsite: z.string().max(0, "Spam detected").optional().or(z.literal("")), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  companyWebsite: z.string().max(0, "Spam detected").optional().or(z.literal("")), // honeypot
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const jobApplicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  jobSlug: z.string().trim().min(1),
  jobTitle: z.string().trim().min(1),
  message: z.string().trim().min(10).max(4000),
  companyWebsite: z.string().max(0).optional().or(z.literal("")), // honeypot
});
