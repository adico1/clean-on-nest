import { AccountEntity } from '@btcp/bootcamp-data';
import { Mapper, Account } from '@btcp/bootcamp-entities';

export class AccountsDataEntityMapper
extends Mapper<AccountEntity, Account> {
  mapFrom(source: AccountEntity): Account {
    return {
      id: source.id,
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
    } as Account;
  }
}
