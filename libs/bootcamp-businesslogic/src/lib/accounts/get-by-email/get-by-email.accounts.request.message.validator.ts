import { IValidator } from '../../common/interfaces/validator.interface';
import { GetByEmailAccountsRequestMessage } from './get-by-email.accounts.request.message';
import { GetByEmailAccountsValidationResult } from './get-by-email.accounts.validation-result';
import { isEmail } from 'validator';

export class GetByEmailAccountsRequestMessageValidator 
implements IValidator<GetByEmailAccountsRequestMessage, GetByEmailAccountsValidationResult> {
  validate(request: GetByEmailAccountsRequestMessage): GetByEmailAccountsValidationResult {
    const validationResult = new GetByEmailAccountsValidationResult();
    validationResult.isValid = isEmail(request.email);

    return validationResult;
  }

}