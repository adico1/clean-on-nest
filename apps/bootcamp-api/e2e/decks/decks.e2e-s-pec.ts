import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { DecksModule } from '../../src/decks/decks.module';
import { DecksService } from '../../src/decks/decks.service';
import { INestApplication } from '@nestjs/common';

describe('Decks', () => {
  let app: INestApplication;
  let decksService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DecksModule],
    })
      .overrideProvider(DecksService)
      .useValue(decksService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET decks`, () => {
    return request(app.getHttpServer())
      .get('/decks')
      .expect(200)
      .expect({
        data: decksService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});