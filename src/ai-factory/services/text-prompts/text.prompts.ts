export interface TextPromptsData {
  targetLanguage: string;
  sourceLanguage: string;
  languageLevel: string;
  sourceWords: string;
  countOfSentences: number;
  inputText: string;
  context: string;
  autogenerateText: boolean;
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

  // todo: need to type initialData
  constructor(initialData: TextPromptsData) {
    Object.assign(this, initialData);
  }

  get systemRole() {
    return `You are an expert ${this.targetLanguage} language teacher tasked with generating content for exercises. You will create grammatically and stylistically correct sentences in ${this.targetLanguage} unless otherwise specified in the task. Lexical and grammatical constructions should adhere to the ${this.languageLevel} language level.
              Input Details:
              - inputText: Some ${this.targetLanguage} text provided by the user or generated on request,
              - sourceWords: A set of words in ${this.targetLanguage}. Determine the infinitive of the given words and use them in the form according to the task. If a word has several meanings, use the meaning closest to the context of inputText.,
              - inputTasks: A list of tasks in the form of JSON where the key is the task ID and the value is the task description. The tasks may be in ${this.targetLanguage} or have certain rules of expression or definition in German to more accurately convey the task.
              Return the response in the following JSON format:
              {sourceWords: List of sourceWords in the infinitive form.
                ${this.autogenerateText ? `generatedText: ${this.inputText}` : ''}
                ${this.targetLanguage === 'German' ? 'Nouns should be indicated with an article, in the singular with a plural ending separated by a comma.' : ''},
                outputTasks: A list of tasks in the form of JSON where the key is the task ID and the value is accomplished result.}`;
  }

  getTasks(ids: number[]): any {
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
      return `inputText: Generate a text in ${this.targetLanguage} from ${this.countOfSentences} sentences using ${this.sourceWords} according to the context: ${this.context}`;
    } else {
      return `inputText: Generate a text in ${this.targetLanguage} from ${this.countOfSentences} sentences using ${this.sourceWords}`;
    }
  }

  getUserRole(ids: number[]): string {
    return `${this.inputTextDetailes} 
    sourceWords: ${this.sourceWords} 
    inputTasks: ${JSON.stringify(this.getTasks(ids))}`;
  }

  private generateTaskPrompt(id: number): string {
    switch (id) {
      case 1:
        return `Generate ${this.countOfSentences} new sentences using sourceWords. Sentences should align with the context of the original inputText. Place the sourceWords  in correct form in square brackets within the generated sentences.`;
      case 2:
        return `Provide definitions of sourceWords in ${this.targetLanguage}. Provide response in json format {word: definition}`;
      case 3:
        return `Create ${this.countOfSentences} True/False statements. Provide response in json format - correct answer in square brackets as a key: statement as a value`;
      case 4:
        return `Generate ${this.countOfSentences} questions with answers to inputText. Provide response in json format as an array of entity where {question: generated question, antwort: antwort for this question}`;
      case 5:
        return `Generate ${this.countOfSentences} sentences in ${this.sourceLanguage}. Provide response in json format as an array of entity where {source: generated sentence in ${this.sourceLanguage}, translation: correct translation in ${this.targetLanguage}}`;
      case 6:
        return `Generate a text in ${this.targetLanguage} from ${this.countOfSentences} sentences using ${this.sourceWords} according to the context: ${this.context}`;

      default:
        throw new Error('Invalid task id');
    }
  }
}
