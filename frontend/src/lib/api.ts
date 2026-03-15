/**
 * Axios API 클라이언트 설정
 * - baseURL: 환경변수 NEXT_PUBLIC_API_URL 사용
 * - 요청 인터셉터: localStorage의 accessToken을 Authorization 헤더에 자동 첨부
 * - 응답 인터셉터: 401 응답 시 localStorage 초기화 후 /login 리다이렉트
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/** Axios 인스턴스 생성 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 요청 인터셉터
 * localStorage에 저장된 accessToken을 Authorization: Bearer 헤더로 자동 첨부합니다.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 브라우저 환경에서만 localStorage 접근 가능
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * 401 Unauthorized 응답 수신 시:
 * 1. localStorage에서 토큰 관련 데이터를 모두 삭제
 * 2. 쿠키에서 accessToken 삭제
 * 3. /login 페이지로 리다이렉트
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 정상 응답은 그대로 반환
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 브라우저 환경에서만 처리
      if (typeof window !== "undefined") {
        // localStorage 초기화
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // 쿠키에서 accessToken 삭제
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // 현재 경로가 이미 /login이 아닌 경우에만 리다이렉트
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
