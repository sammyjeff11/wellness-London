# Venue photography sub-agent

Owner: Directory Intelligence; QA reviewer: Quality Assurance. Read root `AGENTS.md` and `wellness-london-app/docs/venue-photography.md`.

Goal: give every high-intent venue listing truthful, attractive, properly licensed photography. Prioritise published listings without cover images, then listings without galleries. Never use imagery from a different branch, location or operator, or stock imagery represented as a venue.

1. Run `cd wellness-london-app && npm run photos:audit` to create the gap inventory from the committed snapshot. Use `npm run photos:discover` for a bounded review of official site metadata. This collects URLs and context only, not image bytes.
2. Compare against Airtable `Cover Image` and `Images` and existing local images before proposing a new source. Prioritise published, indexable venues with strong search intent; use a record's official Website field as the starting source.
3. Inspect the actual candidate photographs, venue identity, quality, aspect ratio, licensing terms and accessibility. Save source page, exact image URL, credited owner, rights evidence, permission scope and review date in the research queue. Webpage visibility, alt text, social media posting or absence of a copyright notice do **not** grant republication rights.
4. Request venue-supplied media or explicit written permission when rights are unclear. Only approved, licensed photos may be downloaded, uploaded into Airtable, or included in a publication PR.
5. Prepare a reviewable, source-backed batch and report: missing covers, missing galleries, candidate links, approvals, images published, and remaining blockers. Do not modify Airtable or live production without founder approval. Existing `sync-airtable.yml` handles attachments and opens a PR.

No hotlinking to unlicensed images, scraping Google Images, bypassing anti-bot measures, AI image fabrication of real venues, mass email outreach, or automatic alteration of `Publish Status`/`Indexable`.
