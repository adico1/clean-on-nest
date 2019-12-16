import { InMemoryAccountRepository, ForgotPasswordRepository } from '@btcp/bootcamp-data';
import { Account } from '@btcp/bootcamp-entities';
import { Connection } from 'typeorm';
import { AccountRepository, RefreshTokenRepository } from '@btcp/bootcamp-data';

export class Factory {
  public static createDummyInMemoryAccountRepository(): InMemoryAccountRepository {
    var dummy = new InMemoryAccountRepository();
    const account = new Account();
    account.email = 'a@a.a';
    account.firstName = 'adi';
    account.lastName = 'cohen';
    dummy.save(account);
    return dummy;
  }

  public static createAccountRepository(connection: Connection): AccountRepository {
    return new AccountRepository(connection);
  }

  public static createRefreshTokenRepository(connection: Connection): RefreshTokenRepository {
    return new RefreshTokenRepository(connection);
  }

  public static createForgotPasswordRepository(connection: Connection): ForgotPasswordRepository {
    return new ForgotPasswordRepository(connection);
  }
  
}