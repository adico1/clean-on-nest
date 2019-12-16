import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '@btcp/bootcamp-data';

const mockRepository = {};
const mockRefreshTokenService = {};
const mockJwtService = {};

describe('AuthService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenService,
        {
          provide: RefreshTokenService,
          useValue: mockRefreshTokenService,
        },
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();
  });

  it('should be defined', () => {
    //expect(service).toBeDefined();
  });
});
