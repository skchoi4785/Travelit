"use client";

/**
 * 공통 Input 컴포넌트
 * label 텍스트와 에러 메시지 표시를 지원합니다.
 * 에러 상태일 때 테두리 색상이 빨간색으로 변경됩니다.
 */

import React from "react";

/** Input 컴포넌트 Props 타입 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 레이블 텍스트 */
  label?: string;
  /** 에러 메시지 (존재 시 에러 스타일 적용) */
  error?: string;
  /** 힌트 텍스트 */
  hint?: string;
}

/** 공통 Input 컴포넌트 */
export default function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  // id가 없는 경우 label과 연결을 위한 fallback id 생성
  const inputId = id || (label ? `input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <div className="w-full">
      {/* 레이블 */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {/* 필수 입력 표시 */}
          {props.required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* 입력 필드 */}
      <input
        id={inputId}
        className={[
          // 기본 스타일
          "block w-full rounded-lg border px-3 py-2 text-gray-900",
          "placeholder:text-gray-400",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          // 에러 상태 스타일
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          // 비활성 상태 스타일
          props.disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white",
          // 추가 클래스
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {/* 힌트 텍스트 (에러가 없을 때만 표시) */}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}

      {/* 에러 메시지 */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
