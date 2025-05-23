import * as dotenv from 'dotenv';
// set .env variables to process.env
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './log/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(app.get(LogInterceptor));
  await app.listen(3000);
  console.log('server listening port:3000');
}
bootstrap().then();
