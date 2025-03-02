import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../common-types/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: UserPayload = {
      sub: user.userId,
      username: user.username,
      roles: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(username: string, password: string): Promise<any> {}
}
