import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
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
