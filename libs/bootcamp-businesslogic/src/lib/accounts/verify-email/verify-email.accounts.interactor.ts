import { VerifyEmailAccountsRequestMessage } from './verify-email.accounts.request.message';
import { VerifyEmailAccountsResponseMessage } from './verify-email.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository, ForgotPassword, LoginInfo, Consts, Messages, LoggedInUser } from '@btcp/bootcamp-entities';
import { VerifyEmailAccountsValidationResult } from './verify-email.accounts.validation-result';
import { AuthService } from '../../common/auth.service';
import { AccountNotFoundException } from '../../common/exceptions/account-not-found.exception.interface';
import { AccountRepository } from '@btcp/bootcamp-data';

export class VerifyEmailAccountsInteractor 
implements IRequestHandler<VerifyEmailAccountsRequestMessage, VerifyEmailAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<VerifyEmailAccountsRequestMessage, VerifyEmailAccountsValidationResult>
  private readonly _auth: AuthService;

  HOURS_TO_VERIFY = Consts.HOURS_TO_VERIFY;
  
  constructor(
    validator: IValidator<VerifyEmailAccountsRequestMessage, VerifyEmailAccountsValidationResult>, 
    repository: IRepository<string, Account>,
    auth: AuthService) {

      this._validator = validator;
      this._repository = repository;
      this._auth = auth;
  }

  private async findByVerification(verification: string): Promise<Account> {
    const user = 
        await ((this._repository) as AccountRepository)
          .getByVerification(verification);

    if (!user) {
        throw new AccountNotFoundException(Consts.HttpStatus.message.BAD_REQUEST);
    }
    return user;
  }

  private async setUserAsVerified(account) {
    account.verified = true;
    return await this._repository.save(account);
  }

  public async handle(request: VerifyEmailAccountsRequestMessage): Promise<VerifyEmailAccountsResponseMessage> {
    // console.log('verifyemail.accounts.interactor::handle::CP1');

    let validationResult: VerifyEmailAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new VerifyEmailAccountsResponseMessage(validationResult, null);
    }

    const user = await this.findByVerification(request.verification);
    let accountModified = await this.setUserAsVerified(user);

    LoggedInUser
    let loginInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: await this._auth.createAccessToken(LoggedInUser.userToLoggedInUser(accountModified)),
      refreshToken: await this._auth.createRefreshToken(user.id, request.inetLocation),
    } as LoginInfo;

    // console.log('verifyemail.accounts.interactor::handle::CP3::loginInfo::');
    // console.dir(loginInfo);

    return new VerifyEmailAccountsResponseMessage(validationResult, loginInfo);

  }
}
