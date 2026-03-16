/**
 * Input 컴포넌트 단위 테스트
 * label, error, hint, required, aria 속성 동작 검증
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  // ── label ─────────────────────────────────────────────────────────────────

  it('label이 있으면 label 엘리먼트가 렌더링된다', () => {
    render(<Input label="이메일" id="email" />);
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
  });

  it('id가 명시되면 label의 htmlFor와 input id가 일치한다', () => {
    render(<Input label="이름" id="user-name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'user-name');
    expect(screen.getByText('이름').closest('label')).toHaveAttribute('for', 'user-name');
  });

  it('required=true이면 * 표시가 렌더링된다', () => {
    render(<Input label="필수 항목" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // ── error ─────────────────────────────────────────────────────────────────

  it('error가 있으면 에러 메시지가 표시된다', () => {
    render(<Input error="이메일을 입력해주세요." />);
    expect(screen.getByRole('alert')).toHaveTextContent('이메일을 입력해주세요.');
  });

  it('error가 있으면 빨간 테두리 클래스가 적용된다', () => {
    render(<Input error="오류" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-300');
  });

  it('error가 있으면 aria-invalid=true가 설정된다', () => {
    render(<Input error="오류" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  // ── hint ──────────────────────────────────────────────────────────────────

  it('hint가 있고 error가 없으면 힌트 텍스트가 표시된다', () => {
    render(<Input hint="8자 이상 입력하세요." />);
    expect(screen.getByText('8자 이상 입력하세요.')).toBeInTheDocument();
  });

  it('error와 hint가 동시에 있으면 hint는 표시되지 않는다', () => {
    render(<Input error="오류" hint="힌트 텍스트" />);
    expect(screen.queryByText('힌트 텍스트')).not.toBeInTheDocument();
  });

  // ── aria ──────────────────────────────────────────────────────────────────

  it('error가 없고 hint가 있으면 aria-invalid가 false다', () => {
    render(<Input hint="힌트" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });
});
