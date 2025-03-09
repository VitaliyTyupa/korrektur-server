import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService, DynamodbService],
  exports: [UserService],
})
export class UserModule {}
