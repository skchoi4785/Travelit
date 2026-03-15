/**
 * 일자별 동선 추천 요청 DTO
 * POST /api/recommendations/itinerary
 */

export class RecommendItineraryDto {
  /** 선택된 여행지 ID */
  destinationId: string;

  /** 여행 기간 (일수) */
  duration: number;

  /** 여행 스타일 */
  travelStyle: 'active' | 'relaxed';

  /** 선호 환경 */
  environment: 'nature' | 'city';

  /** 출발일 (YYYY-MM-DD) */
  startDate: string;
}
