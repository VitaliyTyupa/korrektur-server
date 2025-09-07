import { Injectable } from '@nestjs/common';

export interface GapTextOptions {
  selectedWords?: string[];
  wordList?: string;
  selectedType?: string;

  [key: string]: any;
}

export interface TrueFalseOptions {
  count: number;
}

export interface QuestionAnswerOptions {
  count: number;
}

export interface TranslateOptions {
  count: number;
}

export interface WordDefinitionOptions {
  wordList: string;
}

@Injectable()
export class TaskGeneratorService {
  gapTextPrompt(options: GapTextOptions): { prompt: string; schema: string } {
    const words =
      options.selectedWords && options.selectedWords.length
        ? options.selectedWords
        : options.wordList
          ? options.wordList
              .split(',')
              .map((w) => w.trim())
              .filter((w) => w)
          : [];

    let prompt =
      'For gap_text, create a gap-text exercise using the provided text. ';
    if (words.length) {
      prompt += `Replace the following words with numbered gaps: ${words.join(', ')}. `;
    } else {
      const rest = { ...options } as any;
      delete rest.selectedWords;
      delete rest.wordList;
      prompt += `Replace words according to these options: ${JSON.stringify(rest)}. `;
    }
    prompt +=
      'In the output, replace each removed word with a numbered blank like [1], [2], etc., and list the answers with their corresponding numbers.';

    const schema =
      '"gap_text": { "text": string, "answers": [{ "id": number, "answer": string }] }';
    return { prompt, schema };
  }

  trueFalsePrompt(options: TrueFalseOptions): {
    prompt: string;
    schema: string;
  } {
    const prompt = `For true_false, create ${options.count} statements based on the text and mark each as true or false.`;
    const schema =
      '"true_false": { "statements": [{ "id": number, "statement": string, "answer": boolean }] }';
    return { prompt, schema };
  }

  questionAnswerPrompt(options: QuestionAnswerOptions): {
    prompt: string;
    schema: string;
  } {
    const prompt = `For question_answer, generate ${options.count} questions based on the text with their answers.`;
    const schema =
      '"question_answer": { "questions": [{ "id": number, "question": string, "answer": string }] }';
    return { prompt, schema };
  }

  translatePrompt(options: TranslateOptions): {
    prompt: string;
    schema: string;
  } {
    const prompt = `For translate, create ${options.count} short sentences about the text and translate them to Ukrainian.`;
    const schema =
      '"translate": { "translations": [{ "id": number, "source": string, "target": string }] }';
    return { prompt, schema };
  }

  wordDefinitionPrompt(options: WordDefinitionOptions): {
    prompt: string;
    schema: string;
  } {
    const words = options.wordList
      .split(',')
      .map((w) => w.trim())
      .filter((w) => w);
    const prompt = `For word_definition, provide brief German definitions for the following words using the text as context: ${words.join(', ')}`;
    const schema =
      '"word_definition": { "definitions": [{ "word": string, "definition": string }] }';
    return { prompt, schema };
  }
}
