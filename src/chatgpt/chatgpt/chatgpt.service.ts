import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as process from 'process';

@Injectable()
export class ChatgptService {
  async checkSentence(message: string): Promise<any> {
    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openAIKey,
    });
    console.log(message);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
            $input data: {
              $input_language: any language,
              $target_language: any language,
              $sentence: any string,
              $more_requirement: any string,
              };
              
              $is_sentence_inane: if $sentence by $input_language looks like inane and $sentence by $target_language is inane;
      
              $output_data: {
              $suggestion: if $sentece is $input_language then translate $sentence to $target_language; else if $sentence is $target_language then correct grammar mistake and if structure of $sentence is not correct for $target_language then suggest correct variant.
              $translation: translate created $suggestion to $input_language,
              $comment: 
                if $sentence by $input_language looks like inane and $sentence by $target_language is inane 
                  then return by $input_language - 'The sentence looks meaningless, so I can't suggest any options.\\n' 
                    and any motivated frase like 'Try one more times' or similar;
                else return null;
              }
              
              return $output_data as a valid JSON object.
              Don't ever return anything except a valid JSON object!
            `,
        },
        {
          role: 'user',
          content: `
            {
              $input_language: ukraine,
              $target_language: german,
              $sentence: ${message},
              $more_requirement: null,
            }
            `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0]);
    const responce = completion.choices[0];
    return { message: `Checked sentence: ${responce.message.content}` };
  }
}
