"use client";

/**
 * Navigation 컴포넌트
 * 사이드바 또는 보조 네비게이션으로 사용 가능한 컴포넌트입니다.
 * 현재 Sprint 1에서는 Header에 네비게이션이 포함되어 있어
 * 필요 시 확장하여 사용합니다.
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/** 네비게이션 아이템 타입 */
interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

/** 로그인 후 보이는 네비게이션 아이템 */
const authenticatedNavItems: NavItem[] = [
  {
    href: "/plans",
    label: "내 계획",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    href: "/plans/new",
    label: "새 계획 만들기",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
];

/** Navigation 컴포넌트 Props */
interface NavigationProps {
  /** 수직(세로) 레이아웃 여부 */
  vertical?: boolean;
}

/** Navigation 컴포넌트 */
export default function Navigation({ vertical = false }: NavigationProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // 비로그인 상태에서는 네비게이션 미표시
  if (!user) return null;

  const navItems = authenticatedNavItems;

  return (
    <nav
      className={
        vertical
          ? "flex flex-col gap-1"
          : "flex flex-row gap-4"
      }
      aria-label="주 네비게이션"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary-50 text-primary-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
