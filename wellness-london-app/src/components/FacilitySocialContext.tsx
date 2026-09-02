import { cache } from "react";
import { getDirectorySnapshotRecords } from "@/lib/airtable";
import { cleanValue } from "@/lib/useful-values";

type AirtableSelect = { name?: string };
type AirtableValue = string | AirtableSelect | AirtableSelect[] | string[] | null | undefined;

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
  return values.map(normaliseItem).map((item) => item.trim()).filter(Boolean);
}

function normaliseSingle(value: AirtableValue) {
  return normaliseList(value)[0] || "";
}

const getSocialProfile = cache(async (slug: string): Promise<SocialProfile | null> => {
  if (!slug) return null;

  const record = (getDirectorySnapshotRecords() as SocialRecord[])
    .find((item) => item.fields?.Slug?.trim() === slug);
  const fields = record?.fields;
  if (!fields) return null;

  const profile = {
    accessModel: normaliseSingle(fields["Access Model"]),
    socialFormats: normaliseList(fields["Social Format"]),
    communityFeatures: normaliseList(fields["Community Features"]),
    socialNote: cleanValue(fields["Social & Community Note"]) || "",
    goodToKnow: cleanValue(fields["Good To Know"]) || "",
  };

  if (!profile.accessModel && profile.socialFormats.length === 0 && profile.communityFeatures.length === 0 && !profile.socialNote) {
    return null;
  }

  return profile;
});

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm text-[#5f574c]">
      {children}
    </span>
  );
}

export default async function FacilitySocialContext({ slug }: { slug: string }) {
  const profile = await getSocialProfile(slug);
  if (!profile) return null;

  const isPrivateClub = profile.accessModel === "Private members' club";
  const hasAccess = Boolean(profile.accessModel);
  const hasSocial = Boolean(profile.socialNote || profile.socialFormats.length || profile.communityFeatures.length);

  return (
    <>
      {hasAccess ? (
        <section className="surface-band-stone px-5 py-12 sm:px-6 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
            <div>
              <p className="editorial-eyebrow mb-3">Access</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Access & membership</h2>
            </div>
            <div>
              <div className="surface-paper rounded-[1rem] p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Access model</p>
                <p className="mt-3 text-xl leading-8 text-[#29241d]">{profile.accessModel}</p>
                {isPrivateClub ? (
                  <p className="mt-4 text-base leading-7 text-[#5f574c]">
                    This is different from a standard paid membership. Joining a private members&apos; club normally involves an application and approval process; paying a fee alone does not guarantee access.
                  </p>
                ) : null}
                {profile.goodToKnow ? <p className="mt-4 text-base leading-7 text-[#5f574c]">{profile.goodToKnow}</p> : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasSocial ? (
        <section className="surface-band-sage px-5 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="editorial-eyebrow mb-3">Social experience</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Social & community</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                Only features that are explicit in the venue format or current operator information are included here.
              </p>
            </div>

            {profile.socialNote ? <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f473d]">{profile.socialNote}</p> : null}

            {profile.socialFormats.length > 0 || profile.communityFeatures.length > 0 ? (
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {profile.socialFormats.length > 0 ? (
                  <div className="surface-paper rounded-[1rem] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Format</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.socialFormats.map((item) => <Tag key={item}>{item}</Tag>)}
                    </div>
                  </div>
                ) : null}
                {profile.communityFeatures.length > 0 ? (
                  <div className="surface-paper rounded-[1rem] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">What creates repeat interaction</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.communityFeatures.map((item) => <Tag key={item}>{item}</Tag>)}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
