import { NextResponse, type NextRequest } from "next/server";
import { subscribeEmail } from "@/lib/newsletter-service";
import { getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const ip = getClientIp(request.headers);
  const result = await subscribeEmail(body, ip);

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
