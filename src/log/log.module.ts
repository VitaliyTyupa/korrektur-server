import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogInterceptor } from './log.interceptor';

@Module({
  providers: [LogService, LogInterceptor],
})
export class LogModule {}
