import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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
    console.log(
      `AuthService.signIn called with username: ${username}, password: ${pass}`,
    );
    const user = await this.userService.findOne(username);
    console.log(user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username, role: user.role };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(username: string, password: string, role: ): Promise<any> {}
}
