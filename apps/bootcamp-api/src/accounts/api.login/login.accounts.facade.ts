import { 
  NestView, 
  LoginAccountsResponsePresenter, 
  LoginAccountLogicController } from '@btcp/bootcamp-interfaceadapters';
import { 
  LoginAccountsRequestMessageValidator, 
  LoginAccountsInteractor,
  LoginAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { InetLocationDto } from '../dto/inet-location.dto';
import { LoggedInUser } from '@btcp/bootcamp-entities';
import { AuthFactory } from '../../auth/auth.factory';
import { LoginAccountDto } from '../dto/login-account.dto';

export class LoginAccountFacade extends IControllerFacede<LoginAccountLogicController> {
  public async exec(
    loggedInUser: LoggedInUser,
    inetLocation: InetLocationDto) {

    const controller = this._factory.create();
    await controller.login(LoginAccountDto.create(loggedInUser, inetLocation));
  }
}