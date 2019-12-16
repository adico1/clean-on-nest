import { IValidator } from '../../common/interfaces/validator.interface';
import { ForgotPasswordVerifyAccountsRequestMessage } from './forgot-password-verify.accounts.request.message';
import { ForgotPasswordVerifyAccountsValidationResult } from './forgot-password-verify.accounts.validation-result';
import { isUUID } from 'validator';
import { Messages } from '@btcp/bootcamp-entities';
import { AccountsHelper } from '../../common';

const VERIFICATION_INVALID = Messages.VERIFICATION_INVALID;

export class ForgotPasswordVerifyAccountsRequestMessageValidator 
implements IValidator<ForgotPasswordVerifyAccountsRequestMessage, ForgotPasswordVerifyAccountsValidationResult> {
  validate(request: ForgotPasswordVerifyAccountsRequestMessage): ForgotPasswordVerifyAccountsValidationResult {
    const validationResult = new ForgotPasswordVerifyAccountsValidationResult();

    validationResult.isValid = true;

    if (!isUUID(request.verification)) {
      validationResult.errors.push(VERIFICATION_INVALID);
      validationResult.isValid = false;
    }

    console.log('ForgotPasswordVerifyAccountsRequestMessageValidator::validate::CP1::valid:', validationResult.isValid);

    AccountsHelper.isValidInetLocation(request.inetLocation, validationResult);

    return validationResult;
  }
}