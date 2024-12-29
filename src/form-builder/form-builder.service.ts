import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../common-services/dynamodb/dynamodb.service';
import { Tables } from '../common-types/constants.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormBuilderService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async getAllForms() {
    return await this.dynamodbService.getAllItems(Tables.FORM_TABLE);
  }

  async getFormByID(id: string) {
    try {
      const key = { id };
      return await this.dynamodbService.getItem(Tables.FORM_TABLE, key);
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to get form: ${id}`);
    }
  }

  async saveNewForm(form: any) {
    try {
      const id = uuidv4();
      await this.dynamodbService.addItem(Tables.FORM_TABLE, { ...form, id });
      return { message: 'Form created successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save form');
    }
  }

  async updateForm(id: string, form: any) {
    throw new Error(
      'This does not exist yet. This feature needs to be configured.',
    );
  }
}
