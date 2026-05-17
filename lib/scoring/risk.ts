import type { RiskAssessment, RiskLabel, SocialMetric } from "@/lib/types";

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

export function riskLabel(score: number): RiskLabel {
  if (score >= 78) return "Conquered";
  if (score >= 58) return "High";
  if (score >= 35) return "Emerging";
  return "Low";
}

export function scoreRestaurant(restaurantId: string, metrics: SocialMetric[]): RiskAssessment {
  const totals = metrics.reduce(
    (acc, metric) => {
      acc.posts += metric.post_count;
      acc.creators += metric.creator_count;
      acc.views += metric.total_views;
      acc.likes += metric.total_likes;
      acc.comments += metric.total_comments;
      acc.last7 += metric.posts_last_7_days;
      acc.last30 += metric.posts_last_30_days;
      acc.megaPosts += metric.mega_creator_posts;
      return acc;
    },
    { posts: 0, creators: 0, views: 0, likes: 0, comments: 0, last7: 0, last30: 0, megaPosts: 0 }
  );

  const engagementRate = totals.views > 0 ? ((totals.likes + totals.comments) / totals.views) * 100 : 0;
  const postVolumeScore = clamp((Math.log10(totals.posts + 1) / Math.log10(1500)) * 100);
  const engagementScore = clamp((engagementRate / 9) * 100);
  const creatorScore = clamp((Math.log10(totals.creators + 1) / Math.log10(220)) * 100);
  const recentGrowthRate = totals.last30 > 0 ? totals.last7 / totals.last30 : 0;
  const recentGrowthScore = clamp((recentGrowthRate / 0.42) * 100);
  const megaCreatorScore = clamp(((totals.megaPosts / Math.max(totals.posts, 1)) / 0.18) * 100);

  const score = Math.round(
    postVolumeScore * 0.26 +
      engagementScore * 0.2 +
      creatorScore * 0.22 +
      recentGrowthScore * 0.18 +
      megaCreatorScore * 0.14
  );
  const label = riskLabel(score);

  const explanation = [
    `${totals.posts.toLocaleString()} tracked posts from ${totals.creators.toLocaleString()} creators`,
    `${engagementRate.toFixed(1)}% blended engagement`,
    `${totals.last7} posts in the last 7 days`,
    `${totals.megaPosts} posts from mega-creators`
  ].join(" · ");

  return {
    restaurant_id: restaurantId,
    score,
    label,
    explanation,
    updated_at: new Date("2026-05-17T09:00:00.000Z").toISOString()
  };
}

export function riskColor(label: RiskLabel) {
  return {
    Low: "#2f9e44",
    Emerging: "#f59f00",
    High: "#f76707",
    Conquered: "#e03131"
  }[label];
}
