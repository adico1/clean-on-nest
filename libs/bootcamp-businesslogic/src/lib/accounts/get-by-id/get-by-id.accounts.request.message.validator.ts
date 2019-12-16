import { IValidator } from '../../common/interfaces/validator.interface';
import { AccountIdRequestMessage } from './get-by-id.accounts.request.message';
import { GetByIdAccountsValidationResult } from './get-by-id.accounts.validation-result';
import { isUUID } from 'validator';

export class GetByIdAccountsRequestMessageValidator 
implements IValidator<AccountIdRequestMessage, GetByIdAccountsValidationResult> {
  validate(request: AccountIdRequestMessage): GetByIdAccountsValidationResult {
    const validationResult = new GetByIdAccountsValidationResult();
    validationResult.isValid = isUUID(request.accountId);

    return validationResult;
  }

}