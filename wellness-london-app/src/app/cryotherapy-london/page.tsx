import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("cryotherapy-london")!;

export const metadata: Metadata = {
  title: activity.metaTitle,
  description: activity.description,
  alternates: { canonical: activity.canonicalHref },
};

export default function CryotherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
