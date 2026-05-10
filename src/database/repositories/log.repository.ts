export interface LogRecord {
  id: string;
  [key: string]: any;
}

export interface LogRepository {
  create(log: LogRecord): Promise<LogRecord>;
}
