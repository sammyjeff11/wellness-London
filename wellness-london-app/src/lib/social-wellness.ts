import { cache } from "react";
import { getDirectorySnapshotRecords } from "@/lib/airtable";

type AirtableSelect = { name?: string };
type AirtableValue = string | AirtableSelect | AirtableSelect[] | string[] | null | undefined;

type SocialRecord = {
  fields?: {
    Slug?: string;
    "Social Format"?: AirtableValue;
    "Community Features"?: AirtableValue;
    "Social & Community Note"?: string;
  };
};

export type SocialWellnessProfile = {
  socialFormats: string[];
  communityFeatures: string[];
  socialNote: string;
};

function normaliseItem(value: string | AirtableSelect) {
  return typeof value === "string" ? value : value.name || "";
}

function normaliseList(value: AirtableValue): string[] {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values.map(normaliseItem).map((item) => item.trim()).filter(Boolean);
}

function hasUsefulSocialSignal(profile: SocialWellnessProfile) {
  return Boolean(profile.socialNote || profile.socialFormats.length > 0 || profile.communityFeatures.length > 0);
}

export const getSocialWellnessProfiles = cache(async (): Promise<Map<string, SocialWellnessProfile>> => {
  const profiles = new Map<string, SocialWellnessProfile>();
  (getDirectorySnapshotRecords() as SocialRecord[]).forEach((record) => {
      const slug = record.fields?.Slug?.trim();
      if (!slug) return;

      const profile: SocialWellnessProfile = {
        socialFormats: normaliseList(record.fields?.["Social Format"]),
        communityFeatures: normaliseList(record.fields?.["Community Features"]),
        socialNote: record.fields?.["Social & Community Note"]?.trim() || "",
      };

      if (hasUsefulSocialSignal(profile)) profiles.set(slug, profile);
  });

  return profiles;
});
