import { FilterPanel } from "@/components/FilterPanel";
import { MadridMap } from "@/components/MadridMap";
import { RestaurantList } from "@/components/RestaurantList";
import { restaurantInsights } from "@/lib/data/seed";
import { socialDataSource } from "@/lib/ingestion/social-source";
import type { Platform, RiskLabel } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const params = searchParams;
  const restaurants = await socialDataSource.listRestaurants({
    cuisine: one(params.cuisine),
    price: one(params.price),
    platform: one(params.platform) as Platform | "all" | undefined,
    risk: one(params.risk) as RiskLabel | "all" | undefined
  });
  const cuisines = [...new Set(restaurantInsights.map((restaurant) => restaurant.cuisine))].sort();
  const prices = [...new Set(restaurantInsights.map((restaurant) => restaurant.price_level))];
  const conqueredCount = restaurants.filter((restaurant) => restaurant.assessment.label === "Conquered").length;
  const averageScore = Math.round(restaurants.reduce((sum, restaurant) => sum + restaurant.assessment.score, 0) / Math.max(restaurants.length, 1));

  return (
    <main className="mx-auto min-h-screen max-w-[1500px] px-5 py-8 lg:px-8">
      <header className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 p-8 text-white shadow-2xl lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-madrid">Influencer Saturation Map Madrid</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Find which Madrid restaurants have been conquered by creators.</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">Mock TikTok and Instagram intelligence scores restaurants using post volume, engagement, creator count, recent growth, and mega-creator concentration.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-4xl font-black">{restaurants.length}</p>
              <p className="text-sm text-slate-300">restaurants tracked</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-4xl font-black">{averageScore}</p>
              <p className="text-sm text-slate-300">avg score</p>
            </div>
            <div className="col-span-2 rounded-3xl bg-rose-500 p-5">
              <p className="text-4xl font-black">{conqueredCount}</p>
              <p className="text-sm text-rose-50">currently conquered</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <FilterPanel cuisines={cuisines} prices={prices} />
          <RestaurantList restaurants={restaurants} />
        </div>
        <MadridMap restaurants={restaurants} />
      </section>
    </main>
  );
}
