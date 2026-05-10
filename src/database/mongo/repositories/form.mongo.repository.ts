import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FormEntity } from '../schemas/form.schema';
import { FormRecord, FormRepository } from '../../repositories/form.repository';
import { stripMongoFields } from './mongo.helpers';

@Injectable()
export class FormMongoRepository implements FormRepository {
  constructor(
    @InjectModel(FormEntity.name)
    private readonly formModel: Model<FormEntity>,
  ) {}

  async findAll(): Promise<FormRecord[]> {
    const forms = await this.formModel.find().lean().exec();
    return forms.map(
      (form) => stripMongoFields<FormRecord>(form as FormRecord) as FormRecord,
    );
  }

  async findById(id: string): Promise<FormRecord | null> {
    const form = await this.formModel.findOne({ id }).lean().exec();
    return stripMongoFields<FormRecord>(form as FormRecord | null);
  }

  async create(form: FormRecord): Promise<FormRecord> {
    const createdForm = await this.formModel.create(form);
    return stripMongoFields<FormRecord>(
      createdForm.toObject() as FormRecord,
    ) as FormRecord;
  }

  async update(
    id: string,
    form: Partial<FormRecord>,
  ): Promise<FormRecord | null> {
    const updatedForm = await this.formModel
      .findOneAndUpdate({ id }, { $set: form }, { new: true })
      .lean()
      .exec();

    return stripMongoFields<FormRecord>(updatedForm as FormRecord | null);
  }
}
