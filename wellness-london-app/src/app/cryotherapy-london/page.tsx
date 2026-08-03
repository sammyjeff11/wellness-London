import type { Metadata } from "next";
import ActivityServicePage from "@/components/ActivityServicePage";
import { getActivityPage } from "@/lib/activity-pages";

const baseActivity = getActivityPage("cryotherapy-london")!;
const activity = {
  ...baseActivity,
  metaTitle: "Cryotherapy London: Compare Studios & Treatments | Well+",
  description:
    "Compare London cryotherapy studios by treatment type, location, price, access and whether sessions are whole-body or localised.",
  heroText:
    "Compare whole-body and localised cryotherapy across London specialist studios, recovery spaces and wellness clinics.",
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
