import { NestView, 
  GetAllAccountsResponsePresenter, 
  GetAllAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { 
  GetAllAccountsRequestMessageValidator, 
  GetAllAccountsInteractor } from '@btcp/bootcamp-blogic';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';
import { Factory } from '../common/factory';

export class GetAllAccountFactory 
extends IControllerFactory<GetAllAccountLogicController> {
  public create(): GetAllAccountLogicController {
    const view = new NestView(this._res)
    const validator = new GetAllAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const interactor = new GetAllAccountsInteractor(validator, repository);
    const presenter = new GetAllAccountsResponsePresenter();
    return new GetAllAccountLogicController(interactor, presenter, view);
  }
}