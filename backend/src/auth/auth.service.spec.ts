/**
 * AuthService 단위 테스트
 * 회원가입, 로그인, 토큰 생성 로직 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

/** Mock 사용자 객체 */
const mockUser = {
  id: 'user-uuid-1',
  email: 'test@example.com',
  password: '$2b$10$hashedpassword',
  username: '테스트유저',
  refreshToken: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** UsersService Mock */
const mockUsersService = {
  createUser: jest.fn(),
  findByEmail: jest.fn(),
  updateRefreshToken: jest.fn(),
  sanitizeUser: jest.fn(),
};

/** JwtService Mock */
const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
};

/** ConfigService Mock */
const mockConfigService = {
  get: jest.fn().mockReturnValue('test-secret'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  // ── 회원가입 테스트 ──────────────────────────────────────────────────────

  describe('register', () => {
    it('정상적인 회원가입 시 sanitizeUser 결과를 반환한다', async () => {
      mockUsersService.createUser.mockResolvedValue(mockUser);
      mockUsersService.sanitizeUser.mockReturnValue({ id: mockUser.id, email: mockUser.email, username: mockUser.username });

      const result = await service.register({
        email: 'test@example.com',
        password: 'password123',
        username: '테스트유저',
      });

      expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);
      expect(mockUsersService.sanitizeUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ id: mockUser.id, email: mockUser.email, username: mockUser.username });
    });

    it('비밀번호는 bcrypt로 해시화하여 createUser에 전달한다', async () => {
      mockUsersService.createUser.mockResolvedValue(mockUser);
      mockUsersService.sanitizeUser.mockReturnValue({});

      await service.register({
        email: 'test@example.com',
        password: 'plainpassword',
        username: '유저',
      });

      const [, hashedPassword] = mockUsersService.createUser.mock.calls[0];
      // 원문 비밀번호가 그대로 전달되지 않아야 한다
      expect(hashedPassword).not.toBe('plainpassword');
      // bcrypt 해시 형식 검증
      expect(hashedPassword).toMatch(/^\$2b\$/);
    });

    it('이미 존재하는 이메일이면 ConflictException이 전파된다', async () => {
      mockUsersService.createUser.mockRejectedValue(
        new ConflictException({ errorCode: 'EMAIL_ALREADY_EXISTS', message: '이미 사용 중인 이메일 주소입니다.' })
      );

      await expect(
        service.register({ email: 'dup@example.com', password: 'pw', username: '유저' })
      ).rejects.toThrow(ConflictException);
    });
  });

  // ── 로그인 테스트 ────────────────────────────────────────────────────────

  describe('login', () => {
    it('올바른 자격증명으로 로그인하면 user와 tokens를 반환한다', async () => {
      const hashedPw = await bcrypt.hash('correctpassword', 10);
      mockUsersService.findByEmail.mockResolvedValue({ ...mockUser, password: hashedPw });
      mockUsersService.updateRefreshToken.mockResolvedValue(undefined);
      mockUsersService.sanitizeUser.mockReturnValue({ id: mockUser.id, email: mockUser.email });
      mockJwtService.sign.mockReturnValue('mock-token');

      const result = await service.login({ email: 'test@example.com', password: 'correctpassword' });

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('tokens');
      expect(result.tokens).toHaveProperty('accessToken');
      expect(result.tokens).toHaveProperty('refreshToken');
    });

    it('존재하지 않는 이메일이면 UnauthorizedException을 던진다', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'notexist@example.com', password: 'pw' })
      ).rejects.toThrow(UnauthorizedException);
    });

    it('잘못된 비밀번호이면 UnauthorizedException을 던진다', async () => {
      const hashedPw = await bcrypt.hash('correctpassword', 10);
      mockUsersService.findByEmail.mockResolvedValue({ ...mockUser, password: hashedPw });

      await expect(
        service.login({ email: 'test@example.com', password: 'wrongpassword' })
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  // ── 토큰 생성 테스트 ─────────────────────────────────────────────────────

  describe('generateTokens (via login)', () => {
    it('로그인 성공 시 JwtService.sign이 Access Token / Refresh Token 각각 1회씩 호출된다', async () => {
      const hashedPw = await bcrypt.hash('pw', 10);
      mockUsersService.findByEmail.mockResolvedValue({ ...mockUser, password: hashedPw });
      mockUsersService.updateRefreshToken.mockResolvedValue(undefined);
      mockUsersService.sanitizeUser.mockReturnValue({});
      mockJwtService.sign.mockReturnValue('mock-token');

      await service.login({ email: 'test@example.com', password: 'pw' });

      // accessToken + refreshToken = 2번 호출
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
    });
  });
});
