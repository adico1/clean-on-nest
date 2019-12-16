import * as _ from 'lodash';
import { AccountEntity, ForgotPasswordEntity } from '@btcp/bootcamp-data';
import { Connection, Repository } from 'typeorm';
import { EncryptUser } from '@btcp/bootcamp-blogic';
import { TestStatics } from 'apps/bootcamp-api/e2e/common/test-statics';

export class AccountSeed {
  private connection: Connection;
  private accountRepo: Repository<AccountEntity>;
  private forgotPasswordRepo: Repository<ForgotPasswordEntity>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.accountRepo = connection.getRepository(AccountEntity);
    this.forgotPasswordRepo = connection.getRepository(ForgotPasswordEntity);
  }

  async run() {
    await this.deleteAllAccounts();
    await this.deleteAllForgotPassword();
    await this.deleteAllDecks();
    await this.deleteAllAnswers();
    await this.createTenRandomAccounts();
    await this.createAccountForUserLogin();
    await this.createAccountToTestDeleteApiById();
    await this.createAccountForForgotPassword();
    await this.createAdminAccount();
  }
  async deleteAllAnswers() {
    //throw new Error("Method not implemented.");
  }
  async deleteAllDecks() {
    //throw new Error("Method not implemented.");
  }
  async deleteAllForgotPassword() {
    // delete all account
    await this.forgotPasswordRepo.delete({});
    console.log(`All ForgotPassword delete`);
  }

  async deleteAllAccounts() {
    // delete all account
    await this.accountRepo.delete({});
    console.log(`All Accounts delete`);
  };

  async createTenRandomAccounts() {
    // create 10 regular account
    const seedId = Date.now()
      .toString()
      .split('')
      .reverse()
      .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

    const work = _.range(1, 10)
      .map(async n => {
        let account = new AccountEntity();
        account.email = `test${seedId}-${n}@gmail.com`;
        account.firstName = `firstname${seedId}-${n}`;
        account.lastName = `lastname${seedId}-${n}`;
        account.pwSalt = `pwSalt${seedId}-${n}`;
        account.pw = `pw${seedId}-${n}`;
        account.verification = 'some-verification-code';

        account = await this.accountRepo.save(account);
        console.log(`createTenRandomAccounts::Account saved. id = ${account.id}`);
    });
    
    return await Promise.all(work);
  }

  async createAccountForUserLogin() {
    let account = new AccountEntity();
    account.email = TestStatics.userEmail;
    account.firstName = `firstname`;
    account.lastName = `lastname`;
    account.pw = TestStatics.userEncryptedPassword;
    account.pwSalt = TestStatics.userSalt;
    account.verification = 'some-verification-code';
    account.verified = true;

    const accountRepo = this.connection.getRepository(AccountEntity);
    account = await accountRepo.save(account); // re-assign to know assigned id
    console.log(`createAccountForUserLogin::Account saved. id = ${account.id}`);
  }

  async createAccountForForgotPassword() {
    let account = new AccountEntity();
    account.email = TestStatics.forgotPasswordUserEmail;
    account.firstName = `firstname`;
    account.lastName = `lastname`;
    account.pw = TestStatics.userEncryptedPassword;
    account.pwSalt = TestStatics.userSalt;
    account.verification = 'some-verification-code';
    account.verified = true;

    const accountRepo = this.connection.getRepository(AccountEntity);
    account = await accountRepo.save(account); // re-assign to know assigned id
    console.log(`createAccountForUserLogin::Account saved. id = ${account.id}`);
  }

  async createAccountToTestDeleteApiById() {
    let account = new AccountEntity();
    account.email = TestStatics.deleteUserEmail;
    account.firstName = `firstname`;
    account.lastName = `lastname`;
    account.pw = `1234567890`;
    account.pwSalt = `some-salt`;
    account.verification = 'some-verification-code';

    const accountRepo = this.connection.getRepository(AccountEntity);
    account = await accountRepo.save(account); // re-assign to know assigned id
    console.log(`createAccountToTestDeleteApiById::Account saved. id = ${account.id}`);
  }

  async createAdminAccount() {
    let account = new AccountEntity();
    account.email = TestStatics.adminEmail;
    account.firstName = `admin`;
    account.lastName = `admin`;
    account.pw = TestStatics.adminPassword;
    account.verification = 'some-verification-code';
    account.roles = ['user', 'admin'];
    account.verified = true;

    const encryptUser = new EncryptUser();
    await encryptUser.encryptUser(account);

    // console.dir(account);

    const accountRepo = this.connection.getRepository(AccountEntity);
    account = await accountRepo.save(account); // re-assign to know assigned id
    console.log(`createAdminAccount::Account saved. id = ${account.id}`);
  }
}