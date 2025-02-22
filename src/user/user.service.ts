import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Role} from "aws-sdk/clients/s3";

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export type User = {
  email: string;
  password: string;
  username: string;
  role: Role;
};

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      role: 'teacher',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      role: 'student',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(
    username: string,
  ): {
    role: any;
    password: string; userId: number; username: string } | undefined {
    console.log(`Searching for user: ${username}`);
    const user = this.users.find((user) => user.username === username);
    console.log('Found user:', user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
