import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';

/**
 * 애플리케이션 루트 모듈
 * 모든 기능 모듈을 통합하여 애플리케이션을 구성
 */
@Module({
  imports: [
    // 환경변수 설정 모듈 (전역 설정)
    ConfigModule.forRoot({
      isGlobal: true,      // 모든 모듈에서 ConfigService 사용 가능
      envFilePath: '.env', // .env 파일 로드
    }),

    // Prisma 데이터베이스 모듈 (전역 등록)
    PrismaModule,

    // 인증 모듈 (회원가입, 로그인, JWT 처리)
    AuthModule,

    // 사용자 모듈
    UsersModule,

    // 추천 모듈 (여행지, 일정, 숙소, 맛집 추천)
    RecommendationsModule,

    // 여행 계획 모듈 (여행 계획 CRUD)
    TravelPlansModule,
  ],
})
export class AppModule {}
