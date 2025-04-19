export interface TextGeneratorData {
  targetLanguage: string;
  languageLevel: string;
  sourceWords: string;
  countOfSentences: number;
  context: string;
  tens: string;
  textType: string;
  adjective: {
    article: string | null;
    kasus: string | null;
    comparison: string | null;
  };
  noun: {
    article: string | null;
    kasus: string | null;
  };
  verb: {
    verbForm: string | null;
    modalVerb: string | null;
    kasus: string | null;
    modus: string | null;
    activeForm: string | null;
  };
  preposition: {
    type: string | null;
    kasus: string | null;
  };
  sentences: {
    type: string | null;
    konnektor: string | null;
    doppelKonnektor: string | null;
  };
}

export class TextGenerator {
  targetLanguage: string;
  languageLevel: string;
  sourceWords: string;
  countOfSentences: number;
  context: string;
  tens: string;
  adjective: any;
  noun: any;
  verb: any;
  preposition: any;
  sentences: any;
  textType: string;

  constructor(initialData: TextGeneratorData) {
    Object.assign(this, initialData);
  }

  getSystemRole() {
    return `You are a ${this.targetLanguage} teacher assistant. Follow all grammatical rules carefully. Some instructions may be in ${this.targetLanguage} for clarity. Output must be returned in structured JSON format as specified.`;
  }

  getUserRole() {
    return `Create a ${this.textType} in ${this.targetLanguage} using Given words: ${this.sourceWords}. Context: ${this.context}. Number of sentences: ${this.countOfSentences}. Use each word once.
      If Given words aren't enough for grammar, use suitable ${this.languageLevel}-level words.
      Grammatikregeln:
      Tempus: ${this.tens}
      Adjektive: ${this.adjective.comparison}, mit ${this.adjective.article} Artikel im ${this.adjective.kasus}.
      Nomen: mit ${this.noun.article} Artikel im ${this.noun.kasus}.
      Präpositionen: ${this.preposition.type}, mit richtigem Kasus
      Verben: ${this.verb.verbForm} mit ${this.verb.modalVerb} im ${this.verb.modus} ${this.verb.activeForm} + ${this.verb.kasus}-Nomen
      Satzbau: ${this.sentences.type} mit ${this.sentences.konnektor} und ${this.sentences.doppelKonnektor}.
      Return JSON:
      {
      "text": "Generated Text",
      }`;
  }
}
