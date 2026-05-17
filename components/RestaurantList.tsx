import Link from "next/link";
import { RiskBadge } from "@/components/RiskBadge";
import type { RestaurantInsight } from "@/lib/types";

export function RestaurantList({ restaurants }: { restaurants: RestaurantInsight[] }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-ink">Watched restaurants</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">{restaurants.length} places</span>
      </div>
      <div className="mt-4 max-h-[440px] space-y-3 overflow-auto pr-2">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`} className="block rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-ink">{restaurant.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{restaurant.cuisine} · {restaurant.price_level}</p>
              </div>
              <RiskBadge label={restaurant.assessment.label} score={restaurant.assessment.score} />
            </div>
            <p className="mt-3 line-clamp-2 text-xs text-slate-500">{restaurant.assessment.explanation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
