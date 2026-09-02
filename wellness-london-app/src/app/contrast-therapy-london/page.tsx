import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const activity = getActivityPage("contrast-therapy-london")!;

export const metadata: Metadata = {
  title: "Contrast Therapy London: Sauna & Cold Plunge | Well+",
  description: "Compare London contrast therapy venues combining sauna and cold plunge, with location, access, price and session-format details.",
  alternates: { canonical: activity.canonicalHref },
};

export default function ContrastTherapyLondonPage() {
  return <ActivityServicePage activity={activity} />;
}
