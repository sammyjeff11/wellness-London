# Editorial discovery refresh

## Purpose
Help visitors understand Well+ immediately, find a suitable London venue and make an informed booking decision. Keep the warm ivory, paper, charcoal and serif identity while giving practical information a stronger visual hierarchy.

## Implemented

- Homepage: clear proposition and search, three compact experience routes, three explicitly chosen venues with source-backed distinctions, one comparison guide, a short sourcing explanation and neighbourhood links. Removed repeated discovery panels and disabled newsletter promotions.
- Typography and surfaces: serif display headings; sans-serif venue names, prices and controls; quieter paper surfaces, fewer shadows, larger metadata and visible keyboard focus. Reduced the scale of key inner-page headers.
- Cards: intentional photo-led feature variant and compact directory variant. Names, save, location, services, price basis and practical differences have consistent positions. Removed the redundant image badge and per-card carousel. Genuine venue photography remains in features and profile galleries.
- Navigation: Venues, Services, Neighbourhoods and Guides; visible saved count; explicit desktop dropdown buttons with Escape/outside dismissal. Mobile navigation uses a native modal and expandable service groups.
- Services: one grouped index covering recovery, health testing and mobility. Removed repeated route cards, speculative counts and internal marketing language.
- Directory: search, area and service first; other filters in a native modal, selected-filter chips and a result-count action. Nearby lookup is expandable. Preserved URL state, geolocation, maps, sorting, saves and referral events. Normalised reversed mixed-session labels without conflating private format with membership access.
- Profiles: short factual overview, prominent operator booking link, at-a-glance information, booking conditions, expandable service/community detail, compact location module, clearly labelled published research and consistent alternative venue cards. Full research text and source facts remain available. Gallery uses the same native modal focus behaviour.
- Comparison: searchable venue picker, compact aligned sticky headers, optional differences view and expandable long details. Mobile initially displays two columns; an explicit control reveals all selected venues without changing the shared selection. Up to four venues, source links and booking actions remain available.
- Clinical discovery: compact diagnostic journey, assessment links followed by clinics, unified clinic cards showing tests, price basis, clinical review and results/follow-up. Clinical inclusion rules are unchanged.
- Editorial and neighbourhoods: useful picks/providers appear earlier; selection methodology is expandable; large introductory blocks move below discovery. More compact guide, area, saved and comparison headers.
- Footer: four concise navigation groups with venue-owner routes retained. Contact/email setup remains excluded. The Edit page continues to offer venue and guide links while email sign-up is unconfigured.

## Commercial and search continuity

Existing canonical URLs, static venue data, structured data, sitemap coverage, crawl directives and redirects remain in place. Search, saves, comparisons and outbound referrals retain their analytics. These are useful steps toward a booking; outbound clicks are not recorded as completed bookings or revenue.

Homepage distinctions come from the existing published snapshot: Arc's guided/free-flow/community format, BXR LAB's separately bookable recovery appointments and Cloud Twelve's public spa bookings alongside individual treatments. They are not first-hand reviews or paid rankings.

## Validation

- Production build, TypeScript and ESLint.
- 55 passing tests, including new checks for mixed session formats and substantive comparison differences.
- HTTP crawl of all 181 sitemap URLs: successful responses, one H1, title, description and canonical present; no accidental no-index header on these routes.
- Query variants retain `noindex, follow`; geolocation remains allowed for the same origin.
- Rendered-content checks confirm homepage repetition/newsletter removal, the compact service groups, profile fact ordering and researched rather than first-hand presentation.
- Corrected a pre-existing partial test-fixture cast exposed by the production type-check; production data types are unchanged.

## Remaining visual verification

The connected browser cannot reach the local server. Vercel previews require an authenticated session, so automated desktop/mobile screenshots and interaction verification of this branch remain outstanding. Native dialog semantics and responsive source structure were reviewed, but are not a substitute for a rendered browser check.

Before merging, inspect the PR preview at 390px and 1440px: homepage, services, explore, Arc profile, longevity, Shoreditch, a researched shortlist and comparison. Check menu/filter/gallery Escape and focus return, filtering and browser history, save/unsave persistence, two/four-venue comparison, long names/unknown prices and external booking links. No measured conversion uplift or ranking improvement is claimed before release data exists.
