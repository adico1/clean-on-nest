import { LoginAccountsRequestMessage } from './login.accounts.request.message';
import { LoginAccountsResponseMessage } from './login.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { LoginAccountsValidationResult } from './login.accounts.validation-result';
import { AuthService } from '../../common/auth.service';

export class LoginAccountsInteractor 
implements IRequestHandler<LoginAccountsRequestMessage, LoginAccountsResponseMessage> {
  private readonly _validator: IValidator<LoginAccountsRequestMessage, LoginAccountsValidationResult>
  private readonly _auth: AuthService;

  constructor(
    validator: IValidator<LoginAccountsRequestMessage, LoginAccountsValidationResult>, 
    auth: AuthService) {

      this._validator = validator;
      this._auth = auth;
  }

  public async handle(request: LoginAccountsRequestMessage): Promise<LoginAccountsResponseMessage> {
    // console.log('login.accounts.interactor::handle::CP1');

    let validationResult: LoginAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new LoginAccountsResponseMessage(validationResult, null);
    }

    return new LoginAccountsResponseMessage(
      validationResult, 
      await this._auth.createLoginToken(
        request.loggedInUser, 
        request.inetLocation)
      );
  }
}
