"use client";

/**
 * 인증 컨텍스트
 * 앱 전반의 인증 상태(로그인/로그아웃/회원가입)를 관리합니다.
 * - 앱 마운트 시 저장된 토큰으로 자동 로그인 상태 복원
 * - 로그인 시 localStorage와 쿠키에 토큰 동시 저장 (미들웨어 호환)
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { User, AuthContextType } from "@/types/auth";

/** 인증 컨텍스트 생성 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 쿠키에 토큰을 저장하는 유틸리티 함수
 * Next.js 미들웨어(Edge Runtime)는 localStorage 접근 불가이므로
 * 미들웨어 인증 체크를 위해 쿠키에도 저장합니다.
 */
const setTokenCookie = (token: string) => {
  // 7일 만료, SameSite=Strict 보안 설정
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `accessToken=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

/** 쿠키에서 토큰을 삭제하는 유틸리티 함수 */
const removeTokenCookie = () => {
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

/** AuthProvider 컴포넌트 - 앱 최상위에서 인증 상태를 제공합니다 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /**
   * 앱 마운트 시 저장된 accessToken으로 /api/auth/me 호출하여 로그인 상태 복원
   * 토큰이 만료되었거나 유효하지 않으면 자동으로 로그아웃 처리
   */
  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        // 저장된 토큰으로 현재 사용자 정보 조회
        const response = await api.get<User>("/api/auth/me");
        setUser(response.data);
      } catch {
        // 토큰이 유효하지 않으면 localStorage와 쿠키를 정리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        removeTokenCookie();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * 로그인 함수
   * API 호출 후 토큰을 localStorage와 쿠키에 동시 저장합니다.
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   */
  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post("/api/auth/login", { email, password });
    const { access_token, user: userData } = response.data;

    // localStorage에 토큰과 사용자 정보 저장
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("user", JSON.stringify(userData));

    // 미들웨어 인증 체크를 위해 쿠키에도 저장
    setTokenCookie(access_token);

    setUser(userData);
  }, []);

  /**
   * 회원가입 함수
   * API 호출 후 성공 시 로그인 페이지로 이동합니다.
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @param username - 사용자명
   */
  const register = useCallback(
    async (email: string, password: string, username: string) => {
      await api.post("/api/auth/register", { email, password, username });
      // 회원가입 성공 후 로그인 페이지로 이동
      router.push("/login");
    },
    [router]
  );

  /**
   * 로그아웃 함수
   * localStorage와 쿠키를 초기화하고 사용자 상태를 리셋합니다.
   */
  const logout = useCallback(() => {
    // localStorage 초기화
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // 쿠키 삭제
    removeTokenCookie();

    // 사용자 상태 초기화
    setUser(null);

    // 로그인 페이지로 이동
    router.push("/login");
  }, [router]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth 훅 - AuthContext를 쉽게 사용할 수 있는 커스텀 훅
 * AuthProvider 외부에서 사용 시 에러를 발생시킵니다.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
