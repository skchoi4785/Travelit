/**
 * 여행 계획 서비스 뼈대
 * TODO: Sprint 1-B 완료 후 Prisma 연동 구현
 */

import { Injectable } from '@nestjs/common';

export interface CreateTravelPlanDto {
  destinationId: string;
  destinationName: string;
  startDate: string;
  duration: number;
  companionType: string;
}

@Injectable()
export class TravelPlansService {
  /**
   * 여행 계획 생성
   * TODO: PrismaService 주입 후 실제 DB 저장 구현
   */
  async createPlan(userId: string, dto: CreateTravelPlanDto) {
    // TODO: Prisma DB 저장
    // const plan = await this.prisma.travelPlan.create({ data: { ... } });
    const endDate = new Date(dto.startDate);
    endDate.setDate(endDate.getDate() + dto.duration - 1);

    return {
      id: `mock-${Date.now()}`,
      title: `${dto.destinationName} ${dto.duration - 1}박 ${dto.duration}일 여행`,
      status: 'PLANNING',
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * 사용자의 여행 계획 목록 조회
   * TODO: PrismaService 주입 후 실제 DB 조회 구현
   */
  async getPlans(userId: string) {
    // TODO: Prisma DB 조회
    // return this.prisma.travelPlan.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    return [];
  }
}
