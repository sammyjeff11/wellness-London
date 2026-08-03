"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type InquiryKind = "general" | "listing" | "partnership";

type InquiryFormProps = {
  kind: InquiryKind;
  source: string;
  defaultVenue?: string;
  defaultListingUrl?: string;
};

const enquiryOptions: Record<InquiryKind, string[]> = {
  general: ["General question", "Editorial enquiry", "Website feedback", "Something else"],
  listing: ["Claim this listing", "Correct listing information", "Supply approved images", "Request a new listing"],
  partnership: ["Editorial visit", "Commercial partnership", "Product collaboration", "Venue launch or event"],
};

const formTitle: Record<InquiryKind, string> = {
  general: "Send an enquiry",
  listing: "Tell us what needs updating",
  partnership: "Start a conversation",
};

export default function InquiryForm({ kind, source, defaultVenue = "", defaultListingUrl = "" }: InquiryFormProps) {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const isConfigured = Boolean(contactEmail);
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!contactEmail) {
      setStatus("Submissions are temporarily paused while the Well+ business inbox is being set up.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const replyEmail = String(formData.get("email") || "").trim();
    const organisation = String(formData.get("organisation") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const enquiryType = String(formData.get("enquiryType") || "").trim();
    const listingUrl = String(formData.get("listingUrl") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subjectPrefix = kind === "listing" ? "Listing enquiry" : kind === "partnership" ? "Partnership enquiry" : "Website enquiry";
    const subject = `${subjectPrefix}: ${organisation || enquiryType || name}`;
    const body = [
      `Name: ${name}`,
      `Reply email: ${replyEmail}`,
      organisation ? `Venue / organisation: ${organisation}` : "",
      website ? `Website: ${website}` : "",
      listingUrl ? `Well+ listing: ${listingUrl}` : "",
      `Enquiry type: ${enquiryType}`,
      "",
      message,
      "",
      `Source: ${source}`,
    ]
      .filter(Boolean)
      .join("\n");

    trackEvent("inquiry_form_submit", {
      enquiry_kind: kind,
      enquiry_type: enquiryType,
      source,
    });

    setStatus("Opening your email app with the enquiry prepared.");
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full rounded-[0.9rem] border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-3 text-sm text-[#29241d] outline-none transition placeholder:text-[#8a7f70] focus:border-[#6f6048] disabled:cursor-not-allowed disabled:opacity-55";
  const labelClass = "mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#7b7062]";

  return (
    <div className="rounded-[1.2rem] border border-[#d8cebf]/75 bg-[#f4efe6] p-6 shadow-[0_18px_48px_rgba(41,36,29,0.04)] sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#8a7f70]">Contact Well+</p>
      <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-4xl">{formTitle[kind]}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f574c]">
        The form prepares an email in your own email app. No details are stored on the website.
      </p>

      {!isConfigured ? (
        <div className="mt-6 rounded-[0.9rem] border border-[#d8cebf] bg-[#fbf8f1] px-4 py-4 text-sm leading-6 text-[#5f574c]">
          The page and form are ready. Submissions will activate when the Well+ business email address is connected.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <fieldset disabled={!isConfigured} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Your name</span>
              <input className={inputClass} name="name" type="text" autoComplete="name" required placeholder="Name" />
            </label>
            <label>
              <span className={labelClass}>Your email</span>
              <input className={inputClass} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className={labelClass}>{kind === "listing" ? "Venue name" : "Venue or organisation"}</span>
              <input
                className={inputClass}
                name="organisation"
                type="text"
                defaultValue={defaultVenue}
                required={kind !== "general"}
                placeholder={kind === "listing" ? "Venue name" : "Organisation name"}
              />
            </label>
            <label>
              <span className={labelClass}>Website</span>
              <input className={inputClass} name="website" type="url" inputMode="url" placeholder="https://" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Enquiry type</span>
              <select className={inputClass} name="enquiryType" required defaultValue="">
                <option value="" disabled>Select an option</option>
                {enquiryOptions[kind].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            {kind === "listing" ? (
              <label>
                <span className={labelClass}>Current Well+ listing URL</span>
                <input
                  className={inputClass}
                  name="listingUrl"
                  type="text"
                  defaultValue={defaultListingUrl}
                  placeholder="/facility/venue-slug"
                />
              </label>
            ) : null}
          </div>

          <label>
            <span className={labelClass}>{kind === "listing" ? "Requested changes or verification details" : "Your message"}</span>
            <textarea
              className={`${inputClass} min-h-40 resize-y`}
              name="message"
              required
              placeholder={kind === "listing" ? "Tell us what should be corrected, verified or added." : "How can we help?"}
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31] disabled:cursor-not-allowed disabled:opacity-55"
          >
            Prepare enquiry
          </button>
        </fieldset>
      </form>

      {status ? <p className="mt-4 text-sm leading-6 text-[#5f574c]" aria-live="polite">{status}</p> : null}
    </div>
  );
}
