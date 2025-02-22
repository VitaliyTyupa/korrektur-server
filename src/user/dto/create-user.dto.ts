import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../user.service';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either "student" or "teacher"' })
  role: UserRole = UserRole.STUDENT;

}
