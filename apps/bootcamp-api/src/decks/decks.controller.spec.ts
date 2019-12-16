import { Test, TestingModule } from '@nestjs/testing';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { DeckDto } from './dto/deck.dto';
import { Visibility, Profit } from '../shared/deck-enum';
import { registerDecorator } from 'class-validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeckEntity } from '@btcp/bootcamp-data';

const from = (id: number) => {
  const retDto = new DeckDto();
  retDto.id = `some-id-${id}`,
  retDto.title = `some-title-${id}`,
  retDto.version = 1,
  retDto.profit = Profit.Free,
  retDto.showGroupId = 1,
  retDto.userId = 'some-user-id',
  retDto.visibility = Visibility.Private;

  return retDto;
}

const mockRepository = {};

describe('Decks Controller', () => {
  let controller: DecksController;
  let service: DecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecksService,
        {
          provide: getRepositoryToken(DeckEntity),
          useValue: mockRepository,
        }],
      controllers: [DecksController],
    }).compile();

    service = module.get<DecksService>(DecksService);
    controller = module.get<DecksController>(DecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of decks', async () => {
      const result = [from(1), from(2)];
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });
});
