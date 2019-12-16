import { IValidator } from '../../common/interfaces/validator.interface';
import { ResetPasswordAccountsRequestMessage } from './reset-password.accounts.request.message';
import { ResetPasswordAccountsValidationResult } from './reset-password.accounts.validation-result';
import { isEmail, isLength } from 'validator';
import { Messages } from '@btcp/bootcamp-entities';
import { AccountsHelper } from '../../common';

export class ResetPasswordAccountsRequestMessageValidator 
implements IValidator<ResetPasswordAccountsRequestMessage, ResetPasswordAccountsValidationResult> {
  validate(request: ResetPasswordAccountsRequestMessage): ResetPasswordAccountsValidationResult {
    const validationResult = new ResetPasswordAccountsValidationResult();

    validationResult.isValid = true;

    if (!isEmail(request.email)) {
      validationResult.errors.push(Messages.EMAIL_INVALID);
      validationResult.isValid = false;
    }

    if (!AccountsHelper.isPassword(request.password) ) {
      validationResult.errors.push(Messages.PASSWORD_INVALID);
      validationResult.isValid = false;
    }

    console.log('ResetPasswordAccountsRequestMessageValidator::validate::CP5::valid:', validationResult.isValid);

    return validationResult;
  }
}