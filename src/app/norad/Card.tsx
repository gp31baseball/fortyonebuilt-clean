import type { NoradSite } from "@/config/sites";

type Props = {
  site: NoradSite;
  stats: {
    pageviews: number;
    uniqueSessions: number;
    pageviews24h?: number;
    unique24h?: number;
    pageviews7d?: number;
    unique7d?: number;
    topRoute24h?: string | null;
    trendPercentage?: number;
  } | null;
};

export function NoradCard({ site, stats }: Props) {
  return (
    <div
      className="
        rounded-xl
        bg-[#101f33]
        border border-neutral-600
        shadow-lg
        p-6
        flex flex-col
        gap-6
        transition-all duration-200
        hover:border-neutral-400
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="block text-lg font-semibold leading-tight text-white tracking-tight">
          {site.name}
        </span>
        <span className="block text-xs leading-tight text-neutral-400">
          {site.baseUrl}
        </span>
      </div>

      <div className="border-t border-neutral-700" />

      {/* Stats (existing) */}
      <div className="flex gap-16">
        <div>
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500 leading-none mb-1">
            Pageviews
          </span>
          <span className="block text-4xl leading-none font-bold text-white">
            {stats ? stats.pageviews : "—"}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wide text-neutral-500 leading-none mb-1">
            Unique
          </span>
          <span className="block text-4xl leading-none font-bold text-white">
            {stats ? stats.uniqueSessions : "—"}
          </span>
        </div>
      </div>

      {/* New Extended Stats */}
      <div className="flex flex-col gap-2 text-neutral-400 text-xs pt-2">

        <div className="flex justify-between">
          <span>24h Views</span>
          <span>{stats?.pageviews24h ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span>24h Unique</span>
          <span>{stats?.unique24h ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span>7d Views</span>
          <span>{stats?.pageviews7d ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span>7d Unique</span>
          <span>{stats?.unique7d ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span>Top Route (24h)</span>
          <span>{stats?.topRoute24h ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span>Trend</span>
          <span>
            {stats?.trendPercentage !== undefined
              ? `${stats.trendPercentage}%`
              : "—"}
          </span>
        </div>

      </div>

      <span className="block text-[0.7rem] leading-tight text-neutral-500 pt-1">
        Project: {site.vercelProjectId}
      </span>
    </div>
  );
}
