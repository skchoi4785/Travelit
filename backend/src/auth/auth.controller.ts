import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiSuccessResponse } from '../common/dto/api-response.dto';

/**
 * 인증 컨트롤러
 * 회원가입, 로그인, 현재 사용자 조회 엔드포인트 제공
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/register — 회원가입
   * @param registerDto 회원가입 정보 (이메일, 비밀번호, 사용자 이름)
   * @returns 생성된 사용자 정보 (비밀번호 제외)
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return new ApiSuccessResponse(user, '회원가입이 완료되었습니다.');
  }

  /**
   * POST /api/auth/login — 로그인
   * @param loginDto 로그인 정보 (이메일, 비밀번호)
   * @returns Access Token, Refresh Token 및 사용자 정보
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { user, tokens } = await this.authService.login(loginDto);
    return new ApiSuccessResponse(
      {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      '로그인이 완료되었습니다.',
    );
  }

  /**
   * GET /api/auth/me — 현재 사용자 조회 (JWT 인증 필요)
   * Authorization: Bearer <accessToken> 헤더 필요
   * @param req Express Request 객체 (request.user에 인증된 사용자 정보 포함)
   * @returns 현재 로그인된 사용자 정보
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Request() req: any) {
    return new ApiSuccessResponse(
      req.user,
      '사용자 정보를 성공적으로 조회했습니다.',
    );
  }
}
