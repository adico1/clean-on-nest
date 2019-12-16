import { IValidator } from '../../common/interfaces/validator.interface';
import { VerifyEmailAccountsRequestMessage } from './verify-email.accounts.request.message';
import { VerifyEmailAccountsValidationResult } from './verify-email.accounts.validation-result';
import { isUUID } from 'validator';
import { AccountsHelper } from '../../common';
import { Messages } from '@btcp/bootcamp-entities';

const VERIFICATION_INVALID = Messages.VERIFICATION_INVALID;

export class VerifyEmailAccountsRequestMessageValidator 
implements IValidator<VerifyEmailAccountsRequestMessage, VerifyEmailAccountsValidationResult> {
  
    validate(request: VerifyEmailAccountsRequestMessage): VerifyEmailAccountsValidationResult {
    const validationResult = new VerifyEmailAccountsValidationResult();

    validationResult.isValid = true;

    if (!isUUID(request.verification)) {
      validationResult.errors.push(VERIFICATION_INVALID);
      validationResult.isValid = false;
    }

    // console.log('VerifyEmailAccountsRequestMessageValidator::validate::CP1::valid:', validationResult.isValid);

    AccountsHelper.isValidInetLocation(request.inetLocation, validationResult);

    return validationResult;
  }
}
