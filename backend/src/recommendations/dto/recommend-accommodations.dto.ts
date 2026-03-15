/**
 * 숙소 추천 요청 DTO
 * POST /api/recommendations/accommodations
 */

export class RecommendAccommodationsDto {
  /** 선택된 여행지 ID */
  destinationId: string;

  /** 동반자 유형 */
  companionType: 'solo' | 'couple' | 'family' | 'friends';

  /** 여행 기간 (일수) */
  duration: number;
}
