import { DeleteAccountsRequestMessage } from './delete.accounts.request.message';
import { DeleteAccountsResponseMessage } from './delete.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { DeleteAccountsValidationResult } from './delete.accounts.validation-result';

export class DeleteAccountsInteractor 
implements IRequestHandler<DeleteAccountsRequestMessage, DeleteAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<DeleteAccountsRequestMessage, DeleteAccountsValidationResult>;

  constructor(
    validator: IValidator<DeleteAccountsRequestMessage, DeleteAccountsValidationResult>, 
    repository: IRepository<string, Account>) {

      this._validator = validator;
      this._repository = repository;
  
  }
  
  public async handle(request: DeleteAccountsRequestMessage): Promise<DeleteAccountsResponseMessage> {
    let validationResult: DeleteAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new DeleteAccountsResponseMessage(validationResult, null);
    }

    var account = await this._repository.delete(request.accountId);

    return new DeleteAccountsResponseMessage(validationResult, account);
  }
}
