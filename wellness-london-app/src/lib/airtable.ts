export type AirtableFacility = {
  id: string;
  name: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  description: string;
};

type AirtableRecord = {
  id: string;
  fields: {
    Name?: string;
    Website?: string;
    Address?: string;
    Phone?: string;
    Email?: string;
    Description?: string;
  };
};

export async function getFacilities(): Promise<AirtableFacility[]> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Wellness London";

  if (!apiKey || !baseId) {
    console.warn("Airtable environment variables are missing. Falling back to no live records.");
    return [];
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    console.error("Failed to fetch Airtable facilities", response.status, response.statusText);
    return [];
  }

  const data = (await response.json()) as { records?: AirtableRecord[] };

  return (data.records || []).map((record) => ({
    id: record.id,
    name: record.fields.Name || "Unnamed wellness space",
    website: record.fields.Website || "#",
    address: record.fields.Address || "London",
    phone: record.fields.Phone || "",
    email: record.fields.Email || "",
    description: record.fields.Description || "Premium wellness experience in London",
  }));
}
