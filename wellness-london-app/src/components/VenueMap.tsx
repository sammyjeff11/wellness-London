"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import type { LatLngBounds } from "leaflet";
import SaveVenueButton from "@/components/SaveVenueButton";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { formatDistance } from "@/lib/geo";

type UserLocation = { latitude: number; longitude: number };

type VenueMapProps = {
  facilities: ServiceDirectoryFacility[];
  selectedSlug?: string;
  userLocation?: UserLocation;
  distanceBySlug?: Record<string, number>;
  mapAreaActive?: boolean;
  onSelect: (slug: string) => void;
  onSearchArea: (slugs?: string[]) => void;
};

const londonCentre: [number, number] = [51.5074, -0.1278];

function MapController({ facilities, selectedSlug, userLocation, mapAreaActive }: Pick<VenueMapProps, "facilities" | "selectedSlug" | "userLocation" | "mapAreaActive">) {
  const map = useMap();
  const coordinateKey = facilities.map((facility) => `${facility.slug}:${facility.latitude}:${facility.longitude}`).join("|");

  useEffect(() => {
    if (mapAreaActive || facilities.length === 0) return;
    const bounds = facilities
      .filter((facility) => facility.latitude !== undefined && facility.longitude !== undefined)
      .map((facility) => [facility.latitude as number, facility.longitude as number] as [number, number]);

    if (bounds.length === 1) map.setView(bounds[0], 14, { animate: true });
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [38, 38], maxZoom: 14, animate: true });
  }, [coordinateKey, facilities, map, mapAreaActive]);

  useEffect(() => {
    if (userLocation) map.flyTo([userLocation.latitude, userLocation.longitude], 13, { animate: true });
  }, [map, userLocation]);

  useEffect(() => {
    const selected = facilities.find((facility) => facility.slug === selectedSlug);
    if (selected?.latitude !== undefined && selected.longitude !== undefined) {
      map.panInside([selected.latitude, selected.longitude], { padding: [80, 80], animate: true });
    }
  }, [facilities, map, selectedSlug]);

  return null;
}

function MapEvents({ onBounds }: { onBounds: (bounds: LatLngBounds) => void }) {
  const map = useMapEvents({
    load: () => onBounds(map.getBounds()),
    moveend: () => onBounds(map.getBounds()),
    zoomend: () => onBounds(map.getBounds()),
  });

  useEffect(() => {
    onBounds(map.getBounds());
  }, [map, onBounds]);

  return null;
}

function resultLocation(facility: ServiceDirectoryFacility) {
  return facility.neighbourhood || facility.location || facility.nearestStation || "London";
}

function resultPrice(facility: ServiceDirectoryFacility) {
  return facility.priceFrom || facility.priceRange || "Price not confirmed";
}

