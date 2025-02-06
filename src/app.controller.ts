import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkConnection(): string {
    return this.appService.checkConnection();
  }
}
