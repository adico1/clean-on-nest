import { GetAllAccountsRequestMessage } from './get-all.accounts.request.message';
import { GetAllAccountsResponseMessage } from './get-all.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { GetAllAccountsValidationResult } from './get-all.accounts.validation-result';

export class GetAllAccountsInteractor 
implements IRequestHandler<GetAllAccountsRequestMessage, GetAllAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<GetAllAccountsRequestMessage, GetAllAccountsValidationResult>;

  constructor(
    validator: IValidator<GetAllAccountsRequestMessage, GetAllAccountsValidationResult>, 
    repository: IRepository<string, Account>) {

      this._validator = validator;
      this._repository = repository;
  
  }
  
  public async handle(request: GetAllAccountsRequestMessage): Promise<GetAllAccountsResponseMessage> {
    let validationResult: GetAllAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new GetAllAccountsResponseMessage(validationResult, null);
    }

    var accounts = await this._repository.getAll();

    return new GetAllAccountsResponseMessage(validationResult, accounts);
  }
}
