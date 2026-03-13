/**
 * 루트 레이아웃
 * 모든 페이지에 공통으로 적용되는 최상위 레이아웃입니다.
 * AuthProvider로 앱 전체의 인증 상태를 관리합니다.
 */

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/** 메타데이터 설정 */
export const metadata: Metadata = {
  title: {
    default: "Travelit - AI 여행 계획",
    template: "%s | Travelit",
  },
  description: "AI와 함께하는 스마트한 여행 계획 서비스 Travelit",
  keywords: ["여행", "여행계획", "AI여행", "Travelit", "트래블잇"],
  authors: [{ name: "Travelit Team" }],
};

/** 루트 레이아웃 컴포넌트 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-gray-50 antialiased">
        {/* 앱 전역 인증 상태 제공자 */}
        <AuthProvider>
          {/* 공통 헤더 */}
          <Header />

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1">
            {children}
          </main>

          {/* 공통 푸터 */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
