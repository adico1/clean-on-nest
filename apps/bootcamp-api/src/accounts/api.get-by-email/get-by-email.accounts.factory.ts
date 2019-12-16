import { NestView, GetByEmailAccountsResponsePresenter, 
  GetByEmailAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { GetByEmailAccountsRequestMessageValidator, GetByEmailAccountsInteractor,
  GetByEmailAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class GetByEmailAccountFactory extends IControllerFactory<GetByEmailAccountLogicController> {
  public create(): GetByEmailAccountLogicController {
    // console.log('GetByEmailAccountFacade::exec');
    const view = new NestView(this._res)
    const validator = new GetByEmailAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const interactor = new GetByEmailAccountsInteractor(validator, repository);
    const presenter = new GetByEmailAccountsResponsePresenter();
    return new GetByEmailAccountLogicController(interactor, presenter, view);
  }
}