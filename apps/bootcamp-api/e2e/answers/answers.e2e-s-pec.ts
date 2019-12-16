import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AnswersModule } from '../../src/answers/answers.module';
import { AnswersService } from '../../src/answers/answers.service';
import { INestApplication } from '@nestjs/common';

describe('Answers', () => {
  let app: INestApplication;
  let answersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AnswersModule],
    })
      .overrideProvider(AnswersService)
      .useValue(answersService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET answers`, () => {
    return request(app.getHttpServer())
      .get('/answers')
      .expect(200)
      .expect({
        data: answersService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});