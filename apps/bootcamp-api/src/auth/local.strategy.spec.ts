import { LocalStrategy } from './local.strategy';
import { TestingModule, Test } from '@nestjs/testing';

const mockAccountsService = {};
const mockAuthService = {};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
    ],
  }).compile();

});

describe('LocalStrategy', () => {
  it('should be defined', () => {
    //expect(new LocalStrategy(service)).toBeDefined();
  });
});
