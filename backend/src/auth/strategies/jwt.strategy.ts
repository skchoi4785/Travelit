import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

/**
 * JWT 페이로드 인터페이스
 */
export interface JwtPayload {
  sub: string;   // 사용자 ID
  email: string; // 사용자 이메일
}

/**
 * JWT 인증 전략
 * Authorization 헤더의 Bearer 토큰을 검증하여 사용자 인증 처리
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Authorization 헤더에서 Bearer 토큰 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 만료된 토큰 거부
      ignoreExpiration: false,
      // 환경변수에서 JWT 시크릿 키 로드
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * JWT 페이로드 검증
   * 토큰이 유효한 경우 사용자 정보를 request.user에 주입
   * @param payload JWT 페이로드
   * @returns 인증된 사용자 정보 (비밀번호 제외)
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        errorCode: 'UNAUTHORIZED',
        message: '유효하지 않은 토큰입니다.',
      });
    }

    // 비밀번호와 refreshToken을 제외한 사용자 정보 반환
    return this.usersService.sanitizeUser(user);
  }
}
