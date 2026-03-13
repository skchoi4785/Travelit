/**
 * 인증 관련 타입 정의
 * 사용자 정보, 로그인/회원가입 요청 및 응답 타입을 정의합니다.
 */

/** 사용자 정보 타입 */
export interface User {
  id: string | number;
  email: string;
  username: string;
  created_at?: string;
}

/** 로그인 요청 타입 */
export interface LoginRequest {
  email: string;
  password: string;
}

/** 회원가입 요청 타입 */
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

/** 인증 응답 타입 (로그인/회원가입 성공 시) */
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

/** AuthContext 타입 정의 */
export interface AuthContextType {
  /** 현재 로그인한 사용자 정보 (비로그인 시 null) */
  user: User | null;
  /** 인증 상태 로딩 중 여부 */
  isLoading: boolean;
  /** 로그인 함수 */
  login: (email: string, password: string) => Promise<void>;
  /** 회원가입 함수 */
  register: (email: string, password: string, username: string) => Promise<void>;
  /** 로그아웃 함수 */
  logout: () => void;
}
