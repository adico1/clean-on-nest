import { ResetPasswordAccountsRequestMessage } from './reset-password.accounts.request.message';
import { ResetPasswordAccountsResponseMessage } from './reset-password.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { IRepository, IVerificationGeneratorDependencies, VerificationToken, ForgotPassword } from '@btcp/bootcamp-entities';
import { ResetPasswordAccountsValidationResult } from './reset-password.accounts.validation-result';
import { ForgotPasswordService } from '../../common/forgot-pasword.service';
import { Consts } from '@btcp/bootcamp-entities';
import { Messages } from '@btcp/bootcamp-entities';

export class ResetPasswordAccountsInteractor 
implements IRequestHandler<ResetPasswordAccountsRequestMessage, ResetPasswordAccountsResponseMessage> {
  private readonly _validator: IValidator<ResetPasswordAccountsRequestMessage, ResetPasswordAccountsValidationResult>;
  private readonly _service: ForgotPasswordService;

  HOURS_TO_VERIFY = Consts.HOURS_TO_VERIFY;
  
  constructor(
    validator: IValidator<ResetPasswordAccountsRequestMessage, ResetPasswordAccountsValidationResult>, 
    repository: IRepository<string, ForgotPassword>,
    dependencies: IVerificationGeneratorDependencies) {

      this._validator = validator;
      this._service = new ForgotPasswordService(repository, dependencies)
  
  }
  
  public async handle(request: ResetPasswordAccountsRequestMessage): Promise<ResetPasswordAccountsResponseMessage> {
    console.log('reset-password.accounts.interactor::handle::CP1');

    let validationResult: ResetPasswordAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new ResetPasswordAccountsResponseMessage(validationResult, null);
    }

    try {
      const forgotPassword = await this._service.findForgotPasswordByEmail(request.email);
      await this._service.setForgotPasswordFinalUsed(forgotPassword);
      await this._service.resetUserPassword(request.email, request.password);  
    } catch(ex) {
      validationResult.isValid = false;
      validationResult.errors.push(Consts.HttpStatus.message.BAD_REQUEST);
      return new ResetPasswordAccountsResponseMessage(validationResult, null);
    }

    console.log('reset-password.accounts.interactor::handle::CP3');

    return new ResetPasswordAccountsResponseMessage(validationResult, {
      email: request.email,
      message: Messages.PASSWORD_SUCCESSFULLY_CHANGED,
    } as VerificationToken);
  }
}
