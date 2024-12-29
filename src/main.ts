import * as dotenv from 'dotenv';
// set .env variables to process.env
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('server listening port:3000');
}
bootstrap().then();
