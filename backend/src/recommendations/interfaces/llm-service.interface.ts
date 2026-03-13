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

export interface ILlmService {
  recommendDestinations(params: RecommendParams): Promise<DestinationResult[]>;
}
