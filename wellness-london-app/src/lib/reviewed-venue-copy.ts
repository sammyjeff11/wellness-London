/** Copy review, 9 September 2026. Existing snapshot facts retained; no visit implied.
 * Deliberate overrides survive snapshot refreshes. Source provenance is documented
 * in docs/factual-copy-review.md. No source-check dates are changed by this module.
 */
const descriptions: Record<string, string> = {
  "arc-canary-wharf":
    "Arc in Canary Wharf offers communal sauna and ice baths. Its published timetable includes Guided Classes, Free Flow sessions and Evening Socials. Check the session listing for the format and what is included.",
  rebase:
    "Rebase is a Marylebone studio listing contrast therapy, HBOT, cryotherapy, infrared sauna, red light therapy, compression, IV drips and massage. Shared and private formats depend on the service booked.",
  "lowlu-kentish-town":
    "Lowlu Kentish Town lists outdoor saunas, cold plunges, hot showers and changing facilities. Public sessions, private sauna hire and full-site hire are separate booking options.",
  "community-sauna-baths-hackney-wick":
    "Community Sauna Baths Hackney Wick offers shared sauna and cold-plunge sessions. The operator also lists community sessions and events; check the timetable for current formats and eligibility.",
  "preventicum-london":
    "Preventicum is a preventive-health clinic listing doctor-led assessments, MRI, ultrasound and cardiac testing. Tests, consultations and results arrangements depend on the assessment package; check the chosen package before booking.",
  "third-space-canary-wharf":
    "Third Space Canary Wharf lists gym facilities, a pool, sauna, spa services and classes. Club facilities require membership; separately bookable spa treatments should not be assumed to include general club access.",
  "third-space-mayfair":
    "Third Space Mayfair lists a Himalayan salt-wall sauna, steam room, ice baths and Normatec equipment. Access to these club facilities requires membership.",
  "equinox-st-jamess":
    "Equinox St James’s lists gym facilities, Pilates, sauna, steam and spa treatments. The published access model distinguishes club membership from separately bookable spa appointments.",
};
export function reviewedVenueDescription(slug: string, fallback: string) {
  if (slug.startsWith("stretchlab-"))
    return "StretchLAB offers one-to-one assisted stretching. The operator describes physiotherapist-led staff training; this does not mean every appointment is delivered or directly supervised by a physiotherapist. Check the practitioner and appointment type when booking.";
  return (
    descriptions[slug] ||
    fallback
      .replace(
        "It is closer to an immersive bathing experience than a conventional treatment-led spa.",
        "Check the package for bath access, treatment time and any age restrictions.",
      )
      .replace(
        "It offers a practical local spa format rather than hotel-style day-spa luxury.",
        "Check whether the booking includes thermal access, a treatment, or both.",
      )
      .replace(
        "It is best understood as a full members' club with wellness built into the experience, rather than a premium gym that sells open memberships. ",
        "",
      )
  );
}
