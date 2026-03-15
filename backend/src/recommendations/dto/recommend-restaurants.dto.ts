/**
 * 맛집 추천 요청 DTO
 * POST /api/recommendations/restaurants
 */

export class RecommendRestaurantsDto {
  /** 선택된 여행지 ID */
  destinationId: string;

  /** 여행 기간 (일수) */
  duration: number;

  /** 여행 스타일 */
  travelStyle: 'active' | 'relaxed';
}
