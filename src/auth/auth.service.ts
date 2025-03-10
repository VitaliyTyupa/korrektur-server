import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserPayload } from '../user/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user: User | undefined = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload: UserPayload = {
      sub: user.id,
      username: user.name,
      role: user.role,
    };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(user: CreateUserDto): Promise<any> {
    const notUniqueUser = await this.userService.findByEmail(user.email);
    if (!!notUniqueUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, this.saltRounds);
    return await this.userService.create({ ...user, password: hashedPassword });
  }
}
