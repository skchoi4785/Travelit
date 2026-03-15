import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

/**
 * 로그인 요청 DTO
 * class-validator를 사용하여 입력 유효성 검증
 */
export class LoginDto {
  /**
   * 이메일 주소 (필수, 유효한 이메일 형식)
   */
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email: string;

  /**
   * 비밀번호 (필수)
   */
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}
