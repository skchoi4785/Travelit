/**
 * Button 컴포넌트 단위 테스트
 * variant, size, loading, fullWidth, onClick 동작 검증
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  // ── 기본 렌더링 ──────────────────────────────────────────────────────────

  it('children 텍스트가 표시된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  // ── variant ───────────────────────────────────────────────────────────────

  it('variant="primary"이면 primary 스타일 클래스가 적용된다', () => {
    render(<Button variant="primary">확인</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
  });

  it('variant="outline"이면 outline 스타일 클래스가 적용된다', () => {
    render(<Button variant="outline">취소</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2', 'border-primary-600');
  });

  // ── size ──────────────────────────────────────────────────────────────────

  it('size="sm"이면 sm 크기 클래스가 적용된다', () => {
    render(<Button size="sm">작게</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  // ── loading ───────────────────────────────────────────────────────────────

  it('loading=true이면 스피너 svg가 표시된다', () => {
    render(<Button loading>저장 중</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('loading=true이면 버튼이 disabled된다', () => {
    render(<Button loading>저장 중</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('loading=true일 때 children 텍스트도 함께 표시된다', () => {
    render(<Button loading>저장 중</Button>);
    expect(screen.getByText('저장 중')).toBeInTheDocument();
  });

  // ── fullWidth ─────────────────────────────────────────────────────────────

  it('fullWidth=true이면 w-full 클래스가 적용된다', () => {
    render(<Button fullWidth>전체 너비</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  // ── onClick ───────────────────────────────────────────────────────────────

  it('onClick 핸들러가 클릭 시 호출된다', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled=true이면 onClick이 호출되지 않는다', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>버튼</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
