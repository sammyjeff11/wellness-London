import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const AIRTABLE_FACILITIES_TAG = "airtable-facilities";

function isAuthorised(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret) {
    return false;
  }

  const { searchParams } = new URL(request.url);
  const suppliedSecret = searchParams.get("secret") || request.headers.get("x-revalidation-secret");

  return suppliedSecret === secret;
}

export async function POST(request: Request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorised" }, { status: 401 });
  }

  revalidateTag(AIRTABLE_FACILITIES_TAG);

  return NextResponse.json({
    ok: true,
    revalidated: [AIRTABLE_FACILITIES_TAG],
    revalidatedAt: new Date().toISOString(),
  });
}

export async function GET(request: Request) {
  return POST(request);
}
