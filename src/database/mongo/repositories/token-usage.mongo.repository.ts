import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  TokenUsageRecord,
  TokenUsageRepository,
} from '../../repositories/token-usage.repository';
import { TokenUsageEntity } from '../schemas/token-usage.schema';
import { stripMongoFields } from './mongo.helpers';

@Injectable()
export class TokenUsageMongoRepository implements TokenUsageRepository {
  constructor(
    @InjectModel(TokenUsageEntity.name)
    private readonly tokenUsageModel: Model<TokenUsageEntity>,
  ) {}

  async incrementTokens(
    userId: string,
    tokens: number,
  ): Promise<TokenUsageRecord> {
    const record = await this.tokenUsageModel
      .findOneAndUpdate(
        { userId },
        { $inc: { total_tokens: tokens } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .lean()
      .exec();

    return stripMongoFields<TokenUsageRecord>(
      record as TokenUsageRecord | null,
    ) as TokenUsageRecord;
  }
}
