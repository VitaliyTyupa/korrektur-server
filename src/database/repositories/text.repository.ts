export interface TextRecord {
  id: string;
  [key: string]: any;
}

export interface TextRepository {
  findAll(): Promise<TextRecord[]>;
  findById(id: string): Promise<TextRecord | null>;
  create(text: TextRecord): Promise<TextRecord>;
  deleteById(id: string): Promise<void>;
}
