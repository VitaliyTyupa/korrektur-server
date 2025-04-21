import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TextController],
  providers: [TextService, DynamodbService],
  exports: [TextService],
})
export class TextModule {}
