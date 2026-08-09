import type { Metadata } from "next";
import ClosedVenuePage from "@/components/ClosedVenuePage";
import { closedVenues } from "@/lib/closed-venues";

const venue = closedVenues["koyo-wellness"];

export const metadata: Metadata = {
  title: "KOYO Wellness Closed | Richmond | Well+",
  description: "KOYO Wellness in Richmond has permanently closed. Find current London sauna, cold plunge and red light therapy alternatives on Well+.",
  alternates: { canonical: "/facility/koyo-wellness" },
  robots: { index: false, follow: true },
};

export default function KoyoWellnessClosedPage() {
  return <ClosedVenuePage venue={venue} />;
}
