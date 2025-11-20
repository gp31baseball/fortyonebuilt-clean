import { NextResponse } from "next/server";
import { writeEvent } from "@/lib/norad-db";

// Allowed origins
const ALLOWED_ORIGINS = [
  "https://www.fortyonebuilt.com",
  "https://fortyonebuilt.com",
  "https://gp31baseball.com",
  "https://www.gp31baseball.com",
];

// Build the CORS headers
function corsHeaders(origin: string | null) {
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": "https://www.fortyonebuilt.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Handle preflight requests
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// Handle analytics POST events
export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  try {
    const body = await req.json();

    if (!body || !body.projectId || !body.eventType) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    await writeEvent({
      projectId: body.projectId,
      eventType: body.eventType,
      timestamp: body.timestamp ?? Date.now(),
      origin: body.origin ?? null,
      path: body.path ?? "",
      referrer: body.referrer ?? null,
      deviceId: body.deviceId ?? null,
      sessionId: body.sessionId ?? null,
      dataSourceName: body.dataSourceName ?? null,
      schema: null,
      eventName: null,
      eventData: null,
      country: null,
    });

    return NextResponse.json(
      { ok: true },
      { headers: corsHeaders(origin) }
    );
  } catch (err) {
    console.error("NORAD track error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
