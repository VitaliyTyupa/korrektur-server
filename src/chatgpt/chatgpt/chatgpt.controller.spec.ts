import { Test, TestingModule } from '@nestjs/testing';
import { ChatgptController } from './chatgpt.controller';
import { ChatgptService } from './chatgpt.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ChatgptController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ChatgptController],
      providers: [ChatgptService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/chatgpt/check (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/chatgpt/check')
      .send({ sentence: 'This is a test sentence.' })
      .expect(201);

    expect(response.body).toBeDefined();
  });
});
