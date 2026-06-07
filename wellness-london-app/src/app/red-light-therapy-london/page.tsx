import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("red-light-therapy-london")!;

export const metadata: Metadata = {
  title: activity.metaTitle,
  description: activity.description,
  alternates: { canonical: activity.canonicalHref },
};

export default function RedLightTherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
