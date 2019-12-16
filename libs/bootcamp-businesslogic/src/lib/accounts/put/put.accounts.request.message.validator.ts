import { IValidator } from '../../common/interfaces/validator.interface';
import { PutAccountsRequestMessage } from './put.accounts.request.message';
import { PutAccountsValidationResult } from './put.accounts.validation-result';
import { isUUID } from 'validator';

export class PutAccountsRequestMessageValidator 
implements IValidator<PutAccountsRequestMessage, PutAccountsValidationResult> {
  validate(request: PutAccountsRequestMessage): PutAccountsValidationResult {
    const validationResult = new PutAccountsValidationResult();
    validationResult.isValid = isUUID(request.accountId);

    return validationResult;
  }

}