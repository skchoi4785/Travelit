/**
 * Next.js 미들웨어 - 라우트 보호 처리
 *
 * Edge Runtime 환경에서 실행되므로 localStorage 접근이 불가합니다.
 * 대신 쿠키(accessToken)를 기반으로 인증 상태를 확인합니다.
 *
 * 보호 경로: /plans, /plans/new 등 인증이 필요한 경로
 * - 토큰 없으면 /login 리다이렉트
 *
 * 인증 경로: /login, /register
 * - 이미 로그인된 상태라면 /plans 리다이렉트
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** 인증이 필요한 보호 경로 패턴 */
const PROTECTED_PATHS = ["/plans"];

/** 로그인 상태에서 접근 불가한 인증 경로 */
const AUTH_PATHS = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 쿠키에서 accessToken 확인 (Next.js 12: cookies.get()은 문자열 직접 반환)
  const accessToken = request.cookies.get("accessToken") as string | undefined;
  const isAuthenticated = !!accessToken;

  // 보호 경로 접근 시 인증 확인
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isProtectedPath && !isAuthenticated) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    const loginUrl = new URL("/login", request.url);
    // 로그인 후 원래 경로로 돌아갈 수 있도록 callbackUrl 파라미터 추가
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 인증 경로 접근 시 이미 로그인된 경우 처리
  const isAuthPath = AUTH_PATHS.some((path) => pathname === path);

  if (isAuthPath && isAuthenticated) {
    // 이미 로그인된 사용자는 /plans 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/plans", request.url));
  }

  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 설정
 * 정적 파일, 이미지 최적화, API 라우트 등은 제외합니다.
 */
export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청에 미들웨어 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico
     * - 공개 파일 (public 폴더)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
