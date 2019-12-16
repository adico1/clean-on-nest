import { NestView, CreateAccountsResponsePresenter, 
  CreateAccountLogicController, 
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { CreateAccountsRequestMessageValidator, CreateAccountsInteractor,
  CreateAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class CreateAccountFactory extends IControllerFactory<CreateAccountLogicController> {
  public create(): CreateAccountLogicController {
    const view = new NestView(this._res);
    const validator = new CreateAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const verificationGenerator = new VerificationGeneratorDependencies();
    const interactor = new CreateAccountsInteractor(validator, repository, verificationGenerator);
    const presenter = new CreateAccountsResponsePresenter();
    const controller = new CreateAccountLogicController(interactor, presenter, view);

    return controller;
  }
}