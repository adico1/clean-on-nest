import { 
  NestView, 
  PutAccountsResponsePresenter, 
  PutAccountLogicController 
} from '@btcp/bootcamp-interfaceadapters';
import { 
  PutAccountsRequestMessageValidator, 
  PutAccountsInteractor } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class PutAccountFactory extends IControllerFactory<PutAccountLogicController> {
  public create(): PutAccountLogicController {
    const view = new NestView(this._res)
    const validator = new PutAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const interactor = new PutAccountsInteractor(validator, repository);
    const presenter = new PutAccountsResponsePresenter();
    return new PutAccountLogicController(interactor, presenter, view);
  }
}