import { AccountIdRequestMessage } from './get-by-id.accounts.request.message';
import { GetByIdAccountsResponseMessage } from './get-by-id.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { GetByIdAccountsValidationResult } from './get-by-id.accounts.validation-result';

export class GetByIdAccountsInteractor 
implements IRequestHandler<AccountIdRequestMessage, GetByIdAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<AccountIdRequestMessage, GetByIdAccountsValidationResult>;

  constructor(
    validator: IValidator<AccountIdRequestMessage, GetByIdAccountsValidationResult>, 
    repository: IRepository<string, Account>) {

      this._validator = validator;
      this._repository = repository;
  
  }
  
  public async handle(request: AccountIdRequestMessage): Promise<GetByIdAccountsResponseMessage> {
    let validationResult: GetByIdAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new GetByIdAccountsResponseMessage(validationResult, null);
    }

    var account = await this._repository.get(request.accountId);

    return new GetByIdAccountsResponseMessage(validationResult, account);
  }
}
