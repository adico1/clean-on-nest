import { GetByEmailAccountsRequestMessage } from './get-by-email.accounts.request.message';
import { GetByEmailAccountsResponseMessage } from './get-by-email.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { GetByEmailAccountsValidationResult } from './get-by-email.accounts.validation-result';

export class GetByEmailAccountsInteractor 
implements IRequestHandler<GetByEmailAccountsRequestMessage, GetByEmailAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<GetByEmailAccountsRequestMessage, GetByEmailAccountsValidationResult>;

  constructor(
    validator: IValidator<GetByEmailAccountsRequestMessage, GetByEmailAccountsValidationResult>, 
    repository: IRepository<string, Account>) {

      this._validator = validator;
      this._repository = repository;
  
  }
  
  public async handle(request: GetByEmailAccountsRequestMessage): Promise<GetByEmailAccountsResponseMessage> {
    let validationResult: GetByEmailAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new GetByEmailAccountsResponseMessage(validationResult, null);
    }

    var account = await this._repository.getByQuery({email: request.email});

    return new GetByEmailAccountsResponseMessage(validationResult, account);
  }
}
