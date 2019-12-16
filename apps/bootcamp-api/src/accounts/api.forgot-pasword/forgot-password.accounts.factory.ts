import { NestView, ForgotPasswordAccountsResponsePresenter, 
  ForgotPasswordAccountLogicController, 
  AuthDependencies,
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { ForgotPasswordAccountsRequestMessageValidator, ForgotPasswordAccountsInteractor,
  ForgotPasswordAccountsRequestMessage, 
  RefreshTokenService,
  AuthService} from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFacede } from '../../shared/interfaces/controller-facede.interface';
import { InetLocationDto } from '../dto/inet-location.dto';
import { CreateForgotPasswordDto } from '../dto/create-forgot-password.dto';
import { BadRequestException } from '@nestjs/common';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class ForgotPasswordAccountFactory 
extends IControllerFactory<ForgotPasswordAccountLogicController> {
  public create(): ForgotPasswordAccountLogicController {
    const view = new NestView(this._res);
    const validator = new ForgotPasswordAccountsRequestMessageValidator();
    const repository = Factory.createAccountRepository(this._connection);
    const forgotPasswordRepository = 
      Factory.createForgotPasswordRepository(this._connection);
    const forgotPasswordhDependencies = new VerificationGeneratorDependencies();

    const interactor = new ForgotPasswordAccountsInteractor(
      validator, 
      repository, 
      forgotPasswordRepository,
      forgotPasswordhDependencies);
      
    const presenter = new ForgotPasswordAccountsResponsePresenter();
    return new ForgotPasswordAccountLogicController(interactor, presenter, view);
  }
}