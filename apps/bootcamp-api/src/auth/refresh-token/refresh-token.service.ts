import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '@btcp/bootcamp-data';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from './refresh-token.dto';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity) private readonly repo: Repository<RefreshTokenEntity>
  ) {

  }

  newToken(refreshToken: RefreshTokenDto) {
    const refreshTokenEntity = refreshToken.toEntity();
    return refreshTokenEntity;
  }

  async save(refreshTokenEntity: RefreshTokenEntity) {
    return await this.repo.save(refreshTokenEntity); 
  }

  async findToken(token: string) {
    return await this.repo.findOne({refreshToken: token})
      .then(e => RefreshTokenDto.fromEntity(e));
  }
}
