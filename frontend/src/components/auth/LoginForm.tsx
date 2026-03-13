"use client";

/**
 * LoginForm 컴포넌트
 * 이메일과 비밀번호를 입력받아 로그인을 처리합니다.
 * 성공 시 /plans 페이지로 리다이렉트합니다.
 */

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

/** 폼 유효성 검사 에러 타입 */
interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/** LoginForm 컴포넌트 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  /**
   * 폼 입력값 유효성 검사
   * @returns 유효성 검사 통과 여부
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 이메일 검사
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 비밀번호 검사
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 폼 제출 핸들러
   * 유효성 검사 후 로그인 API를 호출합니다.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await login(email, password);
      // 로그인 성공 시 /plans 페이지로 이동
      router.push("/plans");
    } catch (error: unknown) {
      // API 에러 처리
      const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };
      if (axiosError.response?.status === 401) {
        setErrors({ general: "이메일 또는 비밀번호가 올바르지 않습니다." });
      } else if (axiosError.response?.data?.detail) {
        setErrors({ general: axiosError.response.data.detail });
      } else {
        setErrors({ general: "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* 일반 에러 메시지 */}
      {errors.general && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {/* 이메일 입력 */}
      <Input
        label="이메일"
        type="email"
        id="login-email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
        autoFocus
      />

      {/* 비밀번호 입력 */}
      <Input
        label="비밀번호"
        type="password"
        id="login-password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
        autoComplete="current-password"
      />

      {/* 로그인 버튼 */}
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        size="lg"
        className="mt-2"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>

      {/* 회원가입 링크 */}
      <p className="text-center text-sm text-gray-600">
        아직 계정이 없으신가요?{" "}
        <Link href="/register">
          <a className="font-medium text-teal-600 hover:text-teal-700 hover:underline">회원가입</a>
        </Link>
      </p>
    </form>
  );
}
