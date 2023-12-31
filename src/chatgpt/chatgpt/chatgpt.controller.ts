import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('check')
  async checkSentence(@Body() data: { message: string }) {
    try {
      const result = await this.chatgptService.checkSentence(data.message);
      return result;
    } catch (error) {
      console.error('Error processing request:', error);
      throw new Error('Internal server error');
    }
  }
}
