import { IRepository, IService, ForgotPassword, IVerificationGeneratorDependencies, InetLocation, Messages, Consts, Account } from '@btcp/bootcamp-entities';
import { AccountNotFoundException } from './exceptions/account-not-found.exception.interface';
import { ValidationException } from '../common/exceptions/validation.exception.interface';
import { EncryptUser } from '.';
import { CreateAccountsRequestMessage } from '../accounts';

export class AccountService implements IService {
  HOURS_TO_VERIFY = Consts.HOURS_TO_VERIFY;
  
  private readonly _repository: IRepository<string, Account>;
  private readonly _verificationGenerator: IVerificationGeneratorDependencies;
  
  constructor(repository,
    verificationGenerator: IVerificationGeneratorDependencies) {

      this._repository = repository;
      this._verificationGenerator = verificationGenerator;
  }

  public async execUseCase(request: CreateAccountsRequestMessage): Promise<Account> {
    const account = new Account();
    account.firstName = request.firstName;
    account.lastName = request.lastName;
    account.pw = request.password;
    account.email = request.email;

    const encryptUser = new EncryptUser();

    await encryptUser.encryptUser(account);
    await this.isEmailUnique(account.email);
    this.setRegistrationInfo(account);
    
    return await this._repository.save(account);
  }
  
  public async isEmailUnique(email: string) {
    const user = await this._repository.getByQuery({email});

    if (user) {
      throw new ValidationException(Messages.EMAIL_MUST_BE_UNIQUE);
    }
  }

  public setRegistrationInfo(user): any {
    user.verification = this._verificationGenerator.createVerificationCode();
    user.verificationExpires = this._verificationGenerator.getExpirationDate(this.HOURS_TO_VERIFY);
  }

  public async findByEmailOrThrowException(email: string): Promise<Account> {
    const user = await this._repository.getByQuery({email, verified: true});

    if (!user) {
        throw new AccountNotFoundException('Email not found.');
    }
    return user;
  }
}
