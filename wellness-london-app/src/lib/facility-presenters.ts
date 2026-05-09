import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import type { AirtableFacility } from "@/lib/airtable";

export function getFacilityLocation(facility: AirtableFacility) {
  return facility.neighbourhood || facility.areaOfLondon || facility.areaGroup || "London";
}

export function toDirectoryFacility(facility: AirtableFacility): ServiceDirectoryFacility {
  return {
    slug: facility.slug,
    name: facility.name,
    description: facility.editorialVerdict || facility.editorialSummary || facility.description,
    website: facility.website,
    imageUrl: facility.images[0]?.url,
    imageAlt: facility.images[0]?.filename || facility.name,
    location: getFacilityLocation(facility),
    services: facility.servicesOffered,
    serviceKeys: facility.serviceKeys,
    priceRange: facility.overallPriceRange,
    rating: facility.googleRating,
    accessType: facility.accessType,
    bestFor: facility.bestFor,
    experienceType: facility.experienceType,
    priceFrom: facility.priceFrom,
    privateOrShared: facility.privateOrShared,
    beginnerFriendly: facility.beginnerFriendly,
    premiumLevel: facility.premiumLevel,
    nearestStation: facility.nearestStation,
    lastCheckedDate: facility.lastCheckedDate,
    verificationStatus: facility.verificationStatus,
    areaGroup: facility.areaGroup,
    isFeatured: facility.isFeatured,
    profileCompletenessScore: facility.profileCompletenessScore,
  };
}
