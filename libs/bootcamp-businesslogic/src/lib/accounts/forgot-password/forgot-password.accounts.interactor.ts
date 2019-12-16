import { ForgotPasswordAccountsRequestMessage } from './forgot-password.accounts.request.message';
import { ForgotPasswordAccountsResponseMessage } from './forgot-password.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository, ForgotPassword, IVerificationGeneratorDependencies, VerificationToken, Messages } from '@btcp/bootcamp-entities';
import { ForgotPasswordAccountsValidationResult } from './forgot-password.accounts.validation-result';
import { ForgotPasswordService } from '../../common/forgot-pasword.service';
import { AccountService } from '../../common/account.service';

export class ForgotPasswordAccountsInteractor 
implements IRequestHandler<ForgotPasswordAccountsRequestMessage, ForgotPasswordAccountsResponseMessage> {
  private readonly _validator: IValidator<ForgotPasswordAccountsRequestMessage, ForgotPasswordAccountsValidationResult>;
  private readonly _forgotPasswordService: ForgotPasswordService;
  private readonly _accountService: AccountService;

  constructor(
    validator: IValidator<ForgotPasswordAccountsRequestMessage, ForgotPasswordAccountsValidationResult>, 
    repository: IRepository<string, Account>,
    forgotPasswordRepository: IRepository<string, ForgotPassword>,
    verificationGeneratorDependencies: IVerificationGeneratorDependencies) {

      this._validator = validator;
      this._accountService = new AccountService(repository, verificationGeneratorDependencies);
      this._forgotPasswordService = new ForgotPasswordService(
        forgotPasswordRepository, 
        verificationGeneratorDependencies
      );
  }

  public async handle(request: ForgotPasswordAccountsRequestMessage): Promise<ForgotPasswordAccountsResponseMessage> {
    console.log('forgotPassword.accounts.interactor::handle::CP1');

    let validationResult: ForgotPasswordAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new ForgotPasswordAccountsResponseMessage(validationResult, null);
    }

    try {
      await this._accountService.findByEmailOrThrowException(request.email);
      await this._forgotPasswordService.saveForgotPassword(request.email, request.inetLocation);  
    } finally {
      return new ForgotPasswordAccountsResponseMessage(validationResult, {
        email: request.email,
        message: Messages.VERIFICATION_SENT,
      } as VerificationToken);  
    }
  }
}
