# Growth review implementation

## Outcome and scope

This change implements the website-side improvements from the September 2026 growth review. Contact, newsletter delivery, listing-claim submissions and domain-email setup are deliberately outside this change at the owner's request. It does not claim improved rankings, sales or verified bookings before measurement.

## Implemented

- Home search is a GET form with keyboard submission and a matching full-results link. Search no longer matches unrelated descriptions through short reverse substrings; multi-term queries retain location constraints.
- Directory filters, search, sort and list/map choice are URL-backed and respond to refresh and browser history. Clinical filters use the same mechanism. Query variants have clean canonical URLs and `X-Robots-Tag: noindex, follow`; primary directory pages remain statically rendered and indexable.
- The service Access filter now uses public/member access. Privacy/session format and guidance are separate controls. Sauna discovery includes infrared formats.
- Explore and service headers are shorter; service and diagnostic directories precede long-form guides. Cards without venue photography use compact headers. Titles wrap and card summaries use descriptive copy instead of generic suitability tags.
- A shared price presenter keeps amount, period and offer basis together across cards, maps, profiles, brands, Shoreditch and comparison. Annual/monthly memberships, joining fees, consultations, concessions and intro offers are identified. Unconfirmed units remain explicit. Only confirmed ordinary session amounts enter session-price filters/sorting; assessment filters exclude membership and consultation amounts. A venue's generic entry price is never substituted for an HBOT session price.
- Existing confirmed diagnostic labels and explicit social-format fields are exposed without changing clinical eligibility. Recorded appointment durations are shown only for the exact published offer; missing durations remain unknown.
- Save is available on cards and profiles. Comparison uses a keyboard-scrollable semantic table, keeps essential unknowns visible, shows full services, inclusion notes, source and check date, and links to operator prices/availability. Removing the last comparison item clears its URL parameter.
- Profiles have location-specific metadata, visible operator sources/check dates, and honest outbound CTAs. Unattributed rating pills are removed. Duplicate access notes are removed.
- Directory cards still deduplicate physical locations. The distinct Third Space public-treatment profile remains accessible, saveable, comparable and in the sitemap because its non-member treatment access differs from the main members-only club. No redirect merges these two offers.
- Sauna and cryotherapy editorials now use explicit researched selections and factual reasons/trade-offs, with sources and method. Automatic quality winners, generic first-timer recommendations and unsourced medical benefit summaries were removed from these two shortlist articles.
- Editorial standards explain sourcing, visits versus research, commercial disclosures, corrections, prices and health-content boundaries.
- Geolocation policy permits same-origin use; the directory accurately explains the postcode lookup provider. Device-location permission remains a user choice.
- Outbound intent is measured as `venue_outbound_click`, with `venue_unique_referral` once per venue per browser-tab session when session storage works. Existing analytics events remain. These events are referrals, not bookings.

## Pricing maintenance

`venue-pricing.ts` carries the offer context already recorded in the reviewed directory snapshot. Check the corresponding operator source and Good To Know field when changing a venue's entry price or offer. Do not reuse a membership, concession or intro amount as a standard treatment/session price. Missing information is preferable to an invented unit or inferred inclusion. Extend the typed offer context and regression tests when additional prices are confirmed.

## Verification completed

- Production build and ESLint pass.
- 53 automated tests pass, including search, pricing, URL state, referral deduplication and blocked-storage shortlist behaviour.
- All 181 sitemap routes return successfully with one H1, unique titles/descriptions and matching self-canonical URLs. Filter-query noindex headers and the geolocation policy were verified against the production build.
- Vercel successfully builds the pull request preview. Desktop/mobile interactive and visual checks remain outstanding: the local browser route is inaccessible and the Vercel preview requires account login. No visual pass or Core Web Vitals score is claimed.

## Release acceptance

1. Search Neko from the home page with Enter; only matching venues appear in Explore. Follow View all matching venues and confirm the same query.
2. Apply service, area, access and session format; reload, use Back/Forward and share the URL. Clear filters without losing unrelated attribution parameters.
3. Save venues from a service page, profile and neighbourhood/brand card; open Saved and compare. Check a membership against a public session and confirm that their price bases remain distinct.
4. Confirm DEXA and VO2 results are still restricted to the explicitly confirmed providers; check the diagnostic label links.
5. Check desktop and 390px mobile widths: usable filter selects, visible focus, no page overflow, contained comparison scrolling, and no large empty image panels.
6. Verify canonical, sitemap, HTTP response and indexability on the deployment. Filtered query URLs should be noindex; clean service/profile URLs should be indexable. Device geolocation should request consent or provide a clear fallback.
7. In GA4 DebugView, check search submission/no-results, save, comparison and outbound referral. Two outbound clicks to the same venue in one browser session should produce two outbound events and one unique referral; an Instagram or directions click should not count as a referral.

## Owner actions after release

- **Search Console:** submit the production sitemap, inspect home/Explore/sauna/DEXA/VO2 and representative profiles, and export a 28-day query/page baseline. Consolidate overlapping search pages only when query and canonical evidence warrants it. A code release cannot request or guarantee Google ranking.
- **Analytics:** confirm the production GA ID, filter internal/testing traffic and configure the referral events. Disable GA4 enhanced-measurement Site Search collection if raw query capture is unwanted; the custom events send query length/counts, not search text. Do not mark referrals as completed bookings.
- **Pilot monetisation:** after contact setup, select 3–5 operators and agree a small, time-limited pilot with a clear listing/referral deliverable. Establish attribution and booking confirmation with each operator before charging per booking. Report listing views, outbound intent, unique referrals and operator-confirmed bookings separately.
- **Commercial offer:** validate willingness to pay before fixing a subscription price. Paid placements must be visibly Sponsored and external paid links must use `rel="sponsored"`. Preserve unpaid directory eligibility and editorial selection independence.
- **Content:** prioritise useful comparisons and verified booking facts over bulk location-page production. Add named, dated first-hand observations only after an actual visit. Get real venue images or permission to use operator assets where possible.
- **Email/contact:** connect and test the chosen inbox and forms separately when ready. No messages or pilot invitations were sent as part of this implementation.
