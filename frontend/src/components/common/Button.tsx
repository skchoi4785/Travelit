"use client";

/**
 * 공통 Button 컴포넌트
 * variant: primary(청록색), secondary(회색), outline(테두리) 지원
 * loading 상태에서는 스피너를 표시하고 버튼을 비활성화합니다.
 */

import React from "react";

/** Button 컴포넌트 Props 타입 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 변형 */
  variant?: "primary" | "secondary" | "outline";
  /** 로딩 상태 여부 */
  loading?: boolean;
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/** variant별 스타일 클래스 매핑 */
const variantClasses = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400 disabled:bg-gray-50 disabled:text-gray-400",
  outline:
    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-gray-300 disabled:text-gray-400",
};

/** size별 스타일 클래스 매핑 */
const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/** 로딩 스피너 컴포넌트 */
const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/** 공통 Button 컴포넌트 */
export default function Button({
  children,
  variant = "primary",
  loading = false,
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        // 기본 스타일
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed",
        // variant 스타일
        variantClasses[variant],
        // size 스타일
        sizeClasses[size],
        // 전체 너비
        fullWidth ? "w-full" : "",
        // 추가 클래스
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {/* 로딩 상태일 때 스피너 표시 */}
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
}
