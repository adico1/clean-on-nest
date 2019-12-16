import { CreateAccountsRequestMessage } from './create.accounts.request.message';
import { CreateAccountsResponseMessage } from './create.accounts.response.message';
import { IRequestHandler } from '../../common/interfaces/request-handler.interface';
import { IValidator } from '../../common/interfaces/validator.interface';
import { Account, IRepository, IVerificationGeneratorDependencies } from '@btcp/bootcamp-entities';
import { CreateAccountsValidationResult } from './create.accounts.validation-result';
import { AccountService } from '../../common/account.service';

export class CreateAccountsInteractor 
implements IRequestHandler<CreateAccountsRequestMessage, CreateAccountsResponseMessage> {
  private readonly _repository: IRepository<string, Account>;
  private readonly _validator: IValidator<CreateAccountsRequestMessage, CreateAccountsValidationResult>;
  private readonly _verificationGenerator: IVerificationGeneratorDependencies;
  private readonly _service: AccountService;
    
  constructor(
    validator: IValidator<CreateAccountsRequestMessage, CreateAccountsValidationResult>, 
    repository: IRepository<string, Account>,
    verificationGenerator: IVerificationGeneratorDependencies) {

      this._validator = validator;
      this._repository = repository;
      this._verificationGenerator = verificationGenerator;
      this._service = new AccountService(this._repository,this._verificationGenerator);
  
  }

  public async handle(request: CreateAccountsRequestMessage): Promise<CreateAccountsResponseMessage> {
//    console.log('create.accounts.interactor::handle::CP1');

    let validationResult: CreateAccountsValidationResult = this._validator.validate(request);
    if (!validationResult.isValid) {
      return new CreateAccountsResponseMessage(validationResult, null);
    }

    const useCaseResult = await this._service.execUseCase(request);
    
    // console.log('create.accounts.interactor::handle::CP3::modifiedAccount::');
    // console.dir(accountModified);

    return new CreateAccountsResponseMessage(validationResult, useCaseResult);
  }
}
