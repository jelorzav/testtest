"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Platform, RiskLabel } from "@/lib/types";

const platforms: Array<Platform | "all"> = ["all", "tiktok", "instagram"];
const risks: Array<RiskLabel | "all"> = ["all", "Low", "Emerging", "High", "Conquered"];

export function FilterPanel({ cuisines, prices }: { cuisines: string[]; prices: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/?${params.toString()}`);
  }

  const fieldClass = "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100";

  return (
    <aside className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-glow backdrop-blur">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">Filters</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Signal controls</h2>
        <p className="mt-2 text-sm text-slate-500">Slice the map by culinary category, average spend, platform, and saturation risk.</p>
      </div>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-bold text-slate-700">
          Cuisine
          <select className={fieldClass} defaultValue={searchParams.get("cuisine") ?? "all"} onChange={(event) => update("cuisine", event.target.value)}>
            <option value="all">All cuisines</option>
            {cuisines.map((cuisine) => <option key={cuisine}>{cuisine}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Price
          <select className={fieldClass} defaultValue={searchParams.get("price") ?? "all"} onChange={(event) => update("price", event.target.value)}>
            <option value="all">All prices</option>
            {prices.map((price) => <option key={price}>{price}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Platform
          <select className={fieldClass} defaultValue={searchParams.get("platform") ?? "all"} onChange={(event) => update("platform", event.target.value)}>
            {platforms.map((platform) => <option key={platform} value={platform}>{platform === "all" ? "All platforms" : platform}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Risk level
          <select className={fieldClass} defaultValue={searchParams.get("risk") ?? "all"} onChange={(event) => update("risk", event.target.value)}>
            {risks.map((risk) => <option key={risk} value={risk}>{risk === "all" ? "All risks" : risk}</option>)}
          </select>
        </label>
      </div>
    </aside>
  );
}
