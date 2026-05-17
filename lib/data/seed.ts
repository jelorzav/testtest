import { scoreRestaurant } from "@/lib/scoring/risk";
import type { Restaurant, RestaurantInsight, SocialMetric, TrendPoint } from "@/lib/types";

export const restaurants: Restaurant[] = [
  { id: "sala-de-despiece", name: "Sala de Despiece", address: "C. de Ponzano, 11, Chamberí", latitude: 40.44105, longitude: -3.6998, cuisine: "Modern Spanish", price_level: "€€€", instagram_handle: "@saladedespiece", tiktok_search_terms: ["sala de despiece", "ponzano madrid"], instagram_hashtags: ["#saladedespiece", "#ponzano"] },
  { id: "streetxo", name: "StreetXO", address: "C. de Serrano, 52, Salamanca", latitude: 40.42972, longitude: -3.6875, cuisine: "Fusion", price_level: "€€€€", instagram_handle: "@streetxo", tiktok_search_terms: ["streetxo madrid", "dabiz muñoz"], instagram_hashtags: ["#streetxo", "#dabizmunoz"] },
  { id: "casa-lucio", name: "Casa Lucio", address: "C. de la Cava Baja, 35, La Latina", latitude: 40.41267, longitude: -3.70953, cuisine: "Castilian", price_level: "€€€", instagram_handle: "@casaluciomadrid", tiktok_search_terms: ["casa lucio huevos rotos"], instagram_hashtags: ["#casalucio", "#huevosrotos"] },
  { id: "botin", name: "Sobrino de Botín", address: "C. de Cuchilleros, 17, Centro", latitude: 40.41411, longitude: -3.70802, cuisine: "Roast House", price_level: "€€€", instagram_handle: "@botinrestaurant", tiktok_search_terms: ["botin madrid", "oldest restaurant madrid"], instagram_hashtags: ["#sobrinodebotin", "#botinmadrid"] },
  { id: "bodega-ardeosa", name: "Bodega de la Ardosa", address: "C. de Colón, 13, Malasaña", latitude: 40.42337, longitude: -3.70082, cuisine: "Tapas", price_level: "€€", instagram_handle: "@bodegadelaardosa", tiktok_search_terms: ["bodega de la ardosa", "tortilla madrid"], instagram_hashtags: ["#bodegadelaardosa", "#tortillamadrid"] },
  { id: "tri-ciclo", name: "TriCiclo", address: "C. de Sta. María, 28, Las Letras", latitude: 40.41313, longitude: -3.69746, cuisine: "Market Cuisine", price_level: "€€€", instagram_handle: "@tri_ciclo", tiktok_search_terms: ["triciclo madrid"], instagram_hashtags: ["#triciclomadrid"] },
  { id: "chocolateria-san-gines", name: "Chocolatería San Ginés", address: "Pasadizo de San Ginés, 5, Centro", latitude: 40.41682, longitude: -3.70684, cuisine: "Churros", price_level: "€", instagram_handle: "@chocolateriasangines", tiktok_search_terms: ["san gines churros", "churros madrid"], instagram_hashtags: ["#sangines", "#churrosmadrid"] },
  { id: "la-bola", name: "La Bola", address: "C. de la Bola, 5, Centro", latitude: 40.41951, longitude: -3.7101, cuisine: "Cocido", price_level: "€€", instagram_handle: "@labolamadrid", tiktok_search_terms: ["la bola madrid cocido"], instagram_hashtags: ["#labola", "#cocidomadrileno"] },
  { id: "ten-con-ten", name: "Ten con Ten", address: "C. de Ayala, 6, Salamanca", latitude: 40.42753, longitude: -3.68778, cuisine: "Mediterranean", price_level: "€€€€", instagram_handle: "@tenconten", tiktok_search_terms: ["ten con ten madrid"], instagram_hashtags: ["#tenconten", "#madridfoodie"] },
  { id: "numa-pompilio", name: "Numa Pompilio", address: "C. de Velázquez, 18, Salamanca", latitude: 40.42486, longitude: -3.68447, cuisine: "Italian", price_level: "€€€€", instagram_handle: "@numapompilio", tiktok_search_terms: ["numa pompilio madrid"], instagram_hashtags: ["#numapompilio"] },
  { id: "bel-mondo", name: "Bel Mondo", address: "C. de Velázquez, 39, Salamanca", latitude: 40.42678, longitude: -3.68435, cuisine: "Italian", price_level: "€€€", instagram_handle: "@belmondo_madrid", tiktok_search_terms: ["bel mondo madrid", "big mamma madrid"], instagram_hashtags: ["#belmondomadrid", "#bigmammagroup"] },
  { id: "honest-greens", name: "Honest Greens Gran Vía", address: "Gran Vía, 7, Centro", latitude: 40.41958, longitude: -3.69916, cuisine: "Healthy", price_level: "€€", instagram_handle: "@honestgreens", tiktok_search_terms: ["honest greens madrid"], instagram_hashtags: ["#honestgreens", "#healthyfoodmadrid"] },
  { id: "ramses", name: "Ramses", address: "Pl. de la Independencia, 4, Retiro", latitude: 40.42005, longitude: -3.68854, cuisine: "Contemporary", price_level: "€€€€", instagram_handle: "@ramsesmadrid", tiktok_search_terms: ["ramses madrid retiro"], instagram_hashtags: ["#ramsesmadrid"] },
  { id: "la-maquina", name: "La Máquina Jorge Juan", address: "C. de Jorge Juan, 12, Salamanca", latitude: 40.42343, longitude: -3.68652, cuisine: "Seafood", price_level: "€€€", instagram_handle: "@lamaquinamadrid", tiktok_search_terms: ["la maquina madrid marisco"], instagram_hashtags: ["#lamaquina", "#mariscomadrid"] },
  { id: "puntomx", name: "Punto MX", address: "C. del Gral. Pardiñas, 40, Salamanca", latitude: 40.42996, longitude: -3.67987, cuisine: "Mexican", price_level: "€€€€", instagram_handle: "@puntomx", tiktok_search_terms: ["punto mx madrid"], instagram_hashtags: ["#puntomx", "#mexicanmadrid"] },
  { id: "yakitoro", name: "Yakitoro", address: "C. de la Reina, 41, Chueca", latitude: 40.4204, longitude: -3.69972, cuisine: "Japanese", price_level: "€€", instagram_handle: "@yakitoro", tiktok_search_terms: ["yakitoro madrid"], instagram_hashtags: ["#yakitoro"] },
  { id: "amazonico", name: "Amazónico", address: "C. de Jorge Juan, 20, Salamanca", latitude: 40.42329, longitude: -3.68545, cuisine: "Latin American", price_level: "€€€€", instagram_handle: "@amazonico_restaurant", tiktok_search_terms: ["amazonico madrid"], instagram_hashtags: ["#amazonicomadrid", "#amazonico"] },
  { id: "bibo", name: "BiBo Madrid", address: "P.º de la Castellana, 52, Chamberí", latitude: 40.43575, longitude: -3.6898, cuisine: "Andalusian", price_level: "€€€", instagram_handle: "@bibodanigarcia", tiktok_search_terms: ["bibo madrid dani garcia"], instagram_hashtags: ["#bibomadrid", "#danigarcia"] },
  { id: "casa-dani", name: "Casa Dani", address: "Mercado de la Paz, Salamanca", latitude: 40.4266, longitude: -3.68035, cuisine: "Tortilla", price_level: "€", instagram_handle: "@casadani", tiktok_search_terms: ["casa dani tortilla"], instagram_hashtags: ["#casadani", "#tortilladepatatas"] },
  { id: "diverxo", name: "DiverXO", address: "NH Collection Eurobuilding, Chamartín", latitude: 40.45805, longitude: -3.68519, cuisine: "Avant-garde", price_level: "€€€€", instagram_handle: "@diverxo", tiktok_search_terms: ["diverxo madrid", "dabiz muñoz diverxo"], instagram_hashtags: ["#diverxo", "#michelinguide"] }
];

