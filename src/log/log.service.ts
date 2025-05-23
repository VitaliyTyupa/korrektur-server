import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { Tables } from '../dynamodb/dynamoDB.interface';

@Injectable()
export class LogService {
  constructor(private readonly dynamodbService: DynamodbService) {}

  async saveLog(data: any) {
    try {
      const id = uuidv4();
      await this.dynamodbService.addItem(Tables.LOG_TABLE, { ...data, id });
      return { message: 'logging successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save log');
    }
  }
}
