import { NestView, 
  GetByIdAccountsResponsePresenter, 
  GetByIdAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { 
  GetByIdAccountsRequestMessageValidator, 
  GetByIdAccountsInteractor } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class GetByIdAccountFactory 
extends IControllerFactory<GetByIdAccountLogicController> {
  public create(): GetByIdAccountLogicController {
    const view = new NestView(this._res)
    const validator = new GetByIdAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const interactor = new GetByIdAccountsInteractor(validator, repository);
    const presenter = new GetByIdAccountsResponsePresenter();
    return new GetByIdAccountLogicController(interactor, presenter, view);
  }
}