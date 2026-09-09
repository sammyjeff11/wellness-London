export const SAVED_VENUES_KEY = "well-plus-saved-venues:v1";
let inMemorySnapshot = "[]";

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
  try { return window.localStorage.getItem(SAVED_VENUES_KEY) || inMemorySnapshot; }
  catch { return inMemorySnapshot; }
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
  inMemorySnapshot = JSON.stringify(Array.from(new Set(slugs)));
  try { window.localStorage.setItem(SAVED_VENUES_KEY, inMemorySnapshot); }
  catch { /* Keep the shortlist usable for this visit if storage is unavailable. */ }
  window.dispatchEvent(new Event(SAVED_VENUES_EVENT));
}
