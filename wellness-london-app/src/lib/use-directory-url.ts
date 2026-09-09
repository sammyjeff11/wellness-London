"use client";
import { useSyncExternalStore } from "react";
import { readDirectoryState, writeDirectoryState } from "./directory-url";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("directory-state", listener);
  return () => { window.removeEventListener("popstate", listener); window.removeEventListener("directory-state", listener); };
}
export function useDirectoryUrl() {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  return [readDirectoryState(search), (patch: Record<string, string>, replace = false) => {
    const url = new URL(window.location.href);
    url.search = writeDirectoryState(url.search, patch);
    window.history[replace ? "replaceState" : "pushState"](window.history.state, "", url);
    window.dispatchEvent(new Event("directory-state"));
  }] as const;
}
