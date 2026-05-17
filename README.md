# Influencer Saturation Map Madrid

A clean, modern Next.js App Router dashboard for mapping Madrid restaurants and estimating whether they have been "conquered" by influencer attention on TikTok and Instagram.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase/Postgres schema stub
- Mapbox GL JS map with a tokenless Madrid fallback map
- Recharts trend and platform charts

## Features

- Madrid restaurant dashboard with 20 seeded restaurants.
- Risk-colored markers: Low, Emerging, High, and Conquered.
- Filters for cuisine, price level, platform, and risk level.
- Restaurant detail pages with score, chart trends, metrics breakdown, and score explanation.
- Mock social metrics for TikTok and Instagram.
- Abstract ingestion layer so live TikTok/Instagram provider adapters can replace the mock source later.
- Supabase SQL schema for restaurants, social metrics, and risk assessments.

## Scoring model

The scoring function combines:

1. Post volume
2. Engagement rate
3. Creator count
4. Recent growth from posts in the last 7 and 30 days
5. Mega-creator concentration

Scores are normalized to 0-100 and labeled:

- Low: 0-34
- Emerging: 35-57
- High: 58-77
- Conquered: 78-100

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Mapbox is optional for local review. Without `NEXT_PUBLIC_MAPBOX_TOKEN`, the app shows a stylized Madrid fallback map. To enable Mapbox, add:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

## Supabase

The schema is in `supabase/schema.sql`. The app uses the mock ingestion source by default; wire Supabase reads into `lib/ingestion/social-source.ts` when real data ingestion is ready.
