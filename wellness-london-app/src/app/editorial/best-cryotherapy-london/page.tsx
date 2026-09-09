import type { Metadata } from "next";
import ResearchedShortlist from "@/components/ResearchedShortlist";
const title = "Best cryotherapy in London: a researched shortlist";
const description = "Compare London cryotherapy providers by location, clinical setting and appointment format. Read practical differences and check branch-specific services before booking.";
export const metadata: Metadata = { title: `${title} | Well+`, description, alternates: { canonical: "/editorial/best-cryotherapy-london" }, openGraph: { title, description, type: "article", url: "/editorial/best-cryotherapy-london" } };
const picks = [
  {
    "slug": "london-cryo",
    "reason": "A publicly bookable St John\u2019s Wood clinic with a dedicated treatment booking route.",
    "check": "The venue\u2019s starting price is not confirmed as the price of a specific cryotherapy session."
  },
  {
    "slug": "london-cryo-belgravia",
    "reason": "A second LondonCryo location for comparing travel and appointment availability.",
    "check": "Select Belgravia when booking and verify the chosen treatment; services can vary by branch."
  },
  {
    "slug": "hum2n",
    "reason": "A clinic setting whose published service catalogue explicitly includes whole-body cryotherapy.",
    "check": "Ask about consultation, screening, the exact protocol and treatment price; this is a broader clinic, not a standalone cold-exposure studio."
  }
];
export default function Page() { return <ResearchedShortlist title={title} description={description} path="/editorial/best-cryotherapy-london" serviceHref="/cryotherapy-london" picks={picks} />; }
