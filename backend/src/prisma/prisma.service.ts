import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma 서비스
 * PrismaClient를 NestJS 의존성 주입 시스템에 통합
 * 앱 시작/종료 시 DB 연결 자동 관리
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  /**
   * 모듈 초기화 시 데이터베이스 연결
   */
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('데이터베이스 연결 성공');
    } catch (error) {
      this.logger.error('데이터베이스 연결 실패', error);
      throw error;
    }
  }

  /**
   * 모듈 종료 시 데이터베이스 연결 해제
   */
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('데이터베이스 연결 해제');
  }
}
