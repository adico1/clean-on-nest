import { 
  NestView, 
  LoginAccountsResponsePresenter, 
  LoginAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { 
  LoginAccountsRequestMessageValidator, 
  LoginAccountsInteractor } from '@btcp/bootcamp-blogic';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';
import { AuthFactory } from '../../auth/auth.factory';

export class LoginAccountFactory 
extends IControllerFactory<LoginAccountLogicController> {
  public create(): LoginAccountLogicController {

    // console.log('LoginAccountFacade::exec');
    const view = new NestView(this._res);
    const validator = new LoginAccountsRequestMessageValidator();
    const auth = new AuthFactory(this._connection, this._res).create();
    const interactor = new LoginAccountsInteractor(validator, auth);
    const presenter = new LoginAccountsResponsePresenter();
    return new LoginAccountLogicController(interactor, presenter, view);
  }
}