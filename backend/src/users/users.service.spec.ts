/**
 * UsersService 단위 테스트
 * PrismaService를 Mock으로 주입하여 서비스 로직 검증
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

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

/** PrismaService Mock */
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  // ── findByEmail ─────────────────────────────────────────────────────────

  describe('findByEmail', () => {
    it('이메일로 사용자 조회 시 prisma.user.findUnique를 호출하고 사용자를 반환한다', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });

    it('존재하지 않는 이메일 조회 시 null을 반환한다', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail('notexist@example.com');

      expect(result).toBeNull();
    });
  });

  // ── findById ─────────────────────────────────────────────────────────────

  describe('findById', () => {
    it('ID로 사용자 조회 시 prisma.user.findUnique를 호출하고 사용자를 반환한다', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findById('user-uuid-1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-uuid-1' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  // ── createUser ───────────────────────────────────────────────────────────

  describe('createUser', () => {
    it('이메일 미중복 시 prisma.user.create를 호출하고 생성된 사용자를 반환한다', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null); // 중복 없음
      mockPrisma.user.create.mockResolvedValue(mockUser);

      const result = await service.createUser(
        'test@example.com',
        '$2b$10$hashedpassword',
        '테스트유저',
      );

      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('이미 존재하는 이메일이면 ConflictException을 던진다', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser); // 중복 존재

      await expect(
        service.createUser('test@example.com', 'pw', '유저'),
      ).rejects.toThrow(ConflictException);
    });
  });

  // ── updateRefreshToken ───────────────────────────────────────────────────

  describe('updateRefreshToken', () => {
    it('prisma.user.update를 올바른 인자로 호출한다', async () => {
      mockPrisma.user.update.mockResolvedValue(undefined);

      await service.updateRefreshToken('user-uuid-1', 'new-refresh-token');

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-uuid-1' },
        data: { refreshToken: 'new-refresh-token' },
      });
    });
  });

  // ── sanitizeUser ─────────────────────────────────────────────────────────

  describe('sanitizeUser', () => {
    it('password와 refreshToken 필드를 제거한 사용자 정보를 반환한다', () => {
      const result = service.sanitizeUser(mockUser);

      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('refreshToken');
      expect(result).toHaveProperty('id', mockUser.id);
      expect(result).toHaveProperty('email', mockUser.email);
    });
  });
});
