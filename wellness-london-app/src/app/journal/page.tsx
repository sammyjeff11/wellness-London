import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal | Well Edit",
  description:
    "Editorial notes from Well Edit on London recovery rituals, wellness spaces and calmer ways to move through the city.",
  alternates: {
    canonical: "/journal",
  },
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] px-5 py-16 text-[#29241d] sm:px-6 sm:py-24 md:py-32">
      <section className="mx-auto max-w-4xl">
        <p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-[#6f6048] sm:mb-8 sm:tracking-[0.28em]">
          Journal
        </p>
        <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">
          Notes on recovery, ritual and city wellness.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-[#70695d] sm:mt-10 sm:text-lg sm:leading-9">
          The Well Edit journal is being shaped as a quieter editorial layer for the directory: considered guides, venue notes and practical recovery observations from across London.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block text-sm text-[#29241d] underline underline-offset-4 sm:mt-12"
        >
          Return to the edit
        </Link>
      </section>
    </main>
  );
}
