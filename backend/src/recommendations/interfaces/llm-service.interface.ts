/**
 * LLM 서비스 추상화 인터페이스
 * Sprint 1-B 완료 후 실제 LLM 구현체로 교체합니다.
 */

export interface RecommendParams {
  travelStyle: 'active' | 'relaxed';
  environment: 'nature' | 'city';
  duration: number;
  companionType: 'solo' | 'couple' | 'family' | 'friends';
  startDate: string;
}

export interface DestinationResult {
  id: string;
  name: string;
  description: string;
  reason: string;
  imageUrl?: string;
  tags: string[];
}

/** 개별 활동 */
export interface ActivityResult {
  time: string;
  place: string;
  description: string;
  duration: string;
  transport: string;
}

/** 일자별 일정 */
export interface ItineraryDayResult {
  day: number;
  date: string;
  activities: ActivityResult[];
}

/** 숙소 추천 결과 */
export interface AccommodationResult {
  id: string;
  name: string;
  type: string;
  priceRange: string;
  description: string;
  features: string[];
  location: string;
}

/** 맛집 추천 결과 */
export interface RestaurantResult {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  features: string[];
  recommendedDays: number[];
}

export interface ILlmService {
  recommendDestinations(params: RecommendParams): Promise<DestinationResult[]>;
}
