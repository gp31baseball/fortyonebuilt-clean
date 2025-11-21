import { NORAD_SITES } from "../../config/sites";
import { getOverviewStats, getExtendedStats } from "../../lib/norad-db";
import { NoradCard } from "./Card";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default async function NoradDashboard() {
  const since = Date.now() - 7 * ONE_DAY;

  // Existing overview stats (pageviews + unique sessions + last event)
  const overview = await getOverviewStats(since);

  // Map for easy lookup
  const statsByProject = new Map(
    overview.map((s) => [s.projectId, s])
  );

  // Fetch extended stats for every site in parallel
  const extendedStatsArray = await Promise.all(
    NORAD_SITES.map((site) => getExtendedStats(site.vercelProjectId))
  );

  // Map extended stats by projectId as well
  const extendedStatsMap = new Map(
    NORAD_SITES.map((site, idx) => [
      site.vercelProjectId,
      extendedStatsArray[idx],
    ])
  );

  return (
    <div className="space-y-10 px-6 pt-10">
      <h1 className="text-xl font-semibold text-white">FortyOne NORAD</h1>
      <p className="text-neutral-400 text-sm">
        Unified analytics across all FortyOneBuilt projects.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {NORAD_SITES.map((site) => {
          const basic = statsByProject.get(site.vercelProjectId) ?? null;
          const extended = extendedStatsMap.get(site.vercelProjectId) ?? null;

          const mergedStats =
            basic && extended
              ? {
                  pageviews: basic.pageviews,
                  uniqueSessions: basic.uniqueSessions,
                  pageviews24h: extended.pageviews24h,
                  unique24h: extended.unique24h,
                  pageviews7d: extended.pageviews7d,
                  unique7d: extended.unique7d,
                  topRoute24h: extended.topRoute24h,
                  trendPercentage: extended.trendPercentage,
                }
              : null;

          return (
            <NoradCard
              key={site.id}
              site={site}
              stats={mergedStats}
            />
          );
        })}
      </div>
    </div>
  );
}
