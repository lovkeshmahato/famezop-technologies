"use client";

import { useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { cn } from "@/lib/cn";

type Status = "idle" | "success" | "error";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        setStatus("success");
        setMessage("You're subscribed. Welcome aboard.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="w-full max-w-sm">
      <div
        className={cn(
          "flex items-center gap-2 rounded-control border p-1.5",
          dark ? "border-white/15 bg-white/5" : "border-ink/15 bg-white"
        )}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Your work email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(
            "h-9 w-full flex-1 bg-transparent px-3 text-sm outline-none",
            dark ? "text-white placeholder:text-white/40" : "text-ink placeholder:text-gray-body"
          )}
        />
        {/* Honeypot */}
        <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          disabled={isPending}
          className="h-9 shrink-0 rounded-control-sm bg-blue px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "..." : "Subscribe"}
        </button>
      </div>
      {status !== "idle" && (
        <p className={cn("mt-2 text-xs", status === "success" ? "text-blue" : "text-red-400", dark && status === "success" && "text-blue")}>
          {message}
        </p>
      )}
    </form>
  );
}
