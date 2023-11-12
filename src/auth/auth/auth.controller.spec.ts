import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { INestApplication } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - Invalid Credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'invalid', password: 'wrongpassword' })
      .expect(401);
  });
});
