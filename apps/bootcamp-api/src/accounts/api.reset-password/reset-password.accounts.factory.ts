import { NestView, ResetPasswordAccountsResponsePresenter, 
  ResetPasswordAccountLogicController, 
  VerificationGeneratorDependencies} from '@btcp/bootcamp-interfaceadapters';
import { ResetPasswordAccountsRequestMessageValidator, ResetPasswordAccountsInteractor } from '@btcp/bootcamp-blogic';
import { Factory } from '../common/factory';
import { IControllerFactory } from '../../shared/interfaces/controller-factory.interface';

export class ResetPasswordAccountFactory extends IControllerFactory<ResetPasswordAccountLogicController> {
  public create(): ResetPasswordAccountLogicController {
    const view = new NestView(this._res);
    const validator = new ResetPasswordAccountsRequestMessageValidator();
    const repository = Factory.createForgotPasswordRepository(this._connection);
    const dependencies = new VerificationGeneratorDependencies();
    const interactor = new ResetPasswordAccountsInteractor(validator, repository, dependencies);
    const presenter = new ResetPasswordAccountsResponsePresenter();
    return new ResetPasswordAccountLogicController(interactor, presenter, view);
  }
}