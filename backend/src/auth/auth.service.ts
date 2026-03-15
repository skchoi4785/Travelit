import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

/**
 * 토큰 쌍 인터페이스
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * 인증 서비스
 * 회원가입, 로그인, 토큰 생성/검증 로직 담당
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // bcrypt salt rounds: 10 (보안과 성능의 균형)
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 회원가입
   * @param registerDto 회원가입 요청 데이터
   * @returns 생성된 사용자 정보 (비밀번호 제외)
   */
  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    // 사용자 생성 (이메일 중복 검사는 UsersService에서 처리)
    const user = await this.usersService.createUser(
      email,
      hashedPassword,
      username,
    );

    this.logger.log(`회원가입 완료: ${email}`);

    // 비밀번호 제외한 사용자 정보 반환
    return this.usersService.sanitizeUser(user);
  }

  /**
   * 로그인
   * @param loginDto 로그인 요청 데이터
   * @returns Access Token과 Refresh Token 쌍
   */
  async login(loginDto: LoginDto): Promise<{ user: any; tokens: TokenPair }> {
    const { email, password } = loginDto;

    // 이메일로 사용자 조회
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({
        errorCode: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        errorCode: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    // 토큰 생성
    const tokens = await this.generateTokens(user);

    // Refresh Token DB에 저장
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

    this.logger.log(`로그인 성공: ${email}`);

    return {
      user: this.usersService.sanitizeUser(user),
      tokens,
    };
  }

  /**
   * Access Token 및 Refresh Token 생성
   * @param user 사용자 객체
   * @returns 토큰 쌍
   */
  private async generateTokens(user: User): Promise<TokenPair> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // Access Token 생성 (만료: 1시간)
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    // Refresh Token 생성 (만료: 7일)
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
