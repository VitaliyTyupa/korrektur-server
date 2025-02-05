import * as dotenv from 'dotenv';
// set .env variables to process.env
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://dl-client-bbac8ef1f1.s3-website.eu-north-1.amazonaws.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
  console.log('server listening port:3000');
}
bootstrap().then();
