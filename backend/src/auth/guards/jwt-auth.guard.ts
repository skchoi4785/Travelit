import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * JWT 인증 가드
 * 보호된 엔드포인트에 JWT 토큰 검증을 강제
 * 토큰이 없거나 유효하지 않을 경우 401 에러 반환
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  /**
   * 인증 실패 처리
   * Passport 기본 에러 메시지를 공통 에러 형식으로 변환
   */
  handleRequest(err: any, user: any, info: any) {
    // 토큰이 없는 경우
    if (info?.name === 'JsonWebTokenError' || !user) {
      throw new UnauthorizedException({
        errorCode: 'UNAUTHORIZED',
        message: '인증이 필요합니다. 유효한 토큰을 제공해주세요.',
      });
    }

    // 토큰이 만료된 경우
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        errorCode: 'UNAUTHORIZED',
        message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
      });
    }

    // 기타 에러
    if (err) {
      throw err;
    }

    return user;
  }
}
