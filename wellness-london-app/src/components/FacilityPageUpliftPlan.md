# Venue page uplift implementation plan

This branch introduces a safer component-led approach for consolidating venue listing pages.

## Completed

- Created `FacilityEditorialSections.tsx` to consolidate repeated venue-page content into:
  - The Well+ perspective
  - Best for
  - Planning your visit

## Next step

Wire the new component into `src/app/facility/[slug]/page.tsx` using a targeted patch or local Codespace edit, then run a build before merging.

## Reason

The venue page file is large and was previously corrupted by a full-file replacement. Future changes should avoid broad overwrites and use component-level edits plus PR preview checks.
