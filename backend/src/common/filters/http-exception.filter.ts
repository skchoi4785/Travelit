import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../dto/api-response.dto';

/**
 * 전역 HTTP 예외 필터
 * 모든 HTTP 예외를 공통 에러 응답 형식으로 변환
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 예외 응답 본문 추출
    const exceptionResponse = exception.getResponse();

    let errorCode: string;
    let errorMessage: string;

    // 예외 응답이 객체인 경우 (커스텀 예외 또는 class-validator 에러)
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as any;

      // 커스텀 에러 코드가 있는 경우
      if (responseObj.errorCode) {
        errorCode = responseObj.errorCode;
        errorMessage = responseObj.message || exception.message;
      }
      // class-validator ValidationPipe 에러
      else if (Array.isArray(responseObj.message)) {
        errorCode = 'VALIDATION_ERROR';
        errorMessage = responseObj.message.join(', ');
      }
      // 일반 NestJS 에러
      else {
        errorCode = this.getDefaultErrorCode(status);
        errorMessage = responseObj.message || exception.message;
      }
    } else {
      errorCode = this.getDefaultErrorCode(status);
      errorMessage = exception.message;
    }

    // 에러 로깅
    this.logger.error(
      `[${request.method}] ${request.url} - ${status}: ${errorCode} - ${errorMessage}`,
    );

    // 공통 에러 응답 형식으로 반환
    const errorResponse = new ApiErrorResponse(errorCode, errorMessage);
    response.status(status).json(errorResponse);
  }

  /**
   * HTTP 상태 코드에 따른 기본 에러 코드 반환
   */
  private getDefaultErrorCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'UNPROCESSABLE_ENTITY';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'INTERNAL_SERVER_ERROR';
      default:
        return 'UNKNOWN_ERROR';
    }
  }
}
