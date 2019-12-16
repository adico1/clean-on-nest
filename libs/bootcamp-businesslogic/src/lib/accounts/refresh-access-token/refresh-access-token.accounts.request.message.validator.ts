import { IValidator } from '../../common/interfaces/validator.interface';
import { RefreshAccessTokenAccountsRequestMessage } from './refresh-access-token.accounts.request.message';
import { RefreshAccessTokenAccountsValidationResult } from './refresh-access-token.accounts.validation-result';
import { isUUID } from 'validator';
import { AccountsHelper } from '../../common';
import { Messages } from '@btcp/bootcamp-entities';

const REFRESH_TOKEN_INVALID = Messages.REFRESH_TOKEN_INVALID;

export class RefreshAccessTokenAccountsRequestMessageValidator 
implements IValidator<RefreshAccessTokenAccountsRequestMessage, RefreshAccessTokenAccountsValidationResult> {
  validate(request: RefreshAccessTokenAccountsRequestMessage): RefreshAccessTokenAccountsValidationResult {
    const validationResult = new RefreshAccessTokenAccountsValidationResult();

    validationResult.isValid = true;

    if (!isUUID(request.refreshToken)) {
      validationResult.errors.push(REFRESH_TOKEN_INVALID);
      validationResult.isValid = false;
    }

    console.log('RefreshAccessTokenAccountsRequestMessageValidator::validate::CP1::valid:', validationResult.isValid);

    AccountsHelper.isValidInetLocation(request.inetLocation, validationResult);

    return validationResult;
  }
}