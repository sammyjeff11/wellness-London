import { cache } from "react";
import { getDirectorySnapshotRecords } from "@/lib/airtable";
import { cleanValue } from "@/lib/useful-values";

type AirtableSelect = { name?: string };
type AirtableValue =
  | string
  | AirtableSelect
  | AirtableSelect[]
  | string[]
  | null
  | undefined;

type SocialRecord = {
  fields?: {
    Slug?: string;
    "Access Model"?: AirtableValue;
    "Social Format"?: AirtableValue;
    "Community Features"?: AirtableValue;
    "Social & Community Note"?: string;
    "Good To Know"?: string;
  };
};

type SocialProfile = {
  accessModel: string;
  socialFormats: string[];
  communityFeatures: string[];
  socialNote: string;
  goodToKnow: string;
};

function normaliseItem(value: string | AirtableSelect) {
  return typeof value === "string" ? value : value.name || "";
}

function normaliseList(value: AirtableValue): string[] {
  if (!value) return [];
  const values = Array.isArray(value) ? value : [value];
  return values
    .map(normaliseItem)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseSingle(value: AirtableValue) {
  return normaliseList(value)[0] || "";
}

const getSocialProfile = cache(
  async (slug: string): Promise<SocialProfile | null> => {
    if (!slug) return null;

    const record = (getDirectorySnapshotRecords() as SocialRecord[]).find(
      (item) => item.fields?.Slug?.trim() === slug,
    );
    const fields = record?.fields;
    if (!fields) return null;

    const profile = {
      accessModel: normaliseSingle(fields["Access Model"]),
      socialFormats: normaliseList(fields["Social Format"]),
      communityFeatures: normaliseList(fields["Community Features"]),
      socialNote: cleanValue(fields["Social & Community Note"]) || "",
      goodToKnow: cleanValue(fields["Good To Know"]) || "",
    };

    if (
      !profile.accessModel &&
      profile.socialFormats.length === 0 &&
      profile.communityFeatures.length === 0 &&
      !profile.socialNote
    ) {
      return null;
    }

    return profile;
  },
);

export default async function FacilitySocialContext({
  slug,
}: {
  slug: string;
}) {
  const profile = await getSocialProfile(slug);
  if (!profile) return null;
  return (
    <section className="editorial-shell border-t border-[#d8cebf] py-5">
      <details>
        <summary className="cursor-pointer py-3 text-base font-semibold">
          Access, membership & community
        </summary>
        <div className="max-w-3xl space-y-4 pb-4 text-base leading-7 text-[#5f574c]">
          {profile.accessModel ? (
            <p>
              <strong>Access model:</strong> {profile.accessModel}
            </p>
          ) : null}
          {profile.accessModel === "Private members' club" ? (
            <p>
              Joining normally involves an application and approval process;
              paying a fee alone does not guarantee access.
            </p>
          ) : null}
          {profile.socialNote ? <p>{profile.socialNote}</p> : null}
          {profile.socialFormats.length ? (
            <p>
              <strong>Social format:</strong>{" "}
              {profile.socialFormats.join(" · ")}
            </p>
          ) : null}
          {profile.communityFeatures.length ? (
            <p>
              <strong>Community features:</strong>{" "}
              {profile.communityFeatures.join(" · ")}
            </p>
          ) : null}
        </div>
      </details>
    </section>
  );
}
