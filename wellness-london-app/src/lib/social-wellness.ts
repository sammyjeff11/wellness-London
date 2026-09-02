import { cache } from "react";
import { AIRTABLE_REVALIDATE_SECONDS } from "@/lib/airtable";
import { fetchAirtableJson } from "@/lib/airtable-request";

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

type SocialResponse = {
  records?: SocialRecord[];
  offset?: string;
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
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Wellness London";

  if (!apiKey || !baseId) return new Map();

  const profiles = new Map<string, SocialWellnessProfile>();
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    ["Slug", "Social Format", "Community Features", "Social & Community Note"].forEach((field) => params.append("fields[]", field));
    if (offset) params.set("offset", offset);

    const payload = await fetchAirtableJson<SocialResponse>(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`,
      apiKey,
      {
        revalidate: AIRTABLE_REVALIDATE_SECONDS,
        tags: ["airtable-facilities"],
      },
    );
    (payload.records || []).forEach((record) => {
      const slug = record.fields?.Slug?.trim();
      if (!slug) return;

      const profile: SocialWellnessProfile = {
        socialFormats: normaliseList(record.fields?.["Social Format"]),
        communityFeatures: normaliseList(record.fields?.["Community Features"]),
        socialNote: record.fields?.["Social & Community Note"]?.trim() || "",
      };

      if (hasUsefulSocialSignal(profile)) profiles.set(slug, profile);
    });

    offset = payload.offset;
  } while (offset);

  return profiles;
});
