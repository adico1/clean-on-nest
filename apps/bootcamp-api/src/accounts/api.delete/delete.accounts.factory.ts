import { 
  NestView, 
  DeleteAccountsResponsePresenter, 
  DeleteAccountLogicController 
} from '@btcp/bootcamp-interfaceadapters';
import { 
  DeleteAccountsRequestMessageValidator, 
  DeleteAccountsInteractor 
} from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class DeleteAccountFactory extends IControllerFactory<DeleteAccountLogicController> {
  public create(): DeleteAccountLogicController {
    const view = new NestView(this._res)
    const validator = new DeleteAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const interactor = new DeleteAccountsInteractor(validator, repository);
    const presenter = new DeleteAccountsResponsePresenter();
    const controller = new DeleteAccountLogicController(interactor, presenter, view);

    return controller;
  }
}