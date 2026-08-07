import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Configure this URL as a Sanity webhook (Settings → API → Webhooks) with
// the same secret as SANITY_REVALIDATE_SECRET, so publishing content in
// Studio invalidates the relevant ISR tag immediately instead of waiting
// for the next `revalidate` window.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not configured" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: { current?: string } }>(
      request,
      secret
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing document type" }, { status: 400 });
    }

    revalidateTag(body._type);
    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`);
    }

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
