import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatgptService {
  async checkSentence(sentence: string): Promise<string> {
    console.log(sentence);
    // todo: update API
    return `Checked sentence: ${sentence}`;
  }
}
