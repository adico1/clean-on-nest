import { AccountEntity } from '@btcp/bootcamp-data';
import { Account, Mapper } from '@btcp/bootcamp-entities';

export class AccountsEntityDataMapper
extends Mapper<Account, AccountEntity> {
  mapFrom(source: Account): AccountEntity {
    return {
      id: source.id,
      createDateTime: new Date(),
      lastChangedDateTime: new Date(),
      email: source.email,
      firstName: source.firstName,
      lastName: source.lastName,
      pw: source.pw,
      pwSalt: source.pwSalt,
      jwtToken: source.jwtToken,
      refreshToken: source.refreshToken,
      roles: source.roles,
      loginAttempts: source.loginAttempts,
      verified: source.verified,
      verification: source.verification,
      verificationExpires: source.verificationExpires
    } as AccountEntity;
  }
}
