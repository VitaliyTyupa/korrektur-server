import { Module } from '@nestjs/common';
import { AiFactoryController } from './ai-factory.controller';
import { AiFactoryService } from './services/ai-factory/ai-factory.service';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { TaskGeneratorService } from './services/task-generator.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiFactoryController],
  providers: [
    TaskGeneratorService,
    AiFactoryService,
    DynamodbService,
    UserService,
  ],
})
export class AiFactoryModule {}
