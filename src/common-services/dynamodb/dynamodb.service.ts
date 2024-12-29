import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamodbService {
  // private dynamoClient: AWS.DynamoDB.DocumentClient;
  private dynamoClient: AWS.DynamoDB.DocumentClient;
  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get('dynamodb.region');
    const accessKeyId = this.configService.get('dynamodb.accessKeyId');
    const secretAccessKey = this.configService.get('dynamodb.secretAccessKey');

    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
      // endpoint,
    });

    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  async addItem(
    tableName: string,
    item: any,
  ): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      return await this.dynamoClient.put(params).promise();
    } catch (error) {
      throw new Error(`Failed to add item: ${error.message}`);
    }
  }
  // todo: need to debug this function
  async updateItem(
    tableName: string,
    key: any,
    updateExpression: string,
    expressionAttributeValues: any,
  ): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      return await this.dynamoClient.update(params).promise();
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  }

  async getItem(tableName: string, key: any): Promise<any> {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      const data = await this.dynamoClient.get(params).promise();
      return data.Item;
    } catch (error) {
      throw new Error(`Failed to get item: ${error.message}`);
    }
  }

  async getAllItems(tableName: string): Promise<any> {
    const params = {
      TableName: tableName,
    };

    try {
      const data = await this.dynamoClient.scan(params).promise();
      return data.Items;
    } catch (error) {
      throw new Error(`Failed to get items: ${error.message}`);
    }
  }
}
