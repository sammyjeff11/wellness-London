import type { Metadata } from "next";
import ClosedVenuePage from "@/components/ClosedVenuePage";
import { closedVenues } from "@/lib/closed-venues";

const venue = closedVenues["re-place"];

export const metadata: Metadata = {
  title: "Re Place Closed | Notting Hill | Well+",
  description: "Re Place in Notting Hill has permanently closed. Find current reset, stress regulation and West London wellness options on Well+.",
  alternates: { canonical: "/facility/re-place" },
  robots: { index: false, follow: true },
};

export default function RePlaceClosedPage() {
  return <ClosedVenuePage venue={venue} />;
}
