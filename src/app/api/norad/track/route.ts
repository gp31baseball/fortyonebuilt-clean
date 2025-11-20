import { NextResponse } from "next/server";
import { writeEvent } from "@/lib/norad-db";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.projectId || !body.eventType) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
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

      // missing fields that type requires:
      schema: null,
      eventName: null,
      eventData: null,
      country: null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("NORAD track error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
