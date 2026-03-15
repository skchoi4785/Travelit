import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

/**
 * 회원가입 요청 DTO
 * class-validator를 사용하여 입력 유효성 검증
 */
export class RegisterDto {
  /**
   * 이메일 주소 (필수, 유효한 이메일 형식)
   */
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email: string;

  /**
   * 비밀번호 (필수, 최소 8자)
   */
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(100, { message: '비밀번호는 최대 100자 이하여야 합니다.' })
  password: string;

  /**
   * 사용자 이름 (필수, 2~30자)
   */
  @IsString({ message: '사용자 이름은 문자열이어야 합니다.' })
  @MinLength(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' })
  @MaxLength(30, { message: '사용자 이름은 최대 30자 이하여야 합니다.' })
  username: string;
}
