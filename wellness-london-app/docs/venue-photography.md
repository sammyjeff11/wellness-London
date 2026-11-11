# Venue photography sourcing and publishing

## Existing infrastructure
Airtable `Wellness London` is the source of truth. The main table has `Cover Image` and `Images` attachment fields. `scripts/sync-airtable.mjs` already mirrors those attachments to stable local URLs in `public/venues/<slug>/` and opens a validated snapshot PR via the pre-existing `Publish Airtable directory` workflow. **Do not create another image publisher.**

## Discovery and review
Run `npm run photos:audit` to generate `photo-review/venue-photo-queue.json` (gitignored). Run `npm run photos:discover` to inspect official-site Open Graph/Twitter metadata for up to 20 of the highest-priority missing-cover venues. It fetches *HTML only* and records a candidate image URL, not the image. Both commands read the committed snapshot, so fresh Airtable changes must first be included in the snapshot or reviewed directly in Airtable.

A candidate is **not** a licensed asset. For each accepted candidate confirm:
- exact venue/location and source URL, including operator attribution
- that the image actually depicts this venue and is suitable for a cover/gallery
- written permission, licence or operator-supplied usage terms that allow reproduction on Well Edit, plus evidence and any credit/expiry requirements
- image quality, no visible watermarks, meaningful alt text and reasonable crop

If licensing is unknown, mark `permission_pending` and request venue-approved media. Do not hotlink, copy or publish it.

## Publication (approval required)
1. Obtain written rights or venue-supplied approved files. Confirm no embedded private data/metadata should be retained.
2. Upload approved photos to the matching Airtable record's `Cover Image` and `Images` fields after approval. Store rights evidence in restricted research records; do not publish internal correspondence in public fields.
3. Use the existing Airtable snapshot PR, review generated local files, verify the images belong to the correct venue, then request founder approval to merge. No direct production edits.
4. Validate crop, loading, responsive sizing, alt text and broken-image fallback.

## Metrics
Weekly: published venues missing cover image, published venues without gallery, candidates discovered, rights verified, approved additions, images successfully shown on the site. Never count URLs found as published imagery.
