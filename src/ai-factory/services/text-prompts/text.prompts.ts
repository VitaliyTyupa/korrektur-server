export interface TextPromptsData {
  targetLanguage: string;
  sourceLanguage: string;
  languageLevel: string;
  sourceWords: string;
  countOfSentences: number;
  inputText: string;
  context: string;
  autogenerateText: boolean;
  requirements?: TaskRequirements;
}

export interface TaskRequirements {
  tenses?: string[];
  activeForm?: string[];
  konjunktiv?: string[];
  helperVerbs?: string[];
  deklination?: string[];
  kasus?: string[];
}

export class TextPrompts {
  targetLanguage!: string;
  sourceLanguage!: string;
  languageLevel!: string;
  sourceWords!: string;
  countOfSentences!: number;
  inputText!: string;
  context!: string;
  autogenerateText!: boolean;
  requirements!: TaskRequirements;

  // todo: need to type initialData
  constructor(initialData: TextPromptsData) {
    Object.assign(this, initialData);
  }

  get systemRole() {
    return `You are an expert ${this.targetLanguage} language teacher tasked with generating content for exercises. You will create grammatically and stylistically correct sentences in ${this.targetLanguage} unless otherwise specified in the task. Lexical and grammatical constructions should adhere to the ${this.languageLevel} language level.
              Input Details:
              - inputText: Some ${this.targetLanguage} text provided by the user or generated on request,
              - sourceWords: A set of words in ${this.targetLanguage}. Determine the initial form of the given words and use them in the form according to the task. If a word has several meanings, use the meaning closest to the context of inputText.,
              - inputTasks: A list of tasks in the form of JSON where the key is the task ID and the value is the task description. The tasks may be in ${this.targetLanguage} or have certain rules of expression or definition in ${this.targetLanguage} to more accurately convey the task.
              Return the response in the following JSON format:
              {sourceWords: List of sourceWords in their initial form, if they are verbs then in the infinitive.
                ${this.autogenerateText ? `generatedText: ${this.inputText}` : ''}
                ${this.targetLanguage === 'German' ? 'Nouns should be indicated with an article, in the singular with a plural ending separated by a comma' : ''},
                outputTasks: A list of tasks. The task format should be: {id: task ID, value: response to the task}.`;
  }

  getTasks(ids: string[]): any {
    return ids.map((id) => {
      return {
        [id]: this.generateTaskPrompt(id),
      };
    });
  }

  get inputTextDetailes(): string {
    if (this.inputText) {
      return `inputText: ${this.inputText}`;
    } else if (this.context) {
      return `inputText: Generate a text in ${this.targetLanguage} from ${this.countOfSentences} sentences using ${this.sourceWords} according to the context: ${this.context} and return result as a simple string.`;
    } else {
      return `inputText: Generate a text in ${this.targetLanguage} from ${this.countOfSentences} sentences using ${this.sourceWords} and return result as a simple string.`;
    }
  }

  getUserRole(ids: string[]): string {
    return `${this.inputTextDetailes} 
    sourceWords: ${this.sourceWords} 
    inputTasks: ${JSON.stringify(this.getTasks(ids))}`;
  }

  private generateTaskPrompt(id: string): string {
    switch (id) {
      case '1':
        return `Generate ${this.countOfSentences} new sentences using sourceWords. ${this.getTaskRequirements('1', this.requirements)} Place the sourceWords  in correct form in square brackets within the generated sentences.`;
      case '2':
        return `Generate definitions in ${this.targetLanguage} of sourceWords. Provide response in json format {targetWord: word of sourceWord, definition: definition of current word}`;
      case '3':
        return `Generate ${this.countOfSentences} True/False statements. Provide response in json format {correctAnswer: answer, statement: statement}`;
      case '4':
        return `Generate ${this.countOfSentences} questions with answers to inputText. Provide response in json format {question: generated question, answer: answer for this question}`;
      case '5':
        return `Generate ${this.countOfSentences} new sentences in ${this.sourceLanguage}. ${this.getTaskRequirements('5', this.requirements)} Provide response in json format {source: generated sentence in ${this.sourceLanguage}, translation: correct translation in ${this.targetLanguage}}`;
      default:
        throw new Error('Invalid task id');
    }
  }

  private getTaskRequirements(id: string, requirements: any): string {
    switch (id) {
      case '1':
      case '5':
        return (
          this.contextTerm() +
          this.tenseTerm(requirements.tenses) +
          this.activeFormTerm(requirements.activeForm) +
          this.konjunktivTerm(requirements.konjunktiv) +
          this.deklinationTerm(requirements.deklination, requirements.kasus)
        );
      default:
        return '';
    }
  }

  private contextTerm(): string {
    return `Sentences should align with the context of the original inputText. Each sentences should contain only one of the sourceWords in the correct form.`;
  }

  private tenseTerm(tenses?: string[]): string {
    if (!tenses) return '';
    if (tenses.length > 1) {
      return `Generate sentences in ${tenses.join(', ')} tenses in equal amounts.`;
    } else {
      return `Sentences should be in ${tenses[0]} tense.`;
    }
  }

  private activeFormTerm(activeForm?: string[]): string {
    if (!activeForm) return '';
    if (activeForm.length === 1) {
      return `Ensure that all sentences are in ${activeForm[0]} voice.`;
    } else {
      return `Ensure that 50% of the sentences are in active voice and 50% in passive voice.`;
    }
  }

  private konjunktivTerm(konjunktiv: string[]): string {
    if (!konjunktiv) return '';
    if (konjunktiv.length === 1) {
      return `Ensure that all sentences are in ${konjunktiv[0]} mood.`;
    } else {
      return `Ensure that 50% of the sentences are in ${konjunktiv[0]} mood and 50% in ${konjunktiv[1]} mood.`;
    }
  }

  private deklinationTerm(deklination: string[], kasus: string[]): string {
    if (!deklination || !kasus) return '';
    return (
      `Generate sentences in German that contain the specified Wortart (part of speech): ${deklination.join(', ')}, in the following Kasus (cases): ${kasus.join(', ')}.` +
      'If the provided SelectedWord can be declined (dekliniert) according to the specified conditions, include it in the sentence in the correct form.' +
      ' If SelectedWord cannot be declined in that context, use another appropriate word that fits the required Wortart and Kasus.'
    );
  }
}
