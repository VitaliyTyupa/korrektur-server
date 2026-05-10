import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LogRecord, LogRepository } from '../../repositories/log.repository';
import { LogEntity } from '../schemas/log.schema';
import { stripMongoFields } from './mongo.helpers';

@Injectable()
export class LogMongoRepository implements LogRepository {
  constructor(
    @InjectModel(LogEntity.name)
    private readonly logModel: Model<LogEntity>,
  ) {}

  async create(log: LogRecord): Promise<LogRecord> {
    const createdLog = await this.logModel.create(log);
    return stripMongoFields<LogRecord>(createdLog.toObject() as LogRecord) as LogRecord;
  }
}
