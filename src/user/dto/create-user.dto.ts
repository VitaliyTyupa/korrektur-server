import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../../common-types/user.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role, { message: 'Role must be either "student" or "teacher"' })
  role: Role = Role.STUDENT;
}
