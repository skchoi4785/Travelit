/**
 * 인증 컨텍스트 (Mock 모드)
 * 백엔드 없이 화면 확인이 가능하도록 Mock 인증을 사용합니다.
 * 실제 API 연동은 백엔드 구현 완료 후 적용합니다.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** 쿠키 저장 (Next.js 미들웨어 호환) */
const setTokenCookie = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

/** 쿠키 삭제 */
const removeTokenCookie = () => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /** 앱 마운트 시 localStorage에서 저장된 사용자 정보 복원 */
  useEffect(() => {
    const saved = localStorage.getItem('mockUser');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('mockUser');
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Mock 로그인 — 이메일/비밀번호를 검증하지 않고 바로 로그인 처리합니다.
   * 실제 API 연동 시 이 함수를 교체합니다.
   */
  const login = useCallback(async (email: string, _password: string) => {
    const mockUser: User = {
      id: 'mock-user-1',
      email,
      username: email.split('@')[0],
    };
    const mockToken = 'mock-access-token';

    localStorage.setItem('accessToken', mockToken);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setTokenCookie(mockToken);
    setUser(mockUser);
  }, []);

  /**
   * Mock 회원가입 — 저장 후 로그인 페이지로 이동합니다.
   * 실제 API 연동 시 이 함수를 교체합니다.
   */
  const register = useCallback(async (_email: string, _password: string, _username: string) => {
    // Mock: 바로 성공 처리 후 로그인 페이지로 이동
    await router.push('/login');
  }, [router]);

  /** 로그아웃 */
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('mockUser');
    removeTokenCookie();
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
