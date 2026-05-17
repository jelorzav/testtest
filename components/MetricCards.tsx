import type { SocialMetric } from "@/lib/types";

const formatNumber = (value: number) => Intl.NumberFormat("en", { notation: value > 999_999 ? "compact" : "standard" }).format(value);

export function MetricCards({ metrics }: { metrics: SocialMetric[] }) {
  const totals = metrics.reduce((acc, metric) => ({
    posts: acc.posts + metric.post_count,
    creators: acc.creators + metric.creator_count,
    views: acc.views + metric.total_views,
    likes: acc.likes + metric.total_likes,
    comments: acc.comments + metric.total_comments,
    last7: acc.last7 + metric.posts_last_7_days,
    last30: acc.last30 + metric.posts_last_30_days,
    mega: acc.mega + metric.mega_creator_posts
  }), { posts: 0, creators: 0, views: 0, likes: 0, comments: 0, last7: 0, last30: 0, mega: 0 });

  const cards = [
    ["Posts", formatNumber(totals.posts)],
    ["Creators", formatNumber(totals.creators)],
    ["Views", formatNumber(totals.views)],
    ["Engagement", `${(((totals.likes + totals.comments) / totals.views) * 100).toFixed(1)}%`],
    ["Last 7 days", formatNumber(totals.last7)],
    ["Mega-creator posts", formatNumber(totals.mega)]
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(([label, value]) => (
        <div key={label} className="rounded-[1.5rem] border border-white/70 bg-white/90 p-5 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-black text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}
