import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("sauna-london")!;

export const metadata: Metadata = {
  title: "Sauna London: Compare Saunas, Prices & Locations | Well+",
  description: "Compare sauna venues across London by sauna type, price, location, access, facilities and whether cold plunge is included.",
  alternates: { canonical: activity.canonicalHref },
};

export default function SaunaLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
