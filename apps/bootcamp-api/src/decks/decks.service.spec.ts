import { Test, TestingModule } from '@nestjs/testing';
import { DecksService } from './decks.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { DeckEntity } from '@btcp/bootcamp-data';

const mockRepository = {};

describe('DecksService', () => {
  let service: DecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [
      //  TypeOrmModule.forFeature([DeckEntity])
      //],
      providers: [
        DecksService,
        {
          provide: getRepositoryToken(DeckEntity),
          useValue: mockRepository,
        }],
    }).compile();

    service = module.get<DecksService>(DecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
