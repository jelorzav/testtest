import Link from "next/link";
import { notFound } from "next/navigation";
import { MetricCards } from "@/components/MetricCards";
import { PostBreakdownChart, TrendChart } from "@/components/TrendChart";
import { RiskBadge } from "@/components/RiskBadge";
import { restaurantInsights } from "@/lib/data/seed";
import { socialDataSource } from "@/lib/ingestion/social-source";

export function generateStaticParams() {
  return restaurantInsights.map((restaurant) => ({ id: restaurant.id }));
}

export default async function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const restaurant = await socialDataSource.getRestaurant(id);
  if (!restaurant) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 lg:px-8">
      <Link href="/" className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">← Back to map</Link>
      <section className="mt-6 overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 p-8 text-white shadow-2xl lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-madrid">{restaurant.cuisine} · {restaurant.price_level}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">{restaurant.name}</h1>
            <p className="mt-4 text-lg text-slate-300">{restaurant.address}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-4 py-2">{restaurant.instagram_handle}</span>
              {restaurant.instagram_hashtags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-4 py-2">{tag}</span>)}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Saturation score</p>
            <p className="mt-2 text-7xl font-black">{restaurant.assessment.score}</p>
            <div className="mt-4"><RiskBadge label={restaurant.assessment.label} /></div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <TrendChart data={restaurant.trend} />
        <PostBreakdownChart data={restaurant.trend} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <MetricCards metrics={restaurant.metrics} />
        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-rose-500">Why this score?</p>
          <h2 className="mt-2 text-2xl font-black text-ink">Risk explanation</h2>
          <p className="mt-4 text-slate-600">{restaurant.assessment.explanation}.</p>
          <div className="mt-5 space-y-3">
            {restaurant.metrics.map((metric) => (
              <div key={metric.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-black capitalize text-ink">{metric.platform}</p>
                  <p className="text-sm font-bold text-slate-500">{metric.engagement_rate}% ER</p>
                </div>
                <p className="mt-2 text-sm text-slate-500">{metric.post_count.toLocaleString()} posts · {metric.creator_count.toLocaleString()} creators · {metric.posts_last_30_days} posts in 30 days</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
