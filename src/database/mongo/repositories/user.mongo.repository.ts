import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../../user/user.interface';
import { UserEntity } from '../schemas/user.schema';
import { stripMongoFields } from './mongo.helpers';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return stripMongoFields<User>(createdUser.toObject()) as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).lean().exec();
    return stripMongoFields<User>(user as User | null);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ id }).lean().exec();
    return stripMongoFields<User>(user as User | null);
  }
}
