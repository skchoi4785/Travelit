/**
 * AuthController 단위 테스트
 * AuthService를 Mock으로 주입하여 응답 구조 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

/** AuthService Mock */
const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

/** Mock 사용자 객체 (비밀번호/refreshToken 제외) */
const mockSanitizedUser = {
  id: 'user-uuid-1',
  email: 'test@example.com',
  username: '테스트유저',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  // ── register ─────────────────────────────────────────────────────────────

  describe('register', () => {
    it('회원가입 성공 시 success=true인 ApiSuccessResponse를 반환한다', async () => {
      mockAuthService.register.mockResolvedValue(mockSanitizedUser);

      const result = await controller.register({
        email: 'test@example.com',
        password: 'password123',
        username: '테스트유저',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSanitizedUser);
      expect(result).toHaveProperty('message');
    });
  });

  // ── login ─────────────────────────────────────────────────────────────────

  describe('login', () => {
    it('로그인 성공 시 data에 user, accessToken, refreshToken이 포함된다', async () => {
      mockAuthService.login.mockResolvedValue({
        user: mockSanitizedUser,
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
      });

      const result = await controller.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('accessToken');
      expect(result.data).toHaveProperty('refreshToken');
    });
  });

  // ── getCurrentUser ────────────────────────────────────────────────────────

  describe('getCurrentUser', () => {
    it('req.user를 data로 담아 ApiSuccessResponse를 반환한다', async () => {
      const mockReq = { user: mockSanitizedUser };

      const result = await controller.getCurrentUser(mockReq);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSanitizedUser);
    });
  });
});
