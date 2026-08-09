import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const baseActivity = getActivityPage("red-light-therapy-london")!;
const activity = {
  ...baseActivity,
  metaTitle: "Red Light Therapy London: Compare Venues & Prices | Well+",
  description:
    "Compare London red light therapy venues by setup, session format, location, price, wavelength information and related recovery or longevity services.",
  heroText:
    "Compare red light therapy panels, beds and treatment rooms across London recovery studios, wellness clubs and longevity clinics.",
  guidance: [
    ...baseActivity.guidance,
    {
      title: "Compare the actual setup",
      text: "A red-light room, full-body bed and targeted panel are not the same experience. Check whether the treatment is full-body or localised, how close you are to the device and whether the venue publishes useful wavelength or protocol information.",
    },
    {
      title: "Look beyond the session price",
      text: "If you plan to use red light repeatedly, compare single-session pricing with packs or memberships, then check expiry dates, booking restrictions and whether access is bundled with other recovery services.",
    },
    {
      title: "Match the venue to the goal",
      text: "Some venues position red light around skin and aesthetics, others around recovery, pain or longevity. Choose the setting and protocol that fits the reason you are booking rather than treating every red-light session as interchangeable.",
    },
  ],
  faqs: [
    ...baseActivity.faqs,
    {
      question: "How much does red light therapy cost in London?",
      answer:
        "Prices vary by venue, device, session length and whether red light is booked on its own or within a wider recovery membership. Compare the current venue listing and booking page for single-session and package pricing.",
    },
    {
      question: "Is a red light therapy bed better than a panel?",
      answer:
        "Not automatically. Beds can provide broader exposure, while panels may be used for targeted or full-body sessions depending on the setup. Wavelengths, distance, treatment time and the protocol matter more than the format name alone.",
    },
    {
      question: "What should I compare between red light therapy venues?",
      answer:
        "Compare whether treatment is full-body or targeted, the device format, any published wavelength information, session length, privacy, staff guidance, price and whether the venue combines red light with other recovery or longevity services.",
    },
  ],
  related: [
    ...baseActivity.related.filter((link) => link.href !== "/longevity"),
    {
      href: "/longevity",
      label: "Longevity clinics",
      text: "Compare diagnostic and medically led longevity providers across London.",
    },
  ],
};

export const metadata: Metadata = {
  title: activity.metaTitle,
  description: activity.description,
  alternates: { canonical: activity.canonicalHref },
};

export default function RedLightTherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
