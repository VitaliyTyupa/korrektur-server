import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthGuard } from "./auth.guard";
import { Public } from "./decorators/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
    console.log('AuthController initialized');
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('UserService.findOne:', this.authService['userService'].findOne(signInDto.username));
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
