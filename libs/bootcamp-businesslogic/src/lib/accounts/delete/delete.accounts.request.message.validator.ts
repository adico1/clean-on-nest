import { IValidator } from '../../common/interfaces/validator.interface';
import { DeleteAccountsRequestMessage } from './delete.accounts.request.message';
import { DeleteAccountsValidationResult } from './delete.accounts.validation-result';
import { isUUID } from 'validator';

export class DeleteAccountsRequestMessageValidator 
implements IValidator<DeleteAccountsRequestMessage, DeleteAccountsValidationResult> {
  validate(request: DeleteAccountsRequestMessage): DeleteAccountsValidationResult {
    const validationResult = new DeleteAccountsValidationResult();
    validationResult.isValid = isUUID(request.accountId);

    return validationResult;
  }

}