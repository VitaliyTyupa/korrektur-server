import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LOG_REPOSITORY } from '../database/database.constants';
import { LogRepository } from '../database/repositories/log.repository';

@Injectable()
export class LogService {
  constructor(
    @Inject(LOG_REPOSITORY)
    private readonly logRepository: LogRepository,
  ) {}

  async saveLog(data: any) {
    try {
      const id = uuidv4();
      await this.logRepository.create({ ...data, id });
      return { message: 'logging successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save log');
    }
  }
}
