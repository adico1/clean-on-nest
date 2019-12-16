import { NestView, ForgotPasswordVerifyAccountsResponsePresenter, 
  ForgotPasswordVerifyAccountLogicController, 
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { ForgotPasswordVerifyAccountsRequestMessageValidator, 
  ForgotPasswordVerifyAccountsInteractor,
  ForgotPasswordVerifyAccountsRequestMessage } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { InetLocationDto } from '../dto/inet-location.dto';
import { VerifyUuidDto } from '../dto/verify-uuid.dto';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class ForgotPasswordVerifyAccountFactory 
extends IControllerFactory<ForgotPasswordVerifyAccountLogicController> {
  public create(): ForgotPasswordVerifyAccountLogicController {
    const view = new NestView(this._res);
    const validator = new ForgotPasswordVerifyAccountsRequestMessageValidator();
    const forgotPasswordRepository = 
      Factory.createForgotPasswordRepository(this._connection);
    const forgotPasswordhDependencies = new VerificationGeneratorDependencies();

    const interactor = new ForgotPasswordVerifyAccountsInteractor(
      validator, 
      forgotPasswordRepository,
      forgotPasswordhDependencies);
      
    const presenter = new ForgotPasswordVerifyAccountsResponsePresenter();
    const controller = new ForgotPasswordVerifyAccountLogicController(interactor, presenter, view);

    return controller;
  }
}