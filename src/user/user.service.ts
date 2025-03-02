import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: '1',
      username: 'john',
      password: 'changeme',
      role: 'teacher',
    },
    {
      userId: '2',
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

  findOne(username: string,):
    | { role: any; password: string; userId: string; username: string }
    | undefined {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
