import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnswerDto } from './dto/answer-dto';
import { AnswerEntity } from '@btcp/bootcamp-data';

const from = (id: number) => {
  const retDto = new AnswerDto();
  retDto.id = `some-id-${id}`;
  retDto.deckId = `some-deck-id-${id}`;
  retDto.answers = [];
  retDto.userId = `some-user-id-${id}`;

  return retDto;
}

const mockRepository = {};

let controller: AnswersController;
  let service: AnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswersService,
        {
          provide: getRepositoryToken(AnswerEntity),
          useValue: mockRepository,
        }],
      controllers: [AnswersController],
    }).compile();

    service = module.get<AnswersService>(AnswersService);
    controller = module.get<AnswersController>(AnswersController);
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
