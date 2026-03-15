/**
 * 여행 추천 컨트롤러
 * POST /api/recommendations/destinations
 * POST /api/recommendations/itinerary
 * POST /api/recommendations/accommodations
 * POST /api/recommendations/restaurants
 */

import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendDestinationsDto } from './dto/recommend-destinations.dto';
import { RecommendItineraryDto } from './dto/recommend-itinerary.dto';
import { RecommendAccommodationsDto } from './dto/recommend-accommodations.dto';
import { RecommendRestaurantsDto } from './dto/recommend-restaurants.dto';

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
    return { success: true, data: { destinations }, message: '여행지 추천이 완료되었습니다' };
  }

  /**
   * 일자별 동선 추천
   * POST /api/recommendations/itinerary
   */
  @Post('itinerary')
  async recommendItinerary(@Body() dto: RecommendItineraryDto) {
    const itinerary = await this.recommendationsService.recommendItinerary(dto);
    return { success: true, data: { itinerary }, message: '여행 동선 추천이 완료되었습니다' };
  }

  /**
   * 숙소 추천
   * POST /api/recommendations/accommodations
   */
  @Post('accommodations')
  async recommendAccommodations(@Body() dto: RecommendAccommodationsDto) {
    const accommodations = await this.recommendationsService.recommendAccommodations(dto);
    return { success: true, data: { accommodations }, message: '숙소 추천이 완료되었습니다' };
  }

  /**
   * 맛집 추천
   * POST /api/recommendations/restaurants
   */
  @Post('restaurants')
  async recommendRestaurants(@Body() dto: RecommendRestaurantsDto) {
    const restaurants = await this.recommendationsService.recommendRestaurants(dto);
    return { success: true, data: { restaurants }, message: '맛집 추천이 완료되었습니다' };
  }
}
