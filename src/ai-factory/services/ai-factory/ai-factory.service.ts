import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as process from 'process';

@Injectable()
export class AiFactoryService {
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

  async generateText(message: any): Promise<any> {
    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openAIKey,
    });
    const targetLanguage = 'German';
    const laguageLevel = 'A2';
    const text = message.text;
    const source_words = 'herausfinden, anwenden, verwenden';
    const countOfSentences = 5;
    const sourceLanguage = 'Ukrainian';

    console.log(message);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: [
            {
              text: `You are an expert ${targetLanguage} language teacher tasked with
              generating content for exercises. You will create grammatically
              and stylistically correct sentences that align with the context
              of the original input text. Lexical and grammatical constructions
              should adhere to the ${laguageLevel} language level.

              Input Details:
              - input_text (context in ${targetLanguage}): "{{Original ${targetLanguage} text provided by the user}}"
              - source_words (in ${targetLanguage}) to be used: "{{list of selected words}}"
              - name_of_task: "{{description of task}}"

              Return the response in the following JSON format:
              {
                "language_level": "{{language level}}",
                "context_of_original_text": "{{summary or main topic of the original text}}",
                "used_source_words": "{{selected words from the user that were used}}",
                "tasks": "{{task result generated based on the input}}"
              }`,
              type: 'text',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `input_text : ${text}
                source_words: ${source_words}
                task_1: Generate ${countOfSentences} new sentences using source_words. Place the
                source_words in square brackets within the generated sentences.
                task_2: Provide definitions of the source_words in ${targetLanguage}.
                Provide response in json format {word: one of source_words,
                definition: definition of word}
                task_3:  Create ${countOfSentences} True/False statements. Provide response in
                json format - correct ansver in square brackets as a key: statement as a value
                task_4:  Generate ${countOfSentences} questions with antworts to input_text.
                Provide response in json format as an array of entity
                where {question: generated question, antwort: antwort for
                this question}
                task_5:  Generate ${countOfSentences} sentences in ${sourceLanguage}.
                Provide response in json format as an array of entity where
                {source: generated sentence in ${sourceLanguage}, translation: correct translation in ${targetLanguage}}
`,
            },
          ],
        },
      ],
      response_format: {
        type: 'json_object',
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.choices[0]);
    const responce = completion.choices[0];
    return JSON.stringify(responce.message.content);
    // return { message: 'Generated text' };
  }
}
