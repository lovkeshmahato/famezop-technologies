"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { getAllServices } from "@/lib/content/services";
import { cn } from "@/lib/cn";

const services = getAllServices();

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(result.error || "Something went wrong. Please try again.");
      }
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-blue/20 bg-blue-soft p-8">
        <p className="font-heading text-xl font-semibold text-ink">Message received.</p>
        <p className="mt-2 text-sm text-gray-body">
          Thanks for reaching out — a member of our team will follow up within one business day.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-control border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue placeholder:text-gray-body/70";

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink/70">
            Full name *
          </label>
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink/70">
            Work email *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-ink/70">
            Company
          </label>
          <input id="company" name="company" className={inputClasses} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="serviceInterest" className="mb-1.5 block text-xs font-medium text-ink/70">
            Service interest
          </label>
          <select id="serviceInterest" name="serviceInterest" className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink/70">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputClasses, "resize-none")}
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Honeypot — hidden from real users */}
      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-control bg-blue text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {isPending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
