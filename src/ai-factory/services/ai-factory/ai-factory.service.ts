import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as process from 'process';
import {
  TaskRequirements,
  TextPrompts,
  TextPromptsData,
} from '../prompts/text.prompts';
import { TextGenerator, TextGeneratorData } from '../prompts/text-generator';
import { User } from '../../../user/user.interface';
import { TaskGeneratorService } from '../task-generator.service';
import { TOKEN_USAGE_REPOSITORY } from '../../../database/database.constants';
import { TokenUsageRepository } from '../../../database/repositories/token-usage.repository';

export interface GapTextBody {
  selectedWords?: string[];
  wordList?: string;
  selectedType?: string;
  [key: string]: any;
}

export interface TaskConfig {
  text: string;
  gap_text?: GapTextBody;
  true_false?: { count: number };
  question_answer?: { count: number };
  translate?: { count: number };
  word_definition?: { wordList: string };
}

@Injectable()
export class AiFactoryService {
  constructor(
    @Inject(TOKEN_USAGE_REPOSITORY)
    private readonly tokenUsageRepository: TokenUsageRepository,
    private readonly taskGenerator: TaskGeneratorService,
  ) {}
  async checkSentence(message: string): Promise<any> {
    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openAIKey,
    });
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

    const responce = completion.choices[0];
    return { message: `Checked sentence: ${responce.message.content}` };
  }

  async generateText(message: any): Promise<any> {
    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openAIKey,
    });

    const requirements: TaskRequirements = {
      tenses: message.tenses,
      activeForm: message.activeForm,
      konjunktiv: message.konjunktiv,
      helperVerbs: message.helperVerbs,
      deklination: message.deklination,
      kasus: message.kasus,
    };
    const params: TextPromptsData = {
      targetLanguage: message.language,
      languageLevel: message.languageLevel,
      inputText: message.text || '',
      sourceWords: message.sourceWords || '',
      countOfSentences: message.count,
      sourceLanguage: message.sourceLanguage || 'Ukrainian',
      context: message.context || '',
      autogenerateText: message.autogenerateText,
      requirements,
    };

    const promts = new TextPrompts(params);
    const taskIds = message.taskType;
    const messages = [
      {
        role: 'system',
        content: [
          {
            text: promts.systemRole,
            type: 'text',
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: promts.getUserRole(taskIds),
          },
        ],
      },
    ];
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
      response_format: {
        type: 'json_object',
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const responce = completion.choices[0];
    return JSON.stringify(responce.message.content);
  }

  async generateText_V2(data: any, user: Partial<User>): Promise<any> {
    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: openAIKey,
    });

    const params: TextGeneratorData = {
      targetLanguage: data.language,
      languageLevel: data.languageLevel,
      sourceWords: data.sourceWords,
      countOfSentences: data.count,
      context: data.context,
      tens: data.tens,
      adjective: data.adjective,
      noun: data.noun,
      verb: data.verb,
      preposition: data.preposition,
      sentences: data.sentences,
      textType: data.textType,
    };

    const promts = new TextGenerator(params);
    const messages = [
      {
        role: 'system',
        content: [
          {
            text: promts.getSystemRole(),
            type: 'text',
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: promts.getUserRole(),
          },
        ],
      },
    ];
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
      response_format: {
        type: 'json_object',
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response = completion.choices[0];
    const usage = completion.usage;

    try {
      if (user?.id && usage?.total_tokens) {
        await this.loggingTokensUsage(user.id, usage.total_tokens);
      }
      const value = response.message.content ?? '';
      return JSON.parse(value);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return { error };
    }
  }

  async loggingTokensUsage(userId: string, tokens: number): Promise<void> {
    await this.tokenUsageRepository.incrementTokens(userId, tokens);
  }

  async generateTask(body: TaskConfig): Promise<any> {
    if (!body?.text) {
      throw new BadRequestException('text is required');
    }

    const tasks: string[] = [];
    const schemas: string[] = [];
    const instructions: string[] = [];

    if (body.gap_text) {
      const { prompt, schema } = this.taskGenerator.gapTextPrompt(
        body.gap_text,
      );
      instructions.push(prompt);
      schemas.push(schema);
      tasks.push('gap_text');
    }

    if (body.true_false) {
      const { prompt, schema } = this.taskGenerator.trueFalsePrompt(
        body.true_false,
      );
      instructions.push(prompt);
      schemas.push(schema);
      tasks.push('true_false');
    }

    if (body.question_answer) {
      const { prompt, schema } = this.taskGenerator.questionAnswerPrompt(
        body.question_answer,
      );
      instructions.push(prompt);
      schemas.push(schema);
      tasks.push('question_answer');
    }

    if (body.translate) {
      const { prompt, schema } = this.taskGenerator.translatePrompt(
        body.translate,
      );
      instructions.push(prompt);
      schemas.push(schema);
      tasks.push('translate');
    }

    if (body.word_definition) {
      const { prompt, schema } = this.taskGenerator.wordDefinitionPrompt(
        body.word_definition,
      );
      instructions.push(prompt);
      schemas.push(schema);
      tasks.push('word_definition');
    }

    if (!tasks.length) {
      throw new BadRequestException('No task options provided');
    }

    const system =
      'You are a helpful assistant that creates language learning tasks. ' +
      'Return a valid JSON object containing only the keys for the requested tasks. ' +
      'Use the following schema for each key:\n' +
      schemas.join('\n') +
      '\nDo not include any additional commentary.';

    const user = `Text:\n${body.text}\n\n` + instructions.join('\n\n');

    const openAIKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: openAIKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_object' },
    });

    const responseMessage = completion.choices[0].message.content ?? '';
    try {
      return JSON.parse(responseMessage);
    } catch (error) {
      return { error: 'Failed to parse response', raw: responseMessage };
    }
  }
}
