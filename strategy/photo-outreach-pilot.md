# Venue photography outreach — first pilot (draft only)

Status: **no outreach authorised, no messages sent**. Source: live Airtable Wellness London records reviewed 12 November 2026. Contact details remain in Airtable; this public repository stores no personal contact list.

## Objective
Get written permission and venue-specific approved cover/gallery photography for high-value published Well Edit listings. Validate a repeatable operator-level relationship process for eventual commercial discussions, without turning a photo request into an unsolicited sales pitch.

## Working baseline
- 115 Airtable venue records; 94 published and indexable.
- 89/94 currently have **no Cover Image attachment** and 89/94 no Images attachment. This is based on Airtable fields, **not** a visual production audit.
- Existing Airtable sync downloads approved attachment files into local static `public/venues/<slug>/` via PR; do not duplicate image publication.

## Pilot selection — consolidate by operator
These are candidate venues whose relevant Airtable attachment fields currently lack a cover. Check venue name, rights and current site information again before drafting a send; avoid duplicate brand messages. These are **not** verified email recipients or outreach commitments.

| Operator / group | Example listed London location(s) | Official website source | Note |
| --- | --- | --- | --- |
| Community Sauna Baths | Walthamstow, Camberwell, Peckham | https://www.community-sauna.co.uk/ | Ask central team for location-labelled media |
| Pulse Club Sauna | Fulham, Putney | https://www.pulseclubsauna.com/ | Ask for photos differentiated by site |
| Third Space | Islington, Chelsea, The Whiteley | https://www.thirdspace.london/ | Obtain club-specific approved photography |
| StretchLAB | Notting Hill, Soho, Fitzrovia, Islington, Hampstead | https://stretch-lab.co.uk/ | Confirm official brand spelling and location photos |
| Lowlu | Wandsworth, Kentish Town | https://lowlu.com/ | Request site-specific cover imagery |
| Neko Health | Covent Garden, Spitalfields, Marylebone | https://www.nekohealth.com/gb/en/ | Request location-specific approved media |
| Banya London / Bath House | Belgravia | https://banyalondon.co.uk/ | Distinguish operator from similarly named banya venues |
| Rebase Recovery | Marylebone | https://www.rebaserecovery.com/ | Strong recovery-profile candidate |
| BodyScan / BodyView | City of London, Richmond | https://bodyscanuk.com/ | Verify operator and brand relationship before grouping |
| Sæl Spa | Fulham | https://saelspa.com/ | Check identity and licence before using images |
| Reset Sauna | Islington | https://resetsauna.com/ | Confirm location against any supplied media |
| Banya No.1 | Chiswick | https://gobanyachiswick.co.uk/ | Keep rights/identity distinct from Banya London |

A second batch can cover other categories and premium clubs only after the first image-rights workflow is proven.

## CRM statuses
`candidate` → `recipient_verified` → `draft_ready` → `founder_approved` → `sent` → `response_received` → `licence_verified` → `assets_approved` → `uploaded_to_airtable` → `published_after_pr_approval`.

Use `declined`, `no_response`, `licence_pending`, and `do_not_contact` as exception statuses. Tracking belongs in a restricted CRM/mailbox, **not this public GitHub repository**.

## Minimum photo permission evidence
Operator and location; signed/identifiable sender's role; image names/URLs or actual supplied files; granted reuse on welledit.co.uk; cropping/resizing and storage rights; credit required; expiry/withdrawal terms; date of approval; any restrictions on social/paid placements. Do not infer permissions from a visible website image or an email response that merely says “see our website”.

## Execution gates
1. Founder creates and connects `hello@welledit.co.uk` in Microsoft 365 (or another approved host); verify sending identity, SPF/DKIM/DMARC and inbox access.
2. Agent looks up latest contact details and drafts individually. Only founder-approved messages can be sent. No batch auto-send or paid services.
3. On reply, confirm explicit photo rights and exact depicted location before uploading. Venue media are not proof of a personal editorial visit.
4. First five completed venues form the pilot. Measure turnaround and publication quality before scaling.
