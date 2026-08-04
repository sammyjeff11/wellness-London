import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { dedupeFacilities, normaliseFacilityValue } from "@/lib/dedupe-facilities";
import { londonRegions } from "@/lib/location-hubs";
import type { NeighbourhoodPage } from "@/lib/neighbourhood-pages";

function equalsLocation(value: string | undefined, expected: string) {
  return normaliseFacilityValue(value) === normaliseFacilityValue(expected);
}

export function getFacilitiesForNeighbourhood(
  facilities: ServiceDirectoryFacility[],
  neighbourhood: string,
) {
  return dedupeFacilities(
    facilities.filter((facility) => equalsLocation(facility.neighbourhood, neighbourhood)),
  );
}

export function getFacilitiesForRegion(
  facilities: ServiceDirectoryFacility[],
  regionName: string,
) {
  const region = londonRegions.find((candidate) => equalsLocation(candidate.name, regionName));
  const areaValues = region?.areaValues || [regionName];

  return dedupeFacilities(
    facilities.filter((facility) =>
      areaValues.some(
        (area) => equalsLocation(facility.areaOfLondon, area) || equalsLocation(facility.areaGroup, area),
      ),
    ),
  );
}

export function getAvailableNeighbourhoods(
  facilities: ServiceDirectoryFacility[],
  pages: NeighbourhoodPage[],
) {
  return pages
    .map((page) => ({
      page,
      facilities: getFacilitiesForNeighbourhood(facilities, page.shortTitle),
    }))
    .filter((entry) => entry.facilities.length > 0);
}
