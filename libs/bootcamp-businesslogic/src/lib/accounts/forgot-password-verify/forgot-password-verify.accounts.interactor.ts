import { ForgotPasswordVerifyAccountsRequestMessage } from './forgot-password-verify.accounts.request.message';
import { ForgotPasswordVerifyAccountsResponseMessage } from './forgot-password-verify.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { IRepository, ForgotPassword, IVerificationGeneratorDependencies, VerificationToken, Messages, Consts } from '@btcp/bootcamp-entities';
import { ForgotPasswordVerifyAccountsValidationResult } from './forgot-password-verify.accounts.validation-result';
import { ForgotPasswordService } from '../../common/forgot-pasword.service';
import { BadRequestException } from '../../common';

export class ForgotPasswordVerifyAccountsInteractor 
implements IRequestHandler<ForgotPasswordVerifyAccountsRequestMessage, ForgotPasswordVerifyAccountsResponseMessage> {
  private readonly _validator: IValidator<ForgotPasswordVerifyAccountsRequestMessage, ForgotPasswordVerifyAccountsValidationResult>;
  private readonly _forgotPasswordService: ForgotPasswordService;

  constructor(
    validator: IValidator<ForgotPasswordVerifyAccountsRequestMessage, ForgotPasswordVerifyAccountsValidationResult>, 
    forgotPasswordRepository: IRepository<string, ForgotPassword>,
    forgotPasswordDependencies: IVerificationGeneratorDependencies) {

      this._validator = validator;
      this._forgotPasswordService = new ForgotPasswordService(
        forgotPasswordRepository, 
        forgotPasswordDependencies
      );
  }

  public async handle(request: ForgotPasswordVerifyAccountsRequestMessage): Promise<ForgotPasswordVerifyAccountsResponseMessage> {
    console.log('forgotPassword.accounts.interactor::handle::CP1');

    let validationResult: ForgotPasswordVerifyAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new ForgotPasswordVerifyAccountsResponseMessage(validationResult, null);
    }

    console.log('request.verification:', request.verification);

    const forgotPassword = await this._forgotPasswordService
      .findForgotPasswordByUuid(request.verification);

    console.log('forgotPassword:', forgotPassword);
    if (!forgotPassword) {
      validationResult.isValid = false;
      validationResult.errors.push(Consts.HttpStatus.message.BAD_REQUEST);

      return new ForgotPasswordVerifyAccountsResponseMessage(validationResult, null);
    }

    await this._forgotPasswordService.setForgotPasswordFirstUsed(forgotPassword, request.inetLocation);

    return new ForgotPasswordVerifyAccountsResponseMessage(validationResult, {
      email: forgotPassword.email,
      message: Messages.NOW_RESET_YOUR_PASSWORD,
    } as VerificationToken);
    
  }
}
