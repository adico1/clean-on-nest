import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountDto } from './dto/account-dto';
import { RefreshTokenService } from '../auth/refresh-token/refresh-token.service';
import { JwtService } from '@nestjs/jwt';

const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

const from = (id: number) => {
  const retDto = new AccountDto();
  retDto.id = `some-id-${id}`,
  retDto.email = `test${seedId}-${id}@gmail.com`,
  retDto.firstName = `some-title-${id}`,
  retDto.lastName = `lastname${seedId}-${id}`,
  retDto.pw = `pw${seedId}-${id}`,
  retDto.pwSalt = `pwSalt${seedId}-${id}`,
  retDto.jwtToken = null,
  retDto.refreshToken = null;

  return retDto;
}

const mockRepository = {
  findAll: () => ({
    email: 'test1697-1@gmail.com'
  })
};
const mockForgotPasswordRepository = {

};
const mockAuthService = {};

describe('Accounts Controller', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        {
          provide: JwtService,
          useValue: {}
        },
      ],
      controllers: [AccountsController],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of decks', async () => {
      const result: Array<AccountDto> = [from(1), from(2)];
      
      //jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      //expect(await controller.findAll()).toBe(result);
    });
  });
});
