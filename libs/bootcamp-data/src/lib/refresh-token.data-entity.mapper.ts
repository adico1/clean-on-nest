import { RefreshTokenEntity } from '@btcp/bootcamp-data';
import { RefreshToken, Mapper } from '@btcp/bootcamp-entities';

export class RefreshTokensDataEntityMapper
extends Mapper<RefreshTokenEntity, RefreshToken> {
  mapFrom(source: RefreshTokenEntity): RefreshToken {
    return {
      id: source.id,
      refreshToken: source.refreshToken,
      ip: source.ip,
      country: source.country,
      browser: source.browser
    } as RefreshToken
  }
}
