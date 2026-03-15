/**
 * 공통 API 응답 형식 DTO
 * 모든 API 응답은 이 형식을 따름
 */

// 성공 응답 형식
export class ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;

  constructor(data: T, message: string = '요청이 성공적으로 처리되었습니다.') {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}

// 에러 상세 정보
export class ApiErrorDetail {
  code: string;
  message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}

// 에러 응답 형식
export class ApiErrorResponse {
  success: false;
  error: ApiErrorDetail;

  constructor(code: string, message: string) {
    this.success = false;
    this.error = new ApiErrorDetail(code, message);
  }
}
