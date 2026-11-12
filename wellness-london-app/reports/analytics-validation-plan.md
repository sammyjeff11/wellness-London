# Well+ validation measurement

This is the working measurement model for the directory. It focuses on evidence of useful discovery rather than page views alone.

## Primary journey

| Stage | Evidence | Events |
| --- | --- | --- |
| Discover | A visitor actively narrows the directory | `venue_search_used`, `filter_applied`, `directory_sort_changed`, `location_search_used` |
| Evaluate | A visitor inspects options in more depth | `directory_view_changed`, `map_venue_selected`, `venue_comparison_view`, `venue_shortlist_save` |
| Consider | A visitor opens a venue profile | `listing_card_click`, `map_venue_open`, `comparison_venue_open`, `facility_page_view` |
| Act | A visitor leaves Well+ to take the next step | `listing_cta_click` with `cta_type` of `booking`, `website`, `directions` or `instagram` |

## Questions to review weekly

1. What percentage of directory visitors search, filter, use location, open the map, save or compare?
2. Which services and areas produce the highest venue-profile open rate?
3. Which venue profiles produce outbound booking or website clicks?
4. Does map use lead to more profile opens than list-only browsing?
5. Do visitors who save or compare venues show stronger outbound intent?

## GA4 explorations

- **Discovery funnel:** directory page view → discovery interaction → venue profile view → listing CTA click.
- **Map funnel:** directory view changed (`map`) → map venue selected → map venue open → listing CTA click.
- **Comparison funnel:** comparison CTA click → venue comparison view → comparison venue open → listing CTA click.
- Break each funnel down by `service_type`, `area`, `neighbourhood`, `facility_slug`, `view_mode` and `cta_type` where available.

Treat low-volume weekly data directionally. Make expansion and partnership decisions using several weeks of behaviour, not a single spike.

## Instrumentation reliability and commercial baseline (Nov 2026)

The production layout includes GA4's `gtag` script **only when** `NEXT_PUBLIC_GA_ID` is configured. Code presence alone does not establish that events reach the correct GA4 property. Before reporting a funnel, use GA4 DebugView / Realtime on the real site with consent and confirm `venue_outbound_click` and `venue_unique_referral` arrive once each. Test booking and operator-website buttons separately, including from facility pages and comparisons. Existing `trackVenueReferral` records at most one unique venue referral per browser tab session, not unique humans, bookings, revenue or confirmed visits to operators. A user can click multiple venues, and tracking blockers may reduce counts.

The 12 Nov instrumentation patch stops emitting both a `gtag` event and a separate named `dataLayer` event for the same action. If `gtag` is absent, a single named event is queued on `dataLayer`, but that alone is not evidence of GA4 delivery. Validate deployment environment and consent configuration before claiming accurate historical comparisons.

**Baseline and analysis required:** GA4 organic session count and source/medium by landing page; sessions entering venue profiles; event counts and attributable sessions for outbound booking/website actions; confirmed GA4 configuration. Compare with GSC clicks, noting the two metrics are not interchangeable. Do not estimate conversion percentages from GSC clicks divided by GA4 events without attribution alignment.

Prioritise the first 90 days around *verified* qualified referrals. Do not describe clicks to a third-party website as completed bookings.
