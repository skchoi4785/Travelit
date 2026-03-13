/**
 * 여행지 추천 컨트롤러 뼈대
 * POST /api/recommendations/destinations
 */

import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendDestinationsDto } from './dto/recommend-destinations.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  /**
   * 여행지 추천
   * POST /api/recommendations/destinations
   * TODO: @UseGuards(JwtAuthGuard) 인증 가드 추가 (Sprint 1-B 이후)
   */
  @Post('destinations')
  async recommendDestinations(@Body() dto: RecommendDestinationsDto) {
    const destinations = await this.recommendationsService.recommendDestinations(dto);
    return {
      success: true,
      data: { destinations },
      message: '여행지 추천이 완료되었습니다',
    };
  }
}
