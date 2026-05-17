import { restaurantInsights } from "@/lib/data/seed";
import type { RestaurantFilters, RestaurantInsight, SocialMetric } from "@/lib/types";

export interface SocialDataSource {
  listRestaurants(filters?: RestaurantFilters): Promise<RestaurantInsight[]>;
  getRestaurant(id: string): Promise<RestaurantInsight | null>;
  getMetrics(restaurantId: string): Promise<SocialMetric[]>;
}

function applyFilters(items: RestaurantInsight[], filters: RestaurantFilters = {}) {
  return items.filter((item) => {
    const platformMatch = !filters.platform || filters.platform === "all" || item.metrics.some((metric) => metric.platform === filters.platform);
    return (
      (!filters.cuisine || item.cuisine === filters.cuisine) &&
      (!filters.price || item.price_level === filters.price) &&
      (!filters.risk || filters.risk === "all" || item.assessment.label === filters.risk) &&
      platformMatch
    );
  });
}

export class MockSocialDataSource implements SocialDataSource {
  async listRestaurants(filters?: RestaurantFilters) {
    return applyFilters(restaurantInsights, filters);
  }

  async getRestaurant(id: string) {
    return restaurantInsights.find((restaurant) => restaurant.id === id) ?? null;
  }

  async getMetrics(restaurantId: string) {
    return restaurantInsights.find((restaurant) => restaurant.id === restaurantId)?.metrics ?? [];
  }
}

export class ApiBackedSocialDataSource implements SocialDataSource {
  async listRestaurants(): Promise<RestaurantInsight[]> {
    throw new Error("Real TikTok/Instagram ingestion is not configured. Implement provider adapters here.");
  }

  async getRestaurant(): Promise<RestaurantInsight | null> {
    throw new Error("Real TikTok/Instagram ingestion is not configured. Implement provider adapters here.");
  }

  async getMetrics(): Promise<SocialMetric[]> {
    throw new Error("Real TikTok/Instagram ingestion is not configured. Implement provider adapters here.");
  }
}

export const socialDataSource: SocialDataSource = new MockSocialDataSource();
