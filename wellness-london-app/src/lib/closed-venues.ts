export type ClosedVenue = {
  slug: string;
  name: string;
  location: string;
  closureCopy: string;
  serviceLinks: { href: string; label: string }[];
};

export const closedVenues: Record<string, ClosedVenue> = {
  "koyo-wellness": {
    slug: "koyo-wellness",
    name: "KOYO Wellness",
    location: "Richmond",
    closureCopy:
      "KOYO Wellness has permanently closed and is no longer available to book. This page is retained so people arriving from older links or search results are not sent to an unexplained error page.",
    serviceLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold plunge in London" },
      { href: "/red-light-therapy-london", label: "Red light therapy in London" },
    ],
  },
  "repose-space": {
    slug: "repose-space",
    name: "Repose Space",
    location: "Kensington",
    closureCopy:
      "Repose Space London ceased trading on 25 February 2026 and is no longer available to book. This legacy page is retained to give visitors a clear answer and direct them towards current London alternatives.",
    serviceLinks: [
      { href: "/infrared-sauna-london", label: "Infrared sauna in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/red-light-therapy-london", label: "Red light therapy in London" },
    ],
  },
  "re-place": {
    slug: "re-place",
    name: "Re Place",
    location: "Notting Hill",
    closureCopy:
      "Re Place has permanently closed and is no longer available to book. This page remains as a legacy notice so older links lead to a useful answer rather than a dead end.",
    serviceLinks: [
      { href: "/reset", label: "Reset spaces in London" },
      { href: "/stress-regulation-london", label: "Stress regulation in London" },
      { href: "/west-london-wellness", label: "West London wellness" },
    ],
  },
};
