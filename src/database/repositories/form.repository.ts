export interface FormRecord {
  id: string;
  form: any;
  [key: string]: any;
}

export interface FormRepository {
  findAll(): Promise<FormRecord[]>;
  findById(id: string): Promise<FormRecord | null>;
  create(form: FormRecord): Promise<FormRecord>;
  update(id: string, form: Partial<FormRecord>): Promise<FormRecord | null>;
}
