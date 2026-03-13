import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

/**
 * 사용자 서비스
 * 사용자 CRUD 및 조회 로직 담당
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * 이메일로 사용자 조회
   * @param email 조회할 이메일 주소
   * @returns 사용자 객체 또는 null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * ID로 사용자 조회
   * @param id 조회할 사용자 UUID
   * @returns 사용자 객체 또는 null
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * 새 사용자 생성
   * @param email 이메일 주소
   * @param hashedPassword 해시된 비밀번호
   * @param username 사용자 이름
   * @returns 생성된 사용자 객체
   */
  async createUser(
    email: string,
    hashedPassword: string,
    username: string,
  ): Promise<User> {
    // 이메일 중복 검사
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException({
        errorCode: 'EMAIL_ALREADY_EXISTS',
        message: '이미 사용 중인 이메일 주소입니다.',
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    this.logger.log(`신규 사용자 생성: ${email}`);
    return user;
  }

  /**
   * Refresh Token 업데이트
   * @param userId 사용자 ID
   * @param refreshToken 저장할 Refresh Token (null이면 토큰 삭제)
   */
  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  /**
   * 비밀번호를 제외한 사용자 정보 반환
   * @param user 사용자 객체
   * @returns 비밀번호와 refreshToken을 제외한 사용자 정보
   */
  sanitizeUser(user: User): Omit<User, 'password' | 'refreshToken'> {
    const { password, refreshToken, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
