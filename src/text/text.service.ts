import { Injectable } from '@nestjs/common';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { Tables } from '../dynamodb/dynamoDB.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TextService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async getTexts() {
    return await this.dynamodbService.getAllItems(Tables.TEXT_TABLE);
  }

  async getTextById(id) {
    try {
      const key = { id };
      return this.dynamodbService.getItemById(Tables.TEXT_TABLE, key);
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to get form: ${id}`);
    }
  }

  async createText(data) {
    try {
      const id = uuidv4();
      await this.dynamodbService.addItem(Tables.TEXT_TABLE, { ...data, id });
      return { message: 'Text created successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save text');
    }
  }

  async deleteTextById(id: string) {
    try {
      const key = { id };
      await this.dynamodbService.deleteItem(Tables.TEXT_TABLE, key);
      return { message: 'Text deleted successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error(`Failed to delete text: ${id}`);
    }
  }
}
