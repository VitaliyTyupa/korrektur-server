import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogInterceptor } from './log.interceptor';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    LogService,
    LogInterceptor,
    DynamodbService
  ]
})
export class LogModule {}
