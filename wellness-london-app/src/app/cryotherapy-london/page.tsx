import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const baseActivity = getActivityPage("cryotherapy-london")!;
const activity = {
  ...baseActivity,
  metaTitle: "Cryotherapy London: Studios, Prices & Packages | Well+",
  description:
    "Compare London cryotherapy studios by treatment type, location, price, package structure, access and whether sessions are whole-body or localised.",
  heroText:
    "Compare whole-body and localised cryotherapy across London specialist studios, recovery spaces and wellness clinics, including single-session and package options.",
  guidance: [
    ...baseActivity.guidance,
    {
      title: "Compare single sessions with packages",
      text: "Check the single-session price first, then calculate the true per-session cost of any bundle. Packages only make sense when you are likely to use the full course and the provider explains why repeat sessions are being suggested.",
    },
    {
      title: "Check what the package actually covers",
      text: "Confirm whether a package is limited to whole-body cryotherapy or can be used across localised treatments, recovery services or different branches. Expiry dates, booking restrictions and cancellation rules can materially change the value.",
    },
  ],
  faqs: [
    ...baseActivity.faqs,
    {
      question: "How should I compare cryotherapy packages in London?",
      answer:
        "Start with the single-session price, then compare the effective price per visit, number of sessions, expiry period, branch restrictions and whether the provider explains why a course is appropriate for your goal. A larger package is not automatically better value if you are unlikely to use every session.",
    },
    {
      question: "Should I book one cryotherapy session or a package?",
      answer:
        "If you are new to cryotherapy, a single session or introductory option can help you understand the format before committing. Packages may suit repeat users, but the recommended frequency and expected outcome should be clear rather than assumed.",
    },
  ],
  related: [
    ...baseActivity.related,
    {
      href: "/editorial/best-cryotherapy-london",
      label: "Best cryotherapy in London",
      text: "A practical shortlist comparing treatment format, location and wider recovery facilities.",
    },
  ],
};

export const metadata: Metadata = {
  title: activity.metaTitle,
  description: activity.description,
  alternates: { canonical: activity.canonicalHref },
};

export default function CryotherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
