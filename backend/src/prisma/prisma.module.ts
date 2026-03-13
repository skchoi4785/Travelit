import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Prisma 모듈
 * @Global 데코레이터로 전역 모듈로 등록하여 어디서든 PrismaService를 주입할 수 있도록 함
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
