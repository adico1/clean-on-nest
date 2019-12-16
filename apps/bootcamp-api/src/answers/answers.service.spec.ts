import { Test, TestingModule } from '@nestjs/testing';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerEntity } from '@btcp/bootcamp-data';

const mockRepository = {};

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
