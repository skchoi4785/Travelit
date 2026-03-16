/**
 * Header 컴포넌트 단위 테스트
 * 로딩/비로그인/로그인 상태별 렌더링 분기, 로그아웃 동작 검증
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// next/link Mock: Next.js 12 패턴인 <Link><a></a></Link>를 정확히 재현합니다.
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return function Link({ children, href }: { children: React.ReactElement; href: string }) {
    return React.cloneElement(React.Children.only(children) as React.ReactElement, { href });
  };
});

// AuthContext Mock
const mockLogout = jest.fn();
const mockUseAuth = jest.fn();
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('Header', () => {
  beforeEach(() => {
    mockLogout.mockReset();
  });

  // ── 공통 ─────────────────────────────────────────────────────────────────

  it('로고 "Travelit" 텍스트가 렌더링된다', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false, logout: mockLogout });
    render(<Header />);
    expect(screen.getByText('Travelit')).toBeInTheDocument();
  });

  // ── 로딩 상태 ─────────────────────────────────────────────────────────

  it('isLoading=true이면 animate-pulse 스켈레톤 요소가 표시된다', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: true, logout: mockLogout });
    const { container } = render(<Header />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  // ── 비로그인 상태 ─────────────────────────────────────────────────────

  it('비로그인 상태이면 "로그인" 링크가 표시된다', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false, logout: mockLogout });
    render(<Header />);
    expect(screen.getByRole('link', { name: '로그인' })).toBeInTheDocument();
  });

  it('비로그인 상태이면 "회원가입" 링크가 표시된다', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false, logout: mockLogout });
    render(<Header />);
    expect(screen.getByRole('link', { name: '회원가입' })).toBeInTheDocument();
  });

  it('비로그인 상태이면 로그아웃 버튼이 없다', () => {
    mockUseAuth.mockReturnValue({ user: null, isLoading: false, logout: mockLogout });
    render(<Header />);
    expect(screen.queryByRole('button', { name: '로그아웃' })).not.toBeInTheDocument();
  });

  // ── 로그인 상태 ───────────────────────────────────────────────────────

  it('로그인 상태이면 사용자명이 표시된다', () => {
    mockUseAuth.mockReturnValue({
      user: { username: '홍길동', email: 'user@example.com' },
      isLoading: false,
      logout: mockLogout,
    });
    render(<Header />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });

  it('로그인 상태이면 "내 계획" 링크가 표시된다', () => {
    mockUseAuth.mockReturnValue({
      user: { username: '홍길동', email: 'user@example.com' },
      isLoading: false,
      logout: mockLogout,
    });
    render(<Header />);
    expect(screen.getByRole('link', { name: '내 계획' })).toBeInTheDocument();
  });

  it('로그아웃 버튼 클릭 시 logout()이 호출된다', () => {
    mockUseAuth.mockReturnValue({
      user: { username: '홍길동', email: 'user@example.com' },
      isLoading: false,
      logout: mockLogout,
    });
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: '로그아웃' }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
