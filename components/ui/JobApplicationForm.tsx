"use client";

import { useState, useTransition } from "react";
import { submitJobApplicationForm } from "@/app/actions/contact";
import { Button } from "./Button";

export function JobApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitJobApplicationForm(formData);
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
        <p className="font-heading text-xl font-semibold text-ink">Application received.</p>
        <p className="mt-2 text-sm text-gray-body">
          Thanks for applying to {jobTitle} — our team will review and follow up within a week.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-control border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue placeholder:text-gray-body/70";

  return (
    <form action={handleSubmit} className="space-y-5">
      <input type="hidden" name="jobSlug" value={jobSlug} />
      <input type="hidden" name="jobTitle" value={jobTitle} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink/70">
            Full name *
          </label>
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink/70">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="jane@email.com" />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-ink/70">
          Phone
        </label>
        <input id="phone" name="phone" className={inputClasses} placeholder="+977 98XXXXXXXX" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink/70">
          Why are you a good fit? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about relevant experience, or paste a link to your portfolio/resume..."
        />
      </div>

      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={isPending} className="w-full disabled:opacity-50 sm:w-auto">
        {isPending ? "Submitting..." : "Submit application"}
      </Button>
    </form>
  );
}
