"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TrendPoint } from "@/lib/types";

export function TrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-80 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl">
      <h2 className="text-xl font-black text-ink">Saturation trend</h2>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="score" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis domain={[0, 100]} stroke="#64748b" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #ffe4e6" }} />
          <Area type="monotone" dataKey="score" stroke="#e11d48" strokeWidth={3} fill="url(#score)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PostBreakdownChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-80 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl">
      <h2 className="text-xl font-black text-ink">Platform post growth</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #dbeafe" }} />
          <Bar dataKey="tiktokPosts" stackId="a" fill="#111827" radius={[8, 8, 0, 0]} />
          <Bar dataKey="instagramPosts" stackId="a" fill="#f43f5e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