const baseProfiles: Record<string, [number, number, number, number, number]> = {
  "sala-de-despiece": [760, 118, 5200000, 76, 20], streetxo: [1240, 190, 16800000, 142, 42], "casa-lucio": [420, 72, 3100000, 28, 8], botin: [990, 152, 14300000, 93, 26], "bodega-ardeosa": [310, 54, 1800000, 18, 3], "tri-ciclo": [155, 32, 820000, 9, 1], "chocolateria-san-gines": [1360, 205, 22100000, 168, 39], "la-bola": [185, 38, 910000, 12, 2], "ten-con-ten": [530, 86, 4200000, 44, 12], "numa-pompilio": [430, 78, 3700000, 39, 10], "bel-mondo": [1180, 184, 19400000, 152, 47], "honest-greens": [360, 64, 2400000, 36, 5], ramses: [275, 48, 1700000, 21, 4], "la-maquina": [130, 29, 620000, 8, 1], puntomx: [240, 51, 1900000, 17, 3], yakitoro: [210, 43, 1250000, 16, 3], amazonico: [980, 158, 15100000, 112, 34], bibo: [340, 61, 2800000, 29, 7], "casa-dani": [455, 84, 4600000, 51, 14], diverxo: [890, 126, 13200000, 74, 31]
};

