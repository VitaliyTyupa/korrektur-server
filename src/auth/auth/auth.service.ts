import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../../user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    if (
      // todo: should be changed to more secure
      credentials.username === 'example' &&
      credentials.password === 'password'
    ) {
      // todo: generate token
      return 'your_generated_token';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
