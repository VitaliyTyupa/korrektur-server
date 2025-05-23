import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

import { DynamoDBDocument, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamodbService {
  // private dynamoClient: AWS.DynamoDB.DocumentClient;
  private dynamoClient: DynamoDBDocument;
  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get('dynamodb.region');
    const accessKeyId = this.configService.get('dynamodb.accessKeyId');
    const secretAccessKey = this.configService.get('dynamodb.secretAccessKey');

    // JS SDK v3 does not support global configuration.
    // Codemod has attempted to pass values to each service client in this file.
    // You may need to update clients outside of this file, if they use global config.
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
      // endpoint,
    });

    this.dynamoClient = DynamoDBDocument.from(new DynamoDB());
  }

  async addItem(tableName: string, item: any): Promise<PutCommandOutput> {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      return await this.dynamoClient.put(params);
    } catch (error) {
      throw new Error(`Failed to add item: ${error.message}`);
    }
  }
  // todo: need to debug this function
  async updateItem() {
    throw new Error(`Need to implement updateItem function`);
  }

  async getItemById(tableName: string, key: {[id: string]: string}): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };
    try {
      const data = await this.dynamoClient.get(params);
      return data.Item;
    } catch (error) {
      throw new Error(`Failed to get item: ${error.message}`);
    }
  }

  async getItemByIndex(tableName: string, indexName: string, key: any, value): Promise<any> {
    const params = {
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `${key} = :${key}`,
      ExpressionAttributeValues: {
        [`:${key}`]: value,
      },
    };
    try {
      const data = await this.dynamoClient.query(params);
      return data.Items;
    } catch (error) {
      throw new Error(`Failed to get item: ${error.message}`);
    }
  }

  async getAllItems(tableName: string): Promise<any> {
    const params = {
      TableName: tableName,
    };

    try {
      const data = await this.dynamoClient.scan(params);
      return data.Items;
    } catch (error) {
      throw new Error(`Failed to get items: ${error.message}`);
    }
  }

  async deleteItem(tableName: string, key: {id: string}) {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      await this.dynamoClient.delete(params);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
}
