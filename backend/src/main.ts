import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

/**
 * 애플리케이션 부트스트랩 함수
 * NestJS 앱 인스턴스 생성 및 전역 설정 적용 후 서버 시작
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // NestJS 앱 인스턴스 생성
  const app = await NestFactory.create(AppModule);

  // CORS 설정: 프론트엔드 개발 서버 허용
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 전역 API 경로 접두사 설정
  app.setGlobalPrefix('api');

  // 전역 유효성 검사 파이프 설정
  // class-validator 데코레이터를 사용하여 DTO 자동 검증
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // DTO에 정의되지 않은 필드 자동 제거
      forbidNonWhitelisted: true, // 정의되지 않은 필드 전송 시 에러 반환
      transform: true,           // 요청 데이터를 DTO 타입으로 자동 변환
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 전역 예외 필터 설정 (HTTP 예외를 공통 에러 형식으로 변환)
  app.useGlobalFilters(new HttpExceptionFilter());

  // 전역 응답 인터셉터 설정 (성공 응답을 공통 형식으로 변환)
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 서버 포트 설정 (기본값: 4000)
  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`🚀 Travelit API 서버가 시작되었습니다: http://localhost:${port}/api`);
  logger.log(`환경: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('서버 시작 실패', error);
  process.exit(1);
});