export default function VenueMap({ facilities, selectedSlug, userLocation, distanceBySlug = {}, mapAreaActive = false, onSelect, onSearchArea }: VenueMapProps) {
  const [bounds, setBounds] = useState<LatLngBounds>();
  const mappedFacilities = useMemo(
    () => facilities.filter((facility) => facility.latitude !== undefined && facility.longitude !== undefined),
    [facilities],
  );
  const selectedFacility = mappedFacilities.find((facility) => facility.slug === selectedSlug) || mappedFacilities[0];

  function searchVisibleArea() {
    if (mapAreaActive) {
      onSearchArea(undefined);
      return;
    }
    if (!bounds) return;
    const visibleSlugs = mappedFacilities
      .filter((facility) => bounds.contains([facility.latitude as number, facility.longitude as number]))
      .map((facility) => facility.slug);
    onSearchArea(visibleSlugs);
  }

  if (mappedFacilities.length === 0) {
    return (
      <div className="rounded-[1.25rem] border border-[#d8cebf] bg-[#fbf8f1] p-7">
        <h3 className="text-2xl font-medium">No mapped venues match these filters.</h3>
        <p className="mt-3 text-sm leading-7 text-[#5f574c]">Clear one filter or return to the full London view.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-[#b9ab97] bg-[#29241d] shadow-[0_22px_56px_rgba(41,36,29,0.13)] lg:grid lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div className="relative min-h-[32rem] lg:min-h-[42rem]">
        <MapContainer center={londonCentre} zoom={11} scrollWheelZoom className="well-map absolute inset-0 z-0 h-full w-full bg-[#ded4c5]" aria-label="Map of matching London wellness venues">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onBounds={setBounds} />
          <MapController facilities={mappedFacilities} selectedSlug={selectedFacility?.slug} userLocation={userLocation} mapAreaActive={mapAreaActive} />
          {mappedFacilities.map((facility) => {
            const isSelected = facility.slug === selectedFacility?.slug;
            return (
              <CircleMarker
                key={facility.slug}
                center={[facility.latitude as number, facility.longitude as number]}
                radius={isSelected ? 11 : 8}
                pathOptions={{
                  color: isSelected ? "#fbf8f1" : "#29241d",
                  fillColor: isSelected ? "#29241d" : "#fbf8f1",
                  fillOpacity: 1,
                  opacity: 1,
                  weight: isSelected ? 4 : 2,
                }}
                eventHandlers={{ click: () => onSelect(facility.slug) }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={isSelected}>
                  <span className="font-sans text-xs font-medium text-[#29241d]">{facility.name}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
          {userLocation ? (
            <CircleMarker center={[userLocation.latitude, userLocation.longitude]} radius={7} pathOptions={{ color: "#ffffff", fillColor: "#28638c", fillOpacity: 1, weight: 3 }}>
              <Tooltip direction="top" offset={[0, -7]} opacity={1}>Your location</Tooltip>
            </CircleMarker>
          ) : null}
        </MapContainer>

        <div className="pointer-events-none absolute inset-x-0 top-4 z-[500] flex justify-center px-4">
          <button type="button" onClick={searchVisibleArea} className="pointer-events-auto inline-flex min-h-11 items-center rounded-full border border-[#b9ab97] bg-[#fbf8f1]/95 px-5 text-sm font-medium text-[#29241d] shadow-[0_10px_28px_rgba(41,36,29,0.16)] backdrop-blur-md transition hover:bg-white">
            {mapAreaActive ? "Clear map area" : "Search this map area"}
          </button>
        </div>

        {selectedFacility ? (
          <article className="absolute inset-x-3 bottom-3 z-[500] rounded-[1rem] border border-[#d8cebf] bg-[#fbf8f1]/96 p-4 shadow-[0_18px_45px_rgba(41,36,29,0.2)] backdrop-blur-xl lg:hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-xl font-medium tracking-[-0.03em]">{selectedFacility.name}</h3>
                <p className="mt-1 text-sm text-[#6f6048]">{resultLocation(selectedFacility)} · {resultPrice(selectedFacility)}</p>
                {distanceBySlug[selectedFacility.slug] !== undefined ? <p className="mt-1 text-xs text-[#8d7d67]">{formatDistance(distanceBySlug[selectedFacility.slug])}</p> : null}
              </div>
              <SaveVenueButton slug={selectedFacility.slug} name={selectedFacility.name} />
            </div>
            <Link href={`/facility/${selectedFacility.slug}`} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#29241d] px-5 text-sm font-medium text-[#fbf8f1]">
              View venue
            </Link>
          </article>
        ) : null}
      </div>

      <aside className="hidden min-h-0 bg-[#fbf8f1] lg:flex lg:max-h-[42rem] lg:flex-col" aria-label="Mapped venue results">
        <div className="border-b border-[#d8cebf] px-5 py-4">
          <p className="text-sm font-medium">{mappedFacilities.length} mapped {mappedFacilities.length === 1 ? "venue" : "venues"}</p>
          <p className="mt-1 text-xs text-[#70695d]">Select a venue to inspect it.</p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {mappedFacilities.map((facility, index) => {
            const isSelected = facility.slug === selectedFacility?.slug;
            return (
              <div key={facility.slug} className={`flex w-full gap-4 border-b border-[#e3d9cb] px-5 py-4 text-left transition ${isSelected ? "bg-[#e7ddcf]" : "hover:bg-[#f4efe6]"}`}>
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${isSelected ? "bg-[#29241d] text-[#fbf8f1]" : "border border-[#b9ab97] text-[#5f574c]"}`}>{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <button type="button" onClick={() => onSelect(facility.slug)} className="block w-full text-left" aria-pressed={isSelected}>
                    <span className="block truncate text-sm font-medium text-[#29241d]">{facility.name}</span>
                    <span className="mt-1 block truncate text-xs text-[#70695d]">{resultLocation(facility)} · {resultPrice(facility)}</span>
                  </button>
                  {distanceBySlug[facility.slug] !== undefined ? <span className="mt-1 block text-xs text-[#8d7d67]">{formatDistance(distanceBySlug[facility.slug])}</span> : null}
                  {isSelected ? <Link href={`/facility/${facility.slug}`} className="mt-3 inline-flex text-xs font-medium underline underline-offset-4">View venue →</Link> : null}
                </span>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
