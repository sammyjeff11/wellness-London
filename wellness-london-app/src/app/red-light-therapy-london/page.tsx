import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const baseActivity = getActivityPage("red-light-therapy-london")!;
const activity = {
  ...baseActivity,
  metaTitle: "Red Light Therapy London: Compare Venues | Well+",
  description:
    "Compare London red light therapy venues by setup, session format, location, price and related recovery or longevity services.",
  heroText:
    "Compare red light therapy panels, beds and treatment rooms across London recovery studios, wellness clubs and longevity clinics.",
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
