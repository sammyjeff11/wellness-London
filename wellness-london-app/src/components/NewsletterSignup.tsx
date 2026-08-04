"use client";

import type { FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

type NewsletterSignupProps = {
  source: string;
  title?: string;
  copy?: string;
  variant?: "light" | "dark";
  compact?: boolean;
};

export default function NewsletterSignup({
  source,
  title = "The Well+ Edit",
  copy = "New London wellness openings, useful treatment guides and the places worth knowing about — sent occasionally.",
  variant = "light",
  compact = false,
}: NewsletterSignupProps) {
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION?.trim();
  const isConfigured = Boolean(endpoint);
  const isDark = variant === "dark";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!endpoint) {
      event.preventDefault();
      return;
    }

    trackEvent("newsletter_signup_submit", { source });
  }

  return (
    <div
      className={
        isDark
          ? "rounded-[1.1rem] border border-[#fbf8f1]/18 bg-[#fbf8f1]/[0.04] p-5 sm:p-6"
          : "rounded-[1.2rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 shadow-[0_18px_48px_rgba(41,36,29,0.04)] sm:p-8"
      }
    >
      <p className={`text-[10px] uppercase tracking-[0.22em] ${isDark ? "text-[#fbf8f1]/58" : "text-[#8a7f70]"}`}>
        Stay close to the edit
      </p>
      <h2 className={`${compact ? "mt-3 text-2xl sm:text-3xl" : "mt-4 text-3xl sm:text-4xl"} font-serif font-normal leading-tight tracking-[-0.04em]`}>
        {title}
      </h2>
      <p className={`${compact ? "mt-3 text-sm leading-6" : "mt-4 max-w-2xl text-base leading-7"} ${isDark ? "text-[#fbf8f1]/72" : "text-[#5f574c]"}`}>
        {copy}
      </p>

      <form
        action={endpoint || undefined}
        method="post"
        onSubmit={handleSubmit}
        className={`${compact ? "mt-5" : "mt-6"} flex flex-col gap-3 sm:flex-row`}
      >
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={!isConfigured}
          placeholder="you@example.com"
          className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-55 ${
            isDark
              ? "border-[#fbf8f1]/24 bg-[#fbf8f1]/[0.07] text-[#fbf8f1] placeholder:text-[#fbf8f1]/42 focus:border-[#fbf8f1]/60"
              : "border-[#cfc3b2] bg-[#f4efe6] text-[#29241d] placeholder:text-[#8a7f70] focus:border-[#6f6048]"
          }`}
        />
        <input type="hidden" name="source" value={source} />
        <button
          type="submit"
          disabled={!isConfigured}
          className={`rounded-full px-6 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-55 ${
            isDark
              ? "bg-[#fbf8f1] text-[#29241d] hover:bg-[#eee7da]"
              : "bg-[#29241d] text-[#fbf8f1] hover:bg-[#463c31]"
          }`}
        >
          {isConfigured ? "Join the edit" : "Opening shortly"}
        </button>
      </form>

      <p className={`mt-3 text-xs leading-5 ${isDark ? "text-[#fbf8f1]/52" : "text-[#8a7f70]"}`} aria-live="polite">
        {isConfigured
          ? "Occasional emails only. Unsubscribe at any time."
          : "The signup design is ready and will activate once the mailing-list service is connected."}
      </p>
    </div>
  );
}
