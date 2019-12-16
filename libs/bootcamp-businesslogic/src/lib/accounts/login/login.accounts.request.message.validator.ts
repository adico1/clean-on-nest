import { IValidator } from '../../common/interfaces/validator.interface';
import { LoginAccountsRequestMessage } from './login.accounts.request.message';
import { LoginAccountsValidationResult } from './login.accounts.validation-result';

export class LoginAccountsRequestMessageValidator 
implements IValidator<LoginAccountsRequestMessage, LoginAccountsValidationResult> {
  
    validate(request: LoginAccountsRequestMessage): LoginAccountsValidationResult {
    const validationResult = new LoginAccountsValidationResult();

    validationResult.isValid = true;

    return validationResult;
  }
}
