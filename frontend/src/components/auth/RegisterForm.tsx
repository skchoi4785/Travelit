"use client";

/**
 * RegisterForm 컴포넌트
 * 이메일, 비밀번호, 비밀번호 확인, 사용자명을 입력받아 회원가입을 처리합니다.
 * 성공 시 /login 페이지로 리다이렉트합니다.
 */

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

/** 폼 유효성 검사 에러 타입 */
interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  general?: string;
}

/** RegisterForm 컴포넌트 */
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { register } = useAuth();

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
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    // 비밀번호 확인 검사
    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // 사용자명 검사
    if (!username) {
      newErrors.username = "사용자명을 입력해주세요.";
    } else if (username.length < 2) {
      newErrors.username = "사용자명은 2자 이상이어야 합니다.";
    } else if (username.length > 20) {
      newErrors.username = "사용자명은 20자 이하여야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 폼 제출 핸들러
   * 유효성 검사 후 회원가입 API를 호출합니다.
   * 성공 시 AuthContext의 register 함수가 /login으로 리다이렉트합니다.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      await register(email, password, username);
      // register 함수 내에서 /login으로 리다이렉트가 처리됩니다.
      setSuccessMessage("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...");
    } catch (error: unknown) {
      // API 에러 처리
      const axiosError = error as { response?: { status?: number; data?: { detail?: string } } };
      if (axiosError.response?.status === 409) {
        setErrors({ general: "이미 사용 중인 이메일입니다." });
      } else if (axiosError.response?.data?.detail) {
        setErrors({ general: axiosError.response.data.detail });
      } else {
        setErrors({ general: "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* 성공 메시지 */}
      {successMessage && (
        <div
          className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700"
          role="status"
        >
          {successMessage}
        </div>
      )}

      {/* 일반 에러 메시지 */}
      {errors.general && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {/* 사용자명 입력 */}
      <Input
        label="사용자명"
        type="text"
        id="register-username"
        placeholder="닉네임을 입력하세요 (2-20자)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
        required
        autoComplete="username"
        autoFocus
      />

      {/* 이메일 입력 */}
      <Input
        label="이메일"
        type="email"
        id="register-email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
      />

      {/* 비밀번호 입력 */}
      <Input
        label="비밀번호"
        type="password"
        id="register-password"
        placeholder="8자 이상의 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        hint="8자 이상으로 입력해주세요."
        required
        autoComplete="new-password"
      />

      {/* 비밀번호 확인 입력 */}
      <Input
        label="비밀번호 확인"
        type="password"
        id="register-confirm-password"
        placeholder="비밀번호를 다시 입력하세요"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
      />

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        size="lg"
        className="mt-2"
      >
        {isLoading ? "가입 중..." : "회원가입"}
      </Button>

      {/* 로그인 링크 */}
      <p className="text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/login">
          <a className="font-medium text-teal-600 hover:text-teal-700 hover:underline">로그인</a>
        </Link>
      </p>
    </form>
  );
}
