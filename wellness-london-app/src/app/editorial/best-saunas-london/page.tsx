import type { Metadata } from "next";
import ResearchedShortlist from "@/components/ResearchedShortlist";
const title = "Best saunas in London: compare the formats";
const description = "Compare a researched shortlist of London saunas: communal sessions, banya, guided contrast and private booking options, with sources and clear price conditions.";
export const metadata: Metadata = { title: `${title} | Well+`, description, alternates: { canonical: "/editorial/best-saunas-london" }, openGraph: { title, description, type: "article", url: "/editorial/best-saunas-london" } };
const picks = [
  {
    "slug": "community-sauna-baths-peckham",
    "reason": "A simple communal sauna with a published 75-minute ticket, useful for comparing straightforward access costs.",
    "check": "This site has no cold plunge. Check its Friday-to-Sunday timetable."
  },
  {
    "slug": "banya-no-1-chiswick",
    "reason": "A banya format with a published 90-minute access price, separating entry from treatments.",
    "check": "Parenie and other treatments cost extra; compare the total for the visit you want."
  },
  {
    "slug": "arc-canary-wharf",
    "reason": "A communal sauna and ice-bath setting with guided and self-directed options.",
    "check": "Choose the actual session format in the timetable; communal does not mean a private room."
  },
  {
    "slug": "banya-no-1-hoxton",
    "reason": "Offers public, private and gender-specific booking formats at the same venue.",
    "check": "Compare the chosen format and package in the live booking calendar."
  },
  {
    "slug": "skuna-sauna-boat-canary-wharf",
    "reason": "Shared sauna-boat sessions provide a different setting from an indoor studio.",
    "check": "Private boat prices vary with capacity. Bring a towel or check the on-site charge."
  },
  {
    "slug": "sauna-social-club-peckham",
    "reason": "A session-calendar model with different formats and a published unwaged concession.",
    "check": "The lowest listed price is a concession, not the standard price for everyone."
  }
];
export default function Page() { return <ResearchedShortlist title={title} description={description} path="/editorial/best-saunas-london" serviceHref="/sauna-london" picks={picks} />; }
