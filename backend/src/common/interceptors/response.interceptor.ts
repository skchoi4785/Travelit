import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSuccessResponse } from '../dto/api-response.dto';

/**
 * 전역 응답 인터셉터
 * 컨트롤러에서 반환된 데이터를 공통 성공 응답 형식으로 변환
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiSuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiSuccessResponse<T>> {
    return next.handle().pipe(
      map((responseData) => {
        // 컨트롤러가 이미 ApiSuccessResponse 형식으로 반환한 경우 그대로 사용
        if (
          responseData &&
          typeof responseData === 'object' &&
          'success' in responseData
        ) {
          return responseData;
        }

        // 메시지가 포함된 객체인 경우 분리하여 처리
        if (
          responseData &&
          typeof responseData === 'object' &&
          responseData._message
        ) {
          const { _message, ...data } = responseData;
          return new ApiSuccessResponse(data, _message);
        }

        // 일반 데이터를 공통 성공 응답으로 래핑
        return new ApiSuccessResponse(responseData);
      }),
    );
  }
}
