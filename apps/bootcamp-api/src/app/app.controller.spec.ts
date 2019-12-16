import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockRepository = {};
const mockAuthService = {};

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService, 
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
