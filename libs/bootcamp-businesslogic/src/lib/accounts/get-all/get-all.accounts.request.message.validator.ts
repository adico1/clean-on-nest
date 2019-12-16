import { IValidator } from '../../common/interfaces/validator.interface';
import { GetAllAccountsRequestMessage } from '..';
import { GetAllAccountsValidationResult } from './get-all.accounts.validation-result';

export class GetAllAccountsRequestMessageValidator 
implements IValidator<GetAllAccountsRequestMessage, GetAllAccountsValidationResult> {
  validate(request: GetAllAccountsRequestMessage): GetAllAccountsValidationResult {
    const validationResult = new GetAllAccountsValidationResult();
    validationResult.isValid = true;

    return validationResult;
  }

}