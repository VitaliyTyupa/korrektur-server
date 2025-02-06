import { Module } from '@nestjs/common';
import { AiFactoryController } from './ai-factory.controller';
import { AiFactoryService } from './services/ai-factory/ai-factory.service';

@Module({
  controllers: [AiFactoryController],
  providers: [AiFactoryService],
})
export class AiFactoryModule {}
