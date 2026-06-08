import Link from "next/link";
import ServiceDirectory, { type ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import type { ServicePageContent } from "@/content/service-page-content";
import type { ActivityEvidenceNote } from "@/lib/activity-pages";

type ServiceIntroSectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

type ServiceDirectorySectionProps = {
  facilities: ServiceDirectoryFacility[];
  serviceType: string;
  emptyTitle: string;
  emptyText: string;
};

type ServiceGuidanceSectionProps = {
  title: string;
  points: ServicePageContent["guidancePoints"];
};

type ServiceEvidenceSectionProps = {
  title?: string;
  notes?: ActivityEvidenceNote[];
};

type ServiceInsightSectionProps = {
  eyebrow?: string;
  panels: ServicePageContent["insightPanels"];
};

type ServiceRelatedSectionProps = {
  links: ServicePageContent["internalLinks"];
};

type ServiceFaqSectionProps = {
  title: string;
  faqs: ServicePageContent["faqs"];
};

export function ServiceIntroSection({ eyebrow, title, paragraphs }: ServiceIntroSectionProps) {
  return (
    <section className="border-y border-[#cbbda9] bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-9 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">{eyebrow}</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">{title}</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#5f574c]">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceDirectorySection({ facilities, serviceType, emptyTitle, emptyText }: ServiceDirectorySectionProps) {
  return (
    <section className="bg-[#f4efe6] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ServiceDirectory facilities={facilities} serviceType={serviceType} emptyTitle={emptyTitle} emptyText={emptyText} />
      </div>
    </section>
  );
}

export function ServiceGuidanceSection({ title, points }: ServiceGuidanceSectionProps) {
  return (
    <section className="border-y border-[#cbbda9] bg-[#29241d] px-5 py-16 text-[#fbf8f1] sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">How to choose</p>
        <h2 className="mb-12 max-w-3xl font-serif text-4xl font-normal leading-tight sm:text-5xl">{title}</h2>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
          {points.map((point) => (
            <article key={point.title} className="border-t border-[#fbf8f1]/22 pt-5">
              <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#fbf8f1]">{point.title}</h3>
              <p className="text-sm leading-7 text-[#fbf8f1]/72">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceEvidenceSection({ title = "What the evidence suggests", notes = [] }: ServiceEvidenceSectionProps) {
  if (notes.length === 0) return null;

  return (
    <section className="border-b border-[#cbbda9] bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Science-informed guide</p>
          <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-5 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
            Practical notes to help you understand the likely benefits, limits and timing considerations before booking. This is not medical advice.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {notes.map((note) => (
            <article key={note.title} className="border border-[#d8cebf] bg-[#f4efe6] p-5 sm:p-6">
              <h3 className="mb-3 text-xl font-medium tracking-normal text-[#29241d]">{note.title}</h3>
              <p className="text-sm leading-7 text-[#5f574c]">{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceInsightSection({ eyebrow = "Before you book", panels }: ServiceInsightSectionProps) {
  return (
    <section className="border-b border-[#cbbda9] bg-[#eee7da] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">{eyebrow}</p>
        <div className="grid gap-5 md:grid-cols-3">
          {panels.map((panel) => (
            <article key={panel.title} className="border border-[#d8cebf] bg-[#fbf8f1] p-6 shadow-[0_20px_50px_rgba(41,36,29,0.045)] sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">{panel.title}</h3>
              <p className="text-sm leading-7 text-[#5f574c]">{panel.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceRelatedSection({ links }: ServiceRelatedSectionProps) {
  return (
    <section className="bg-[#fbf8f1] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-[#d8cebf] pb-5">
          <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Continue exploring</p>
          <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">Related recovery guides</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group block border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-7">
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">{link.label}</h3>
              <p className="text-sm leading-7 text-[#5f574c]">{link.text}</p>
              <p className="mt-6 text-sm text-[#29241d]">Explore guide →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqSection({ title, faqs }: ServiceFaqSectionProps) {
  return (
    <section className="border-t border-[#cbbda9] bg-[#eee7da] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl bg-[#fbf8f1] p-6 shadow-[0_20px_60px_rgba(41,36,29,0.05)] sm:p-8 md:p-10">
        <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Questions</p>
        <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">{title}</h2>
        <div className="space-y-7 sm:space-y-8">
          {faqs.map((faq) => (
            <article key={faq.question} className="border-t border-[#d8cebf] pt-6">
              <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
              <p className="text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
