import { NORAD_SITES } from "../../config/sites";
import { getOverviewStats } from "../../lib/norad-db";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default async function NoradDashboard() {

  // 🔥 Removed legacy assertNoradAccess()
  // If you want auth later, we can re-add clean version

  const since = Date.now() - 7 * ONE_DAY;
  const overview = await getOverviewStats(since);

  const statsByProject = new Map(
    overview.map((s) => [s.projectId, s])
  );

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold">FortyOne NORAD</h1>
      <p className="text-neutral-400 text-sm">
        Unified analytics across all FortyOneBuilt projects.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {NORAD_SITES.map((site) => {
          const stat = statsByProject.get(site.vercelProjectId);

          return (
            <div
              key={site.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 shadow"
            >
              <h2 className="font-semibold">{site.name}</h2>
              <p className="text-xs text-neutral-500">{site.baseUrl}</p>

              <div className="mt-4 flex gap-6">
                <div>
                  <p className="text-xs text-neutral-500">Pageviews</p>
                  <p className="text-lg font-bold">
                    {stat ? stat.pageviews : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-neutral-500">Unique</p>
                  <p className="text-lg font-bold">
                    {stat ? stat.uniqueSessions : "—"}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-[0.7rem] text-neutral-500">
                Project: {site.vercelProjectId}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
