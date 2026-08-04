export const SAVED_VENUES_KEY = "well-plus-saved-venues:v1";
export const SAVED_VENUES_EVENT = "well-plus-saved-venues-change";

export function parseSavedVenueSlugs(value: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function getSavedVenueSnapshot() {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(SAVED_VENUES_KEY) || "[]";
}

export function subscribeToSavedVenues(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_VENUES_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_VENUES_EVENT, callback);
  };
}

export function setSavedVenueSlugs(slugs: string[]) {
  window.localStorage.setItem(SAVED_VENUES_KEY, JSON.stringify(Array.from(new Set(slugs))));
  window.dispatchEvent(new Event(SAVED_VENUES_EVENT));
}
