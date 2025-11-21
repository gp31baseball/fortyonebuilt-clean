import { PrismaClient } from "../../prisma-generated/client";

// Prisma 7 initialization
const prisma = new PrismaClient();

/* ============================================================================
   Types
============================================================================ */
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

/* Extended stats (new) */
export type NoradExtendedStats = {
  pageviews24h: number;
  unique24h: number;
  pageviews7d: number;
  unique7d: number;
  topRoute24h: string | null;
  trendPercentage: number;
};

/* ============================================================================
   log event
============================================================================ */
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

/* ============================================================================
   Overview (existing)
============================================================================ */
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

/* ============================================================================
   New Analytics
============================================================================ */

/** Pageviews last 24h */
export async function getPageviews24h(projectId: string): Promise<number> {
  const day = 24 * 60 * 60 * 1000;
  return prisma.analyticsEvent.count({
    where: {
      projectId,
      timestamp: { gte: new Date(Date.now() - day) },
    },
  });
}

/** Unique users last 24h */
export async function getUniques24h(projectId: string): Promise<number> {
  const day = 24 * 60 * 60 * 1000;
  const res = await prisma.analyticsEvent.groupBy({
    by: ["sessionId"],
    where: {
      projectId,
      timestamp: { gte: new Date(Date.now() - day) },
    },
  });
  return res.length;
}

/** Pageviews last 7 days */
export async function getPageviews7d(projectId: string): Promise<number> {
  const window = 7 * 24 * 60 * 60 * 1000;
  return prisma.analyticsEvent.count({
    where: {
      projectId,
      timestamp: { gte: new Date(Date.now() - window) },
    },
  });
}

/** Unique users last 7 days */
export async function getUniques7d(projectId: string): Promise<number> {
  const window = 7 * 24 * 60 * 60 * 1000;
  const res = await prisma.analyticsEvent.groupBy({
    by: ["sessionId"],
    where: {
      projectId,
      timestamp: { gte: new Date(Date.now() - window) },
    },
  });
  return res.length;
}

/** Most visited route last 24h */
export async function getTopRoute24h(
  projectId: string
): Promise<string | null> {
  const day = 24 * 60 * 60 * 1000;

  const res = await prisma.analyticsEvent.groupBy({
    by: ["path"],
    where: {
      projectId,
      timestamp: { gte: new Date(Date.now() - day) },
    },
    _count: { path: true },
    orderBy: { _count: { path: "desc" } },
    take: 1,
  });

  return res.length > 0 ? res[0].path : null;
}

/** Trend percentage: today vs yesterday */
export async function getTrendPercentage(
  projectId: string
): Promise<number> {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const today = await prisma.analyticsEvent.count({
    where: {
      projectId,
      timestamp: { gte: new Date(now - day) },
    },
  });

  const yesterday = await prisma.analyticsEvent.count({
    where: {
      projectId,
      timestamp: {
        gte: new Date(now - 2 * day),
        lt: new Date(now - day),
      },
    },
  });

  if (yesterday === 0) return 100;
  return Math.round(((today - yesterday) / yesterday) * 100);
}

/* ============================================================================
   Unified Fetch for Card Use (optional helper)
============================================================================ */
export async function getExtendedStats(
  projectId: string
): Promise<NoradExtendedStats> {
  const [
    pv24h,
    u24h,
    pv7d,
    u7d,
    topRoute,
    trend,
  ] = await Promise.all([
    getPageviews24h(projectId),
    getUniques24h(projectId),
    getPageviews7d(projectId),
    getUniques7d(projectId),
    getTopRoute24h(projectId),
    getTrendPercentage(projectId),
  ]);

  return {
    pageviews24h: pv24h,
    unique24h: u24h,
    pageviews7d: pv7d,
    unique7d: u7d,
    topRoute24h: topRoute,
    trendPercentage: trend,
  };
}
