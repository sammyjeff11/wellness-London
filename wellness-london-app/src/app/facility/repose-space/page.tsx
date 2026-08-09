import type { Metadata } from "next";
import ClosedVenuePage from "@/components/ClosedVenuePage";
import { closedVenues } from "@/lib/closed-venues";

const venue = closedVenues["repose-space"];

export const metadata: Metadata = {
  title: "Repose Space Closed | Kensington | Well+",
  description: "Repose Space London has closed. Find current infrared sauna, cryotherapy and red light therapy alternatives in London on Well+.",
  alternates: { canonical: "/facility/repose-space" },
  robots: { index: false, follow: true },
};

export default function ReposeSpaceClosedPage() {
  return <ClosedVenuePage venue={venue} />;
}
