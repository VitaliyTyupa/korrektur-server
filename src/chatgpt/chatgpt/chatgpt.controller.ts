import { Body, Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post('check')
  async checkSentence(@Body() body: { sentence: string }): Promise<string> {
    const result = await this.chatgptService.checkSentence(body.sentence);
    return result;
  }
}
