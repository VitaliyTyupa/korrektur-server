import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.interface';
import { USER_REPOSITORY } from '../database/database.constants';
import { UserRepository } from '../database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const id = uuidv4();
      const role = Array.isArray(createUserDto.role)
        ? createUserDto.role
        : [createUserDto.role];
      await this.userRepository.create({
        ...createUserDto,
        id,
        role,
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
    return (await this.userRepository.findByEmail(email)) ?? undefined;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return (await this.userRepository.findById(id)) ?? undefined;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
