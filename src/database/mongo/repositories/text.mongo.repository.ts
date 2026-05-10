import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TextRepository, TextRecord } from '../../repositories/text.repository';
import { TextEntity } from '../schemas/text.schema';
import { stripMongoFields } from './mongo.helpers';

@Injectable()
export class TextMongoRepository implements TextRepository {
  constructor(
    @InjectModel(TextEntity.name)
    private readonly textModel: Model<TextEntity>,
  ) {}

  async findAll(): Promise<TextRecord[]> {
    const texts = await this.textModel.find().lean().exec();
    return texts.map((text) => stripMongoFields<TextRecord>(text as TextRecord) as TextRecord);
  }

  async findById(id: string): Promise<TextRecord | null> {
    const text = await this.textModel.findOne({ id }).lean().exec();
    return stripMongoFields<TextRecord>(text as TextRecord | null);
  }

  async create(text: TextRecord): Promise<TextRecord> {
    const createdText = await this.textModel.create(text);
    return stripMongoFields<TextRecord>(createdText.toObject() as TextRecord) as TextRecord;
  }

  async deleteById(id: string): Promise<void> {
    await this.textModel.deleteOne({ id }).exec();
  }
}
