/**
 * RegisterForm 컴포넌트 단위 테스트
 * 유효성 검사, 에러 처리, 성공 메시지 검증
 *
 * 참고: @testing-library/dom 의 getLabelContent 는 aria-hidden 을 무시하고
 * span 내부의 "*"까지 포함하므로 getByLabelText('사용자명') 이 실패합니다.
 * 대신 getByPlaceholderText 로 폼 필드를 선택합니다.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

// next/link Mock: Next.js 12 <Link><a/></Link> 패턴을 재현합니다.
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return function Link({ children, href }: { children: React.ReactElement; href: string }) {
    return React.cloneElement(React.Children.only(children), { href });
  };
});

// AuthContext Mock
const mockRegister = jest.fn();
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ register: mockRegister }),
}));

/** 유효한 폼 입력을 채우는 헬퍼 */
const fillValidForm = () => {
  fireEvent.change(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)'), {
    target: { value: '테스트유저' },
  });
  fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('8자 이상의 비밀번호'), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByPlaceholderText('비밀번호를 다시 입력하세요'), {
    target: { value: 'password123' },
  });
};

describe('RegisterForm', () => {
  beforeEach(() => {
    mockRegister.mockReset();
  });

  // ── 기본 렌더링 ──────────────────────────────────────────────────────────

  it('사용자명, 이메일, 비밀번호, 비밀번호 확인 필드와 회원가입 버튼이 렌더링된다', () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('8자 이상의 비밀번호')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호를 다시 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '회원가입' })).toBeInTheDocument();
  });

  it('"로그인" 링크가 /login을 가리킨다', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('link', { name: '로그인' })).toHaveAttribute('href', '/login');
  });

  // ── 유효성 검사: 이메일 ─────────────────────────────────────────────────

  it('빈 이메일로 제출 시 에러가 표시된다', () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(screen.getByText('이메일을 입력해주세요.')).toBeInTheDocument();
  });

  // ── 유효성 검사: 비밀번호 ───────────────────────────────────────────────

  it('8자 미만 비밀번호로 제출 시 에러가 표시된다', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)'), {
      target: { value: '유저' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('8자 이상의 비밀번호'), {
      target: { value: '1234567' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 다시 입력하세요'), {
      target: { value: '1234567' },
    });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(screen.getByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
  });

  it('비밀번호와 비밀번호 확인이 다르면 에러가 표시된다', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)'), {
      target: { value: '유저' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('8자 이상의 비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 다시 입력하세요'), {
      target: { value: 'different123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
  });

  // ── 유효성 검사: 사용자명 ───────────────────────────────────────────────

  it('사용자명이 2자 미만이면 에러가 표시된다', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)'), {
      target: { value: 'a' },
    });
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('8자 이상의 비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 다시 입력하세요'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(screen.getByText('사용자명은 2자 이상이어야 합니다.')).toBeInTheDocument();
  });

  it('사용자명이 20자 초과이면 에러가 표시된다', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByPlaceholderText('닉네임을 입력하세요 (2-20자)'), {
      target: { value: 'a'.repeat(21) },
    });
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('8자 이상의 비밀번호'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호를 다시 입력하세요'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(screen.getByText('사용자명은 20자 이하여야 합니다.')).toBeInTheDocument();
  });

  // ── 회원가입 성공 ─────────────────────────────────────────────────────

  it('유효한 입력으로 제출 시 register()가 호출된다', async () => {
    mockRegister.mockResolvedValue(undefined);
    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password123', '테스트유저')
    );
  });

  it('register 성공 시 성공 메시지가 표시된다', async () => {
    mockRegister.mockResolvedValue(undefined);
    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(await screen.findByRole('status')).toHaveTextContent('회원가입이 완료되었습니다');
  });

  // ── 회원가입 실패 ─────────────────────────────────────────────────────

  it('register 실패(409) 시 "이미 사용 중인 이메일" 에러가 표시된다', async () => {
    mockRegister.mockRejectedValue({ response: { status: 409 } });
    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(await screen.findByText('이미 사용 중인 이메일입니다.')).toBeInTheDocument();
  });

  it('register 실패(기타 에러) 시 일반 에러 메시지가 표시된다', async () => {
    mockRegister.mockRejectedValue(new Error('network error'));
    render(<RegisterForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
    expect(
      await screen.findByText('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    ).toBeInTheDocument();
  });
});
