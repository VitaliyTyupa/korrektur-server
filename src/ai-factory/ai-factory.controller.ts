import { Body, Controller, Post } from '@nestjs/common';
import { AiFactoryService } from './services/ai-factory/ai-factory.service';
import { User } from '../user/user.interface';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('ai-factory')
export class AiFactoryController {
  constructor(private readonly aiFactoryService: AiFactoryService) {}

  @Post('check')
  async checkSentence(@Body() data: { message: string }) {
    try {
      return await this.aiFactoryService.checkSentence(data.message);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }

  @Post('generate-text')
  async generateText(@Body() data: any) {
    try {
      return await this.aiFactoryService.generateText(data.message);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }

  @Post('generate-text-v2')
  async generateText_V2(@Body() data: any, @CurrentUser() user: Partial<User>) {
    try {
      return await this.aiFactoryService.generateText_V2(data, user);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }
}