export const socialMetrics: SocialMetric[] = restaurants.flatMap((restaurant) => {
  const [posts, creators, views, recent30, mega] = baseProfiles[restaurant.id];
  const tiktokShare = restaurant.id === "chocolateria-san-gines" || restaurant.id === "bel-mondo" ? 0.64 : 0.52;
  return (["tiktok", "instagram"] as const).map((platform, index) => {
    const share = platform === "tiktok" ? tiktokShare : 1 - tiktokShare;
    const platformPosts = Math.round(posts * share);
    const platformViews = Math.round(views * (platform === "tiktok" ? 0.7 : 0.3));
    const likes = Math.round(platformViews * (platform === "tiktok" ? 0.061 : 0.045));
    const comments = Math.round(platformViews * (platform === "tiktok" ? 0.006 : 0.004));
    return {
      id: `${restaurant.id}-${platform}`,
      restaurant_id: restaurant.id,
      platform,
      post_count: platformPosts,
      creator_count: Math.max(6, Math.round(creators * share)),
      total_views: platformViews,
      total_likes: likes,
      total_comments: comments,
      engagement_rate: Number((((likes + comments) / platformViews) * 100).toFixed(2)),
      posts_last_7_days: Math.round(recent30 * share * (index === 0 ? 0.31 : 0.2)),
      posts_last_30_days: Math.round(recent30 * share),
      mega_creator_posts: Math.round(mega * share),
      captured_at: "2026-05-17T08:00:00.000Z"
    };
  });
});

export function trendForRestaurant(restaurantId: string): TrendPoint[] {
  const metrics = socialMetrics.filter((metric) => metric.restaurant_id === restaurantId);
  const assessment = scoreRestaurant(restaurantId, metrics);
  return ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"].map((date, index) => ({
    date,
    score: Math.max(8, Math.round(assessment.score * (0.62 + index * 0.095))),
    tiktokPosts: Math.round((metrics.find((metric) => metric.platform === "tiktok")?.post_count ?? 0) * (0.48 + index * 0.13)),
    instagramPosts: Math.round((metrics.find((metric) => metric.platform === "instagram")?.post_count ?? 0) * (0.52 + index * 0.12)),
    creators: Math.round(metrics.reduce((sum, metric) => sum + metric.creator_count, 0) * (0.55 + index * 0.1))
  }));
}

export const restaurantInsights: RestaurantInsight[] = restaurants.map((restaurant) => {
  const metrics = socialMetrics.filter((metric) => metric.restaurant_id === restaurant.id);
  return {
    ...restaurant,
    metrics,
    assessment: scoreRestaurant(restaurant.id, metrics),
    trend: trendForRestaurant(restaurant.id)
  };
});
