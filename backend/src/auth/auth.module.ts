import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

/**
 * 인증 모듈
 * JWT 기반 인증 전략, Passport 통합, 관련 서비스/컨트롤러 등록
 */
@Module({
  imports: [
    // 사용자 모듈 (사용자 조회/생성 기능)
    UsersModule,

    // Passport 기본 전략 설정
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JWT 모듈 비동기 설정 (환경변수에서 시크릿 키 로드)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h', // Access Token 기본 만료 시간
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,  // JWT 검증 전략
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
