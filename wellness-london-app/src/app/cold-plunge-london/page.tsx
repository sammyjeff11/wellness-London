import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("cold-plunge-london")!;

export const metadata: Metadata = {
  title: "Cold Plunge London: Ice Baths, Prices & Locations | Well+",
  description: "Compare London cold plunge and ice bath venues by price, location, access, facilities and whether sauna or full contrast therapy is included.",
  alternates: { canonical: activity.canonicalHref },
};

export default function ColdPlungeLondonPage() {
  return <ActivityServicePage activity={activity} />;
}