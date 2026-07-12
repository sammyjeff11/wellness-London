import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import type { AirtableFacility } from "@/lib/airtable";

export function getFacilityLocation(facility: AirtableFacility) {
  return facility.neighbourhood || facility.areaOfLondon || facility.areaGroup || "London";
}

export function getPublicFacilityDescription(facility: AirtableFacility) {
  return facility.editorialSummary || facility.description;
}

export function getFacilityImageAlt(facility: AirtableFacility, index = 0) {
  const location = getFacilityLocation(facility);
  return index === 0
    ? `${facility.name} wellness venue in ${location}`
    : `${facility.name} wellness venue in ${location}, photo ${index + 1}`;
}

export function toDirectoryFacility(facility: AirtableFacility): ServiceDirectoryFacility {
  return {
    slug: facility.slug,
    name: facility.name,
    description: getPublicFacilityDescription(facility),
    website: facility.website,
    businessName: facility.businessName,
    brandOperator: facility.brandOperator,
    address: facility.address,
    imageUrl: facility.images[0]?.url,
    imageAlt: getFacilityImageAlt(facility),
    galleryImages: facility.images.map((image, index) => ({ url: image.url, filename: getFacilityImageAlt(facility, index) })).filter((image) => Boolean(image.url)),
    location: getFacilityLocation(facility),
    neighbourhood: facility.neighbourhood,
    areaOfLondon: facility.areaOfLondon,
    areaGroup: facility.areaGroup,
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
    venueType: facility.venueTypeStandardized,
    lastCheckedDate: facility.lastCheckedDate,
    verificationStatus: facility.verificationStatus,
    isFeatured: facility.isFeatured,
    profileCompletenessScore: facility.profileCompletenessScore,
  };
}
