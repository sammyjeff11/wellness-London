import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Well+ | London Wellness Directory",
  description:
    "Contact Well+ about website feedback, editorial enquiries, venue listing updates or commercial partnerships.",
  alternates: { canonical: "/contact" },
};

const contactRoutes = [
  {
    href: "/claim-listing",
    title: "Claim or update a listing",
    text: "Verify venue information, correct details or supply approved imagery for an existing profile.",
  },
  {
    href: "/work-with-well-plus",
    title: "Work with Well+",
    text: "Discuss editorial visits, launches, partnerships or future commercial opportunities.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-4">Contact</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.055em] sm:text-7xl md:text-8xl">
            The right route to Well+.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
            Use the dedicated route for listing or partnership enquiries. General feedback and editorial questions can be sent through the form below.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {contactRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="group rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 transition hover:border-[#6f6048] hover:bg-[#fffaf0]">
                <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.035em] group-hover:underline group-hover:underline-offset-4">
                  {route.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">{route.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8cebf]/70 bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <InquiryForm kind="general" source="contact_page" />
        </div>
      </section>
    </main>
  );
}
