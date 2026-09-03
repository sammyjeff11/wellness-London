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
