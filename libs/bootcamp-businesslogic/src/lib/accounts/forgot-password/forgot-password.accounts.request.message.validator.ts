import { IValidator } from '../../common/interfaces/validator.interface';
import { ForgotPasswordAccountsRequestMessage } from './forgot-password.accounts.request.message';
import { ForgotPasswordAccountsValidationResult } from './forgot-password.accounts.validation-result';
import { isEmail } from 'validator';
import { Messages } from '@btcp/bootcamp-entities';
import { AccountsHelper } from '../../common';

const EMAIL_INVALID = Messages.EMAIL_INVALID;

export class ForgotPasswordAccountsRequestMessageValidator 
implements IValidator<ForgotPasswordAccountsRequestMessage, ForgotPasswordAccountsValidationResult> {
  validate(request: ForgotPasswordAccountsRequestMessage): ForgotPasswordAccountsValidationResult {
    const validationResult = new ForgotPasswordAccountsValidationResult();

    validationResult.isValid = true;

    if (!isEmail(request.email)) {
      validationResult.errors.push(EMAIL_INVALID);
      validationResult.isValid = false;
    }

    console.log('ForgotPasswordAccountsRequestMessageValidator::validate::CP1::valid:', validationResult.isValid);

    AccountsHelper.isValidInetLocation(request.inetLocation, validationResult);

    return validationResult;
  }
}