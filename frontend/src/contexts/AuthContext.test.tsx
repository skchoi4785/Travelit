/**
 * AuthContext 단위 테스트
 * AuthProvider의 login/register/logout 및 useAuth hook 검증
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// next/router Mock
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// localStorage Mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// document.cookie Mock
Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: '',
});

/** AuthProvider 래퍼 */
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockPush.mockClear();
  });

  // ── 초기 상태 ─────────────────────────────────────────────────────────────

  it('초기 상태: user가 null이다', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
  });

  // ── login ─────────────────────────────────────────────────────────────────

  it('login 호출 시 user가 설정되고 localStorage.setItem이 호출된다', async () => {
    const setItemSpy = jest.spyOn(localStorageMock, 'setItem');
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe('test@example.com');
    expect(setItemSpy).toHaveBeenCalled();
  });

  // ── logout ────────────────────────────────────────────────────────────────

  it('logout 호출 시 user가 null로 초기화되고 localStorage.removeItem이 호출된다', async () => {
    const removeItemSpy = jest.spyOn(localStorageMock, 'removeItem');
    const { result } = renderHook(() => useAuth(), { wrapper });

    // 먼저 로그인
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(removeItemSpy).toHaveBeenCalled();
  });

  // ── register ──────────────────────────────────────────────────────────────

  it('register 호출 시 router.push(\'/login\')으로 이동한다', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('new@example.com', 'password123', '신규유저');
    });

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  // ── useAuth Provider 외부 호출 ────────────────────────────────────────────

  it('useAuth를 AuthProvider 외부에서 호출하면 Error를 던진다', () => {
    // wrapper 없이 renderHook 사용
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow(Error);
  });
});
