import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("contrast-therapy-london")!;

export const metadata: Metadata = {
  title: activity.metaTitle,
  description: activity.description,
  alternates: { canonical: activity.canonicalHref },
};

export default function ContrastTherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
