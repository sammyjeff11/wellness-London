import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import type { AirtableFacility } from "@/lib/airtable";
import { canonicaliseServiceList } from "@/lib/taxonomy";
import { venueCoordinates } from "@/data/venue-coordinates";

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
  const coordinates = venueCoordinates[facility.slug];

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
    services: canonicaliseServiceList(facility.servicesOffered),
    serviceKeys: facility.serviceKeys,
    priceRange: facility.overallPriceRange,
    rating: facility.googleRating,
    accessType: facility.accessType,
    bestFor: facility.bestFor,
    experienceType: facility.experienceType,
    priceFrom: facility.priceFrom,
    privateOrShared: facility.privateOrShared,
    premiumLevel: facility.premiumLevel,
    nearestStation: facility.nearestStation,
    venueType: facility.venueTypeStandardized,
    lastCheckedDate: facility.lastCheckedDate,
    verificationStatus: facility.verificationStatus,
    openingHours: facility.openingHours,
    bookingRequired: facility.bookingRequired,
    saunaType: facility.saunaType,
    coldPlungeType: facility.coldPlungeType,
    cryoType: facility.cryoType,
    contrastTherapyAvailable: facility.contrastTherapyAvailable,
    guidedSessionsAvailable: facility.guidedSessionsAvailable,
    towelsIncluded: facility.towelsIncluded,
    showersAvailable: facility.showersAvailable,
    changingRooms: facility.changingRooms,
    postcode: coordinates?.postcode || facility.postcode,
    latitude: coordinates?.latitude,
    longitude: coordinates?.longitude,
    isFeatured: facility.isFeatured,
    profileCompletenessScore: facility.profileCompletenessScore,
  };
}
