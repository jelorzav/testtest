export type Platform = "tiktok" | "instagram";
export type RiskLabel = "Low" | "Emerging" | "High" | "Conquered";

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cuisine: string;
  price_level: "€" | "€€" | "€€€" | "€€€€";
  instagram_handle: string;
  tiktok_search_terms: string[];
  instagram_hashtags: string[];
};

export type SocialMetric = {
  id: string;
  restaurant_id: string;
  platform: Platform;
  post_count: number;
  creator_count: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
  engagement_rate: number;
  posts_last_7_days: number;
  posts_last_30_days: number;
  mega_creator_posts: number;
  captured_at: string;
};

export type RiskAssessment = {
  restaurant_id: string;
  score: number;
  label: RiskLabel;
  explanation: string;
  updated_at: string;
};

export type TrendPoint = {
  date: string;
  score: number;
  tiktokPosts: number;
  instagramPosts: number;
  creators: number;
};

export type RestaurantInsight = Restaurant & {
  metrics: SocialMetric[];
  assessment: RiskAssessment;
  trend: TrendPoint[];
};

export type RestaurantFilters = {
  cuisine?: string;
  price?: string;
  platform?: Platform | "all";
  risk?: RiskLabel | "all";
};
