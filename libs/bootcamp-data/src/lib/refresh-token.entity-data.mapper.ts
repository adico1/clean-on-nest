import { RefreshTokenEntity } from '@btcp/bootcamp-data';
import { RefreshToken, Mapper } from '@btcp/bootcamp-entities';

export class RefreshTokensEntityDataMapper
extends Mapper<RefreshToken, RefreshTokenEntity> {
  mapFrom(source: RefreshToken): RefreshTokenEntity {
    return {
      id: source.id,
      refreshToken: source.refreshToken,
      ip: source.ip,
      country: source.country,
      browser: source.browser
    } as RefreshTokenEntity;
  }
}
