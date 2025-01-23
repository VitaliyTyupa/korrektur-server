import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('ai-factory')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('check')
  async checkSentence(@Body() data: { message: string }) {
    try {
      return await this.chatgptService.checkSentence(data.message);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }

  @Post('generate-text')
  async generateText(@Body() data: any) {
    try {
      return await this.chatgptService.generateText(data);
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }
}
