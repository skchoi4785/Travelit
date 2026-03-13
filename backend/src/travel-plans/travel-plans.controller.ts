/**
 * 여행 계획 컨트롤러 뼈대
 * POST /api/travel-plans — 여행 계획 생성
 * GET  /api/travel-plans — 목록 조회
 */

import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { TravelPlansService, CreateTravelPlanDto } from './travel-plans.service';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  /**
   * 여행 계획 생성
   * POST /api/travel-plans
   * TODO: @UseGuards(JwtAuthGuard) 인증 가드 추가 (Sprint 1-B 이후)
   */
  @Post()
  async createPlan(@Request() req: { user?: { id: string } }, @Body() dto: CreateTravelPlanDto) {
    // TODO: JWT 인증 후 req.user.id 사용
    const userId = req.user?.id || 'mock-user-id';
    const plan = await this.travelPlansService.createPlan(userId, dto);
    return {
      success: true,
      data: plan,
      message: '여행 계획이 생성되었습니다',
    };
  }

  /**
   * 여행 계획 목록 조회
   * GET /api/travel-plans
   * TODO: @UseGuards(JwtAuthGuard) 인증 가드 추가 (Sprint 1-B 이후)
   */
  @Get()
  async getPlans(@Request() req: { user?: { id: string } }) {
    const userId = req.user?.id || 'mock-user-id';
    const plans = await this.travelPlansService.getPlans(userId);
    return {
      success: true,
      data: { plans },
      message: '여행 계획 목록을 조회했습니다',
    };
  }
}
