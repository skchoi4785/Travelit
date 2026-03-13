/**
 * 여행지 추천 서비스 뼈대
 * TODO: Sprint 1-B 완료 후 ILlmService 주입 및 실제 LLM 호출로 교체
 */

import { Injectable } from '@nestjs/common';
import { RecommendDestinationsDto } from './dto/recommend-destinations.dto';
import { DestinationResult } from './interfaces/llm-service.interface';

/** Mock 여행지 데이터 (실제 LLM 연동 전까지 사용) */
const MOCK_DESTINATIONS: DestinationResult[] = [
  {
    id: '1',
    name: '제주도',
    description: '자연과 문화가 어우러진 섬',
    reason: '활동적인 여행과 자연 경관을 선호하는 분께 추천',
    tags: ['자연', '해변', '트레킹'],
  },
  {
    id: '2',
    name: '부산',
    description: '해양 도시의 활기찬 매력',
    reason: '도시 문화와 해변을 함께 즐길 수 있는 최적의 도시',
    tags: ['도시', '해변', '미식'],
  },
  {
    id: '3',
    name: '경주',
    description: '천년 역사의 문화 도시',
    reason: '역사 문화 탐방을 즐기는 분께 완벽한 여행지',
    tags: ['역사', '문화', '힐링'],
  },
  {
    id: '4',
    name: '강릉',
    description: '바다와 커피 향이 가득한 도시',
    reason: '여유로운 휴식과 바다 분위기를 원하는 분께 추천',
    tags: ['해변', '카페', '힐링'],
  },
  {
    id: '5',
    name: '전주',
    description: '한옥마을과 맛의 도시',
    reason: '전통 문화와 미식 탐방을 동시에 즐기고 싶은 분께 추천',
    tags: ['전통', '한옥', '미식'],
  },
];

@Injectable()
export class RecommendationsService {
  /**
   * 여행지 추천
   * TODO: ILlmService 주입 후 아래 Mock 응답을 LLM 호출로 교체
   *   const results = await this.llmService.recommendDestinations(dto);
   *   return results;
   */
  async recommendDestinations(dto: RecommendDestinationsDto): Promise<DestinationResult[]> {
    // TODO: 실제 LLM 연동 위치
    // Sprint 1-B 환경 구성 완료 후 ILlmService를 주입하여 교체합니다.
    return MOCK_DESTINATIONS;
  }
}
