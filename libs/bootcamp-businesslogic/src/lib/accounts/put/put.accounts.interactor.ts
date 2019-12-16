import { PutAccountsRequestMessage } from './put.accounts.request.message';
import { PutAccountsResponseMessage } from './put.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository } from '@btcp/bootcamp-entities';
import { PutAccountsValidationResult } from './put.accounts.validation-result';

export class PutAccountsInteractor 
implements IRequestHandler<PutAccountsRequestMessage, PutAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<PutAccountsRequestMessage, PutAccountsValidationResult>;

  constructor(
    validator: IValidator<PutAccountsRequestMessage, PutAccountsValidationResult>, 
    repository: IRepository<string, Account>) {

      this._validator = validator;
      this._repository = repository;
  
  }
  
  public async handle(request: PutAccountsRequestMessage): Promise<PutAccountsResponseMessage> {
    console.log('put.accounts.interactor::handle::CP1');

    let validationResult: PutAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new PutAccountsResponseMessage(validationResult, null);
    }

    const account = await this._repository.get(request.accountId);
    account.firstName = request.firstName;
    account.lastName = request.lastName;

    console.log('put.accounts.interactor::handle::CP2::');
    console.dir(account);

    var modifiedAccount = await this._repository.save(account);

    return new PutAccountsResponseMessage(validationResult, modifiedAccount);
  }
}
