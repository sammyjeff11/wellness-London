export type Coordinate = { latitude: number; longitude: number };

export function distanceInKm(from: Coordinate, to: Coordinate) {
  const radiusKm = 6371;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) * Math.cos(toLatitude) * Math.sin(longitudeDelta / 2) ** 2;

  return radiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function formatDistance(distance?: number) {
  if (distance === undefined || !Number.isFinite(distance)) return "";
  if (distance < 1) return `${Math.max(100, Math.round((distance * 1000) / 100) * 100)} m away`;
  return `${distance < 10 ? distance.toFixed(1) : Math.round(distance)} km away`;
}
