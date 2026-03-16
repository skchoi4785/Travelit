/**
 * LoginForm 컴포넌트 단위 테스트
 * 유효성 검사, 에러 처리, 로그인 성공 시 라우팅 검증
 *
 * 참고: @testing-library/dom 의 getLabelContent 는 aria-hidden 을 무시하고
 * span 내부의 "*"까지 포함하므로 getByLabelText('이메일') 가 실패합니다.
 * 대신 getByPlaceholderText 로 폼 필드를 선택합니다.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// next/router Mock
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// next/link Mock: Next.js 12 <Link><a/></Link> 패턴을 재현합니다.
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return function Link({ children, href }: { children: React.ReactElement; href: string }) {
    return React.cloneElement(React.Children.only(children), { href });
  };
});

// AuthContext Mock
const mockLogin = jest.fn();
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockPush.mockReset();
  });

  // ── 기본 렌더링 ──────────────────────────────────────────────────────────

  it('이메일, 비밀번호 입력 필드와 로그인 버튼이 렌더링된다', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('"회원가입" 링크가 /register를 가리킨다', () => {
    render(<LoginForm />);
    expect(screen.getByRole('link', { name: '회원가입' })).toHaveAttribute('href', '/register');
  });

  // ── 유효성 검사 ────────────────────────────────────────────────────────

  it('빈 이메일로 제출 시 이메일 에러가 표시된다', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(screen.getByText('이메일을 입력해주세요.')).toBeInTheDocument();
  });

  it('잘못된 이메일 형식으로 제출 시 형식 에러가 표시된다', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(screen.getByText('올바른 이메일 형식을 입력해주세요.')).toBeInTheDocument();
  });

  it('빈 비밀번호로 제출 시 비밀번호 에러가 표시된다', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(screen.getByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
  });

  // ── 로그인 성공 ────────────────────────────────────────────────────────

  it('유효한 입력으로 제출 시 login()이 호출되고 /plans로 이동한다', async () => {
    mockLogin.mockResolvedValue(undefined);
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockPush).toHaveBeenCalledWith('/plans');
    });
  });

  // ── 로그인 실패 ────────────────────────────────────────────────────────

  it('login 실패(401) 시 인증 에러 메시지가 표시된다', async () => {
    mockLogin.mockRejectedValue({ response: { status: 401 } });
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: 'wrongpw' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(await screen.findByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument();
  });

  it('login 실패(기타 에러) 시 일반 에러 메시지가 표시된다', async () => {
    mockLogin.mockRejectedValue(new Error('network error'));
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(
      await screen.findByText('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    ).toBeInTheDocument();
  });

  // ── 로딩 상태 ─────────────────────────────────────────────────────────

  it('제출 중에는 버튼이 disabled된다', async () => {
    // 절대 resolve되지 않는 Promise로 로딩 상태 유지
    mockLogin.mockReturnValue(new Promise(() => {}));
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 입력하세요'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });
});
