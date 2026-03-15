import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * 사용자 모듈
 * 사용자 서비스를 제공하며 다른 모듈에서 사용할 수 있도록 내보냄
 */
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
