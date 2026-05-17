"use client";

import Link from "next/link";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { riskColor } from "@/lib/scoring/risk";
import type { RestaurantInsight } from "@/lib/types";

const center: [number, number] = [-3.7003, 40.4253];

export function MadridMap({ restaurants }: { restaurants: RestaurantInsight[] }) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<RestaurantInsight | null>(restaurants[0] ?? null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const bounds = useMemo(() => {
    const longitudes = restaurants.map((restaurant) => restaurant.longitude);
    const latitudes = restaurants.map((restaurant) => restaurant.latitude);
    return {
      minLng: Math.min(...longitudes, -3.72),
      maxLng: Math.max(...longitudes, -3.67),
      minLat: Math.min(...latitudes, 40.4),
      maxLat: Math.max(...latitudes, 40.465)
    };
  }, [restaurants]);

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom: 12.1,
      pitch: 35
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    if (!mapRef.current) return;
    const markers = restaurants.map((restaurant) => {
      const element = document.createElement("button");
      element.className = "h-5 w-5 rounded-full border-2 border-white shadow-lg transition hover:scale-125";
      element.style.backgroundColor = riskColor(restaurant.assessment.label);
      element.ariaLabel = restaurant.name;
      element.addEventListener("click", () => setActive(restaurant));
      return new mapboxgl.Marker(element).setLngLat([restaurant.longitude, restaurant.latitude]).addTo(mapRef.current!);
    });
    return () => markers.forEach((marker) => marker.remove());
  }, [restaurants]);

  if (!token) {
    return (
      <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/80 bg-[#f3eadf] shadow-2xl">
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(90deg, rgba(16,24,40,.08) 1px, transparent 1px), linear-gradient(rgba(16,24,40,.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute left-8 top-8 rounded-2xl bg-white/90 p-4 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Madrid mock map</p>
          <p className="mt-1 max-w-xs text-sm text-slate-600">Set NEXT_PUBLIC_MAPBOX_TOKEN to switch this fallback into an interactive Mapbox map.</p>
        </div>
        {restaurants.map((restaurant) => {
          const left = ((restaurant.longitude - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 82 + 9;
          const top = 90 - ((restaurant.latitude - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 78;
          return (
            <button key={restaurant.id} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white p-2 shadow-xl transition hover:scale-125" style={{ left: `${left}%`, top: `${top}%`, backgroundColor: riskColor(restaurant.assessment.label) }} onClick={() => setActive(restaurant)} aria-label={restaurant.name} />
          );
        })}
        {active && <MapCard restaurant={active} />}
      </div>
    );
  }

  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/80 shadow-2xl">
      <div ref={containerRef} className="absolute inset-0" />
      {active && <MapCard restaurant={active} />}
    </div>
  );
}

function MapCard({ restaurant }: { restaurant: RestaurantInsight }) {
  return (
    <div className="absolute bottom-6 left-6 right-6 max-w-md rounded-[1.5rem] border border-white/70 bg-white/95 p-5 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">{restaurant.cuisine} · {restaurant.price_level}</p>
          <h3 className="mt-2 text-2xl font-black text-ink">{restaurant.name}</h3>
        </div>
        <div className="rounded-2xl bg-slate-950 px-3 py-2 text-center text-white">
          <p className="text-2xl font-black">{restaurant.assessment.score}</p>
          <p className="text-[10px] uppercase tracking-widest">score</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{restaurant.assessment.explanation}</p>
      <Link className="mt-4 inline-flex rounded-full bg-rose-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600" href={`/restaurants/${restaurant.id}`}>Open detail</Link>
    </div>
  );
}
