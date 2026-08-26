import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("infrared-sauna-london")!;

export const metadata: Metadata = {
  title: "Infrared Sauna London: Compare Prices & Venues | Well+",
  description: "Compare London infrared sauna venues by price, location, privacy, cabin format, session length, access and wider recovery facilities.",
  alternates: { canonical: activity.canonicalHref },
};

export default function InfraredSaunaLondonPage() {
  return <ActivityServicePage activity={activity} />;
}