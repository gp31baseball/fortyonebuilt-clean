import { PrismaClient } from "../../prisma-generated/client";

// Prisma 7 initialization (correct)
const prisma = new PrismaClient();

export type NoradEvent = {
  schema: string | null;
  eventType: string;
  eventName: string | null;
  eventData: string | null;
  timestamp: number;
  projectId: string;
  origin: string | null;
  path: string;
  referrer: string | null;
  country: string | null;
  deviceId: string | null;
  sessionId: string | null;
  dataSourceName: string | null;
};

export type ProjectOverviewStats = {
  projectId: string;
  pageviews: number;
  uniqueSessions: number;
  lastEventTs: number | null;
};

/* ============================================================
   saveAnalyticsEvent
============================================================ */
export async function writeEvent(event: NoradEvent): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: {
        projectId: event.projectId,
        eventType: event.eventType,
        eventName: event.eventName,
        eventData: event.eventData ? JSON.parse(event.eventData) : null,
        timestamp: new Date(event.timestamp),
        origin: event.origin,
        path: event.path,
        referrer: event.referrer,
        country: event.country,
        deviceId: event.deviceId,
        sessionId: event.sessionId,
        dataSourceName: event.dataSourceName,
      },
    });
  } catch (err) {
    console.error("NORAD writeEvent error:", err);
  }
}
/* ============================================================
   getOverviewStats
============================================================ */
export async function getOverviewStats(
  sinceTimestamp: number
): Promise<ProjectOverviewStats[]> {
  const sinceDate = new Date(sinceTimestamp);

  const grouped = await prisma.analyticsEvent.groupBy({
    by: ["projectId"],
    where: { timestamp: { gte: sinceDate } },
    _count: {
      id: true,
      sessionId: true,
    },
    _max: {
      timestamp: true,
    },
  });

  return grouped.map((g) => ({
    projectId: g.projectId,
    pageviews: g._count.id,
    uniqueSessions: g._count.sessionId,
    lastEventTs: g._max.timestamp
      ? new Date(g._max.timestamp).getTime()
      : null,
  }));
}
