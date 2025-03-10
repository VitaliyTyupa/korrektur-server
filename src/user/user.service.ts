import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Tables } from '../dynamodb/dynamoDB.interface';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private dynamodbService: DynamodbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const id = uuidv4();
      await this.dynamodbService.addItem(Tables.USER_TABLE, {
        ...createUserDto,
        id,
      });
      return { message: 'User created successfully' };
    } catch (error) {
      console.error('Error processing request:', error.message);
      throw new Error('Failed to save User');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.dynamodbService.getItemByIndex(
      Tables.USER_TABLE,
      'email-index',
      'email',
      email,
    );
    return result[0];
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.dynamodbService.getItemById(Tables.USER_TABLE, {
      id: id,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
