import { unstable_cache } from "next/cache";
import {
  AIRTABLE_REVALIDATE_SECONDS,
  getFacilities as getFacilitiesFromAirtable,
} from "./airtable";

export * from "./airtable";

async function loadRequiredFacilities() {
  const facilities = await getFacilitiesFromAirtable();

  if (facilities.length === 0) {
    throw new Error(
      "Facility dataset is empty. Refusing to render or deploy directory pages because Airtable may be unavailable or rate limited.",
    );
  }

  return facilities;
}

const getPersistentlyCachedFacilities = unstable_cache(
  loadRequiredFacilities,
  ["wellplus-published-facilities"],
  {
    revalidate: AIRTABLE_REVALIDATE_SECONDS,
    tags: ["airtable-facilities"],
  },
);

let productionBuildFacilities: ReturnType<typeof getPersistentlyCachedFacilities> | undefined;

/**
 * Shared facility source for app imports.
 *
 * - `unstable_cache` provides one persistent Next data-cache entry instead of
 *   asking Airtable independently from every statically generated route.
 * - During `next build`, a module-level promise deduplicates all page-generation
 *   reads within the worker process.
 * - An unexpected empty dataset throws instead of publishing valid-looking
 *   zero-listing pages. On ISR revalidation, a failed regeneration can then keep
 *   serving the last successful page rather than replacing it with empty HTML.
 */
export function getFacilities() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    productionBuildFacilities ??= getPersistentlyCachedFacilities();
    return productionBuildFacilities;
  }

  return getPersistentlyCachedFacilities();
}
